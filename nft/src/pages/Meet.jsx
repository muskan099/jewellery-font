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