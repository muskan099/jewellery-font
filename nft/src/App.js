import './App.css';
import { Route,Routes} from "react-router-dom";
import Homepage from './pages/Homepage';
import Marketplace from './pages/Marketplace';

function App() {
  return (
    <div className="App">
       <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/market-place" element={<Marketplace />} />

        </Routes>
    </div>
  );
}

export default App;
