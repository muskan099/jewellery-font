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
import Layout from "../../Components/Layout";
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
  console.log({ user });
  const [nftDetails,setNftDetails] = useState([])
  const getData = async() => {
    const res = await axios.get('/dashboard')
    console.log(res.data)
    setNftDetails(res.data.data)
  }
  console.log("nftDetails",nftDetails)
  let percentage1 = nftDetails.totalNFT_Persentage;
  let percentage2 = nftDetails.forSellNFT_Persentage;
  let percentage3 = nftDetails.auctionNFT_Persentage;
  let percentage4 = nftDetails.commission;
  let percentage5 = nftDetails.totalUserPersentage;
  useEffect(() => {
    getData();
  },)
  return (
    <>
     <Layout>
      {/* <section className="creater-dash-sec">
        <Container fluid className="p-0"> */}
          {/* <Row>
            <Col lg={1} md={12} sm={12} xs={12}>
              <div className="sidemenu-creater">
                <ul>
                  <li className="active">
                    <NavLink to="/admin-dashboard">
                      <img
                        className="img-fluid m-0"
                        src={"images/dashboard.png"}
                      />
                    </NavLink>
                  </li>
                  <li>
                    <a href="/nft-list">
                      <img className="img-fluid m-0" src={"images/list.png"} />
                    </a>
                  </li>
                  <li>
                    <a href="/TransactionList">
                      <img
                        className="img-fluid m-0"
                        src={"images/list22.png"}
                      />
                    </a>
                  </li>

                  <li>
                    <a href="/StackList">
                      <img
                        className="img-fluid m-0"
                        src={"images/list22.png"}
                      />
                    </a>
                  </li>
                  <li>
                    <a href="/ContactList">
                      <img
                        className="img-fluid m-0"
                        src={"images/list22.png"}
                      />
                    </a>
                  </li>
                  <li>
                    <a href="/create-nft">
                      <img
                        className="img-fluid m-0"
                        src={"images/list22.png"}
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
                        <li>
                          <CircularProgressbar
                             value={percentage5}
                           
                             text={`${percentage5}%`}
                          />
                          <h3 className="main-heading-inner">
                            Total Register Users
                          </h3>
                        </li>
                        {/* <li>
                          <CircularProgressbar
                             value={percentage4}
                           
                             text={`${percentage4}%`}
                          />
                          <h3 className="main-heading-inner">
                            Total Register Users
                          </h3>
                        </li> */}
                      
                      {/* </ul>
                    </div>

                    <div className="latest-user-row">
                      <h3 className="main-heading-inner mb-0"> Latest Users</h3>
                      <a href="" className="view-all-link">
                        See All
                      </a>
                    </div>

                    <div className="shadow-box">
                      <Table className="table-tank" responsive>
                        <thead>
                          <tr>
                            <th className="table-tank-th">S.No</th>
                            <th className="table-tank-th">Collection</th>
                            <th className="table-tank-th">Email Address</th>
                            <th className="table-tank-th">Wallet Address</th>
                            <th className="table-tank-th">Create Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>1</td>
                            <td>
                              <div class="owner-row-outer">
                                <img src="images/Team/team7.png" />
                                <div>
                                  <h5>Clementines Nightmare</h5>
                                </div>
                              </div>
                            </td>

                            <td>{user.email}</td>
                            <td>{user.wallet_address}</td>
                            {/* <td> {user.created_at.slice(0, 9)}</td> */}
                          {/* </tr>
                        </tbody>
                      </Table>
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
                  src={"images/Team/team7.png"}
                />
                <h4>{user.name}</h4> */}
                {/* <p>{user._id.slice(0,6)}...{user._id.slice(-5)}</p> */}
                <hr />
              {/* </div>
            </Col>
          </Row> */}
        {/* </Container> */}
      {/* </section> */} 
      </Layout>
    </>
  );
};

export default AdminDashboard;
