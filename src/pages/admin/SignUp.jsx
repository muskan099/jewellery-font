import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axiosMain from "../../http/axios/axios_main";

import HomeLayout from "../../Components/Layout";

const Signup = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [formError, setFormError] = useState("");
  const [inputdata, setInputdata] = useState({
    firstname: "",
    lastname: "",
    email: "",
    mobile_no: "",
    password: "",
    
  });
  const [photo, setPhoto] = useState({
    loading: false,
    file: null,
    photoUrl: null,
  });
  const { file, photoUrl, loading } = photo;
  const formdata = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputdata({ ...inputdata, [name]: value });
  };
  const [contentImage, setContentImage] = useState(null);
  const photoUploadHandler = (event, setState) => {
    console.log("inside photo upload functtion")
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

  const HandleSubmit = async (e) => {
    // e.preventDefault();
    const fullnameregexp = /^\S*$/;
    let nameregex = new RegExp("^[a-zA-Z_ ]{1,36}$");
    let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
    let passregex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );
    if (!inputdata.firstname) {
      setFormError("Please enter FirstName ");
    } else if (!inputdata.lastname) {
      setFormError("please enter LastName ");
    } else if (!inputdata.email) {
      setFormError("please enter  email");
    } else if (!regex.test(inputdata.email)) {
      setFormError("Please enter Valid Email ");
    } else if (!inputdata.mobile_no) {
      setFormError("please select Your mobile_no ");
    } else if (!passregex.test(inputdata.password)) {
      setFormError(
        "password must contain 1 Uppercase , 1 Lowercase , 1 special character and 1 Number. Length must be greater than 8 digit"
      );
    } else {
      setFormError("");
      try {
        const response = await axiosMain.post("/AdminSignUp", inputdata);
        setPhoto({ ...photo, loading: true });
        toast.success(response?.data.message);
        setTimeout(() => {
          if (response?.data.status) {
            // navigate("/signin");
          }
        }, 1000);
        console.log({file})
        setInputdata({
          firstname: "",
          lastname: "",
          email: "",
          mobile_no: "",
          password: "",
          
        });
        console.log("the photo",inputdata.admin_profile)
      } catch (error) {
        toast.error(error.response.message);
        console.log(error);
      }
    }
  };
  return (
    <div>
      <HomeLayout>
        <div>
          <section id="sign-account" className="signup">
            <ToastContainer />
            <div className="container">
              <div className="row">
                <div className="col-md-7">
                  <div className="img">
                  <img src="assets/images/banner-img.png" class="img-fluid" />
                  </div>
                </div>
                <div className="col-md-5">
                  <div className="form-box">
                    <h2>Sign Up</h2>
                    <div className="row">
                    {/* <div className="input-field">
                    <span>Upload File</span>
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
                </div>
                <div class="product-list-box create-nft-box">
                {photoUrl && (
                  <img className="img-main" src={photo.photoUrl} width={200} />
                )}
                </div> */}
                      <div className="col-md-6">
                        <div className="input-field">
                          <span>First Name</span>
                          <input
                            type="text"
                            id
                            name="firstname"
                            onChange={formdata}
                            value={inputdata.firstname}
                            placeholder="First Name"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="input-field">
                          <span>Last Name</span>
                          <input
                            type="text"
                            id
                            name="lastname"
                            onChange={formdata}
                            value={inputdata.lastname}
                            placeholder="Last Name"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="input-field">
                          <span>Email ID </span>
                          <input
                            type="text"
                            id
                            name="email"
                            onChange={formdata}
                            value={inputdata.email}
                            placeholder=" Email"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="input-field">
                          <span>Mobile Number </span>
                          <input
                            type="number"
                            id
                            name="mobile_no"
                            onChange={formdata}
                            value={inputdata.mobile_no}
                            placeholder="mobile_no"
                          />
                        </div>
                      </div>
                     
                     
                      <div className="col-md-6">
                        <div className="input-field">
                          <span>Password</span>
                          <input
                            type="password"
                            id
                            name="password"
                            onChange={formdata}
                            value={inputdata.password}
                            placeholder="Password"
                          />
                        </div>
                      </div>
                     
                      <div>
                        {" "}
                        <h4 style={{ color: "red" }}>{formError}</h4>
                      </div>
                      <div className="col-md-12">
                        <div className="form-btn">
                          <a
                            href
                            onClick={() => {
                              HandleSubmit();
                            }}
                            type="button"
                          >
                            Sign Up
                          </a>
                        </div>
                      </div>
                      <p>
                        Already have an account <a href="/signin">Sign In</a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </HomeLayout>
    </div>
  );
};

export default Signup;
