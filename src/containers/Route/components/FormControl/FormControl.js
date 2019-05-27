import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class FormControl extends Component {
    state = {};
    render() {
        switch (this.props.num) {
            case '2':
                return (
                    <Row className="r_form_group m-0 my-5">
                        <Col
                            sm={2}
                            className="d-flex justify-content-end mr-3 mr-md-5"
                        >
                            <label>{this.props.info}</label>
                        </Col>
                        <Col className="d-flex p-0 flex-column ml-md-5">
                            <Col className="d-flex ">
                                <label htmlFor={this.props.name}>
                                    {this.props.label}
                                </label>
                            </Col>
                            <Col>
                                {this.props.list ? (
                                    <input
                                        className="form-control r_form_group"
                                        name={this.props.name}
                                        id={this.props.name}
                                        placeholder={this.props.label}
                                        list="countryData"
                                        onChange={this.props.onChange}
                                    />
                                ) : (
                                    <input
                                        className="form-control r_form_group"
                                        type={this.props.type}
                                        name={this.props.name}
                                        id={this.props.name}
                                        placeholder={this.props.label}
                                    />
                                )}

                                <small className="form-text text-muted">
                                    {this.props.small}
                                </small>
                            </Col>
                        </Col>
                        <Col className="d-flex p-0 flex-column">
                            <Col className="d-flex ">
                                <label htmlFor={this.props.name2}>
                                    {this.props.label2}
                                </label>
                            </Col>
                            <Col>
                                {this.props.list2 ? (
                                    <input
                                        className="form-control r_form_group"
                                        type={this.props.type2}
                                        name={this.props.name2}
                                        id={this.props.name2}
                                        list={this.props.list2}
                                        placeholder={this.props.label2}
                                    />
                                ) : (
                                    <input
                                        className="form-control r_form_group"
                                        type={this.props.type2}
                                        name={this.props.name2}
                                        id={this.props.name2}
                                        placeholder={this.props.label2}
                                    />
                                )}

                                <small className="form-text text-muted">
                                    {this.props.small2}
                                </small>
                            </Col>
                        </Col>
                    </Row>
                );
            case '4':
                return (
                    <Row className="r_form_group m-0 my-5">
                        <Col
                            sm={2}
                            className="d-flex justify-content-end mr-3 mr-md-5"
                        >
                            <label>{this.props.label}</label>
                        </Col>
                        <Col className="ml-md-5">
                            <label>
                                短途
                                <input
                                    type="radio"
                                    name="r_tag"
                                    value="短途"
                                    defaultChecked
                                />
                            </label>
                            <label className="">
                                長途
                                <input type="radio" name="r_tag" value="長途" />
                            </label>
                            <label className="">
                                環島
                                <input type="radio" name="r_tag" value="環島" />
                            </label>
                            <label className="">
                                跨國
                                <input type="radio" name="r_tag" value="跨國" />
                            </label>
                            <small className="form-text text-muted">
                                {this.props.small}
                            </small>
                        </Col>
                    </Row>
                );
            case 'textarea':
                return (
                    <Row className="r_form_group m-0 my-5">
                        <Col
                            sm={2}
                            className="d-flex justify-content-end mr-3 mr-md-5"
                        >
                            <label htmlFor={this.props.name}>
                                {this.props.label}
                            </label>
                        </Col>
                        <Col className="ml-md-5">
                            <textarea
                                type={this.props.type}
                                name={this.props.name}
                                id={this.props.name}
                                placeholder={this.props.label}
                                className="form-control r_form_group"
                            />
                            <small className="form-text text-muted">
                                {this.props.small}
                            </small>
                        </Col>
                    </Row>
                );

            default:
                return (
                    <Row className="r_form_group m-0 my-5">
                        <Col
                            sm={2}
                            className="d-flex justify-content-end mr-3 mr-md-5"
                        >
                            <label htmlFor={this.props.name}>
                                {this.props.label}
                            </label>
                        </Col>
                        <Col className="ml-md-5">
                            <input
                                className="form-control r_form_group"
                                type={this.props.type}
                                name={this.props.name}
                                id={this.props.name}
                                placeholder={this.props.label}
                            />
                            <small className="form-text text-muted">
                                {this.props.small}
                            </small>
                        </Col>
                    </Row>
                );
        }
    }
}

export default FormControl;
