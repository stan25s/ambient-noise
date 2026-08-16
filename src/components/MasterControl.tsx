import { useState } from 'react';
import './MasterControl.css';

function MasterControl({ masterVolume, setVolume }: { masterVolume: number, setVolume: Function }
) {

    const [ masterIsMuted, setMasterIsMuted ] = useState(false);
    const [volumeBeforeMute, setVolumeBeforeMute] = useState(masterVolume);

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

    return (
        <div className="floating-controls">
            <button className="mute-button"
                title="mute"
                onClick={() => toggleMute()}
            >{
                masterIsMuted ? 
            (<img className="mute-image" src='icons/unmute-white.png'/>) : 
            (<img className="mute-image" src='icons/mute-white.png'/>)}</button>
            <input className="master-volume"
                disabled={masterIsMuted}
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={masterVolume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
            />
        </div>
    )
}

export default MasterControl