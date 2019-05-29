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
  Nav
} from 'react-bootstrap';
// import PathNow from '../component/PathNow';
import Sidebar from '../component/Sidebar';
import DetailNav from '../component/DetailNav';
import './news.scss';
import checkUserState from './../util/check';

class news extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  
      NavTitle1: '我收藏的文章',
      id: '', 
      loginUser: '', 
      isLogined: '', 
      user_id: '',
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
      console.log(JSON.parse(jsonObject[0].collection));
      await this.setState({
        myMemberData: jsonObject,
        m_photo: jsonObject[0].m_photo,
        m_name: jsonObject[0].m_name,
        old_password: jsonObject[0].m_password,
        myCollect:JSON.parse(jsonObject[0].collection),
      });
      
      if(jsonObject[0].colletion!==null){

      if(JSON.parse(jsonObject[0].collection).length>0){
      //拿到收藏的新聞資訊
      console.log(JSON.parse(jsonObject[0].collection).length);
        this.getNews()
      }
    }else{
      this.setState({myCollect:[]});
    }

    } catch (e) {
      console.log(e);
    } finally {
    }
  }

//拿到SQL收藏的新聞
 getNews=async()=>{
  var sendObj = {
    arr: this.state.myCollect,
  }; 
  const rescourse = await fetch(
    `http://localhost:5000/newsCollect`,
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

  const newsObj = await rescourse.json();
  console.log(newsObj);
  await this.setState({ col_newsData:  newsObj },()=>console.log(this.state.col_newsData));

  console.log(newsObj);

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
    
    fetch(`http://localhost:5000/sqlcollect`, {
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
      this.getNews()
    })
    // .then(this.setState({myCollect:newData}))
    .catch(error => console.error('Error:', error))
    
  }



  

  render() {
    // let data = this.state.col_newsData;

    let data = [];
    if(this.state.col_newsData){
      data = this.state.col_newsData;
    }
    
    // if(this.state.col_newsData){
    //   data = this.state.col_newsData;
    // }
    // if(this.state.col_newsData){
    //   let str=this.state.col_newsData[0].text;
    //   src = str.slice(32,str.indexOf("alt") -2);
     
    // }
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
          <Container className="member_news">
            <Row>
              <Sidebar
                src={this.state.m_photo}
                name={this.state.m_name}
                myId={this.state.id}
              />

              <Col   md={9}  className="detailArea">
              <DetailNav
                  title1={this.state.NavTitle1}
                  handleTitleClick={this.handleTitleClick}
                />

                       <div className="box1 Allbox">
                       {data.map((item,index) => {
                        let str= item.text;
                        let src = str.slice(32,str.indexOf("alt") -2);
                        let text=str.slice(str.indexOf("<p>")+3,str.indexOf("</p>")-3);
                        {/* console.log(src); */}
                          return  (<div className="card mb-3" style={{maxWidth: "800px"}} key={item.sid}>
                              <div className="row no-gutters">
                                  <div className="col-md-6">
                                    <img src={src} className="card-img" alt="..."/>
                                  </div>

                                <div className="col-md-6">
                                   <div className="card-body">
                                   <div className="d-flex">
                                      <div className="titlearea">
                                      <h5 className="card-title ellipsis">{item.title}</h5>
                                      
                                      </div>
                                      <Button className="cancel ml-auto" variant="danger" onClick={this.handleCancel(item.sid)}>取消追蹤</Button>
                                    </div>

                                    <div className="textcontent">
                                    <p className="card-text ellipsis">{text}</p>
                                    </div>
                                    
                                    
                                    <div  className="d-flex">
                                    <p>#{item.type}</p>
                                    <p className="card-text ml-3"><small className="text-muted">發布時間{item.date}</small></p>
                                    </div>
                                    <div className="d-flex">
                                      {/* <Button className="cancel" variant="danger" onClick={this.handleCancel(item.c_sid)}>取消追蹤</Button> */}
                                     
                                      <a href="javascript:;" ><i className="fab fa-facebook"></i></a>
                                      <a href="javascript:;" ><i className="fab fa-instagram"></i></a>
                                      <Link className="btn btn-success ml-auto" to={`/news/${item.sid}`}>查看新聞資訊</Link>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                          }
                          )}
                       </div>

                      

         
                
              </Col>
            </Row>
          </Container>
        </>
      );
    }
  }
}

export default withRouter(news);
