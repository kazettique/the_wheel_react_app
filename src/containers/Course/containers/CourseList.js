import React from 'react'
// Import Components
import AdvanceSearch from '../components/AdvanceSearch'
import CourseListCard from '../components/CourseListCard'
// Import React Bootstrap
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
    fetch('http://localhost:5000/course')
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
            courseDate={item.c_courseDate}
            fundNow={item.c_fundNow}
            fundGoal={item.c_fundGoal}
            endDate={item.c_endDate}
            intro={item.c_intro}
            status={item.c_status}
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
        <div style={{ height: '10vh' }} />
        <Container fluid className="p-0 pb-5 pt-3 course-list">
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
