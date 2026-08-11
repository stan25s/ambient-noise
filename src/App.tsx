import './App.css'
import SoundMenu from './components/SoundMenu.tsx';

function App() {

  return (
    <div className="App" id='app'>
      <h1>quiet<strong>_soundscape</strong></h1>
      <p>Whether you are looking for some background sounds for focus or for sleep, you're in the right place.</p>
      <p>Click on any of the icons below to activate the sounds and start mixing your own soundscape.</p>
      <SoundMenu />
      <div className='Footer'>
        <div className='subtle'>by Stan</div>
        <div id='Spacer'></div>
        <div className='subtle'>quiet v0.1</div>
      </div>
    </div>
  )
};

export default App
