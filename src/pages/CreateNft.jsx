import React, { useState } from "react";
import {
  Row,
  Col,
  Container,
  Tab,
  Tabs,
  Button,
  Form,
  FormGroup,
  Table,
} from "react-bootstrap";
import Layout from "../Components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createNftSaga } from "../store/reducers/nftReducer";
import { Mint } from "../helpers/Mint";
import { ToastContainer, toast } from "react-toastify";
import { ipfsMint } from "../helpers/ipfs";

function CreateNft() {
  const dispatch = useDispatch();

  /* const {
       nft,
      } = useSelector((state) => state.nft); */

  const navigate = useNavigate();
  const JwlPrice = 10;
  const { nft, isLoading } = useSelector((state) => state.nft);

  const { isAuthenticated, balance, walletAddress } = useSelector(
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
  const [field, setField] = useState("");
  //const[walletAddress,setWalletAddress] = useState('')
  const [isSale, setIsSale] = useState("");
  const [width, setWidth] = useState();
  const [height, setHeight] = useState();
  const [purity, setPurity] = useState();
  const [grossWeight, setGrossWeight] = useState();
  const [size, setSize] = useState();
  const [daimondType, setDaimondType] = useState();
  const [settingType, setSettingType] = useState();
  const [totalNumber, setTotalNumber] = useState();
  const [totalWeight, setTotalWeight] = useState();

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
        if (
          fileExtension.toLowerCase() === "png" ||
          fileExtension.toLowerCase() === "jpg" ||
          fileExtension.toLowerCase() === "gif" ||
          fileExtension.toLowerCase() === "jpeg" ||
          fileExtension.toLowerCase() === "webp"
        ) {
          setState({
            file: event.currentTarget.files[0],
            photoUrl: URL.createObjectURL(files[0]),
          });
        }
      }else{
        toast.warn("Photo format can only be PNG,JPG,GIF,WEBP or MP4, Max 20mb")
      }
    }
  };

  const handleName = (e) => {
    let value = e.target.value;
    if (value) {
      setName(value);
    }
  };

  const handleMetaTag = (e) => {
    let value = e.target.value;
    if (value) {
      setMetaTag(value);
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
    let JWLValue = value*JwlPrice;
    if (isNaN(value)) {
      e.target.value = "";
    } else {
      setPrice(JWLValue);
    }
  };

  const handleQuantity = (e) => {
    let value = e.target.value;
    if (isNaN(value)) {
      setQuantity("");
    } else {
      if (value) {
        setQuantity(value);
      }
    }
  };

  const handleCategory = (e) => {
    let value = e.target.value;
    if (value) {
      setCategory(value);
    }
  };

  const handleWidth = (e) => {
    let value = e.target.value;
    if (value) {
      setWidth(value);
    }
  };

  const handleHeight = (e) => {
    let value = e.target.value;
    if (value) {
      setHeight(value);
    }
  };

  const handlePurity = (e) => {
    let value = e.target.value;
    if (value) {
      setPurity(value);
    }
  };

  const handleGrossWeight = (e) => {
    let value = e.target.value;
    if (value) {
      setGrossWeight(value);
    }
  };

  const handleSize = (e) => {
    let value = e.target.value;
    if (value) {
      setSize(value);
    }
  };

  const handleDaimondType = (e) => {
    let value = e.target.value;
    if (value) {
      setDaimondType(value);
    }
  };

  const handleSettingType = (e) => {
    let value = e.target.value;
    if (value) {
      setSettingType(value);
    }
  };

  const handleTotalNumber = (e) => {
    let value = e.target.value;
    if (value) {
      setTotalNumber(value);
    }
  };

  const handleTotalWeight = (e) => {
    let value = e.target.value;
    if (value) {
      setTotalWeight(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const pattern = /^[A-Za-z]+$/;
    const space = /^[a-zA-Z\s]*$/;
    const alphaNumeric = /[^a-zA-Z0-9\-\/]^[a-zA-Z\s]*$/;
    if(chain === ""){
      toast.error("Please select chain")
    }else if (file == null || file === "") {
      toast.error("Please select NFT Image!");
    }  else if (metaTag === "") {
      toast.error("Meta tag is required!");
    } else if (alphaNumeric.test(metaTag)) {
      toast.error("Meta tag is can only be alphabet and numbers");
    } else if (name === "") {
      toast.error("Name is required!");
    } else if (!pattern.test(name) && pattern.test(space)) {
      toast.error("Name can only be alphabets");
    } else if (description == "") {
      toast.error("Description is required!");
    } else if (!pattern.test(description) && pattern.test(space)) {
      toast.error("Description can only be alphabets!");
    } else if (price == "") {
      toast.error("Price is required!");
    } else if (isNaN(price)) {
      toast.error("Please enter correct price!");
    } else if (quantity == "") {
      toast.error("Quantity is required!");
    } else if (isNaN(quantity)) {
      toast.error("Please enter correct quantity!");
    } else if (category == "") {
      toast.error("category is required!");
    } else if (width == "") {
      toast.error("width is required!");
    }else if (height == "") {
      toast.error("height is required!");
    }else if (purity == "") {
      toast.error("purity is required!");
    }else if (grossWeight == "") {
      toast.error("grossWeight is required!");
    }else if (size == "") {
      toast.error("size is required!");
    }else if (daimondType == "") {
      toast.error("daimondType is required!");
    }else if (settingType == "") {
      toast.error("settingType is required!");
    }else if (totalNumber == "") {
      toast.error("TotalNumber is required!");
    }else if (totalWeight == "") {
      toast.error("TotalWeight is required!");
    }
    else {
     try 
      {
      setCreateStart(true);
      setPhoto({ ...photo, loading: true });
      const data = { name: name, price: price, description: description };
      let ipfs_hash = await ipfsMint(contentImage, data);
      let voucher = await Mint(ipfs_hash, price);
      
      if(voucher){
        const formData = new FormData();
        formData.append("images", file);
        formData.append("name", name);
        formData.append("wallet_address", walletAddress);
        formData.append("description", description);
        formData.append("meta_tag", metaTag);
        formData.append("price", price);
        formData.append("width", width);
        formData.append("height", height);
        formData.append("purity", purity);
        formData.append("grossWeight", grossWeight);
        formData.append("size", size);
        formData.append("daimondType", daimondType);
        formData.append("settingType", settingType);
        formData.append("totalNumber", totalNumber);
        formData.append("totalWeight", totalWeight);
        formData.append("field", field);
        formData.append("isSale", isSale);
        formData.append("category",category)
        formData.append("ipfs", ipfs_hash);
        formData.append("signature", voucher.signature);
        formData.append("token_id", voucher.tokenId);
        formData.append("user_id", "62733f0715eb380c440489ee");
        dispatch(createNftSaga({ formData, toast , navigate}));
        toast.success("Nft Created Succesfully");
        setCreateStart(false);
        // setTimeout(navigate("/marketplace"));
      }else{
        setCreateStart(false);
        toast.warn("NFT creation Failed")
      }

      }catch(e){
        setCreateStart(false);
        console.log(e);
        toast.warn("NFT creation Failed")
      }
    }
    // setTimeout(navigate("/explore"), 120000);
  };

  return (
    <Layout>
      <section className="nft-create-page">
      <ToastContainer />
        <Container>
          <Row>
            <Col lg={8}>
              <Form>
                <ul className="select-transaction-list">
                  <li>
                    <div className="radio">
                      <label>
                        <input
                          type="radio"
                          name="mint_type"
                          value="lazy"
                          checked
                        />
                        <span className="cr">
                          <i className="cr-icon fa fa-check"></i>
                        </span>
                        <div className="bsc-block">
                          <span>Lazy Minting</span>
                        </div>
                      </label>
                    </div>
                  </li>
                  <li className="d-none">
                    <div className="radio">
                      <label>
                        <input type="radio" name="mint_type" value="normal" />
                        <span className="cr">
                          <i className="cr-icon fa fa-check"></i>
                        </span>
                        <div className="bsc-block">
                          <span>Normal Minting</span>
                        </div>
                      </label>
                    </div>
                  </li>
                </ul>
                <ul className="select-transaction-list">
                  <li>
                    <div className="radio">
                      <label>
                        <input type="radio" onClick={(e) => handleChain(e)} />
                        <span className="cr">
                          <i className="cr-icon fa fa-check"></i>
                        </span>
                        <div className="bsc-block">
                          <img src="assets/images/img-nft/bsc.png" />
                          <span>BSC</span>
                        </div>
                      </label>
                    </div>
                  </li>
                </ul>

                <h3>Upload file</h3>
                <div className="upload-img-box">
                  <div>
                    <div>PNG,JPG,GIF,WEBP or MP4, Max 20mb</div>
                    <div className="upload-btn-wrapper">
                      <button className="gradient-btn">Upload</button>
                      <input
                        type="file"
                        name="file"
                        onChange={(e) => photoUploadHandler(e, setPhoto)}
                      />
                    </div>
                  </div>
                </div>

                <Form.Group controlId="formFile" className="mb-3">
                  <h3>Meta Tag</h3>
                  <Form.Control
                    type="text"
                    onKeyUp={(e) => handleMetaTag(e)}
                    placeholder="Meta Tag"
                  />
                </Form.Group>
                <h3>Your NFT Name</h3>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Control
                    type="email"
                    placeholder="Your NFT Name"
                    onKeyUp={(e) => handleName(e)}
                  />
                </Form.Group>

                <h3>Description</h3>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Control
                    as="textarea"
                    rows={4}
                    onKeyUp={(e) => handleDescription(e)}
                  />
                </Form.Group>

                <Row>
                  <Col md={4}>
                    <FormGroup>
                      <h3>Quantity</h3>
                      <Form.Control
                        type="number"
                        value={quantity}
                        placeholder=""
                        onKeyUp={(e) => handleQuantity(e)}
                        readOnly
                      />
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <h3>Price in Dollars</h3>
                      <Form.Control
                        type="number"
                        placeholder="Enter price in dollar"
                        onKeyUp={(e) => handlePrice(e)}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <h3>Category</h3>
                      <Form.Select aria-label="Default select example"   onChange={(e) => handleCategory(e)}>
                        <option>Select Category</option>
                        <option value="Ring">Ring</option>
                        <option value="Necklaces">Necklaces</option>
                        <option value="Earings">Earings</option>
                        <option value="Chain">Chain</option>
                        <option value="Bangle">Bangle</option>
                      </Form.Select>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={4}>
                    <FormGroup>
                      <h3>Width</h3>
                      <Form.Control
                       
                        type="number"
                       
                        placeholder="Enter Width"
                        onKeyUp={(e) => handleWidth(e)}
                        
                      />
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <h3>Height</h3>
                      <Form.Control
                        type="number"
                       
                        placeholder="Enter Height"
                        onKeyUp={(e) => handleHeight(e)}
                        
                      />
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                  <FormGroup>
                      <h3>Purity</h3>
                      <Form.Control
                        type="number"
                        
                        placeholder="Enter Purity"
                        onKeyUp={(e) => handlePurity(e)}
                        
                      />
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                  <FormGroup>
                      <h3>Gross Weight</h3>
                      <Form.Control
                        type="number"
                        
                        placeholder="Enter GrossWeight"
                        onKeyUp={(e) => handleGrossWeight(e)}
                        
                      />
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                  <FormGroup>
                      <h3>Size</h3>
                      <Form.Control
                        type="number"
                       
                        placeholder="Enter Size"
                        onKeyUp={(e) => handleSize(e)}
                        
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={4}>
                    <FormGroup>
                      <h3>Daimond Type</h3>
                      <Form.Control
                        type="text"
                       
                        placeholder="Enter Daimond Type"
                        onKeyUp={(e) => handleDaimondType(e)}
                        
                      />
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <h3>Setting Type</h3>
                      <Form.Control
                        type="text"
                        
                        placeholder="Setting Type"
                        onKeyUp={(e) => handleSettingType(e)}
                        
                      />
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                  <FormGroup>
                      <h3>Total Number</h3>
                      <Form.Control
                        type="number"
                       
                        placeholder="Enter Total Number"
                        onKeyUp={(e) => handleTotalNumber(e)}
                        
                      />
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                  <FormGroup>
                      <h3>Total Weight</h3>
                      <Form.Control
                        type="number"
                      placeholder="Enter TotalWeight"
                        onKeyUp={(e) => handleTotalWeight(e)}
                        
                      />
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                  
                  </Col>
                </Row>
                <div>
                  <button className="gradient-btn" onClick={handleSubmit}>
                    {createStart ? "Processing" : "Create Item"}
                  </button>
                </div>

                <br></br>
              </Form>
            </Col>
            <Col lg={4} sm={6} xs={12}>
              <div className="product-list-box create-nft-box">
                {photoUrl && (
                  <img className="img-main" src={photo.photoUrl} width={200} />
                )}
                <div>
                
                 
                  
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    
    </Layout>
  );
}

export default CreateNft;
