import SoundCard from "./SoundCard";
import type { soundArray } from "../data/sounds";
import './SoundMenu.css';

function SoundMenu({ sounds, title }: { sounds: soundArray, title: String }) {
    return (
        <div className="sound-menu-container">
            <div className="header">
                {title}
            </div>
            <div className="card-container">
                {sounds.map(sound => <SoundCard sound={sound}/>)}
            </div>
        </div>
    )
}

export default SoundMenu