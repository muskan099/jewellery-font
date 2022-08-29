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

  const { nft, isLoading } = useSelector((state) => state.nft);

  const { isAuthenticated, balance, tier, walletAddress } = useSelector(
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

    if (isNaN(value)) {
      e.target.value = "";
    } else {
      setPrice(value);
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
  const handleCategory = (e) => {
    let value = e.target.value;

    if (value) {
      setCategory(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handle submit called");
    const pattern = /^[A-Za-z]+$/;
    const space = /^[a-zA-Z\s]*$/;
    const alphaNumeric = /[^a-zA-Z0-9\-\/]^[a-zA-Z\s]*$/;
    if (file == null || file === "") {
      toast.error("Please select NFT Image!");
    } else if (metaTag === "") {
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
    } else {
      setCreateStart(true);
      setPhoto({ ...photo, loading: true });
      const data = { name: name, price: price, description: description };
      let ipfs_hash = await ipfsMint(contentImage, data);

      console.log("ipfs hash", ipfs_hash);

      let voucher = await Mint(ipfs_hash, price);

      console.log("voucher", voucher.address);

      const formData = new FormData();
      console.log("file", file);
      formData.append("images", file);
      formData.append("name", name);
      formData.append("wallet_address", walletAddress);
      formData.append("description", description);
      formData.append("meta_tag", metaTag);
      formData.append("price", price);
      formData.append("field", field);
      formData.append("isSale", isSale);
      formData.append("category",category)
      formData.append("ipfs", ipfs_hash);
      formData.append("signature", voucher.voucher.signature);
      formData.append("token_id", voucher.voucher.tokenId);

      formData.append("user_id", "62733f0715eb380c440489ee");

      // formData.append("quantity", quantity);

      console.log({ formData });
      dispatch(createNftSaga({ formData, toast }));
      // toast.success("NFT created");
      // console.log("nFT CREATED");
      // navigate("/marketplace");
      // toast.success("Nft Created Succesfully");

      setCreateStart(false);
    }
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
                        <input type="radio" name="mint_type" value="normal" />
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
                        <input type="radio" onClick={(e) => handleChain(e)} />
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
                        type="text"
                        value={quantity}
                        placeholder=""
                        onKeyUp={(e) => handleQuantity(e)}
                        readOnly
                      />
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <h3>Price</h3>
                      <Form.Control
                        type="text"
                        placeholder=""
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
                      </Form.Select>
                    </FormGroup>
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
              <div class="product-list-box create-nft-box">
                {photoUrl && (
                  <img className="img-main" src={photo.photoUrl} width={200} />
                )}
                <div>
                  <h5>Azuki 3D </h5>
                  <p>AZUKI.JP</p>*{" "}
                  <div class="d-flex justify-content-between">
                    <h6>1.5 ETH</h6>
                    <h6>$1907</h6>
                  </div>
                  <div class="d-flex justify-content-between">
                    <p>Floor Price </p>
                    <p class="green-color">
                      <span>+1.6%</span>
                    </p>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <ToastContainer />
    </Layout>
  );
}

export default CreateNft;
