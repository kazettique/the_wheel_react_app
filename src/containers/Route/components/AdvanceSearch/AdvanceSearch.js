import React, { Component } from 'react';
import {Container, Row, Col, Form } from 'react-bootstrap';
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import Form from 'react-bootstrap/Form';
import './AdvanceSearch_style.css';
import { Link } from 'react-router-dom';

class AdvanceSearch extends Component {
    state = {};

    render() {
        return (
            <Container fluid>
                <Row className="justify-content-end r_as_add_new_btn_con">

                    <Link to={`/route/addnew`}><button className="r_as_add_new_btn r_fw_medium mb-4 m-md-0">
                        新增路線
                    </button></Link>
                </Row>
                <Row>
                    <button className="r_capsule r_as_tag r_fw_bold ml-0">
                        短途
                    </button>
                    <button className="r_capsule r_as_tag r_fw_bold">
                        長途
                    </button>
                    <button className="r_capsule r_as_tag r_fw_bold">
                        環島
                    </button>
                    <button className="r_capsule r_as_tag r_fw_bold">
                        跨國
                    </button>
                </Row>
                <Row>
                    <Col
                        className="d-flex align-items-end p-0 my-4 my-md-5"
                        lg={6}
                    >
                        <Col className="p-0">
                            <Form.Label className="r_fw_bold">國家</Form.Label>
                            <Form.Control as="select" className="r_as_select">
                                <option>1</option>
                                <option>2</option>
                            </Form.Control>
                        </Col>
                        <Col className="p-0 position-relative ml-4">
                            <Form.Label className="r_fw_bold">地區</Form.Label>
                            <Form.Control as="select" className="r_as_select">
                                <option>1</option>
                                <option>2</option>
                            </Form.Control>
                        </Col>
                    </Col>
                    <Col
                        className="my-0 my-lg-5 d-flex align-items-end  px-0"
                        lg={6}
                    >
                        <form className="w-100 d-flex justify-content-end">
                            <input type="text" className="r_as_search mx-2" />
                            <button className="r_as_search_btn r_color_white px-3 r_fw_bold">
                                搜尋
                            </button>
                        </form>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default AdvanceSearch;
