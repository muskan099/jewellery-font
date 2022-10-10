import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosMain from "../../http/axios/axios_main";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import  login  from "../../store/reducers/authReducer";
import axios from "../../http/axios/axios_main";
import { userLoginSaga } from "../../store/reducers/authReducer";
import HomeLayout from "../../Components/Layout";

const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formError, setFormError] = useState("");
  const [inputdata, setInputdata] = useState({
    email: "",
    password: "",
  });
  const formdata = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputdata({ ...inputdata, [name]: value });
  };

  const HandleSubmit = async (e) => {
    const fullnameregexp = /^\S*$/;
    let nameregex = new RegExp("^[a-zA-Z_ ]{1,36}$");
    let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
    let passregex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );
    if (!inputdata.email) {
      setFormError("Please enter Email");
    } else if (!inputdata.password) {
      setFormError("please enter Password ");
    } 
    console.log({inputdata})
    dispatch(userLoginSaga({ inputdata, navigate }))
    navigate("/admin-dashboard")
    //else {
      
    //   setFormError("");
    //   try {
       
    //     if (!response?.data.status) {
    //       toast.error(response?.data.message);
    //     }
    //     // setTimeout(() => {
    //     //   if (response?.data.status) {
    //     //     toast.success(response?.data.message);
    //     //     navigate("/")
    //     //   }
    //     // }, 1000);
    //     else if (response?.data.status) {
    //       toast.success(response?.data.message);

    //       // dispatch(setLoginAddress(response.data.user._id));

    //       // dispatch(
    //       //   login({
    //       //     user: response.data.user._id,
    //       //     isAuthenticated: true,
    //       //   })
    //       // );
    //       console.log(response.data.user._id);
    //       navigate("/");
    //     }
    //     setInputdata({
    //       email: "",
    //       password: "",
    //     });
    //   } catch (error) {
    //     toast.error(error.response.message);
    //     console.log(error);
    //   }
    //}
  };

  return (
    <HomeLayout>
      <div>
        <section id="sign-account">
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
                  <h2>Sign In</h2>
                  <p>
                    Don't have an account <a href="/signup">Create an account</a>
                  </p>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="input-field">
                        <span>Email Address</span>
                        <input
                          onChange={formdata}
                          value={inputdata.email}
                          type="text"
                          id
                          name="email"
                          placeholder="Your Email"
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="input-field">
                        <span>Password</span>
                        <input
                          onChange={formdata}
                          value={inputdata.password}
                          type="password"
                          id
                          name="password"
                          placeholder="Password"
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <h6>
                        <a href>Forget Password ?</a>
                      </h6>
                    </div>
                    <div>
                      {" "}
                      <h4 style={{ color: "red", fontSize: "20px" }}>
                        {formError}
                      </h4>
                    </div>
                    <div className="col-md-12">
                      <div className="form-btn">
                        <a
                          href
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            HandleSubmit();
                          }}
                        >
                          Sign In
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </HomeLayout>
  );
};

export default Signin;
