import './App.css';
import { BrowserRouter,Route,Routes} from "react-router-dom";
import Homepage from './pages/Homepage';
import Marketplace from './pages/Marketplace';
import StoreOverview from './pages/StoreOverview';
import NftDetail from "./pages/NftDetail";
import CreateNft from "./pages/CreateNft"
import CreateStake from "./pages/CreateStake"
import Meet from './pages/Meet';
import Stakes from './pages/Stakes';
import Transactions from './pages/Transactions';

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
<<<<<<< HEAD
          <Route path="/create-stake" element={<CreateStake/>} />
          <Route path="/meet" element={<Meet/>} />
          <Route path="/stakes" element={<Stakes/>} />
          <Route path="/transactions" element={<Transactions/>} />
       \


        </Routes>
=======
       </Routes>
       </BrowserRouter>
>>>>>>> b6d67e51e7ac265cb707a5889bf5b89cacc43979
    </div>
  );
}

export default App;
