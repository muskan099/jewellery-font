import React from 'react'
import { Row, Col, Container,Tab, Tabs,Button,Form,FormGroup,Table } from "react-bootstrap";
import Layout from '../Components/Layout';
import InputGroup from 'react-bootstrap/InputGroup';
const Meet = () => {
  return (
    <div>

<Layout>
        <section className="profile-upper-banner profile-banner-meet">
          <Container >
              <Row>
                <Col>
                  <div className="" >
                         {/* <img className="img-fluid m-0"  src={"assets/images/welcome-background.png"} /> */}
                     </div>

                     <div className='baneer-text-meet'>
                        <h3>Start & Join Meeting for <br></br> Free</h3>


                        <h5>No Account Needed</h5>
                        </div>

                        <InputGroup className="mb-3 input-group-meet ">
                            <Form.Control
                              placeholder="Yours.."
                            />
                               <Button className="gradient-btn">
                               I’m In
                              </Button>
                          </InputGroup>

                          <p style={{color:'white'}}>or book a meeting URL in advance you are the only moderator</p>
                </Col>
             </Row>
          </Container>

          
         
          </section>






          <section className="creat-process-sec">
           <Container>
              <Row>
                  <Col>
                     <div className="inner-box-process">

                         <Row>
                        
                           <Col  lg={6} md={6}>
                           <div className="creat-process-box">
                            
                                {/* <img src="assets\images\sell-nft-image1.png" /> */}
                                <Container>

                                <div className="container">
  <div className="calendar">
    <div className="front">
      <div className="current-date">
        <h1>Friday 15th</h1>
        <h1>January 2016</h1>
      </div>
      <div className="current-month">
        <ul className="week-days">
          <li>MON</li>
          <li>TUE</li>
          <li>WED</li>
          <li>THU</li>
          <li>FRI</li>
          <li>SAT</li>
          <li>SUN</li>
        </ul>
        <div className="weeks">
          <div className="first">
            <span className="last-month">28</span>
            <span className="last-month">29</span>
            <span className="last-month">30</span>
            <span className="last-month">31</span>
            <span>01</span>
            <span>02</span>
            <span>03</span>
          </div>
          <div className="second">
            <span>04</span>
            <span>05</span>
            <span className="event">06</span>
            <span>07</span>
            <span>08</span>
            <span>09</span>
            <span>10</span>
          </div>
          <div className="third">
            <span>11</span>
            <span>12</span>
            <span>13</span>
            <span>14</span>
            <span className="active">15</span>
            <span>16</span>
            <span>17</span>
          </div>
          <div className="fourth">
            <span>18</span>
            <span>19</span>
            <span>20</span>
            <span>21</span>
            <span>22</span>
            <span>23</span>
            <span>24</span>
          </div>
          <div className="fifth">
            <span>25</span>
            <span>26</span>
            <span>27</span>
            <span>28</span>
            <span>29</span>
            <span>30</span>
            <span>31</span>
          </div>
        </div>
      </div>
    </div>
    <div className="back">
      <input placeholder="What's the event?" />
      <div className="info">
        <div className="date">
          <p className="info-date">
            Date: <span>Jan 15th, 2016</span>
          </p>
          <p className="info-time">
            Time: <span>6:35 PM</span>
          </p>
        </div>
        <div className="address">
          <p>
            Address: <span>129 W 81st St, New York, NY</span>
          </p>
        </div>
        <div className="observations">
          <p>
            Observations: <span>Be there 15 minutes earlier</span>
          </p>
        </div>
      </div>
      <div className="actions">
        <button className="save">
          Save <i className="ion-checkmark" />
        </button>
        <button className="dismiss">
          Dismiss <i className="ion-android-close" />
        </button>
      </div>
    </div>
  </div>
</div>
</Container>



                             </div>
                            
                           </Col>
                           <Col  lg={6} md={6}>
                           <div className="creat-process-box">
                                {/* <img src="assets\images\sell-nft-image1.png" /> */}
                                <h5 style={{textAlign:'initial'}}>Want meeting in your app?check out jitsi as a service</h5>
                                <p style={{textAlign:'initial'}}>Connect the user of your website or app.get branding & tight access controls<br></br>have notification,transparent & recordings delivered straight to your backend </p>
                             </div>
                             <div>
                                                <Button className="gradient-btn-meet">Learn More</Button>
                                            </div>
                           </Col>
                        
                         </Row>
                      </div>
                  </Col>
              </Row>
           </Container>
        </section>




          <section className="creat-process-sec">
           <Container>
              <Row>
                  <Col>
                     <div className="inner-box-process">
                     <h2 className="heading-main">Get the most out of your meeting</h2>

                         <Row>
                           <Col  lg={6} md={6}>
                             <div className="creat-process-box">
                                {/* <img src="assets\images\sell-nft-image1.png" /> */}
                                <div className="list-stake-step">
                                        <ul style={{textAlign:'initial'}}>
                                            <li>HD Audio Video</li>
                                            <li>Unlimited Free Meeting Access</li>
                                            <li>End to End Encryption</li>
                                            <li>Multiple Participants can share there screen</li>
                                        </ul>
                                    </div>
                             </div>
                           </Col>
                           <Col  lg={6} md={6}>
                             <div className="creat-process-box">
                                {/* <img src="assets\images\sell-nft-image1.png" /> */}
                                <div className="list-stake-step">
                                        <ul style={{textAlign:'initial'}}>
                                            <li>HD Audio Video</li>
                                            <li>Unlimited Free Meeting Access</li>
                                            <li>End to End Encryption</li>
                                            <li>Multiple Participants can share there screen</li>
                                        </ul>
                                        
                                    </div>
                                    <div>
                                                <Button className="gradient-btn-meet-try">Try Now</Button>
                                            </div>
                             </div>
                            
                           </Col>
                           
                        
                         </Row>
                      </div>
                  </Col>
              </Row>
           </Container>
        </section>

          
    </Layout>
    </div>
  )
}

export default Meet