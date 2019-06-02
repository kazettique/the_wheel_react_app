import Card from 'react-bootstrap/Card'
import React from 'react'
import classes from '../Products.module.css'
import './SingleComment.css'
import { Link } from 'react-router-dom'
// import { TweenMax } from 'gsap/all'
// import { Transition } from 'react-transition-group'
// import ContentPage from '../ContentPage/ContentPage'
import { Button, Col,Row } from 'react-bootstrap'
import axios from "axios";
import SingleCommentProps from './SingleCommentProps'

class ProductsCard extends React.Component {
  constructor(props) {
    super(props)
    const p_sid = this.props.p_sid
    this.state = {
      isLogined:false,
      user_id:null,
      p_sid:p_sid,
      user:null,
      comment:[],
      m_name:'',
      commentinput:null,
    }

  }
  
  componentDidMount = () => {
    let p_sid = this.props.p_sid

    fetch("http://localhost:5000/is_logined", {
      method: "GET",
      credentials: "include",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json"
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.user_id) {
            this.setState({ user: data });
           
            axios
              .get("http://localhost:5000/comment", {
                params: {
                  sid: this.props.p_sid
                }
              })
              .then(res => {
                  console.log(res.data)
               
                this.setState({ comment: res.data});
              })
       
            }
      })
    
      
 
  }
  handleSubmitComment=()=>{
    let comment = this.state.comment
    var obj={
        p_sid:this.props.p_sid,
        m_sid:localStorage.getItem('meber'),
        p_comment:this.state.commentinput
    }
 
      fetch('http://localhost:5000/NEWcomment', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
          'Content-Type': 'application/json',
        },
      })
    // .then(res => res.json())
     .then(res => {
         console.log(res)
        axios
        .get("http://localhost:5000/comment", {
            params: {
                sid: this.props.p_sid
              }
        })
      
        .then(res => {
            this.setState({ comment: res.data});
            document.querySelector('#text').value=''    
        })
        
        
    })
  }

  handleInput=event=>{
      this.setState({
        commentinput:event.target.value,
      })
  }
 


  render() {
    // console.log(localStorage.getItem('meber'))
    let list = null
    list = this.state.comment.map(item => {
        return (
          <SingleCommentProps 
            p_comment={item.p_comment}
            m_name={item.m_name}
          />
        )
      })

    
    
    return (
      <>

           
           <Row className="d-flex justify-content-center m-0">
                <Col xs={11} xl={9} className="mb-5 px-0">
                    <Col className="r_fw_bold r_fs_18 py-3 py-sm-5 mb-3">
                        留言
                    </Col>
                    {list}
                          
                        <Col className="d-flex justify-content-end">
                            <Col sm={9} className="p-3 w-100 my-sm-4 ">
                                <form name="form_comment">
                                    <input name="m_sid" 
                                     readOnly className="d-none"/>
                                    <input name="r_sid" className="d-none" readOnly/>
                                    <div className="w-100">
                                        <textarea id="text" name="r_c" className="r_leave_comment w-100 p-3" onChange={this.handleInput} ></textarea>
                                    </div>
                                    <button className="r_comment_btn py-1 px-4 my-2 r_fw_bold" type="button" onClick={this.handleSubmitComment}>
                                        留言
                                    </button>
                                </form>
                            </Col>
                        </Col>
                    </Col>
            </Row>
      </>
    )
  }
}

export default ProductsCard
