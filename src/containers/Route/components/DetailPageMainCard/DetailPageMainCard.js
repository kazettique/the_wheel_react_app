import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./DetailPageMainCard_style.css";
import Card from "react-bootstrap/Card";
import {
  BackItButton,
  LikeItButton,
  SNSButtons
} from "../DetailPageBtn/DetailPageBtn";

class DetailMainCard extends Component {
  render() {
    //console.log(this.props.heartRed);
    return (
      <>
        <div
          className="mb-lg-3 d-flex r_d_maincard"
          style={{ background: "#FCFCFC" }}
        >
          <div className="r_bannerLabel" />
          <Row className="w-100 m-0 r_d_rwd_con">
            <Col className="p-0 h-100 mr-md-3 mr-lg-5 r_d_rwd_con3">
              <div
                className="mr-lg-5 r_d_mainimg_con w-100 h-100"
                style={{
                  backgroundImage: "url(https://loremflickr.com/320/240)"
                }}
              />
            </Col>

            <Col md={7} className="r_d_rwd_con2">
              <Card.Body className="h-100 p-3 p-md-4 p-xl-5 mr-xl-5 d-flex flex-column">
                <Row className="flex-column">
                  <Col className="r_d_Title">{this.props.data.r_name}</Col>
                  <Col className="r_d_Title2 mb-4">
                    <span>{this.props.data.r_country}</span>
                    <span className="ml-4">{this.props.data.r_area}</span>
                  </Col>
                </Row>
                <div className="r_d_rwd_con4">
                  <Row>
                    <Col>
                      <p className="m-0">
                        經過{this.props.data.r_l_num}
                        個地點
                      </p>
                      <p className="m-0">預計{this.props.data.r_time}</p>
                    </Col>
                  </Row>
                  <Row className="mx-0 my-2 mb-xl-3">
                    <div className="r_fw_bold">
                      <p className="m-0">出發地</p>
                      <p className="m-0">目的地</p>
                    </div>
                    <Col className="ml-3">
                      <p className="m-0">{this.props.data.r_depart}</p>
                      <p className="m-0">{this.props.data.r_arrive}</p>
                    </Col>
                  </Row>
                </div>

                <Row>
                  <Col sm={6}>
                    <SNSButtons />
                  </Col>
                </Row>

                <Row className="my-2 mb-xl-3">
                  <Col>
                    <BackItButton />
                    <LikeItButton heartRed={this.props.heartRed} />
                  </Col>
                </Row>
              </Card.Body>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default DetailMainCard;
