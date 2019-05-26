import React from 'react'
// React Bootstrap Components
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ProgressBar from 'react-bootstrap/ProgressBar'
import Card from 'react-bootstrap/Card'
// Images
import coverImg from './../images/bicicleta-antigua-vintage-cadena-hojas-Fondos-de-Pantalla-HD-professor-falken.com_.jpg'
// Button Components
import { BackItButton, LikeItButton, SNSButtons } from './../components/Buttons'

class CourseBanner extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      course: this.props.course[0],
    }
  }

  render() {
    // Transfer Portal For Props
    // let cover = this.state.course.c_cover
    let cover = coverImg // todo: FOR TEST USE
    let backers = this.state.course.c_backers
    let fundNow = this.state.course.c_fundNow
    let fundGoal = this.state.course.c_fundGoal
    let endDate = this.state.course.c_endDate

    let status = this.state.status

    let percentage = (fundNow / fundGoal) * 100

    return (
      <>
        <div className="mb-3 d-flex" style={{ background: '#FCFCFC' }}>
          <div className="bannerLabel" />
          <Row>
            <Col sm={4}>
              <Card.Img src={cover} />
            </Col>
            <Col sm={8}>
              <Card.Body>
                <Row>
                  {/*<Col>{this.state.c_status}</Col>*/}
                  <Col>{status}</Col>
                  <Col>目前贊助人數 {backers}人</Col>
                </Row>
                <p>截止日期　{endDate}</p>
                <Row>
                  <Col sm={8}>
                    <ProgressBar
                      variant="danger"
                      now={percentage}
                      label={`${percentage}%`}
                    />
                  </Col>
                  <Col sm={4}>
                    <p>剩餘35天</p>
                  </Col>
                </Row>
                <p>
                  集資金額 NT$ {fundNow} / NT$ {fundGoal}
                </p>
                <Row>
                  <Col sm={6}>
                    <SNSButtons />
                  </Col>
                  <Col sm={6} className="d-flex">
                    <div className="m-2">
                      <BackItButton />
                    </div>
                    <div className="m-2">
                      <LikeItButton />
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Col>
          </Row>
        </div>
      </>
    )
  }
}

export default CourseBanner
