//import SoundControl from '../SoundControl.tsx';
import type { SoundProps } from '../data/sounds.ts';
import './MenuSoundCard.css';

function MenuSoundCard({ sound, isInActiveCategory, onClick }: { sound: SoundProps, masterVolume: number, isInActiveCategory: boolean, onClick: Function }) {
    return (
        <div className={`menu-sound ${isInActiveCategory}`} onClick={() => onClick(sound.id)}>
            <img src={sound.iconUrl} alt={sound.name + " icon"} className={`sound-icon-menu`} />
            <div className="card-bottom">
                {sound.name}
            </div>
        </div>
    );
}

export default MenuSoundCard