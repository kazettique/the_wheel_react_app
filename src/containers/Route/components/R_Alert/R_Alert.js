import React, { Component } from 'react';
import Col from 'react-bootstrap/Col';
import './R_Alert_style.css';
import Tick from './alertTick.svg';

class RAlert extends Component {
    state = {};
    render() {
        switch (this.props.type) {
            case 'success':
                return (
                    <div className="position-fixed r_alert_bg d-flex justify-content-center align-items-center">
                        <Col xs={8} className="r_fs_20 r_alert_box d-flex p-0 ">
                            <Col
                                xs={3}
                                sm={4}
                                className="r_alert_black d-flex align-items-center p-0 p-sm-3"
                            >
                                <svg
                                    className="r_alert_svg w-100"
                                    id="Layer_1"
                                    viewBox="0 0 283.5 283.5"
                                >
                                    <circle
                                        id="r_tickcircle"
                                        className="st0 r_alert_path"
                                        cx="141.7"
                                        cy="135.2"
                                        r="79.6"
                                    />
                                    <polyline
                                        id="r_tick"
                                        className="st1 r_alert_path"
                                        points="182.1,108.7 127.7,162.2 98.5,133 "
                                    />
                                </svg>
                            </Col>

                            <Col className="r_alert_text d-flex align-items-center justify-content-center ">
                                <p>{this.props.text}</p>
                            </Col>
                        </Col>
                    </div>
                );
            case 'failure':
                return (
                    <div className="position-fixed r_alert_bg d-flex justify-content-center align-items-center">
                        <Col xs={8} className="r_fs_20 r_alert_box d-flex p-0 ">
                            <Col
                                xs={3}
                                sm={4}
                                className="r_alert_red d-flex align-items-center p-0 p-sm-3"
                            >
                                <svg
                                    className="r_alert_svg w-100"
                                    id="Layer_1"
                                    viewBox="0 0 283.5 283.5"
                                >
                                    <circle
                                        id="r_tickcircle"
                                        className="st0 r_alert_path"
                                        cx="141.7"
                                        cy="135.2"
                                        r="79.6"
                                    />
                                    <polyline
                                        id="r_tick"
                                        className="st1 r_alert_path"
                                        points="182.1,108.7 127.7,162.2 98.5,133 "
                                    />
                                </svg>
                            </Col>

                            <Col className="r_alert_text d-flex align-items-center justify-content-center r_alert_text_red">
                                <p>{this.props.text}</p>
                            </Col>
                        </Col>
                    </div>
                );
        }
    }
}

export default RAlert;
