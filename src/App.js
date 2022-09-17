import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Marketplace from "./pages/Marketplace";
import StoreOverview from "./pages/StoreOverview";
import NftDetail from "./pages/NftDetail";
import CreateNft from "./pages/CreateNft";
import CreateStake from "./pages/CreateStake";
import "react-toastify/dist/ReactToastify.css";
import Meet from "./pages/Meet";
import Stakes from "./pages/Stakes";
import Transactions from "./pages/Transactions";
import About from "./pages/About";
import ScrollToTop from "./Components/ScrollToTop";
import Contactus from "./pages/Contactus";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Articles from "./pages/Articles";
import ArticleDetail from "./pages/ArticleDetail";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/overview" element={<StoreOverview />} />
            <Route path="/nft-detail" element={<NftDetail />} />
            <Route path="/create-nft" element={<CreateNft />} />
            <Route path="/create-stake" element={<CreateStake />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/create-stake" element={<CreateStake />} />
            <Route path="/meet" element={<Meet />} />
            <Route path="/stakes" element={<Stakes />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contactus />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/article-detail" element={<ArticleDetail />} />
          </Routes>
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
}

export default App;