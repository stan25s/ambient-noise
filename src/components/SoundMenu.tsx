import SoundCard from "./SoundCard";
import { rainSound, rain1Sound, rain2Sound, pondSound, forestSound, fireplaceSound, whiteNoiseSound, thunderSound} from "../data/sounds";
import './SoundMenu.css';

function SoundMenu() {
    return (
        <div className="card-container">
            <SoundCard sound={pondSound} />
            <SoundCard sound={forestSound} />
            <SoundCard sound={fireplaceSound} />
            <SoundCard sound={whiteNoiseSound} />
            <SoundCard sound={rainSound} />
            <SoundCard sound={rain1Sound} />
            <SoundCard sound={rain2Sound} />
            <SoundCard sound={thunderSound} />
        </div>
    )
}

export default SoundMenu