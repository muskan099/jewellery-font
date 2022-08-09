import './App.css';
import { Route,Routes} from "react-router-dom";
import Index from './pages/Index';
import Marketplace from './pages/Marketplace';

function App() {
  return (
    <div className="App">
       <Routes>
          <Route path="/index" element={<Index />} />
          <Route path="/" element={<Marketplace />} />

        </Routes>
    </div>
  );
}

export default App;
