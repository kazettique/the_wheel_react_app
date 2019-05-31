import React from "react";
// import { data } from '../data/data';
import { Link, Redirect, withRouter } from "react-router-dom";
import {
  Button,
  Container,
  Modal,
  InputGroup,
  FormControl,
  Row,
  Col
} from "react-bootstrap";
// import PathNow from '../component/PathNow';
import Sidebar from "../component/Sidebar";
import "./product.scss";
import DetailNav from "../component/DetailNav";
import checkUserState from "./../util/check";

class product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      NavTitle1: "收藏商品",
      NavTitle2: "已購買商品",
      myMemberData: [{}],
      memberData: [],
      m_name: "",
      m_photo: "",
      old_password: "",
      checkOld_password: "",
      new_password: "",
      new_password2: "",
      installdb: "none",
      installtext: "註冊失敗",
      installstate: "alert alert-danger",
      id: "",
      loginUser: "",
      isLogined: "",
      user_id: "",
      myCollect: [],
      col_newsData: []
    };
  }

  async componentDidMount() {
    const jsonObject = await checkUserState();
    console.log("jsonObject", jsonObject);
    // p.then(jsonObject => {
    //   console.log('2', jsonObject);
    await this.setState({
      loginUser: jsonObject.loginUser,
      isLogined: jsonObject.isLogined,
      user_id: jsonObject.user_id
    });
    this.memberDataFetch();
  }

  //載入會員資料
  memberDataFetch = async () => {
    try {
      let id = this.props.match.params.id;
      let user_id = this.state.user_id;
      console.log(id);
      console.log(user_id);
      this.setState({ id: id });
      const response = await fetch(
        `http://localhost:5000/member/${user_id ? user_id : id}`,
        {
          method: "GET",
          headers: new Headers({
            Accept: "application/json",
            "Content-Type": "application/json"
          })
        }
      );

      // if (!response.ok) throw new Error(response.statusText);

      const jsonObject = await response.json();

      console.log(jsonObject);
      await this.setState({
        myMemberData: jsonObject,
        m_photo: jsonObject[0].m_photo,
        m_name: jsonObject[0].m_name,
        old_password: jsonObject[0].m_password,
        myCollect: JSON.parse(jsonObject[0].c_product)
      });
      if (jsonObject[0].c_product !== null) {
        if (JSON.parse(jsonObject[0].c_product).length > 0) {
          //拿到收藏的產品資訊
          console.log(JSON.parse(jsonObject[0].c_product).length);
          this.getProduct();
        }
      } else {
        this.setState({ myCollect: [] });
      }
    } catch (e) {
      console.log(e);
    } finally {
    }
  };

  //拿到SQL收藏的產品
  getProduct = async () => {
    var sendObj = {
      arr: this.state.myCollect
    };
    const rescourse = await fetch(`http://localhost:5000/productsCollect`, {
      credentials: "include",
      method: "POST",
      body: JSON.stringify(sendObj),
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json"
      })
    });

    const productObj = await rescourse.json();
    console.log(productObj);
    await this.setState({ col_newsData: productObj }, () =>
      console.log(this.state.col_newsData)
    );

    console.log(productObj);
  };

  handleFormInputChange = event => {
    let value = event.target.value;
    const name = event.target.name;

    this.setState({ myMemberData: [{ [name]: value }] }, () =>
      console.log(this.state)
    );

    this.setState({ [name]: value });
    // this.newMyemberData[name] = value;
    // console.log('newMyemberData');
    // console.log(this.newMyemberData);
  };

  handleTitleClick = e => {
    this.setState({ nowPage: true });
    console.log(e.target.id);
    console.log(e.target.className);
    let Allbox = document.querySelectorAll(".Allbox");
    let AllItem = document.querySelectorAll(".nav-link");
    for (var i = 0; i < Allbox.length; i++) {
      Allbox[i].classList.remove("show");
    }
    for (var i = 0; i < AllItem.length; i++) {
      AllItem[i].classList.remove("active");
    }
    document.querySelector(`.${e.target.id}`).classList.add("show");
    document.querySelector(`#${e.target.id}`).classList.add("active");
    // e.target.classList.add('show');
  };

  //刪除收藏還要更新SQL
  handleCancel=id=>()=>{
    console.log(this.state.myCollect);
    console.log(id);
    const newData=this.state.myCollect.filter((item,index)=>item!==id);
    console.log(newData)
    this.setState({myCollect:newData},()=>console.log(this.state.myCollect))
   
    var sendObj = {
      sid: newData,
      user_id: this.state.user_id,
    };

    console.log(sendObj);
    
    fetch(`http://localhost:5000/c_product`, {
      credentials: 'include',
      method: 'PUT', // or 'PUT'
      body: JSON.stringify(sendObj), // data can be `string` or {object}!
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    }).then(res => res.json())
    .then(obj=>{
      console.log(obj);
      this.getProduct()
    })
  
    // .then(this.setState({myCollect:newData}))
    .catch(error => console.error('Error:', error))
    
  
    
  }

  render() {
    let data = [];
    if(this.state.col_newsData){
      data = this.state.col_newsData;
    }
    if (
      (this.state.id != this.state.user_id &&
        this.state.id &&
        this.state.user_id) ||
      this.state.user_id == undefined
    ) {
      return <Redirect to="/" />;
      // alert(this.state.id + ' ' + this.state.user_id);
    } else {
      return (
        <>
          <Container className="member_product">
            <Row>
              <Sidebar
                src={this.state.m_photo}
                name={this.state.m_name}
                myId={this.state.id}
              />

              <Col  md={9} className="detailArea">
                <DetailNav
                  title1={this.state.NavTitle1}
                  title2={this.state.NavTitle2}
                  handleTitleClick={this.handleTitleClick}
                />

                <div className="box1 Allbox show">
                  {data.map((item, index) => (
                    <div
                      className="card mb-3"
                      style={{ maxWidth: "800px" }}
                      key={item.c_sid}
                    >
                      <div className="row no-gutters">
                        <div className="col-md-6">
                          <img
                            src={item.p_photo}
                            className="card-img"
                            alt="..."
                          />
                        </div>

                        <div className="col-md-6">
                          <div className="card-body">
                            <div className="d-flex">
                              <div>
                                <h5 className="card-title">{item.p_name}</h5>
                                <p className="card-text">
                                  <small className="text-muted">
                                    品牌:{item.p_brand}
                                  </small>
                                </p>
                              </div>
                              <Button
                                className="cancel ml-auto"
                                variant="danger"
                                onClick={this.handleCancel(item.p_sid)}
                              >
                                取消追蹤
                              </Button>
                            </div>
                            <p className="card-text2 ellipsis">{item.p_description}</p>

                            {/* <div className="d-flex">
                              <p>價格:{item.p_price}</p>
                              <h5 className="ml-auto">{item.c_level}</h5>
                            </div> */}


                            <div className="d-flex">
                              <a href="javascript:;">
                                <i className="fab fa-facebook" />
                              </a>
                              <a href="javascript:;">
                                <i className="fab fa-instagram" />
                              </a>
                              <p className="price">價格:{item.p_price}</p>
                              <Link
                                class="btn btn-success ml-auto"
                                to={`/products2/${item.p_sid}`}
                              >
                                查看課程資訊
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="box2 Allbox">目前尚無資料</div>
              </Col>
            </Row>
          </Container>
        </>
      );
    }
  }
}

export default withRouter(product);
