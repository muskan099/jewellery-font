import { Chart } from "react-google-charts";
import {
  Row,
  Col,
  Container,
  Tabs,
  Tab,
  Table,
  Modal,
  Button,
  Form,
} from "react-bootstrap";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { axios } from "../../http";
import { useEffect, useState } from "react";
import HomeLayout from "../../Components/Layout";

const AdminDashboard = () => {
  
  const data = [
    ["Month", "Sales"],
    ["Jan", 1000],
    ["Feb", 1170],
    ["Mar", 660],
    ["Apr", 1030],
    ["May", 1000],
    ["Jun", 1170],
    ["Jul", 660],
    ["Aug", 1030],
    ["Sept", 1170],
    ["Oct", 660],
    ["Nov", 1030],
    ["Dec", 1030],
  ];

  const options = {
    isStacked: true,
    legend: { position: "none" },
    curveType: "function",
    height: 250,
    colors: ["#871434"],
    vAxis: { minValue: 0 },
  };
  const { user } = useSelector((state) => state.auth);
  const[totalUser,setTotalUser] = useState([])
  console.log({ user });
  const {
   
    walletAddress,
    
   
  } = useSelector((state) => state.auth);
  console.log({walletAddress})

  const [nftDetails,setNftDetails] = useState([])
  const[profileImage,setprofileImage] = useState("");
  const getData = async() => {
    const res = await axios.get('/admindashboard')
    console.log(res.data)
    setNftDetails(res.data.data)
    setTotalUser(res.data.data.AllUser)
    const adminDataResult = JSON.parse(localStorage.getItem("adminData"))
    setprofileImage(adminDataResult.image)
  }
  console.log("nftDetails",nftDetails)
  console.log("Total User",totalUser)
  let percentage1 = nftDetails.collectionCount;
  let percentage2 = nftDetails.forsalenftcount;
  let percentage3 = nftDetails.auctionnftcount;
  let percentage4 = nftDetails.totalUserCount;
  // let percentage5 = nftDetails.totalUserPersentage;
  useEffect(() => {
    getData();
  },[])
  return (
    <>
     <HomeLayout>
    <section className="creater-dash-sec">
        <Container fluid className="p-0"> 
         <Row>
            <Col lg={1} md={12} sm={12} xs={12}>
              <div className="sidemenu-creater">
                <ul>
                  <li className="active">
                    <NavLink to="/admin-dashboard">
                      <img
                        className="img-fluid m-0"
                        src={"assets/images/dashboard.png"}
                      />
                    </NavLink>
                  </li>
                  <li>
                    <a href="/collections">
                      <img className="img-fluid m-0" src={"assets/images/list.png"} />
                    </a>
                  </li>
                  <li>
                    <a href="/stakes">
                      <img
                        className="img-fluid m-0"
                        src={"assets/images/list22.png"}
                      />
                    </a>
                  </li>
                  <li>
                    <a href="/stakes">
                      <img
                        className="img-fluid m-0"
                        src={"assets/images/list22.png"}
                      />
                    </a>
                  </li>
               
                 
                </ul>
              </div>
            </Col>
            <Col lg={8} md={12} sm={12} xs={12}>
              <div className="top-collect-creater">
                <h3 className="main-heading-inner mb-0"> Admin Dashboard</h3>

                <Row>
                  <Col>
                    <div className="shadow-graph-box prograss-box-admin">
                      <ul>
                        <li>
                          <CircularProgressbar
                            value={percentage1}
                           
                            text={`${percentage1}%`}
                          />
                          <h3 className="main-heading-inner">Total NFT</h3>
                        </li>
                        <li>
                          <CircularProgressbar
                            value={percentage2}
                           
                            text={`${percentage2}%`}
                          />
                          <h3 className="main-heading-inner">For Sale</h3>
                        </li>
                        
                        <li>
                          <CircularProgressbar
                             value={percentage3}
                           
                             text={`${percentage3}%`}
                          />
                          <h3 className="main-heading-inner">On Auction</h3>
                        </li>
                        {/* <li>
                          <CircularProgressbar
                             value={percentage5}
                           
                             text={`${percentage5}%`}
                          />
                          <h3 className="main-heading-inner">
                            Total Register Users
                          </h3>
                        </li> */}
                       <li>
                          <CircularProgressbar
                             value={percentage4}
                           
                             text={`${percentage4}%`}
                          />
                          <h3 className="main-heading-inner">
                            Total Register Users
                          </h3>
                        </li> 
                      
                     </ul>
                    </div>

                    <div className="latest-user-row">
                      <h3 className="main-heading-inner mb-0"> Latest Users</h3>
                      <a href="" className="view-all-link">
                        See All
                      </a>
                    </div>

                    <div className="shadow-box">
                   
                    
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>

            <Col lg={3} md={12} sm={12} xs={12} className="pr-0">
              <div className="profile-img-left-box">
                <h3 className="main-heading-inner mb-0 text-center">
                  {" "}
                  My Profile
                </h3>
                <img
                  className="profile-main-img"
                 src={`https://jewellery.donative.in:3000/AdminProfile/${profileImage}`}

                />
                {console.log({profileImage})}
                <h4>{walletAddress.slice(0,4)}....{walletAddress.slice(-4)}</h4> 
                <a href="/update-profile" className="gradient-btn" >Update Profile</a>
               {/* <p>{user._id.slice(0,6)}...{user._id.slice(-5)}</p>  */}
                <hr />
             </div>
            </Col>
          </Row> 
       </Container> 
     </section>  
     </HomeLayout>
    </>
  );
};

export default AdminDashboard;
