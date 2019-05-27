import React, { Component } from 'react'
import { Container, Row, Col, Form } from 'react-bootstrap'
import './AdvanceSearch_style.css'

class AdvanceSearch extends Component {
  state = {}

  render() {
    return (
      <>
        <Container fluid>
          <Row className="justify-content-center">
            <Col lg={10}>
              <Row className="justify-content-lg-start">
                <button className="r_as_add_new_btn r_fw_medium m-0">
                  課程難度
                </button>
              </Row>
              <Row>
                <button className="r_capsule r_as_tag r_fw_bold ml-0">
                  入門
                </button>
                <button className="r_capsule r_as_tag r_fw_bold">中級</button>
                <button className="r_capsule r_as_tag r_fw_bold">高級</button>
              </Row>
              <Row>
                <Col className="d-flex align-items-end p-0 my-4 my-md-5" lg={6}>
                  <Col className="p-0">
                    <Form.Label className="r_fw_bold">地區</Form.Label>
                    <Form.Control as="select" className="r_as_select">
                      <option value="north">北部</option>
                      <option value="central">中部</option>
                      <option value="southern">南部</option>
                    </Form.Control>
                  </Col>
                  <Col className="p-0 position-relative ml-4">
                    <Form.Label className="r_fw_bold">課程時間</Form.Label>
                    <Form.Control as="select" className="r_as_select">
                      <option>2019年6月</option>
                      <option>2019年7月</option>
                      <option>2019年8月</option>
                    </Form.Control>
                  </Col>
                </Col>
                <Col className="my-0 my-lg-5 d-flex align-items-end" lg={6}>
                  <form className="w-100 d-flex justify-content-end">
                    <input type="text" className="r_as_search mx-2" />
                    <button className="r_as_search_btn r_color_white px-3 r_fw_bold" style={{color: 'white'}}>
                      搜尋
                    </button>
                  </form>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </>
    )
  }
}

export default AdvanceSearch
