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
import '../../../index.css'
import { Link } from 'react-router-dom'

// 贊助按鈕
class BackItButton extends React.Component {
  constructor() {
    super()
    this.state = { isLiked: false }
  }
  render() {
    // console.log(props.sid)
    return (
      <>
        <Button
          className="buttons"
          variant="secondary"
          style={{
            background: 'black',
            display: `${this.props.buttonDisplay}`,
          }}
        >
          <Link
            to={{
              pathname: `/course/backIt/${this.props.sid}`,
              state: {
                sid: this.props.sid,
              },
            }}
            style={{
              color: '#ffffff',
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
}

// 收藏按鈕
class LikeItButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // isLiked: false
    }
  }

  handleClickOnLikeButton() {
    console.log('handleClickOnLikeButton!')
    this.setState({
      isLiked: !this.state.isLiked,
    })
  }
/*
  handleBtnColorChangeAndCollect = () => {
    this.handleClickOnLikeButton.bind(this)
    this.props.collectHandler
  }*/
  // componentDidMount() {
  //   this.setState({isLiked: this.state.isLiked })
  // }


  render() {
    return (
      <>
        <Button
          className="buttons"
          variant={this.props.isLiked ? 'light' : 'danger'}
          // onClick={this.handleClickOnLikeButton.bind(this)}
          // onClick={this.handleBtnColorChangeAndCollect}
          onClick={this.props.collectHandler}
          style={{ display: `${this.props.buttonDisplay}` }}
        >
          {this.props.isLiked ? '取消收藏' : '收藏課程'}
          <FontAwesomeIcon
            style={{ marginLeft: '0.5rem' }}
            icon={this.props.isLiked ? faHeartBroken : faHeart}
          />
        </Button>
      </>
    )
  }
}

// 社群分享按鈕
class SNSButtons extends React.Component {
  constructor() {
    super()
    this.state = { isLiked: false }
  }
  render() {
    return (
      <>
        <div className="d-flex">
          <div
            className="m-2"
            style={{ display: `${this.props.buttonDisplay}` }}
          >
            <a href="http://www.google.com">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
          </div>
          <div
            className="m-2"
            style={{ display: `${this.props.buttonDisplay}` }}
          >
            <a href="https://tw.yahoo.com">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
          </div>
          <div
            className="m-2"
            style={{ display: `${this.props.buttonDisplay}` }}
          >
            <a href="https://www.facebook.com">
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
          </div>
        </div>
      </>
    )
  }
}

// 返回按鈕
function ReturnButton() {
  return (
    <>
      <Link to="/course">
        <Button variant="secondary" className="buttons">返回</Button>
      </Link>
    </>
  )
}

export { ReturnButton, LikeItButton, BackItButton, SNSButtons }
