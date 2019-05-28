import React, { Component } from 'react';
import './InfoCard_style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faSortDown,
    faHeart,
    faArrowRight,
} from '@fortawesome/free-solid-svg-icons';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class InfoCard extends Component {
    state = {};
    render() {
        return (
            <Row className="justify-content-between w-100 r_card_con m-0 my-2 my-md-3 flex-nowrap">
                <Col className="r_list_img_con p-0 position-relative col-3">
                    <FontAwesomeIcon
                        className="font-awesome r_heart position-absolute"
                        icon={faHeart}
                    />
                    {/* NEED TO CHANGE THIS */}
                    <img
                        src="https://loremflickr.com/320/240/brazil,rio"
                        alt="route img"
                    />
                </Col>

                <Col
                    xs={2}
                    className="d-flex align-items-end r_list_700_dnone my-3"
                >
                    <div className="h-100 d-flex flex-column align-items-end justify-content-between mr-3">
                        <p className="m-0 r_fw_medium r_card_ellipsis">
                            {this.props.data.r_depart}
                        </p>
                        <p className="m-0 text-right r_fw_medium">
                            <span className="r_color_red r_fw_bold">
                                經過{this.props.data.r_l_num}個地點
                            </span>
                            <br />
                            預計{this.props.data.r_time}
                        </p>
                        <p className="m-0 r_fw_medium r_card_ellipsis">
                            {this.props.data.r_arrive}
                        </p>
                    </div>
                    <div className="d-flex flex-column align-items-center justify-content-between h-100">
                        <div className="d-flex flex-column align-items-center justify-content-center">
                            <div className="r_list_circle" />
                            <div className="r_list_arrow_stick" />
                            <FontAwesomeIcon
                                className="font-awesome r_sort_down"
                                icon={faSortDown}
                            />
                        </div>
                        <div className="r_list_circle" />
                    </div>
                </Col>

                <Col className="d-flex my-2 my-sm-3 flex-column justify-content-between r_list_main_con">
                    <div className="r_list_rwd_main-con">
                        <Row className="justify-content-between m-0 align-items-start">
                            <Col md={10} className="d-flex pl-0">
                                <Row className="m-0 w-100 flex-nowrap">
                                    <Col xs={9} className="p-0 w-100">
                                        <h3 className="r_fw_bold r_fs_18 r_card_title ">
                                            {this.props.data.r_name}
                                        </h3>
                                        <div className="d-flex mt-md-2 r_fw_bold">
                                            <div>
                                                {this.props.data.r_country}
                                            </div>
                                            <div className="r_spaceholder" />
                                            <div>{this.props.data.r_area}</div>
                                        </div>
                                    </Col>
                                    <Col xs={3} className=" pr-0">
                                        <div className="r_list_tag r_fw_extra_bold px-2 m-1">
                                            {this.props.data.r_tag}
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                            <Col
                                md={2}
                                className="d-flex flex-column align-items-center r_list_800_dnone pl-3 flex-grow-0 pr-0"
                            >
                                <div className="r_list_avatar_con">
                                    <img
                                        src={this.props.data.m_photo}
                                        alt="author's avatar"
                                    />
                                </div>

                                <div className="center r_fw_bold ">
                                    {this.props.data.m_name}
                                </div>
                            </Col>
                        </Row>

                        <div className="r_list_dnone d-flex align-items-end justify-content-between w-100 mt-3">
                            <Col className="d-flex justify-conten-between col-10 p-0">
                                <div className="d-flex col-6 p-0">
                                    <div className="d-flex align-items-center pr-3">
                                        <strong>到</strong>
                                    </div>
                                    <div className="">
                                        {this.props.data.r_depart}
                                        <br />
                                        {this.props.data.r_arrive}
                                    </div>
                                </div>

                                <div className="d-flex flex-column col-6 r_list-400_dnone">
                                    <span>預計{this.props.data.r_time}</span>
                                    <span>
                                        經過{this.props.data.r_l_num}個地點
                                    </span>
                                </div>
                            </Col>
                            <FontAwesomeIcon
                                className="font-awesome r_arrow_right mr-1"
                                icon={faArrowRight}
                            />
                        </div>

                        <Row className="my-2 mt-2 mt-md-2 r_list_700_dnone m-0 r_list_intro">
                            <Col sm={9} className="p-0">
                                {this.props.data.r_intro}
                            </Col>
                        </Row>
                    </div>

                    <Row className="d-flex justify-content-between r_list_700_dnone m-0">
                        <a href="localhost:3000">
                            <span className="r_color_red r_fw_bold r_list_700_dnone">
                                查看路線
                            </span>
                        </a>
                        <div className="r_fs_12">
                            {new Date(
                                this.props.data.r_time_added
                            ).toLocaleString()}
                        </div>
                    </Row>
                </Col>
            </Row>
        );
    }
}

export default InfoCard;