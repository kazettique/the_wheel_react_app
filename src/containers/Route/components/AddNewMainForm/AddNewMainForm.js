import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
import FormControl from '../FormControl/FormControl';
import './AddNewForm_style.css';
import CountryData from '../../data/countryData.json';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { handleCountryChange } from '../../actions';

class AddNewMainForm extends Component {
    state = {};
    countryChange = event => {
        this.props.handleCountryChange(event.target.value);
    };

    render() {
    
        return (
            <Container fluid className="p-0">
                <Row className="d-flex flex-column w-100 m-0">
                    <datalist id="countryData">
                        {Object.keys(CountryData).map(i => (
                            <option key={i} value={i} />
                        ))}
                    </datalist>
                    <datalist id="areaData">
                        {Object.keys(this.props.r.areas).map(i => (
                            <option key={i} value={this.props.r.areas[i]} />
                        ))}
                    </datalist>

                    <form
                        name="form1"
                        method="post"
                        encType="multipart/form-data"
                        className="w-100"
                        id="form1"
                    >
                        {this.props.f.r_name ? (
                            <FormControl
                                num="1"
                                label="路線名稱"
                                name="r_name"
                                type="text"
                                small=""
                                passed="true"
                            />
                        ) : (
                            <FormControl
                                num="1"
                                label="路線名稱"
                                name="r_name"
                                type="text"
                                small="請為本路線命名"
                                passed="false"
                            />
                        )}
                        {this.props.f.r_time ? (
                            <FormControl
                                num="1"
                                label="預計時間"
                                name="r_time"
                                type="text"
                                small="請按照格式 *天 *時 *分 可省略任意部分"
                                passed="true"
                            />
                        ) : (
                            <FormControl
                                num="1"
                                label="預計時間"
                                name="r_time"
                                type="text"
                                small="請按照格式 *天 *時 *分 可省略任意部分"
                                passed="false"
                            />
                        )}

                        <FormControl label="路線類型" num="4" />

                        {this.props.f.r_country ? (
                            <FormControl
                                num="2"
                                passed="true"
                                list="countryData"
                                list2="areaData"
                                info="路線詳情"
                                onChange={this.countryChange}
                                label="國家"
                                name="r_country"
                                small=""
                                label2="地區"
                                name2="r_area"
                                small2=""
                            />
                        ) : (
                            <FormControl
                                num="2"
                                passed="false"
                                list="countryData"
                                list2="areaData"
                                info="路線詳情"
                                onChange={this.countryChange}
                                label="國家"
                                name="r_country"
                                small="請選擇路線所屬國家"
                                label2="地區"
                                name2="r_area"
                                small2=""
                            />
                        )}

                        {this.props.f.r_depart && this.props.f.r_arrive ? (
                            <FormControl
                                num="2"
                                passed="true"
                                label="出發地"
                                name="r_depart"
                                type="text"
                                small=""
                                label2="目的地"
                                name2="r_arrive"
                                type2="text"
                                small2=""
                            />
                        ) : (
                            <FormControl
                                num="2"
                                passed="false"
                                label="出發地"
                                name="r_depart"
                                type="text"
                                small="請輸入出發地及目的地"
                                label2="目的地"
                                name2="r_arrive"
                                type2="text"
                                small2=""
                            />
                        )}

                        <FormControl
                            num="textarea"
                            label="簡介"
                            name="r_intro"
                            type="text"
                            small=""
                        />

                        <FormControl
                            num="1"
                            label="路線封面"
                            name="r_img"
                            type="file"
                            small=""
                            passed='true'
                        />
                        <Row>
                            <div
                                // style="overflow:hidden; width:600px; height:300px"
                                className="d-none"
                            >
                                <img
                                    id="r_img_img"
                                    className="my-2"
                                    alt="your upload"
                                    // style="width:100%;height:100%;object-fit:cover"
                                />
                            </div>
                        </Row>

                       
                        <input
                            type="number"
                            min="0"
                            name="r_l_num"
                            id="r_l_num"
                            value={
                                this.props.l.locationList[0]
                                    ? this.props.l.locationList.length
                                    : 0
                            }
                            readOnly
                            className="d-none"
                        />
                    </form>
                </Row>
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    r: state.routeCountryChange,
    l: state.routeAddNewLocation,
    f: state.routeFormCheck,
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({ handleCountryChange }, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddNewMainForm);
