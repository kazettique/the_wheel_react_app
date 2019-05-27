import React from 'react'
import { Button } from 'react-bootstrap'
// FontAwesome Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFacebookF,
  faInstagram,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons'
import { faFistRaised, faHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeartBroken } from '@fortawesome/free-solid-svg-icons/faHeartBroken'
// Import stylesheet
import './components.css'
import { Link } from 'react-router-dom'

// 贊助按鈕
function BackItButton(props) {
  // console.log(props.sid)
  return (
    <>
      <Button className="buttons" variant="secondary" style={{background: "black", color:"white"}}>
        <Link
          to={{
            pathname: `/course/backIt/${props.sid}`,
            state: {
              sid: props.sid,
            },
          }}
        >
          我要贊助
          <FontAwesomeIcon
            style={{ marginLeft: '0.5rem' }}
            icon={faFistRaised}
          />
        </Link>
      </Button>
    </>
  )
}

// 收藏按鈕
class LikeItButton extends React.Component {
  constructor() {
    super()
    this.state = { isLiked: false }
  }

  handleClickOnLikeButton() {
    this.setState({
      isLiked: !this.state.isLiked,
    })
  }

  render() {
    return (
      <>
        <Button
          className="buttons"
          variant={this.state.isLiked ? 'light' : 'danger'}
          onClick={this.handleClickOnLikeButton.bind(this)}
        >
          {this.state.isLiked ? '取消收藏' : '收藏課程'}
          <FontAwesomeIcon
            style={{ marginLeft: '0.5rem' }}
            icon={this.state.isLiked ? faHeartBroken : faHeart}
          />
        </Button>
      </>
    )
  }
}

// 社群分享按鈕
function SNSButtons() {
  return (
    <>
      <div className="d-flex">
        <div className="m-2">
          <a href="http://www.google.com">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
        </div>
        <div className="m-2">
          <a href="https://tw.yahoo.com">
            <FontAwesomeIcon icon={faTwitter} />
          </a>
        </div>
        <div className="m-2">
          <a href="https://www.facebook.com">
            <FontAwesomeIcon icon={faFacebookF} />
          </a>
        </div>
      </div>
    </>
  )
}

// 返回按鈕
function ReturnButton() {
  return (
    <>
      <Link to="/course">
        <Button variant="link">返回</Button>
      </Link>
    </>
  )
}

export { ReturnButton, LikeItButton, BackItButton, SNSButtons }
