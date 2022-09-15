import React, { useEffect, useState } from "react";
import { Container,Row,Col } from 'react-bootstrap';
import Layout from "../Components/Layout";
import axiosMain from "../http/axios/axios_main";
import moment from "moment/moment";

const Articles = () => {

    const [article, setArticle] = useState([]);


    const getData = async () => {
        const res = await axiosMain.get("/getAllArtical");
        
        if (res?.data.status) {
          setArticle(res.data.data);
          console.log(res,"article")
        }
      };
    
    
      useEffect(() => {
        getData();
      },[]);
    
  return (
    <div>
      <Layout>
        <Container>
        <div className="">
                    <h2 className="heading-main">Articles</h2>
                    <Row>
                    {article.map((item, index) => (
                      <Col lg={4} md={4}>
                        <div className="artical-news-box">
                          <img src={item.images} />
                          <div className="inner-div-new">
                            <h5>
                             {item.title}
                            </h5>
                            <p>{moment(item.created_at).format("YYYY-MM-DD")}</p>
                          </div>
                        </div>
                      </Col>
                      ))}
                      {/* <Col lg={4} md={4}>
                        <div className="artical-news-box">
                          <img src="assets\images\article-image-2.png" />
                          <div className="inner-div-new">
                            <h5>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit.
                            </h5>
                            <p>January 23, 2022</p>
                          </div>
                        </div>
                      </Col> */}
                      {/* <Col lg={4} md={4}>
                        <div className="artical-news-box">
                          <img src="assets\images\article-image-3.png" />
                          <div className="inner-div-new">
                            <h5>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit.
                            </h5>
                            <p>January 23, 2022</p>
                          </div>
                        </div>
                      </Col> */}
                    </Row>
                  </div>
        </Container>
      </Layout>
    </div>
  )
}

export default Articles
