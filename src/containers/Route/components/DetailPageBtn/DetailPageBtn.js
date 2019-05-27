import React from 'react';
// FontAwesome Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFacebookF,
    faInstagram,
    faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { faFistRaised, faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeartBroken } from '@fortawesome/free-solid-svg-icons/faHeartBroken';
import Col from 'react-bootstrap/Col';
// Import stylesheet
import './DetailPageBtn_style.css';

// 贊助按鈕
function BackItButton() {
    return (
        <>
            <button
                className="r_d_buttons succeed_btn r_fw_bold"
                variant="secondary"
            >
                <FontAwesomeIcon
                    style={{ marginRight: '0.7rem' }}
                    icon={faFistRaised}
                />
                挑戰成功
            </button>
        </>
    );
}

// 收藏按鈕
class LikeItButton extends React.Component {
    constructor() {
        super();
        this.state = { isLiked: false };
    }

    handleClickOnLikeButton() {
        this.setState({
            isLiked: !this.state.isLiked,
        });
    }

    render() {
        return (
            <>
                <button
                    className="r_d_buttons r_like_button r_fw_bold ml-3 ml-sm-5"
                    variant={this.state.isLiked ? 'light' : 'danger'}
                    onClick={this.handleClickOnLikeButton.bind(this)}
                >
                    <FontAwesomeIcon
                        style={{ marginRight: '0.7rem' }}
                        icon={this.state.isLiked ? faHeartBroken : faHeart}
                    />
                    {this.state.isLiked ? '取消收藏' : '收藏課程'}
                </button>
            </>
        );
    }
}

// 社群分享按鈕
function SNSButtons() {
    return (
        <>
            <Col className="d-flex mb-1 mt-3 my-xl-3 r_SNSButtons p-0">
                <div className="ml-0">
                    <a href="http://www.google.com">
                        <FontAwesomeIcon icon={faInstagram} />
                    </a>
                </div>
                <div>
                    <a href="https://tw.yahoo.com">
                        <FontAwesomeIcon icon={faTwitter} />
                    </a>
                </div>
                <div>
                    <a href="https://www.facebook.com">
                        <FontAwesomeIcon icon={faFacebookF} />
                    </a>
                </div>
            </Col>
        </>
    );
}

export { LikeItButton, BackItButton, SNSButtons };
