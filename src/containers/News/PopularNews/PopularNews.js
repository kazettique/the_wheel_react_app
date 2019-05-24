import React from "react";
import NewsList from "../../../components/NewsList/NewsList";
import { connect } from "react-redux";
import { withRouter, Route } from "react-router-dom";
import FullArticle  from "../../FullArticle/FullArticle";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { TimelineLite, TweenMax, Power4 } from "gsap/all";
import CSSPlugin from 'gsap/CSSPlugin';

const C = CSSPlugin;


class PopularNews extends React.Component {
  constructor(props){
    super(props);
    this.tl = new TimelineLite();
  }
  componentDidMount(){
   let callback = (entries) => {
    entries.forEach(entry => {
                
      if(entry.intersectionRatio >= 0.3){
        
       TweenMax.to(entry.target, 1.5, {
         y: 0,
         autoAlpha: 1,
         
         ease: Power4.easeOut
       });
      }
    });
   }

    const observer = new IntersectionObserver(callback, {
      root: null,
      threshold: 0.3
    })

    let lists = document.querySelectorAll(".lists");
    lists.forEach(list => observer.observe(list));
    
  
  }

  fullArticleHandler = (sid) => {
    // console.log(this.props.newsLists);
    let selectedSid = sid
    this.setState({selectedSid});
    this.props.history.push("/news/" + sid);
  }

  render(){
  let list = this.props.popularList.map((list, index) => {
    console.log(list.sid);
    return <NewsList size={10} text={list.text} title={list.title} onClick={() => this.fullArticleHandler(list.sid)}/>
  })
  return (
    <React.Fragment>
    <Row className="d-flex justify-content-center">
      <Col xs={12} className="d-flex justify-content-center">
        <h2>熱門文章</h2>
      </Col>
      {list}
    </Row>

    <Route path="/news/:id" exact render={()=> <FullArticle 
        selectedSid={this.state.selectedSid}
        />}/>
   
    </React.Fragment>
  );
  }
}

const mapStateToProps = state => {
  return {
    popularList: state.news.popularList,
    isFetchingPopular: state.news.isFetchingPopular
  };
};

export default connect(mapStateToProps)(withRouter(PopularNews));
