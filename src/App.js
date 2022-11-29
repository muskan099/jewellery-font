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
import SignIn from "./pages/admin/SignIn";
import SignUp from "./pages/admin/SignUp";
import UpdateAdminProfile from "./pages/admin/UpdateAdminProfile";
import NftList from "./pages/admin/NftList";
import Joinus from "./pages/Joinus";
import AdminTransaction from "./pages/admin/AdminTransaction";
import AllStore from "./pages/admin/AllStore";
import BuyFromOtherChain from "./pages/BuyFromOtherChain";

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
            <Route path="/collections" element={<Transactions />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contactus />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/article-detail" element={<ArticleDetail />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/update-profile" element={<UpdateAdminProfile />} />
            <Route path="/nft-list" element={<NftList />} />
            <Route path="/joinus" element={<Joinus />} />
            <Route path="/admin-transactions" element={<AdminTransaction />} />
            <Route path="/admin-store" element={<AllStore />} />
            <Route path="/buyfromotherchain" element={<BuyFromOtherChain />} />
          </Routes>
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
}

export default App;
