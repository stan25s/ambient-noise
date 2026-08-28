import { useEffect, useState, type ReactNode } from 'react';
import type { SoundProps } from '../data/sounds.ts';
import SoundCard from './SoundCard.tsx';
import './MasterControl.css';

function MasterControl({ masterVolume, setVolume, activeCards, setActiveCards }:
    { masterVolume: number, setVolume: Function, activeCards: SoundProps[], setActiveCards: Function }
) {

    const [masterIsMuted, setMasterIsMuted] = useState(false);
    const [volumeBeforeMute, setVolumeBeforeMute] = useState(masterVolume);

    useEffect(() => {
        console.log(activeCards);
        console.log(`activecards.length=${activeCards.length}`);
    }, [activeCards])

    function toggleMute() {
        if (masterIsMuted) {
            setMasterIsMuted(false);
            // reset the volume to the previous volume before mute button was pressed.
            setVolume(volumeBeforeMute);
        } else {
            setMasterIsMuted(true);
            // store the current volume before setting overall vol to 0.
            setVolumeBeforeMute(masterVolume);
            setVolume(0);
        }
    }

    function emptySoundCard() {
        return (
            <div className='sound'>
                select any card above to start building your sound deck
            </div>
        )
    }

    // function renderActiveCards(): ReactNode {
    //     return (activeCards.map
    //             (sound => <SoundCard key={sound.id} sound={sound} masterVolume={masterVolume} />))
    // }
    try {
        return (
            <div className="master-controls">
                <div className="active-card-container">
                    {(activeCards.length >= 1) ? (activeCards.map
                        (sound => <SoundCard key={sound.id} sound={sound} masterVolume={masterVolume} />)) : (emptySoundCard())}
                </div>
                <div className='controls-container'>
                    <input className="master-volume"
                        disabled={masterIsMuted}
                        type="range"
                        min={0}
                        max={1}
                        step={0.05}
                        value={masterVolume}
                        onChange={(e) => setVolume(parseFloat(e.target.value))}
                    />
                    <button className="mute-button"
                        title="mute"
                        onClick={() => toggleMute()}>
                        {masterIsMuted ?
                            (<img className="mute-image" src='icons/unmute-white.png' />) :
                            (<img className="mute-image" src='icons/mute-white.png' />)}
                    </button>
                </div>
            </div>
        )
    } catch {
        console.log('exception caught:');
        console.log(activeCards.length);
        console.log(activeCards);
        throw new Error("exception");

    }
}

export default MasterControl