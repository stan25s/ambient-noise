import type { SoundProps } from '../data/sounds.ts';
import { useAudioLayer } from '../hooks/useAudioLayer.ts';
import { useState, useEffect } from 'react';
import './SoundCard.css';

function SoundCard({ sound, masterVolume, removeCard }: { sound: SoundProps, masterVolume: number, removeCard: Function }) {
    const { isReady, isPlaying, volume, play, stop, setVolume } = useAudioLayer(sound.soundUrl);

    const [cardDisplayVolume, setCardDisplayVolume] = useState(1.0);
    const [isMuted, setIsMuted] = useState(false);

    useEffect(() => {
        let mutedMultiplier = 1;
        if (isMuted) {
            mutedMultiplier = 0;
        }
        console.log("master_change, card_vol:" + volume + ", masterVol" + masterVolume);
        setVolume(cardDisplayVolume * masterVolume * mutedMultiplier);
        console.log("master_change, new_card_vol:" + volume + ", masterVol" + masterVolume);
    }, [masterVolume])

    useEffect(() => {
        if (isReady) {
            play();
        }
        return (() => {
            stop();
        })
    }, [isReady])

    function toggleMute() {
        if (!isMuted) {
            setIsMuted(true);
            setVolume(0);
        } else {
            setIsMuted(false);
            setVolume(cardDisplayVolume * masterVolume);
        }
    }

    const cardState = !isReady ? 'loading' : (isPlaying ? 'active' : 'inactive');

    function updateVolume(value: number) {
        //user has changed volume, so unset the muted state.
        setIsMuted(false);

        console.log("value:" + value + ", masterVol" + masterVolume);
        setCardDisplayVolume(value);
        setVolume(value * masterVolume);
        console.log("new_card_vol:" + volume);
    }

    return (
        <div className={`card-block`}>
            <div className={`sound ${cardState}`} onClick={() => toggleMute()}>
                <img src={sound.iconUrl} alt={sound.name + " icon"} className={`sound-icon`} />
                <div className="card-bottom">
                    {sound.name}
                </div>
            </div>
            <div className={`card-controls`}>
                <button className="mute-button-card"
                    title="mute"
                    onClick={() => toggleMute()}>
                    {isMuted ?
                        (<img className="mute-image" src='icons/unmute.png' />) :
                        (<img className="mute-image" src='icons/mute.png' />)}
                </button>
                <input
                    disabled={!isPlaying || !isReady}
                    className='card-volume-slider'
                    type="range"
                    min={0}
                    max={1}
                    step={0.05}
                    value={cardDisplayVolume}
                    onChange={(e) => updateVolume(parseFloat(e.target.value))}
                />
            </div>
            <button className="close-button"
                    title="close"
                    onClick={() => removeCard(sound.id)}>
                    {(<img className="close-image" src='icons/close.png' />)}</button>
        </div>
    );
}

export default SoundCard