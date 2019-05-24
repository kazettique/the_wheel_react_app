import React from "react";
import { withRouter } from "react-router-dom";
import classes from "./FullArticle.module.css";
import {connect} from "react-redux";
import { fetchFullArticle, replyArticle } from "../../../src/store/fullArticleActions"
import axios from "axios";

class Fullarticle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
    this.article = React.createRef();
    this.back = React.createRef();
    this.textarea = React.createRef();
  }

  componentDidMount() {
    let sid = this.props.selectedSid;
    console.log(sid);
    if(!this.props.selectedSid){
      sid = this.props.location.pathname.slice(-3);
      console.log("if",sid);
    }
    this.props.dispatch(fetchFullArticle(sid));
    this.back.current.addEventListener("click", this.closeFull);
    this.setState({ isOpen: true });
    document.body.style.overflow = "hidden";
    /*Increase views */
    axios.post("http://localhost:5000/views_increase.api", {
      sid: sid
    })
  }

  commentHandler = () => {
    let comments = []; 
    if(this.props.post.comment){
      comments = JSON.parse(this.props.post.comment);
    }
    
    let date = new Date().toLocaleDateString("zh-tw", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour:"2-digit", minute:"2-digit", second: "2-digit"});

    comments.push({
      text: encodeURIComponent(this.props.commentInput),
      reply: "",
      id: comments.length + 1,
      disable: 0,
      userName: this.props.user.m_name,
      date: date
    })
    // console.log(comments);
    this.props.dispatch(replyArticle(this.props.post.sid, JSON.stringify(comments)));
    this.textarea.current.value = "";
  }

  closeFull = event => {
   
    if (event.target.id === "back") {
      this.setState({ isOpen: false });
      document.body.style.overflowY = "auto";
      // console.log(this.props.scrollY);
      this.props.history.push("/news");
      setTimeout(()=> window.scrollTo(0, this.props.scrollY), 10);
    }
  };

  render() {
    
    let figure, text, title, commentList, views = null;
    if(this.props.post){
      const { post } = this.props;
      let endPoint = post.text.indexOf("</figure>") + 9;
      figure = post.text.slice(0, endPoint);
      text = post.text.slice(endPoint);
      title = post.title;
      views = post.views;
      commentList = (
        <div className={classes.Comment}>
          <p>目前沒有留言</p>
        </div>
      );
      if (post.comment) {
        let comments = JSON.parse(post.comment);
        commentList = comments.map((comment, index) => {
          return (
            <div key={"c" + index}>
              <div className={classes.Comment}>
                <h5>{comment.userName}</h5> says:
                <p>{decodeURIComponent(comment.text)}</p>
                post date:<p>{comment.date}</p>
              </div>
              {comment.reply ? (
                <div className={classes.Reply}>
                  <p>作者回覆:</p>
                  <p>{comment.reply}</p>
                </div>
              ) : null}
            </div>
          );
        });
      }
    }  
   
    return (
      <React.Fragment>
        
        <div
          id="back"
          className={classes.Full}
          ref={this.back}
          style={{ width: document.body.offsetWidth }}
        >
          
          <div className={classes.Article} ref={this.article}>
            <div className={classes.Panel}>
              <div>觀看人數： {views? views : 0}</div>
              <div>like</div>
              <div>share</div>
            </div>
            <div>
              <h1>{title}</h1>
            </div>
            <div dangerouslySetInnerHTML={{ __html: figure }} />
            <div dangerouslySetInnerHTML={{ __html: text }} />
            {commentList}
            <div className={classes.CommentArea}>
              <textarea ref={this.textarea} onChange={() => this.props.dispatch({
                type: "COMMENT_INPUT",
                input: this.textarea.current.value
              })}/>
              <button onClick={this.commentHandler}>test</button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    isFetching: state.fullArticle.isFetching,
    post: state.fullArticle.post,
    user: state.loginStatus.user,
    commentInput: state.fullArticle.commentInput
  }
}

export default connect(mapStateToProps)(withRouter(Fullarticle));
