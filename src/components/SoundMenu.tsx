import SoundCard from "./SoundCard";
import type { soundArray } from "../data/sounds";
import './SoundMenu.css';

function SoundMenu({ sounds, masterVolume }: { sounds: soundArray, masterVolume: number }) {
    return (
        <div className="sound-menu-container">
            <div className="card-container">
                {sounds.map(sound => <SoundCard sound={sound} masterVolume={masterVolume}/>)}
            </div>
        </div>
    )
}

export default SoundMenu