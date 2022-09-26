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

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import HomeLayout from "../../Components/Layout";
import { Mint } from "../../helpers/Mint";
import { ToastContainer, toast } from "react-toastify";
import { ipfsMint } from "../../helpers/ipfs";
import axios from "axios";
import { useLocation, useNavigate } from "react-router";

function CreateNft() {
  const dispatch = useDispatch();
  const { state } = useLocation("/signup");
  const { id } = state || "";
  
  console.log({id})
  /* const {
       nft,
      } = useSelector((state) => state.nft); */

  const navigate = useNavigate();


  const {  walletAddress,user } = useSelector(
    (state) => state.auth
  );
console.log(user)
console.log(user._id)
  const [name, setName] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
 const [photo, setPhoto] = useState({
    loading: false,
    file: null,
    photoUrl: null,
  });

  const [contentImage, setContentImage] = useState(null);
  const [createStart, setCreateStart] = useState(false);
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

  const handleLastName = (e) => {
    let value = e.target.value;

    if (value) {
      setLastName(value);
    }
  };

  const handleFirstName = (e) => {
    let value = e.target.value;

    if (value) {
      setFirstName(value);
    }
  };
  const handleMobileNumber = (e) => {
    let value = e.target.value;

    if (value) {
      setMobileNumber(value);
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
    } else if (firstName === "") {
      toast.error("Name is required!");
    } else if (!pattern.test(firstName) && pattern.test(space)) {
      toast.error("firstName can only be alphabets");
    } else if (lastName === "") {
        toast.error("Name is required!");
      } else if (!pattern.test(lastName) && pattern.test(space)) {
        toast.error("lastName can only be alphabets");
      } else {
      setCreateStart(true);
      setPhoto({ ...photo, loading: true });
      

      const formData = new FormData();
      console.log("file", file);
      formData.append("admin_profile", file);
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
     formData.append("mobile_no",mobileNumber)
formData.append("id", user._id);

      console.log({ formData });

     const response = await axios.post('https://jewellery.donative.in/AdminProfileUpdate',formData)
     console.log("",response.data.data)
     try {
     if (response) {
      window.localStorage.setItem("adminData", JSON.stringify(response.data.data));
     
     }
  } catch (error) {
   console.log("error");
  }
      // toast.success("NFT created");
      // console.log("nFT CREATED");
    //   navigate("/admin-dashboard");
      toast.success("Nft Updated Succesfully");

      setCreateStart(false);
    }
    // setTimeout(navigate("/explore"), 120000);
  };

  return (
    <HomeLayout>
    
      <section className="nft-create-page">
        <Container>
          <Row>
            <Col lg={8}>
              <Form>
             
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
                  <h3>First Name</h3>
                  <Form.Control
                    type="text"
                    onKeyUp={(e) => handleFirstName(e)}
                    placeholder="First Name"
                  />
                </Form.Group>
                <h3>last Name</h3>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Control
                    type="email"
                    placeholder="last Name"
                    onKeyUp={(e) => handleLastName(e)}
                  />
                </Form.Group>

                <h3>MobileNumber</h3>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Control
                    as="textarea"
                    rows={4}
                    onKeyUp={(e) => handleMobileNumber(e)}
                  />
                </Form.Group>

               
              
                <div className="request-btn">
                  <button className="gradient-btn" onClick={handleSubmit}>
                    {createStart ? "Processing" : "Update Item"}
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
    </HomeLayout>
   
  );
}

export default CreateNft;
