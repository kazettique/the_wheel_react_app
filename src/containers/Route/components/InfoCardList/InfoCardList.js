import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InfoCard from "../InfoCard/InfoCard";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchPostsAsync, addToLikeSuccess } from "../../actions";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import "./InfoCardList_style.css";

class InfoCardList extends Component {
  state = {};

  componentDidMount() {
    if (this.props.r.postsList.posts.length === 0) {
      this.props.fetchPostsAsync(0);
    }

    let r_Collection = new FormData();
    let arr = [];
    fetch("http://localhost:5000/is_logined", {
      method: "GET",
      credentials: "include",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json"
      })
    })
      .then(res => res.json())
      .then(obj => {
        if (obj.isLogined) {
          this.setState({
            user_id: obj.user_id
          });
          console.log("yayyyy1");
          r_Collection.append("m_sid", obj.user_id);
        }
        if (!obj.user_id) {
          throw new Error("not Logged in");
        }
        return obj.user_id;
      })
      .then(r =>
        fetch("http://localhost:5000/routeCollect", {
          method: "post",
          body: r_Collection
        })
          .then(res => res.json())
          .then(obj => {
            arr = JSON.parse(obj[0]["r_collection"]);
            console.log(arr);

            this.setState({ r_collection: arr });
            this.props.addToLikeSuccess(arr);
          })
      )
      .catch(e => console.log(e));
  }

  handleLoadMore = () => {
    this.props.fetchPostsAsync(this.props.r.postsList.page + 1);
  };

  render() {
    let style = {
      backgroundColor: "#FAFAFA"
    };
    console.log(this.state);
    return (
      <Container style={style} fluid className="py-2">
        <Row className="d-flex justify-content-center py-3">
          <Col md={11} xl={9} className="d-flex justify-content-end p-0">
            <a
              href="www.google.com"
              className="m-3 r_fw_medium r_infocard_list"
            >
              最新路線
            </a>
            <a
              href="www.google.com"
              className="m-3 r_fw_medium r_infocard_list"
            >
              熱門路線
            </a>
          </Col>
        </Row>
        <Row className="d-flex justify-content-center">
          <Col md={11} xl={9}>
            {this.props.r.postsList.posts.map(items => {
              return (
                <InfoCard
                  key={items.r_sid}
                  data={items}
                  r_collection={this.state.r_collection}
                  user_id={this.state.user_id}
                />
              );
            })}
          </Col>
        </Row>
        <Row className="d-flex jusityfy-content-center m-5">
          <Col className="d-flex justify-content-center mb-4">
            <LoadMoreBtn onClick={this.handleLoadMore} />
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = store => ({ r: store.routeReducer });

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchPostsAsync, addToLikeSuccess }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InfoCardList);
