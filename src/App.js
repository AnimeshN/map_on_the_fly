import { feature } from 'topojson';
import Map from './Components/Map/Map';
import './App.css';
const width = window.innerWidth;
const height = window.innerHeight;


function App() {
  const newStateTopology = require('./data/boundries/India.json'); // NFHS5 state vector layer
  const newStateObject = newStateTopology.objects['india-state_26may'];
  let boundary = feature(newStateTopology, newStateObject)
  return (
    <div className="App">
     <Map boundary={boundary} width={width} height={height}></Map>
    </div>
  );
}

export default App;
