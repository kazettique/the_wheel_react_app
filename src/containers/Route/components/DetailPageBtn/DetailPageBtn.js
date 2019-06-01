import React from "react";
// FontAwesome Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faTwitter
} from "@fortawesome/free-brands-svg-icons";
import { faFistRaised, faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeartBroken } from "@fortawesome/free-solid-svg-icons/faHeartBroken";
import Col from "react-bootstrap/Col";
// Import stylesheet
import "./DetailPageBtn_style.css";

// 贊助按鈕
function BackItButton() {
  return (
    <>
      <button className="r_d_buttons succeed_btn r_fw_bold" variant="secondary">
        <FontAwesomeIcon
          style={{ marginRight: "0.7rem" }}
          icon={faFistRaised}
        />
        挑戰成功
      </button>
    </>
  );
}

// 收藏按鈕
class LikeItButton extends React.Component {
  constructor() {
    super();
    this.state = { isLiked: false };
  }

  //   handleClickOnLikeButton() {
  //     this.setState({
  //       isLiked: !this.state.isLiked
  //     });
  //   }

  handlelike = async () => {
    const response = await fetch("http://localhost:5000/is_logined", {
      method: "GET",
      credentials: "include",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json"
      })
    });
    const jsonObject = await response.json();
    if (!jsonObject.user_id) {
      alert("收藏路線前請先登入");
      return;
    }
    let arr = this.props.h.liked;
    let rsid = this.props.data.r_sid;
    let newlike = 0;
    if (arr) {
      arr.forEach(function(el) {
        if (el === rsid) {
          newlike = rsid;
        }
        console.log("newLike" + newlike);
      });

      if (newlike !== 0) {
        console.log("no");
        arr.splice(arr.indexOf(newlike), 1);
      } else {
        console.log("yes");
        arr.push(this.props.data.r_sid);
      }
    } else {
      arr = [this.props.data.r_sid];
    }

    console.log(arr);
    this.props.handlelikeAsync(this.props.user_id, arr);
  };

  render() {
    return (
      <>
        <button
          className="r_d_buttons r_like_button r_fw_bold ml-3 ml-sm-5"
          variant={this.state.isLiked ? "light" : "danger"}
          onClick={this.handlelike}
        >
          <FontAwesomeIcon
            style={{ marginRight: "0.7rem" }}
            icon={this.props.heartRed ? faHeartBroken : faHeart}
          />
          {this.props.heartRed ? "取消收藏" : "收藏路線"}
        </button>
      </>
    );
  }
}

// 社群分享按鈕
function SNSButtons() {
  return (
    <>
      <Col className="d-flex mb-1 mt-3 my-xl-3 r_SNSButtons p-0">
        <div className="ml-0">
          <a href="http://www.google.com">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
        </div>
        <div>
          <a href="https://tw.yahoo.com">
            <FontAwesomeIcon icon={faTwitter} />
          </a>
        </div>
        <div>
          <a href="https://www.facebook.com">
            <FontAwesomeIcon icon={faFacebookF} />
          </a>
        </div>
      </Col>
    </>
  );
}

export { LikeItButton, BackItButton, SNSButtons };
