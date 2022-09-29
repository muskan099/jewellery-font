import React, { useState } from "react";
import axiosMain from "../http/axios/axios_main";


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

function Joinus() {


    const [formerror, setFormError] = useState();

    const [inputdata, setInputdata] = useState({
        storeName: "",
        storeEmail: "",
        StoreImages: "",
        description: "",
        mobile_no: "",
    });

    const handleformdata = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputdata({ ...inputdata, [name]: value });
    };


    const [photo, setPhoto] = useState({
        loading: false,
        file: null,
        photoUrl: null,
    });

    const { file, photoUrl, loading } = photo;


    const photoUploadHandler = (event, setState) => {
        const { files } = event.target;

        const reader = new window.FileReader();
        reader.readAsArrayBuffer(files[0]);

        reader.onloadend = () => {
            // setContentImage(reader.result);
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
                        ...photo,
                        file: event.currentTarget.files[0],
                        photoUrl: URL.createObjectURL(files[0]),
                    });
                }
            }
        }
    };



    const HandleSubmit = async () => {

        let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");

        if (!inputdata.storeName) {
            setFormError("Please Enter Name");

        } else if (!inputdata.storeEmail) {
            setFormError("Please Enter email");

        }
        else if (!regex.test(inputdata.storeEmail)) {
            setFormError("Please Enter valid email");

        }
        else if (!inputdata.description) {
            setFormError("Please Enter description");

        }
        else if (!inputdata.mobile_no) {
            setFormError("Please Enter Mobile no ");

        } else if (inputdata.mobile_no.length < 6 || inputdata.mobile_no.length > 10) {
            setFormError("Please enter vaild Mobile no")
        }else if (typeof inputdata.mobile_no=='string') {
            setFormError("Please enter vaild Mobile no")
        }  
        
        else if (!file) {
            setFormError("Please Upload file")
        }

        else {
            setFormError("");
            // e.preventDefault();
            const formData = new FormData();
            try {
                console.log("datasub");
                console.log(inputdata.storeName, "strname");

                console.log(inputdata.mobile_no, "mobile_no");
                console.log(inputdata.storeEmail, "storeEmail");
                console.log(inputdata.description, "description");
                console.log(file, "file-str");

                //   formData.append("user_id", user.id);
                formData.append("storeName", inputdata.storeName);
                formData.append("StoreImages", file);
                formData.append("storeEmail", inputdata.storeEmail);
                formData.append("mobile_no", inputdata.mobile_no);
                formData.append("description", inputdata.description);

                let result = await axiosMain.post(
                    "https://jewellery.donative.in/createStore",
                    // "https://api.medyseva.com/api/vle/topup_request/add",

                    formData,
                    {
                        headers: {
                            "content-type": "multipart/form-data",
                        },
                    }
                );
                if (result.data.status == 1) {


                    toast.success("Your request has been submitted successfully ! Our Team will get back to you shortly");

                    setInputdata({
                        storeName: "",
                        storeEmail: "",
                        StoreImages: "",
                        description: "",
                        mobile_no: "",

                    });
                    // setTimeout(getData(), 3000);
                } else {
                    toast.error("Failed Request");
                }
                // console.log(result, 'yesss');
            } catch (error) {
                console.log(error, "ye store error");
            }
        }
    };

    return (
        <Layout>
            <section className="nft-create-page">
                <ToastContainer />
                <Container>
                    <Row>

                    <Col md="6" sm="6" style={{marginBottom:40}}>
                      <h2 className="market-head join_us">
                       
                        Join us
                      </h2>
                    </Col>


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
                                                onDragOver="drag()"
                                                onDrop="drop()"
                                                id="uploadFile"
                                            // onChange={(e) => photoUploadHandler(e, setPhoto)}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <Form.Group controlId="formFile" className="mb-3">
                                    <h3> Name</h3>
                                    <Form.Control
                                        type="text"
                                        name="storeName"
                                        // onKeyUp={(e) => handleMetaTag(e)}
                                        placeholder="Name"

                                        onChange={handleformdata}
                                        value={inputdata.storeName}
                                    />
                                </Form.Group>

                                <h3> Email</h3>
                                <Form.Group
                                    className="mb-3"
                                    controlId="exampleForm.ControlInput1"
                                >
                                    <Form.Control
                                        type="text"
                                        name="storeEmail"
                                        placeholder="Enter store email"
                                        onChange={handleformdata}
                                        value={inputdata.storeEmail}
                                    // onKeyUp={(e) => handleName(e)}
                                    />
                                </Form.Group>


                                <h3>Description</h3>
                                <Form.Group
                                    className="mb-3"
                                    controlId="exampleForm.ControlTextarea1"
                                >
                                    <Form.Control
                                        as="textarea"
                                        name="description"
                                        rows={4}
                                        onChange={handleformdata}
                                        value={inputdata.description}
                                    // onKeyUp={(e) => handleDescription(e)}
                                    />
                                </Form.Group>


                                <h3>Mobile No.</h3>
                                <Form.Group
                                    className="mb-3"
                                    controlId="exampleForm.ControlInput1"
                                >
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Mobile no."
                                        onChange={handleformdata}
                                        name="mobile_no"
                                        value={inputdata.mobile_no}
                                    // onKeyUp={(e) => handleName(e)}
                                    />
                                </Form.Group>
                                <div style={{ color: 'wheat' }}>{formerror}</div>
                                <div>
                                    <button className="gradient-btn" onClick={() => HandleSubmit()} type="button">
                                        {/* {createStart ? "Processing" : "Create Item"} */}
                                        Join us
                                    </button>
                                </div>

                                <br></br>
                            </Form>
                        </Col>
                        <Col lg={4} sm={6} xs={12}>
                            <div class="product-list-box create-nft-box">

                                <img className="img-main" src="" width={200} />

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

export default Joinus;
