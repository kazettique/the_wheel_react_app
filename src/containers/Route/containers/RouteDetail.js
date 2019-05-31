import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import RoutePageHead from "../components/RoutePageHead/RoutePageHead";
import DetailPageMainCard from "../components/DetailPageMainCard/DetailPageMainCard";
import DetailPageLocation from "../components/DetailPageLocations/DetailPageLocations";
import DetailPageIntro from "../components/DetailPageIntro/DetailPageIntro";
import DetailPageComment from "../components/DetailPageComment/DetailPageComment";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchSingleAsync, handlelikeAsync } from "../actions";
import { withRouter } from "react-router-dom";
import RAlert from "../components/R_Alert/R_Alert";

class RouteDetail extends Component {
  state = {};

  componentDidMount() {
    this.props.fetchSingleAsync(this.props.match.params.id);
  }
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
    let rsid = this.props.r.data.main[0].r_sid;
    //console.log(arr);
    //console.log(rsid);
    let newlike = 0;
    arr.forEach(function(el) {
      if (el === rsid) {
        newlike = rsid;
      }
      console.log("newLike" + newlike);
    });

    if (newlike !== 0) {
      arr.splice(arr.indexOf(newlike), 1);
    } else {
      arr.push(this.rsid);
    }
    console.log(arr);
    this.props.handlelikeAsync(rsid, arr);
  };
  render() {
    if (this.props.r.data.main) {
      return (
        <>
          {this.props.a.appear ? (
            <RAlert text={"" + this.props.a.success.slice(6)} type="failure" />
          ) : (
            <div />
          )}
          <Container fluid className="p-0">
            <div style={{ height: "56px" }} />
            <Row className="d-flex justify-content-center my-3 my-xl-5 mx-0">
              <RoutePageHead
                data={this.props.r.data.main[0]}
                function="Details"
              />
            </Row>

            <DetailPageMainCard
              className="my-xl-5"
              data={this.props.r.data.main[0]}
            />
            <DetailPageIntro
              className="my-xl-5"
              data={this.props.r.data.main[0].r_intro}
            />

            <Row
              className="m-0 my-xl-5"
              style={{
                width: "100%",
                height: "400px",
                backgroundColor: "#ccc"
              }}
            />

            <DetailPageLocation
              className="my-5"
              data={this.props.r.data.location}
              place1={this.props.r.data.main[0].r_depart}
              place2={this.props.r.data.main[0].r_arrive}
            />
            <DetailPageComment
              className="mt-0 mb-5"
              data={this.props.r.data.comment}
              rsid={this.props.r.data.main[0].r_sid}
            />
          </Container>
        </>
      );
    } else {
      return <></>;
    }
  }
}

const mapStateToProps = store => ({
  r: store.routeSingleReducer,
  a: store.alertReducer,
  h: store.likeRouteReducer
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchSingleAsync, handlelikeAsync }, dispatch);

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(RouteDetail)
);
