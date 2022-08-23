import React, {useState} from 'react'
import { Row, Col, Container,Tab, Tabs,Button,Form,FormGroup,Table } from "react-bootstrap";
import Layout from '../Components/Layout';
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createNftSaga } from "../store/reducers/nftReducer";
import { ipfsMint } from "../helpers/ipfs";
import { Mint } from "../helpers/Mint";
import { ToastContainer, toast } from 'react-toastify';

function CreateNft() {
  const dispatch = useDispatch();

  /* const {
       nft,
      } = useSelector((state) => state.nft); */

  const navigate = useNavigate();

  const { nft, isLoading } = useSelector((state) => state.nft);

  const { isAuthenticated,  balance, tier } = useSelector(
    (state) => state.auth
  );

  const [name, setName] = useState("");

  const [metaTag, setMetaTag] = useState("");

  const [price, setPrice] = useState("");

  const [quantity, setQuantity] = useState(1);

  const [category, setCategory] = useState("");

  const [description, SetDescription] = useState("");

  const [createStart, setCreateStart] = useState(false);

  const [chain, setChain] = useState("");

  const [availableTo, setAvailableTo] = useState({
    t1: false,
    t2: false,
    t3: false,
  });
  const [photo, setPhoto] = useState({
    loading: false,
    file: null,
    photoUrl: null,
  });

  const [contentImage, setContentImage] = useState(null);

  const { file, photoUrl, loading } = photo;
  const[field, setField] = useState('')
  const[walletAddress,setWalletAddress] = useState('')
  const[isSale,setIsSale] = useState('')

  const photoUploadHandler = (event, setState) => {
    const { files } = event.target;

    const reader = new window.FileReader();
    reader.readAsArrayBuffer(files[0]);

    reader.onloadend = () => {
      setContentImage(reader.result);
    };

    if (files[0]) {
      if (files[0].type.includes("image")) {
        const filename = files[0].name;
        const fileExtension = filename.substr(filename.lastIndexOf(".") + 1);
        setState({
            file: event.currentTarget.files[0],
            photoUrl: URL.createObjectURL(files[0]),
          });
        if (
          fileExtension.toLowerCase() === "png" ||
          fileExtension.toLowerCase() === "jpg" ||
          fileExtension.toLowerCase() === "gif" ||
          fileExtension.toLowerCase() === "jpeg" ||
          fileExtension.toLowerCase() === "webp"
        ) {
          // setState({
          //   file: event.currentTarget.files[0],
          //   photoUrl: URL.createObjectURL(files[0]),
          // });
        }
      }
    }
  };

 
  
  const handleName = (e) => {
    let value = e.target.value;

    if (value) {
      setName(value);
    }
  };
  const handleChain = (e) => {
    let value = e.target.value;

    if (value) {
      setChain(value);
    }
  };
 
  const handleDescription = (e) => {
    let value = e.target.value;

    if (value) {
      SetDescription(value);
    }
  };

  const handlePrice = (e) => {
    let value = e.target.value;

    if (isNaN(value)) {
      e.target.value = "";
    } else {
      setPrice(value);
    }
  };
  const handleWalletAddress = (e) => {
    let value = e.target.value;

    if (value) {
      setWalletAddress(value);
    }
  };
  
  const handleQuantity = (e) => {
    let value = e.target.value;

    if (isNaN(value)) {
      //alert("hell")
      setQuantity("");
    } else {
      if (value) {
        setQuantity(value);
      }
    }
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handle submit called")
  setCreateStart(true);
setPhoto({ ...photo, loading: true });
const formData = new FormData();
      console.log("file", file);
      formData.append("images", file.name);
      formData.append("name", name);
      formData.append("wallet_address",walletAddress);
   formData.append("description", description);
   formData.append("meta_tag", metaTag);
      formData.append("price", price);
      formData.append("field", field);
      formData.append("isSale", isSale);
      // formData.append("quantity", quantity);
      
      
console.log({formData})
      dispatch(createNftSaga({formData,toast}));
      console.log("nFT CREATED")
      
        // toast.success("Nft Created Succesfully");
      

      setCreateStart(false);

      // setTimeout(navigate("/explore"), 120000);
    
  };

  return (
    <Layout>
      <section className="nft-create-page">
      <Container>
        <Row>
          <Col lg={8}>
            <Form>
                  <ul class="select-transaction-list">
                        <li>
                           <div class="radio">
                            <label>
                              <input
                                type="radio"
                                name="mint_type"
                                value="lazy"
                                checked
                              />
                              <span class="cr">
                                <i class="cr-icon fa fa-check"></i>
                              </span>
                              <div class="bsc-block">
                                <span>Lazy Minting</span>
                              </div>
                            </label>
                          </div> 
                        </li>
                       <li className="d-none">
                          <div class="radio">
                            <label>
                              <input
                                type="radio"
                                name="mint_type"
                                value="normal"
                              />
                              <span class="cr">
                                <i class="cr-icon fa fa-check"></i>
                              </span>
                              <div class="bsc-block">
                                <span>Normal Minting</span>
                              </div>
                            </label>
                          </div>
                        </li> 
                      </ul>
                      <ul class="select-transaction-list">
                        <li>
                          <div class="radio">
                            <label>
                              <input
                                type="radio"
                                onClick={(e) => handleChain(e)}
                              />
                              <span class="cr">
                                <i class="cr-icon fa fa-check"></i>
                              </span>
                              <div class="bsc-block">
                                <img src="assets/images/img-nft/bsc.png" />
                                <span>BSC</span>
                              </div>
                            </label>
                          </div>
                        </li>
                        <li>
                          <div class="radio">
                            <label>
                              <input
                                type="radio"
                                onClick={(e) => handleChain(e)}
                              />
                              <span class="cr">
                                <i class="cr-icon fa fa-check"></i>
                              </span>
                              <div class="bsc-block">
                                <img src="assets/images/img-nft/polygon.png" />
                                <span>BSC</span>
                              </div>
                            </label>
                          </div>
                        </li>
                        <li>
                          <div class="radio">
                            <label>
                              <input
                                type="radio"
                                onClick={(e) => handleChain(e)}
                              />
                              <span class="cr">
                                <i class="cr-icon fa fa-check"></i>
                              </span>
                              <div class="bsc-block">
                                <img src="assets/images/img-nft/ETH.png" />
                                <span>BSC</span>
                              </div>
                            </label>
                          </div>
                        </li>
                      </ul>
             

              <h3>Upload file</h3>
                <div class="upload-img-box">
                  <div>
                    <div>PNG,JPG,GIF,WEBP or MP4, Max 20mb</div>
                    <div class="upload-btn-wrapper">
                      <button class="gradient-btn">Upload</button>
                      <input
                        type="file"
                        name="file"
                        onChange={(e) => photoUploadHandler(e, setPhoto)}
                      />
                    </div>
                  </div>
                </div>


            
              <Form.Group controlId="formFile" className="mb-3">
              <h3>Metadata File</h3>
              <Form.Control
                          type="text"
                          // onKeyUp={(e) => handleMetaTag(e)}
                          placeholder="Meta Tag"
                        />
              </Form.Group> 
               <h3>Your NFT Name</h3>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
             
                <Form.Control type="email" placeholder="Your NFT Name" 
                           onKeyUp={(e) => handleName(e)}    />
              </Form.Group>
              <h3>Wallet Address</h3>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
             
                <Form.Control type="email" placeholder="Your Wallet Address" 
                           onKeyUp={(e) => handleWalletAddress(e)}    />
              </Form.Group>
           
              <h3>Description</h3>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
                
              >
                <Form.Control as="textarea" rows={4} onKeyUp={(e) => handleDescription(e)}/>
              </Form.Group>
             
              <Row>
                <Col xs={4}>
                  <FormGroup>
                    <h3>Quantity</h3>
                    <Form.Control
                              type="text"
                              value={quantity}
                              placeholder=""
                              onKeyUp={(e) => handleQuantity(e)}
                              readOnly
                            />
                         
                  </FormGroup>
                </Col>
              </Row>
              <br></br>
              <Row>
                <Col xs={4}>
                 <FormGroup>
                  <h3>Price</h3>
                  <Form.Control
                              type="text"
                              placeholder=""
                              onKeyUp={(e) => handlePrice(e)}
                            />
                  </FormGroup>
                </Col>
                <Col xs={4}>
                <FormGroup>
                  <h3>Royalities</h3>
                  <Form.Control placeholder="Enter price for one" />
                  </FormGroup> 
                </Col>
              </Row>
              <br></br>
             
              <h3>Attributes</h3>
              <Row>
                <Col md={3}>
                   <FormGroup>
                  <Form.Label>Category</Form.Label>
                  <Form.Control placeholder="" />
                  </FormGroup>
                </Col>
                <Col md={3}>
                 <FormGroup>
                  <Form.Label>Trait</Form.Label>
                  <Form.Control placeholder="" />
                  </FormGroup> 
                </Col>
                <Col md={3}>
                 <FormGroup>
                  <Form.Label>Percentage</Form.Label>
                  <Form.Control placeholder="" />
                  </FormGroup>
                </Col>
                <Col md={3}>
                  <FormGroup>
                  <br></br>
                 
              <a  className="gradient-btn add-attribute-btn" variant="primary" type="submit">
                    Add Attributes
                  </a>
                  </FormGroup>
                </Col>
              </Row>
              <br></br>
              <Row>
                <Col md={12} className="pb-5">
                  <Table striped bordered >
                    <thead>
                      <tr>
                        <th>Category</th>
                        <th>Trait</th>
                        <th>%</th>
                        <th>Option</th>
                      </tr>
                    </thead>
                    <tbody>
                       <tr>
                          <td>xyz</td>
                          <td>xyz</td>
                          <td>xyz</td>
                          <td>xyz</td>
                       </tr>
                    </tbody>
                  </Table>
                </Col>
              </Row>
              <br></br>
              <div>
                        <button
                         className="gradient-btn"
                         onClick={handleSubmit}
                        >
                          {createStart ? "Processing" : "Create Item"}
                        </button>
                      </div>
             
              <br></br>
            </Form>
          </Col>
          <Col lg={4} sm={6} xs={12}>
              <div class="product-list-box create-nft-box">
              {photoUrl && (
                          <img
                            className="img-main"
                            src={photo.photoUrl}
                            width={200}
                          />
                        )}
                <div>
                  <h5>Azuki 3D </h5>
                  <p>AZUKI.JP</p>
                 * <div class="d-flex justify-content-between">
                    <h6>1.5 ETH</h6>
                    <h6>$1907</h6>
                  </div>
                  <div class="d-flex justify-content-between">
                    <p>Floor Price </p>
                    <p class="green-color"><span>+1.6%</span></p>
                  </div> 
                </div>
              </div>
          </Col>
        </Row>
      </Container>
    </section>
    <ToastContainer />
    </Layout>

  )
}

export default CreateNft
