import {
  Row,
  Col,
  Container,
  Accordion,
  Dropdown,
  Form,
  FormControl,
  Button,
  InputGroup,
  Tab,
  Tabs,
} from "react-bootstrap";
import Layout from "../Components/Layout";
const Aboutus = () => {
  return (
    <>
      <Layout>
        <section className="profile-upper-banner">
          <Container fluid className="p-5">
            <Row>
              <Col>
                <div className="profile-banner p-10">
                  {/* <img className="img-fluid m-0"  src={"images/Team/team6.png"} /> */}

                  <h1 className="about-heading">About Us</h1>
                </div>
              </Col>
            </Row>
          </Container>
          <Container>
            <Row className="align-items-top">
              <Col xl={9} lg={9} md={9} sm={12} xs={12} className="m-auto">
                <p className="align-item-left text-color-white">
                  loremipsum typesetting, remaining essentially unchanged. It
                  was popularised in the 1960s with the release of Letraset
                  sheets containing Lorem Ipsum passages, and more recently with
                  desktop publishing software like Aldus PageMaker including
                  versions of Lorem Ipsum.
                </p>

                <p className="align-item-left text-color-white">
                  Why do we use it? It is a long established fact that a reader
                  will be distracted by the readable content of a page when
                  looking at its layout. The point of using Lorem Ipsum is that
                  it has a more-or-less normal distribution of letters, as
                  opposed to using 'Content here, content here', making it look
                  like readable English. Many desktop publishing packages and
                  web page editors now use Lorem Ipsum as their default model
                  text, and a search for 'lorem ipsum' will uncover many web
                  sites still in their infancy. Various versions have evolved
                  over the years, sometimes by accident, sometimes on purpose
                  (injected humour and the like).
                </p>

                <p className="align-item-left text-color-white">
                  Contrary to popular belief, Lorem Ipsum is not simply random
                  text. It has roots in a piece of classical Latin literature
                  from 45 BC, making it over 2000 years old. Richard McClintock,
                  a Latin professor at Hampden-Sydney College in Virginia,
                  looked up one of the more obscure Latin words, consectetur,
                  from a Lorem Ipsum passage, and going through the cites of the
                  word in classical literature, discovered the undoubtable
                  source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of
                </p>

                <p className="align-item-left text-color-white">
                  "de Finibus Bonorum et Malorum" (The Extremes of Good and
                  Evil) by Cicero, written in 45 BC. This book is a treatise on
                  the theory of ethics, very popular during the Renaissance. The
                  first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..",
                  comes from a line in section 1.10.32. The standard chunk of
                  Lorem Ipsum used since the 1500s is reproduced below for those
                  interested. Sections 1.10.32 and 1.10.33 from "de Finibus
                  Bonorum et Malorum" by Cicero are also reproduced in their
                  exact original form, accompanied by English versions from the
                  1914 translation by H. Rackham.
                </p>

                <p className="align-item-left text-color-white">
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                  The point of using Lorem Ipsum is that it has a more-or-less
                  normal distribution of letters,
                </p>

                <p className="align-item-left text-color-white">
                  as opposed to using 'Content here, content here', making it
                  look like readable English. Many desktop publishing packages
                  and web page editors now use Lorem Ipsum as their default
                  model text, and a search for 'lorem ipsum' will uncover many
                  web sites still in their infancy. Various versions have
                  evolved over the years, sometimes by accident, sometimes on
                  purpose (injected humour and the like).
                </p>

                <p className="align-item-left text-color-white">
                  scrambled it to make a type specimen book. It has survived not
                  only five centuries, but also the leap into electronic
                  typesetting, remaining essentially unchanged. It was
                  popularised in the 1960s with the release of Letraset sheets
                  containing Lorem Ipsum passages, and more
                </p>
              </Col>
            </Row>
          </Container>
        </section>
      </Layout>
    </>
  );
};

export default Aboutus;
