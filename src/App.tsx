import { useState } from 'react';
import './App.css'
import SoundMenu from './components/SoundMenu.tsx';
import { allSounds } from './data/sounds.ts';
import MasterControl from './components/MasterControl.tsx';

function App() {

  const [masterVolume, setMasterVolume] = useState(1.0);

  return (
    <div className="App" id='app'>
      <h1>quiet<strong>_soundscape</strong></h1>
      <p>Whether you are looking for some background sounds for focus or for sleep, you're in the right place.</p>
      <p>Click on any of the icons below to activate the sounds and start mixing your own soundscape.</p>

      <SoundMenu sounds={allSounds} masterVolume={masterVolume}/>

      <MasterControl 
        masterVolume={masterVolume}
        setVolume={setMasterVolume} />

      <div className='Footer'>
        <div className='subtle'>by Stanley Smith<br/> audio files sourced from <a href='https://pixabay.com/'>pixabay</a> and <a href='https://mixkit.co/free-sound-effects/'>mixkit</a></div>
        <div id='Spacer'></div>
        <div className='subtle'><br/>quiet v0.1</div>
      </div>
    </div>
  )
};

export default App
