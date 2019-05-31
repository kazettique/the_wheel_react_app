import React, { Component } from 'react'
// Stylesheet
import { Container, Row, Col, Form } from 'react-bootstrap'
// import '../../Route/components/AdvanceSearch/AdvanceSearch_style.css'
import './AdvanceSearch_style.css'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import CountryData from '../../Route/data/countryData'

class AdvanceSearch extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  // 將Form的值回歸
  handleButtonClick = () => {
    this.form.reset() // resets "username" field to "admin"
    // console.log('handleButtonClick done');
  }

  // 合併的方法
  clearAndSearch = () => {
    // console.log('enter onClick!');
    this.props.handleSearch()
    this.handleButtonClick()
  }

  render() {
    return (
      <>
        {
          <Container fluid className="d-flex justify-content-center">
            <Col lg={10} className="pl-0 pr-0" style={{paddingTop: '1.5rem', paddingBottom: '1.5rem'}}>
              <Form ref={form => (this.form = form)}>
                <Row className="d-flex">
                  <Col className="p-0" lg={4}>
                    <Form.Label className="r_fw_bold">課程難度</Form.Label>
                    <Form.Control
                      as="select"
                      className="r_as_select"
                      onChange={this.props.handleLevel}
                      id="input"
                      name="input"
                    >
                      <option selected value="">
                        請選擇
                      </option>
                      <option value="入門">入門</option>
                      <option value="中級">中級</option>
                      <option value="高級">高級</option>
                    </Form.Control>
                  </Col>
                  <Col className="p-0" lg={4}>
                    <Form.Label className="r_fw_bold">地區</Form.Label>
                    <Form.Control
                      as="select"
                      className="r_as_select"
                      onChange={this.props.handleRegion}
                      id="input"
                      name="input"
                    >
                      <option selected value="">
                        請選擇
                      </option>
                      <option value="">-----北部-----</option>
                      <option value="基隆市">基隆市</option>
                      <option value="台北市">台北市</option>
                      <option value="新北市">新北市</option>
                      <option value="桃園市">桃園市</option>
                      <option value="">-----中部-----</option>
                      <option value="台中市">台中市</option>
                      <option value="彰化縣">彰化縣</option>
                      <option value="南投縣">南投縣</option>
                      <option value="">-----南部-----</option>
                      <option value="嘉義市">嘉義市</option>
                      <option value="台南市">台南市</option>
                      <option value="高雄市">高雄市</option>
                    </Form.Control>
                  </Col>
                  <Col className="p-0 position-relative" lg={4}>
                    <Form.Label className="r_fw_bold">課程時間</Form.Label>
                    <Form.Control
                      as="select"
                      className="r_as_select"
                      onChange={this.props.handleDate}
                      id="input"
                      name="input"
                    >
                      <option selected value="">
                        請選擇
                      </option>
                      <option value="20190601-20190630">2019年6月</option>
                      <option value="20190701-20190731">2019年7月</option>
                      <option value="20190801-20190831">2019年8月</option>
                    </Form.Control>
                  </Col>
                </Row>
                <Row className="justify-content-end">
                  <Col className="my-0 my-lg-4 d-flex " lg={6}>
                    {/*<Form.Control*/}
                    {/*  placeholder="搜尋"*/}
                    {/*  onChange={this.props.handleInput}*/}
                    {/*  id="input"*/}
                    {/*  name="input"*/}
                    {/*  // value="null"*/}
                    {/*/>*/}
                    <input
                      type="text"
                      className="r_as_search mx-2"
                      name="r_search"
                      onChange={this.props.handleInput}
                    />
                    <button
                      className="r_as_search_btn r_color_white px-3 r_fw_bold"
                      type="button"
                      onClick={this.clearAndSearch}
                    >
                      搜尋
                    </button>
                  </Col>
                  {/*<Col lg={5}>*/}
                  {/*  <Button*/}
                  {/*    variant="primary"*/}
                  {/*    type="button"*/}
                  {/*    onClick={this.clearAndSearch}*/}
                  {/*  >*/}
                  {/*    搜尋*/}
                  {/*  </Button>*/}
                  {/*</Col>*/}
                </Row>
              </Form>
            </Col>
          </Container>
        }
        {/* for test use below*/}
        {/*
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
              <label
                className={
                  "r_capsule r_as_tag r_fw_bold ml-0" +
                  (this.state.btn1 ? " r_as_tag_selected" : "")
                }
                // onClick={this.handletagchange("btn1")}
                name="r_tag"
              >
                短途
                <input
                  type="radio"
                  className=""
                  name="r_tag"
                  value="短途"
                  //checked={this.state.btn2 ? true : false}
                />
              </label>
              <label
                className={
                  "r_capsule r_as_tag r_fw_bold ml-0" +
                  (this.state.btn2 ? " r_as_tag_selected" : "")
                }
                // onClick={this.handletagchange("btn2")}
                name="r_tag"
              >
                長途
                <input
                  type="radio"
                  className=""
                  name="r_tag"
                  value="長途"
                  //checked={this.state.btn2 ? true : false}
                />
              </label>
              <label
                className={
                  "r_capsule r_as_tag r_fw_bold ml-0" +
                  (this.state.btn3 ? " r_as_tag_selected" : "")
                }
                // onClick={this.handletagchange("btn3")}
                name="r_tag"
              >
                環島
                <input
                  type="radio"
                  className=""
                  name="r_tag"
                  value="環島"
                  style={{visibility: 'hidden'}}
                  //checked={this.state.btn2 ? true : false}
                />
              </label>
            </Row>
            <Row>
              <Col className="d-flex align-items-end p-0 my-4 my-md-5" lg={6}>
                <Col className="p-0">
                  <Form.Label className="r_fw_bold">國家</Form.Label>
                  <Form.Control
                    as="select"
                    className="rr_as_select"
                    placeholder="國家"
                    onChange={this.countryChange}
                    name="r_country"
                  >
                    <option value="" disabled defaultValue hidden>
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
                  <Form.Label className="r_fw_bold">地區</Form.Label>
                  <Form.Control
                    as="select"
                    className="rr_as_select"
                    placeholder="地區"
                    name="r_area"
                  >
                    <option value="" disabled defaultValue hidden>
                      地區
                    </option>
                    ))}
                  </Form.Control>
                </Col>
              </Col>
              <Col className="my-0 my-lg-5 d-flex align-items-end  px-0" lg={6}>
                <div className="w-100 d-flex justify-content-end">
                  <input
                    type="text"
                    className="r_as_search mx-2"
                    name="r_search"
                  />
                  <button
                    className="r_as_search_btn r_color_white px-3 r_fw_bold"
                    type="button"
                    // onClick={this.handleSearch}
                  >
                    搜尋
                  </button>
                </div>
              </Col>
            </Row>
          </form>
        </Container>
    */}
      </>
    )
  }
}

export default AdvanceSearch
