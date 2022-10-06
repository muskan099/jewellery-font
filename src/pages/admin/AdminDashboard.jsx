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
import axiosMain from "../../http/axios/axios_main";
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
  const [list, setList] = useState([]);
  const[totalUser,setTotalUser] = useState([])
  const [name, setName] = useState(false);
  const [category, setCategory] = useState(false);
  const [price, setPrice] = useState(false);
  console.log({ user });
  const {
   
    walletAddress,
    
   
  } = useSelector((state) => state.auth);
  console.log({walletAddress})
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const[id,setId] = useState();
  const [nftDetails,setNftDetails] = useState([])
  const[ makeOfferDetails,setMakeOfferDetails] = useState([])
  const[profileImage,setprofileImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const getData = async() => {
    const res = await axios.get('/admindashboard')
    console.log(res.data)
    setNftDetails(res.data.data)
    setTotalUser(res.data.data.AllUser)
    const adminDataResult = localStorage.getItem("adminData")
    const storeImage = JSON.parse(adminDataResult).image
    console.log("adminDataResult",adminDataResult)
    console.log("storeImage",storeImage)
    setprofileImage(storeImage)
    console.log("profileImage",profileImage)
  }
  console.log("nftDetails",nftDetails)
  console.log("Total User",totalUser)
  console.log("profileImage",profileImage)
  let percentage1 = nftDetails.collectionCount;
  let percentage2 = nftDetails.forsalenftcount;
  let percentage3 = nftDetails.auctionnftcount;
  let percentage4 = nftDetails.totalUserCount;
  // let percentage5 = nftDetails.totalUserPersentage;
  const getOffers = async () => {
    try{
     
  
      const api = await axiosMain.get("/NFTList");

    
      setList(api.data.data[0].list);
     
     
    }catch(error){
      console.log(error);
    }
  }
  const updateNft = async () => {
    const res = axiosMain.post("/UpdateNFT",{name:name,category:category,price:price,id:id})
    handleClose();
  };
  const handleName = (e) => {
    let value = e.target.value;
    if (value) {
        setName(value);
      }
   
  };
 
  const handleCategory = (e) => {
    let value = e.target.value;
    if (value) {
        setCategory(value);
      }
   
  };
  const handlePrice = (e) => {
    let value = e.target.value;
    if (value) {
        setPrice(value);
      }
   
  };
  useEffect(() => {
    getData();
    getOffers();
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
                    <a href="/nft-list">
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

                    {/* <div className="latest-user-row">
                      <h3 className="main-heading-inner mb-0"> Latest Users</h3>
                      <a href="" className="view-all-link">
                        See All
                      </a>
                    </div> */}

                    
                    <div className="table-responsive">
                    <table className="table table-details">
                      <thead>
                        <tr className="for-back">
                          <th>S.No</th>
                          <th>Image</th>
                          <th>Name</th>
                          <th >Buying Price</th>
                          <th>Creator Address</th>
                         
                          <th>Token</th>
                          <th>Status</th>
                          <th width="20%">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {list.map((items, index) => {
                          return (
                           
                            <tr className="for-body-tr">
                             
                              <td className="td-break">{index + 1}</td>
                              <td className="td-break"><img className="img-fluid" src={items.images} width="40px" alt="" onError={({ currentTarget }) => {
    currentTarget.onerror = null; // prevents looping
    currentTarget.src="assets/images/img-nft/list-img.png";
  }}/></td>
                              <td className="td-break">{items.name}</td>
                              <td className="td-break">{items.price}</td>
                              <td className="td-break">{items.wallet_address.slice(0,3)}....  {items.wallet_address.slice(-3)}</td>
                            
                              <td className="td-break">{items.token_id}</td>
                              <td className="td-break success-green">{items.status ? 'success' : 'success'}</td>
                              <td className="td-break">
                                  
                                  <div className="btn-flex-btn"><button className="btn-sell1" onClick={() => {
                                  setId(items._id)
                                  handleShow();
                              }}>Update</button>
                               </div>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                    <Modal
          show={show}
          className="modal-comming-soon bid-modal transaction-page-modal"
          backdrop="static"
          keyboard={false}
          onHide={handleClose}
          centered
        >
          <Modal.Header
            closeButton
            className="border-none p-0"
            style={{ zIndex: "10000000" }}
          >
               <h3 className="modal-header-h3">Update Nft</h3>
          </Modal.Header>
          <Modal.Body className="modal-background">
            <div class="bid-modal-box">
            <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Id</Form.Label>
                  {console.log({id})}
                  <Form.Control
                    type="text"
              
                   value={id}
                  readOnly
                    className="input-box-auction"
                  />
                </Form.Group>
                {console.log("this is the di",id)}
              </Form>

              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Name"
                   
                    onChange={(e) => handleName(e)}
                
                    className="input-box-auction"
                  />
                </Form.Group>
              </Form>

              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Price"
                   
                    onChange={(e) => handlePrice(e)}
                
                    className="input-box-auction"
                  />
                </Form.Group>
              </Form>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Category"
                 
                   
                    onChange={(e) => handleCategory(e)}
                    
                    className="input-box-auction"
                  />
                </Form.Group>
              </Form>

            

              <div class="btn-sell-container">
                <a
                  href="#"
                  className="blue-btn"
                  onClick={() => {
                    if (!isLoading) {
                      updateNft();
                    }
                  }}
                  disabled={isLoading}
                  style={{ cursor: isLoading ? "no-drop" : "pointer" }}
                >
                  {isLoading ? "Processing" : "Submit"}
                </a>

                <a href="" className="border-btn">
                  Cancel
                </a>
              </div>
            </div>
          </Modal.Body>
        </Modal>
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
                  
              src={`https://jewellery.donative.in/AdminProfile/${profileImage}`}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src="assets/images/team7.png";
              }} 
            
                />
             
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
