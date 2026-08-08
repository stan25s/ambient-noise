import './App.css'
import SoundMenu from './components/SoundMenu.tsx';

function App() {

  return (
    <div className="App" id='app'>
      <h1>quiet ambience</h1>
      <p>Whether you are looking for some background sounds for focus or for sleep, you're in the right place.</p>
      <p>Click on any of the icons below to activate the sounds and start mixing your own soundscape.</p>
      <SoundMenu />
    </div>
  )
};

export default App
