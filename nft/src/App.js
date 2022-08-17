import './App.css';
import { Route,Routes} from "react-router-dom";
import Homepage from './pages/Homepage';
import Marketplace from './pages/Marketplace';
import StoreDetails from './pages/StoreDetails';
import StoreSell from './pages/StoreSell';
import StoreOverview from './pages/StoreOverview';

function App() {
  return (
    <div className="App">
       <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/store" element={<StoreDetails />} />
          <Route path="/sell" element={<StoreSell />} />
          <Route path="/overview" element={<StoreOverview/>} />


        </Routes>
    </div>
  );
}

export default App;
