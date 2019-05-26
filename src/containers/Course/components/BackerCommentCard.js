import React from 'react'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Image from 'react-bootstrap/Image'
import coachAvatar from '../images/userPhotos/1186266.jpeg'

const BackerCommentCard = props => {
  return (
    <>
      <Container fluid className="p-lg-2">
        <Row className="justify-content-md-center">
          <Container style={{ background: '#FAFAFA' }} className="p-lg-3">
            <Row className="justify-content-md-center">
              <Col lg={2}>
                <Image
                  src={coachAvatar}
                  roundedCircle
                  style={{ height: '100px' }}
                />
                <p>
                  史大巴
                  <br />
                  2019/05/19
                </p>
              </Col>
              <Col lg={8}>
                利多爭角，準於子維開地，的用斷不金機了臺說金分……始市候好發到標，我稱值興原史化十灣汽。生器權而員務然不簡裡面思切車用空政再爸、於定以說年新程辦，做提媽和洋能商動有算辦復運操流引眼車來灣全接，那地兩。
              </Col>
            </Row>
          </Container>
        </Row>
      </Container>
    </>
  )
}

export default BackerCommentCard
