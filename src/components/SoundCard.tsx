//import SoundControl from '../SoundControl.tsx';
import type { SoundProps } from '../data/sounds.ts';
import { useAudioLayer } from '../hooks/useAudioLayer.ts';
import { useState, useEffect, useRef } from 'react';
import './SoundCard.css';

function SoundCard({ sound }: { sound: SoundProps }) {
    const { isPlaying, volume, play, stop, setVolume, isBufferLoaded } = useAudioLayer(sound.soundUrl);

    const [localIsPlaying, setLocalIsPlaying] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const [isDebounced, setIsDebounced] = useState(false);
    const debounceTimerRef = useRef<number | null>(null);

    // Sync recovery: if hook state diverges from local state after 300ms, resync
    useEffect(() => {
        if (localIsPlaying === isPlaying) {
            return; // States are in sync
        }

        const timeoutId = setTimeout(() => {
            if (localIsPlaying !== isPlaying) {
                console.warn('State mismatch detected, resyncing...');
                setLocalIsPlaying(isPlaying);
                setIsPending(false);
            }
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [localIsPlaying, isPlaying]);
    
    function playingToggle() {
        // Prevent interaction if buffer not loaded
        if (!isBufferLoaded) return;

        // Debounce: prevent rapid clicks while operation is in progress
        if (isDebounced) return;

        const newState = !localIsPlaying;
        setLocalIsPlaying(newState);
        setIsPending(true);

        // Set debounce flag for 300ms
        setIsDebounced(true);
        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
        }
        debounceTimerRef.current = window.setTimeout(() => {
            setIsDebounced(false);
        }, 300);

        // Perform the audio operation with error handling
        if (newState) {
            try {
                play();
                setIsPending(false);
            } catch (error) {
                console.error('Failed to play:', error);
                setLocalIsPlaying(false);
                setIsPending(false);
            }
        } else {
            try {
                stop();
                setIsPending(false);
            } catch (error) {
                console.error('Failed to stop:', error);
                setLocalIsPlaying(true);
                setIsPending(false);
            }
        }
    }

    const cardState = !isBufferLoaded ? 'loading' : (isPending ? 'pending' : (localIsPlaying ? 'active' : 'inactive'));

    return (
        <div className={`sound ${cardState}`}>
            <div className="card-display" onClick={playingToggle}>
                <img src={sound.iconUrl} alt={sound.name + " icon"} className={`${cardState}`}/>
                <span>{sound.name}</span>
            </div>
            <input 
                    disabled={!localIsPlaying || isPending || !isBufferLoaded}
                    type="range"
                    min={0}
                    max={1}
                    step={0.01}
                    value={volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                />
        </div>
    );
}

export default SoundCard