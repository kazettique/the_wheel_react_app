import React from 'react'
import AdvanceSearch from '../components/AdvanceSearch'
import CourseListCard from '../components/CourseListCard'
import { Container } from 'react-bootstrap'

class CourseList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      course: [],
    }
  }

  // Get data from database
  componentDidMount() {
    fetch('http://localhost:5555/course')
      .then(res => res.json())
      .then(data => {
        // console.log(data)
        this.setState({ course: data })
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    let list = null
    if (this.state.course) {
      list = this.state.course.map(item => {
        return (
          <CourseListCard
            key={item.c_sid}
            sid={item.c_sid}
            title={item.c_title}
            coachName={item.c_coachName}
            coachAvatar={item.c_coachAvatar}
            coachNationality={item.c_coachNationality}
            fundNow={item.c_fundNow}
            fundGoal={item.c_fundGoal}
            startDate={item.c_startDate}
            intro={item.c_intro}
            // level={item.c_level}
            // onClick={() => {
            //   this.CourseMain(item.c_sid)
            // }}
          />
        )
      })
    }
    return (
      <>
        <Container fluid className="p-0 course-list">
          <AdvanceSearch />
          {list}
          {/*<Router>{listSwitch}</Router>*/}
        </Container>
        {/*{this.props.children}*/}
      </>
    )
  }
}

export default CourseList
