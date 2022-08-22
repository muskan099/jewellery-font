import './App.css';
import { BrowserRouter,Route,Routes} from "react-router-dom";
import Homepage from './pages/Homepage';
import Marketplace from './pages/Marketplace';
import StoreOverview from './pages/StoreOverview';
import NftDetail from "./pages/NftDetail";
import CreateNft from "./pages/CreateNft"
import CreateStake from "./pages/CreateStake"

function App() {
  return (
    <div className="App">
         <BrowserRouter>
       <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/overview" element={<StoreOverview/>} />
          <Route path="/nft-detail" element={<NftDetail/>} />
          <Route path="/create-nft" element={<CreateNft/>} />
          <Route path="/create-stake" element={<CreateStake/>} />
       </Routes>
       </BrowserRouter>
    </div>
  );
}

export default App;
