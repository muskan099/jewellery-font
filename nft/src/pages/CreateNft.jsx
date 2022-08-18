import React from 'react'
import { Row, Col, Container,Tab, Tabs,Button,Form,FormGroup,Table } from "react-bootstrap";
import Layout from '../Components/Layout';

function CreateNft() {
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
                      />
                    </div>
                  </div>
                </div>


              <h3>Metadata File</h3>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Control type="file" />
              </Form.Group>
             
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <h3>Your NFT Name</h3>
                <Form.Control type="email" placeholder="Your NFT Name" />
              </Form.Group>
             
              <h3>Description</h3>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Control as="textarea" rows={4} />
              </Form.Group>
             
              <Row>
                <Col xs={4}>
                  <FormGroup>
                    <h3>Quantity</h3>
                  <Form.Control placeholder="1" />
                  </FormGroup>
                </Col>
              </Row>
              <br></br>
              <Row>
                <Col xs={4}>
                 <FormGroup>
                  <h3>Price</h3>
                  <Form.Control placeholder="Enter price for one" />
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
              <FormGroup>
                  <a  className="gradient-btn">
                    Create Item
                  </a>
              </FormGroup>
              <br></br>
            </Form>
          </Col>
          <Col lg={4} sm={6} xs={12}>
              <div class="product-list-box create-nft-box">
                <img src="assets/images/image 7.png" class="img-fluid product-img" />
                <div>
                  <h5>Azuki 3D </h5>
                  <p>AZUKI.JP</p>
                  {/* <div class="d-flex justify-content-between">
                    <h6>1.5 ETH</h6>
                    <h6>$1907</h6>
                  </div>
                  <div class="d-flex justify-content-between">
                    <p>Floor Price </p>
                    <p class="green-color"><span>+1.6%</span></p>
                  </div> */}
                </div>
              </div>
          </Col>
        </Row>
      </Container>
    </section>
    </Layout>
  )
}

export default CreateNft
