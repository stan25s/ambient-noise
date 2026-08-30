import { useState } from 'react';
import './App.css'
import SoundMenu from './components/SoundMenu.tsx';
import MasterControl from './components/MasterControl.tsx';
import type { SoundProps } from './data/sounds.ts';

function App() {

  const [masterVolume, setMasterVolume] = useState(1.0);

  const nullActiveCards: SoundProps[] = [];
  const [activeCards,setActiveCards] = useState(nullActiveCards);

  return (
    <div className="App" id='app'>
      <h1><strong>ambient</strong> sounds</h1>
      <p>Whether you are looking for some background sounds for focus or for sleep, you're in the right place.</p>
      <p>Click on any of the icons below to activate the sounds and start mixing your own soundscape.</p>

      <SoundMenu masterVolume={masterVolume} activeCards={activeCards} setActiveCards={setActiveCards}/>

      <MasterControl 
        masterVolume={masterVolume}
        setVolume={setMasterVolume}
        activeCards={activeCards}
        setActiveCards={setActiveCards} />

      {/* <div className='Footer'>
        <div className='subtle'>by Stanley Smith<br/> audio files sourced from <a href='https://pixabay.com/'>pixabay</a> and <a href='https://mixkit.co/free-sound-effects/'>mixkit</a></div>
        <div id='Spacer'></div>
        <div className='subtle'><br/>quiet v0.1</div>
      </div> */}
    </div>
  )
};

export default App
