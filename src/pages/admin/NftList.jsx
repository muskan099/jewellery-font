import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { Row, Col, Modal, Button, Form,FormControl,InputGroup,Dropdown, Accordion } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Layout from '../../Components/Layout';
import { useSelector } from "react-redux";
import { toast, useToast } from "react-toastify";
import axiosMain from "../../http/axios/axios_main";
import { axios } from "../../http";
import { CreateReSale, WithdrawSale } from "../../helpers/CreateResale";
import { createNFTAuction } from "../../helpers/AuctionHelper";
import { Transaction } from "../../helpers/Transaction";
import { useLocation } from "react-router";
import {  NavLink } from "react-router-dom";
import Pagination from "./Pagination";
function Transactions() {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [saleData, setSaleData] = useState();
const[id,setId] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [ANft, setANft] = useState("");
  const [name, setName] = useState(false);
  const [category, setCategory] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [price, setPrice] = useState(false);
  const [search, setSearch] = useState("");
  const [nft, setNft] = useState("");
  const [result, setResult] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [status, setStatus] = useState("");
  const[totalCount,setTotalCount] = useState();
  const [filterSearch, setFilterSearch] = useState({
    category:"Jeni Summers",
    nftTier: {
      tier1: true,
      tier2: false,
      tier3: false,
    },
    
  });
  const {
    isAuthenticated,
    walletAddress,
  } = useSelector((state) => state.auth);
  const { state } = useLocation("/marketplace");

  console.log(walletAddress, 'check');
  const [auctionData, setAuctionData] = useState({
    minPrice: 0,
    startTime: "",
    endTime: "",
    buttonMessage: "",
  });
  const { buttonMessage } = auctionData;
  const [trandata, settrandata] = useState([]);
  
  const [data, setdata] = useState([]);
 

 

  
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
  console.log(isAuthenticated, 'isauth');
  
  const getData = async (currentPage, limit,search) => {
  
    console.log({filterSearch})
   
    const res = await axios.post("https://jewellery.donative.in/NFTList", {
      skip: 5,
      limit: limit,
      category:categoryFilter,
      status:status,
      page:currentPage,
      search_tag:search
      });
   console.log({res})
    if (res.data) {
      settrandata(res.data.data[0].list);
      setdata(res.data.data[0].list);
      setTotalCount(res.data.data[0].totalRecords[0].count);
    }
  };
console.log(data)
  useEffect(() => {
    getData(currentPage,6,search);
  }, [categoryFilter,status,currentPage,search]);
  return (

    <Layout>
      <div>
        <section className="artist-main-sec">
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
                  <a href="/admin-transactions">
                      <img className="img-fluid m-0" src={"assets/images/list.png"} />
                    </a>
                  </li>
                  <li>
                  <a href="/admin-store">
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
            <Col lg={11} md={12} sm={12} xs={12}>
              <Row>

          
              <Col  className="m-container">
                <Row>
                  <Row>
                  
                  <div className="nft-list-btn-row grid-col">
                  <Col>
                  <h2 className="heading-nft-list">NFT List</h2>
                    </Col>
             <Col >
             <a className="nav-btn gradient-btn" href="">
                    Export to Exel
                  </a>
                  <a className="nav-btn gradient-btn" href="">
                    Export to CSV
                  </a>
             </Col>
                 
                </div>
                  </Row>
                  <Row>
                    <div className="grid-col">
<Col md="8" className="grid-col col-space">
                      <Dropdown>
                      <Dropdown.Toggle className=" gradient-btn  creater-dash-sec">
                        All Category
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1" onClick={(e) => {
                          setCategoryFilter("Chain");
                        }}>Chain</Dropdown.Item>
                     
                     <Dropdown.Item href="#/action-1" onClick={(e) => {
                          setCategoryFilter(e.target.value);
                        }}>Bangel</Dropdown.Item>
                        
                        <Dropdown.Item href="#/action-1" onClick={(e) => {
                          setCategoryFilter("Necklace");
                        }}>Necklace</Dropdown.Item>
                        <Dropdown.Item href="#/action-1" onClick={(e) => {
                          setCategoryFilter("Earings");
                        }}>Earings</Dropdown.Item>
                         <Dropdown.Item href="#/action-1" onClick={(e) => {
                          setCategoryFilter("Rings");
                        }}>Rings</Dropdown.Item>
                      </Dropdown.Menu>
                      
                    </Dropdown>
                    <Dropdown>
                      <Dropdown.Toggle className=" gradient-btn   creater-dash-sec">
                        Status
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1" onClick={(e) => {
                          setStatus("Auction");
                        }}>Auction</Dropdown.Item>
                     
                     <Dropdown.Item href="#/action-1" onClick={(e) => {
                          setStatus("Sold");
                        }}>Sold</Dropdown.Item>
                        
                      
                      </Dropdown.Menu>
                      
                    </Dropdown>



                 
                   </Col>
                    <Col md="4">

                          <div className="news-search-box m-0 search-box-position" >
                        <InputGroup className="news-input">
                          <FormControl
                            placeholder="Search....."
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            onChange={(e) => {
                              setSearch(e.target.value);
                            }}
                            className=" search-explore"
                          />
                          <Button
                            variant="outline-secondary"
                            id="button-addon2"
                          >
                            <i class="fa fa-search" aria-hidden="true"></i>
                          </Button>
                        </InputGroup>
                      </div>
</Col>
                      </div>
                  </Row>
                  </Row>
             

             

           
             </Col>

                </Row>
             <div className="transactions-section">
             <Row>
           
          
           <Col>
           <div className="transaction-box pt-4">
               {/* <div className="for-image-box1">
                     <img  className="m-0 img-fluid" src="assets/images/detail-img.png" alt=""/>
                     <p className="paragraph-main1 py-2">0x800d9250b9f8f46ef8b</p>
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
                     {console.log({category})}
                     { data.map((items, index) => {
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
                               {console.log("id is this",items._id)}
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
                 {console.log("i am total nft",nft)}
                 <Pagination
                  nftPerPage={6}
                  totalNft={totalCount}
                 nft={data}
                 
                 getData={getData}
                 limit={6}
                />
              
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
              
                
                 onChange={(e) => {setCategory(e.target.value)}}
                 
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
             </div>
           </Col>
         </Row>
         
         
        </div>
            </Col>
             
            </Row>
          </Container>
        </section>
       
      </div>
    </Layout>
  );
}

export default Transactions;