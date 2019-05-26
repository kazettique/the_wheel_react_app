import React from 'react'
// React Bootstrap
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Badge from 'react-bootstrap/Badge'
import ProgressBar from 'react-bootstrap/ProgressBar'
import Button from 'react-bootstrap/Button'
// Images
import coverImg from '../images/old-man-on-the-bicycle-wide-hd-wallpaper-for-desktop-background-download-bicycle-images-397440.jpg'
import coachAvatar from '../images/coachPhotos/David-Mirra-641320.jpg'
// React Router Dom
import { Link } from 'react-router-dom'
// StyleSheet
import './components.css'

class CourseListCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // c_title: '特技單車入門課程',
      // c_coachName: 'Dave Mirra',
      // c_coachAvatar: c_coachAvatar,
      // c_coachNationality: '美國',
      // c_fundNow: 400000,
      // c_fundGoal: 800000,
      // c_startDate: '2019/04/04',
      // c_intro:
      //   '業我正本不放的與，使大為亞當就列獲子率列水當了地開，代頭公香工世此式光爭月知一錢南聞一法是地風。',
      // c_level: '入門',
      // sid: 0,
      // sid: this.props.sid,
    }
  }

  // Methods
  handleClick = () => {
    console.log(this.props.sid)
    this.setState({
      sid: this.props.sid,
    })
  }

  render() {
    // Transfer Portal For Props
    const sid = this.props.sid
    const title = this.props.title
    const coachName = this.props.coachName
    // const coachAvatar = this.props.coachAvatar
    const coachNationality = this.props.coachNationality
    const fundNow = this.props.fundNow
    const fundGoal = this.props.fundGoal
    const startDate = this.props.startDate
    const intro = this.props.intro
    const level = this.props.level
    const percentage = (fundNow / fundGoal) * 100

    return (
      <>
        <Container fluid className="py-lg-2">
          <Row className="justify-content-center">
            <Col md={10}>
              <Row className="py-lg-3 px-0 course-list-card">
                <Col
                  md={3}
                  className="course-list-card-cover m-0 p-0"
                  style={{ background: '#ffffff' }}
                >
                  <img
                    src={coverImg}
                    // src={`https://loremflickr.com/320/320/bicycle/all?random=${sid}`}
                    alt="coverImg"
                    className="course-list-card-cover-img"
                  />
                </Col>
                <Col
                  md={3}
                  style={{ background: '#ffffff' }}
                  className="py-lg-3"
                >
                  <h5>{title}</h5>
                  <h6 className="ml-2">
                    <Badge variant="secondary" className="rankBadge">
                      {level}
                    </Badge>
                  </h6>
                  <p className="truncate">{intro}</p>
                  <Link
                    to={{
                      pathname: `/course/${sid}`,
                      state: {
                        sid: sid,
                      },
                    }}
                  >
                    <Button
                      variant="link"
                      className="courseMoreInfo"
                      onClick={this.handleClick}
                    >
                      查看課程資訊
                    </Button>
                  </Link>
                  {/*<a*/}
                  {/*  href={`/course/${sid}`}*/}
                  {/*  className="courseMoreInfo"*/}
                  {/*  onClick={this.handleClick}*/}
                  {/*>*/}
                  {/*  查看課程資訊*/}
                  {/*</a>*/}
                </Col>
                <Col
                  md={2}
                  style={{ background: '#ffffff' }}
                  className="py-lg-3"
                >
                  <img
                    // src={`https://loremflickr.com/320/320/people/all?random=${sid}`}
                    src={coachAvatar}
                    alt={' '}
                    style={{ height: '80px', width: 'auto' }}
                  />
                  <p>
                    <b>教練：{coachName}</b>
                    <br />
                    國籍：<b>{coachNationality}</b>
                  </p>
                </Col>
                <Col
                  md={4}
                  style={{ background: '#ffffff' }}
                  className="py-lg-3"
                >
                  <p>
                    剩餘<b>35天</b>
                  </p>
                  <ProgressBar
                    variant="danger"
                    now={percentage}
                    label={`${percentage}%`}
                  />
                  <p>
                    集資金額 NT$ <span className="fundNow">{fundNow}</span> /
                    NT$ {fundGoal}
                  </p>
                  <p>發起時間：{startDate}</p>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </>
    )
  }
}

export default CourseListCard
