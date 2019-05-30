import React, { Component } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';

import './AdvanceSearch_style.css';
import { Link } from 'react-router-dom';
import CountryData from '../../data/countryData.json';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { handleCountryChange, handleSearch } from '../../actions';

class AdvanceSearch extends Component {
    state = {};
    countryChange = event => {
        this.props.handleCountryChange(event.target.value);
    };
    handleSearch = () => {
        this.props.handleSearch();
    };
    render() {
        return (
            <Container fluid>
                <Row className="justify-content-end r_as_add_new_btn_con">
                    <Link to={`/route/addnew`}>
                        <button className="r_as_add_new_btn r_fw_medium mb-4 m-md-0">
                            新增路線
                        </button>
                    </Link>
                </Row>
                <form name="searchform">
                    <Row>
                        <button
                            className="r_capsule r_as_tag r_fw_bold ml-0"
                            type="button"
                            name="r_tag"
                        >
                            短途
                        </button>
                        <button
                            className="r_capsule r_as_tag r_fw_bold"
                            type="button"
                            name="r_tag"
                        >
                            長途
                        </button>
                        <button
                            className="r_capsule r_as_tag r_fw_bold"
                            type="button"
                            name="r_tag"
                        >
                            環島
                        </button>
                        <button
                            className="r_capsule r_as_tag r_fw_bold"
                            type="button"
                            name="r_tag"
                        >
                            跨國
                        </button>
                    </Row>
                    <Row>
                        <Col
                            className="d-flex align-items-end p-0 my-4 my-md-5"
                            lg={6}
                        >
                            <Col className="p-0">
                                <Form.Label className="r_fw_bold">
                                    國家
                                </Form.Label>
                                <Form.Control
                                    as="select"
                                    className="rr_as_select"
                                    placeholder="國家"
                                    onChange={this.countryChange}
                                    name="r_country"
                                >
                                    <option
                                        value=""
                                        disabled
                                        defaultValue
                                        hidden
                                    >
                                        國家
                                    </option>
                                    {Object.keys(CountryData).map(i => (
                                        <option key={i} value={i}>
                                            {i}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Col>
                            <Col className="p-0 position-relative ml-4">
                                <Form.Label className="r_fw_bold">
                                    地區
                                </Form.Label>
                                <Form.Control
                                    as="select"
                                    className="rr_as_select"
                                    placeholder="地區"
                                    name="r_area"
                                >
                                    <option
                                        value=""
                                        disabled
                                        defaultValue
                                        hidden
                                    >
                                        地區
                                    </option>
                                    {Object.keys(this.props.r.areas).map(i => (
                                        <option
                                            key={i}
                                            value={this.props.r.areas[i]}
                                        >
                                            {this.props.r.areas[i]}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Col>
                        </Col>
                        <Col
                            className="my-0 my-lg-5 d-flex align-items-end  px-0"
                            lg={6}
                        >
                            <div className="w-100 d-flex justify-content-end">
                                <input
                                    type="text"
                                    className="r_as_search mx-2"
                                    name="r_search"
                                />
                                <button className="r_as_search_btn r_color_white px-3 r_fw_bold" type="button" onClick={this.handleSearch}>
                                    搜尋
                                </button>
                            </div>
                        </Col>
                    </Row>
                </form>
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    r: state.routeCountryChange,
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({ handleCountryChange, handleSearch }, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdvanceSearch);
