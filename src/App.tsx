import './App.css'
import SoundMenu from './components/SoundMenu.tsx';
import { noiseSounds, natureSounds, environmentSounds } from './data/sounds.ts';

function App() {

  return (
    <div className="App" id='app'>
      <h1>quiet<strong>_soundscape</strong></h1>
      <p>Whether you are looking for some background sounds for focus or for sleep, you're in the right place.</p>
      <p>Click on any of the icons below to activate the sounds and start mixing your own soundscape.</p>

      <SoundMenu sounds={natureSounds} title="nature"/>
      <SoundMenu sounds={environmentSounds} title="environments"/>
      <SoundMenu sounds={noiseSounds} title="noise"/>

      <div className='Footer'>
        <div className='subtle'>by Stanley Smith<br/> audio files sourced from <a href='https://pixabay.com/'>pixabay</a> and <a href='https://mixkit.co/free-sound-effects/'>mixkit</a></div>
        <div id='Spacer'></div>
        <div className='subtle'><br/>quiet v0.1</div>
      </div>
    </div>
  )
};

export default App
