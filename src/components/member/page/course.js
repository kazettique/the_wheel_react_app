import React from 'react';
// import { data } from '../data/data';
import { Link, Redirect,withRouter } from 'react-router-dom';
import {
  Button,
  Container,
  Modal,
  InputGroup,
  FormControl,
  Row,
  Col,
} from 'react-bootstrap';
// import PathNow from '../component/PathNow';
import Sidebar from '../component/Sidebar';
import './course.scss';
import DetailNav from '../component/DetailNav';
import checkUserState from './../util/check';

class course extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  
      NavTitle1: '已購買課程',
      NavTitle2: '收藏課程',
      id: '', 
      loginUser: '', 
      isLogined: '', 
      user_id: '' ,
      myCollect:[],
      col_newsData:[],
    };
  }

  async componentDidMount() {
    const jsonObject = await checkUserState();
    console.log('jsonObject', jsonObject);
    // p.then(jsonObject => {
    //   console.log('2', jsonObject);
    await this.setState({
      loginUser: jsonObject.loginUser,
      isLogined: jsonObject.isLogined,
      user_id: jsonObject.user_id,
      myCollect: JSON.parse(jsonObject.session_collect),
    });

    try {
      let id = this.props.match.params.id;
      let user_id = this.state.user_id;
      console.log(id);
      console.log(user_id);
      this.setState({ id: id });
      const response = await fetch(
        `http://localhost:5000/member/${user_id ? user_id : id}`,
        {
          method: 'GET',
          headers: new Headers({
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }),
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
        
      });


      var sendObj = {
        arr: this.state.myCollect,
      };

     
      const rescourse = await fetch(
        `http://localhost:5000/myCollect`,
        { 
          credentials: 'include',
          method: 'POST',
          body: JSON.stringify(sendObj),
          headers: new Headers({
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }),
        }
      );

      const courseObj = await rescourse.json();
      await this.setState({ col_newsData:  courseObj });
   
      console.log("newsData",this.state.col_newsData);



    } catch (e) {
      console.log(e);
    } finally {
    }

    //收藏的課程
    
  }

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
    let Allbox = document.querySelectorAll('.Allbox');
    let AllItem = document.querySelectorAll('.nav-link');
    for (var i = 0; i < Allbox.length; i++) {
      Allbox[i].classList.remove('show');
    }
    for (var i = 0; i < AllItem.length; i++) {
      AllItem[i].classList.remove('active');
    }
    document.querySelector(`.${e.target.id}`).classList.add('show');
    document.querySelector(`#${e.target.id}`).classList.add('active');
    // e.target.classList.add('show');
  };


  handleCancel=id=>()=>{
    console.log(this.state.myCollect);
    console.log(id);
    const newData=this.state.myCollect.filter((item,index)=>item!==id);
    console.log(newData)
    // console.log(this.state.col_newsData)
    // const newData=this.state.myCollect.filter(item=>item.id!==)
  }

  render() {
    let data = this.state.col_newsData;

    if (
      (this.state.id != this.state.user_id &&
        this.state.id &&
        this.state.user_id) ||
      this.state.user_id == undefined
    ) {
      return <Redirect to="/" />;
      // alert(this.state.id + ' ' + this.state.user_id);
    } else {
      console.log(this.state);
      return (
        
        <>
          <Container className="member_course">
            <Row>
              <Sidebar
                src={this.state.m_photo}
                name={this.state.m_name}
                myId={this.state.id}
              />


            <Col className="detailArea">
              <DetailNav
                  title1={this.state.NavTitle1}
                  title2={this.state.NavTitle2}
                  handleTitleClick={this.handleTitleClick}
                />

                       <div className="box1 Allbox show">123456</div>

                        <div className="box2 Allbox">


                          {data.map((item,index) => (
                            <div className="card mb-3" style={{maxWidth: "540px"}} key={item.c_sid}>
                              <div className="row no-gutters">
                                  <div className="col-md-4">
                                    <img src="..." className="card-img" alt="..."/>
                                  </div>

                                <div className="col-md-8">
                                   <div className="card-body">
                                <h5 className="card-title">{item.c_title}</h5>
                                <h5>{item.c_level}</h5>
                                    <p className="card-text ellipsis">{item.c_intro}</p>
                                    <Link to={`/course/${item.c_sid}`}>查看課程資訊</Link>
                                    
                                    <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                                    <Button onClick={this.handleCancel(item.c_sid)}>取消追蹤</Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}

                        </div>

            </Col>
            </Row>

            
          </Container>
          
        </>
      );
    }
  }
}

export default withRouter(course);
