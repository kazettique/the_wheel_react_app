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
      user_id: '' };
  }

  async componentDidMount() {
    const jsonObject = await checkUserState();
    console.log('jsonObject', jsonObject);
    // p.then(jsonObject => {
    //   console.log('2', jsonObject);
    await this.setState({
      NavTitle1: '我收藏的文章',
      loginUser: jsonObject.loginUser,
      isLogined: jsonObject.isLogined,
      user_id: jsonObject.user_id,
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
    } catch (e) {
      console.log(e);
    } finally {
    }
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


  

  render() {
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

              <Col style={{ marginTop: '200px' }}>
              <DetailNav
                  title1={this.state.NavTitle1}
                  handleTitleClick={this.handleTitleClick}
                />

                       <div className="box1 Allbox">123456</div>

                      

         
                
              </Col>
            </Row>
          </Container>
        </>
      );
    }
  }
}

export default withRouter(news);
