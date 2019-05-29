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
      NavTitle1: '收藏課程',
      NavTitle2: '已購買課程',
      id: '', 
      loginUser: '', 
      isLogined: '', 
      user_id: '' ,
      myCollect:[],
      col_newsData:[],
    };
  }

  async componentDidMount() {
    //載入session
    const jsonObject = await checkUserState();
    console.log('jsonObject', jsonObject);
    // p.then(jsonObject => {
    //   console.log('2', jsonObject);
    await this.setState({
      loginUser: jsonObject.loginUser,
      isLogined: jsonObject.isLogined,
      user_id: jsonObject.user_id,
      // myCollect: JSON.parse(jsonObject.session_collect),
    });

    
    this.memberDataFetch();
   
    
  }


  //載入會員資料
  memberDataFetch = async () =>{
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
        myCollect:JSON.parse(jsonObject[0].c_course),
      });
      
      if(jsonObject[0].c_course!==null){

      if(JSON.parse(jsonObject[0].c_course).length>0){
        //拿到收藏的新聞資訊
        console.log(JSON.parse(jsonObject[0].c_course).length);
      //拿到收藏的課程資訊
        this.getCourse()
      }
    }else{
      this.setState({myCollect:[]});
    }
    } catch (e) {
      console.log(e);
    } finally {
    }
  }


  //拿到SQL收藏的課程
  getCourse=async()=>{
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
 
    console.log(courseObj);

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

  // componentDidUpdate (prevProps, prevState){
  //   console.log("更新後",this.state.myCollect)
  //   if(this.state.myCollect !== prevState.myCollect){
  //     this.getCourse();
  //   }
  // }

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
    
    fetch(`http://localhost:5000/collect`, {
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
      this.getCourse()
    })
  
    // .then(this.setState({myCollect:newData}))
    .catch(error => console.error('Error:', error))
    
  
    
  }

  render() {
    console.log(this.state);
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
      // console.log(this.state);
      return (
        
        <>
          <Container className="member_course">
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
                       {data.map((item,index) => (
                            <div className="card mb-3" style={{maxWidth: "540px"}} key={item.c_sid}>
                              <div className="row no-gutters">
                                  <div className="col-md-6">
                                    <img src="http://lorempixel.com/440/280/sports/" className="card-img" alt="..."/>
                                  </div>

                                <div className="col-md-6">
                                   <div className="card-body">
                                   <div className="d-flex">
                                    <div>
                                      <h5 className="card-title">{item.c_title}</h5>
                                      <p className="card-text"><small className="text-muted">開課時間{item.c_courseDate}</small></p>
                                    </div>
                                      <h5 className="ml-auto">{item.c_level}</h5>
                                    </div>
                                    <p className="card-text ellipsis">{item.c_intro}</p>
                                    
                                    
                                    
                                    <p>教練名稱:{item.c_coachName}</p>

                                    <div className="d-flex">
                                      <Button className="cancel" variant="danger" onClick={this.handleCancel(item.c_sid)}>取消追蹤</Button>
                                      <Link class="btn btn-success ml-auto" to={`/course/${item.c_sid}`}>查看課程資訊</Link>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}

                       </div>

                        <div className="box2 Allbox">


                         

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
