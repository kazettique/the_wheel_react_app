import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import RoutePageHead from '../components/RoutePageHead/RoutePageHead';
import AddNewMainForm from '../components/AddNewMainForm/AddNewMainForm';
import FormHead from '../components/FormHead/FormHead';
import AddNewLocationsContainer from '../components/AddNewMainForm/AddNewLocationsContainer';
import RAlert from '../components/R_Alert/R_Alert';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { handleAddNewLocation, handleAddNewSubmit } from '../actions';

class RouteAddNew extends Component {
    state = {};

    addNewLocation = () => {
        this.props.handleAddNewLocation();
    };

    addNewSubmit = () => {
        this.props.handleAddNewSubmit();
    };
    render() {
        return (
            <>
                {this.props.l.success ? (
                    <RAlert text="新增路線成功" type="success" />
                ) : this.props.l.success === false ? (
                    <RAlert text="新增路線失敗" type="failure" />
                ) : (
                    <div />
                )}

                <Container fluid className="p-0">
                    <Row className="justify-content-center my-3 my-xl-5 mx-0">
                        <RoutePageHead function="AddNew" />
                    </Row>
                    <Row className="my-xl-5 m-0 justify-content-center">
                        <Col sm={11} xl={10} className="d-flex flex-column">
                            <FormHead text="新增路線" />
                            <Row className="m-0">
                                <Col
                                    sm={2}
                                    className="d-flex align-items-center"
                                >
                                    <h3 className="r_fs_14"> 基本信息</h3>
                                </Col>
                                <Col>
                                    <AddNewMainForm />
                                </Col>
                            </Row>

                            <Row className="m-0">
                                <Col sm={2} />
                                <Col>
                                    <Row className="m-0 r_dotted_border" />
                                    {/* <FormHead text="新增路線" /> */}
                                </Col>
                            </Row>
                            <Row className="m-0">
                                <Col
                                    sm={2}
                                    className="d-flex align-items-center flex-column"
                                >
                                    <h3 className="r_fs_14">地點信息</h3>
                                    <button
                                        className="btn btn-primary m-3"
                                        onClick={this.addNewLocation}
                                    >
                                        Add Location
                                    </button>
                                </Col>
                                <Col>
                                    <AddNewLocationsContainer
                                        num={this.props.r.locationList}
                                    />
                                </Col>
                            </Row>
                            <Row className="m-0">
                                <button
                                    className="m-3 w-100"
                                    onClick={this.addNewSubmit}
                                >
                                    提交
                                </button>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
}

const mapStateToProps = store => ({
    r: store.routeAddNewLocation,
    l: store.routeAddNewLocation,
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({ handleAddNewLocation, handleAddNewSubmit }, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RouteAddNew);