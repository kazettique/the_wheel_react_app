import React from 'react'
import { Container } from 'react-bootstrap'
import CourseNav from '../components/CourseNav'
import CourseMainTitle from '../components/CourseMainTitle'
import CourseBanner from '../components/CourseBanner'
import CourseTab from '../components/CourseTab'
import './course.scss'
import MapDiv from '../components/MapDiv'
import { withRouter } from 'react-router-dom'

class CourseMain extends React.Component {
  // Initializing
  constructor(props) {
    super(props)
    this.state = {
      // m_id: '',
      // c_sid: '1234',
      // c_title: '特技單車入門課程',
      // c_subtitle: '入門課程，歡迎新手加入，一起探索特技單車的世界吧！',
      // c_intro: 'test',
      // c_cover: coverImg,
      //
      // c_level: '入門',
      // c_courseDate: '2019/06/06',
      // c_courseLocation: '台北市',
      // c_coachName: 'test',
      // c_coach_avatar: 'test',
      //
      // c_coachNationality: '美國',
      // c_backers: '5566',
      // c_fundNow: 'test',
      // c_fundGoal: 'test',
      // c_createDate: 'test',
      //
      // c_startDate: 'test',
      // c_endDate: '2019/06/06',
      // c_status: '集資中',

      // // todo
      // map_display: true,
      course: null,
      id: null,
    }
  }

  // 以下智障code，為避免降低智商請略過，謝謝！
  // Import Data From Database
  // componentDidMount() {
  //   fetch('http://localhost:5555/course/1')
  //     .then(res => res.json())
  //     .then(data => {
  //       console.log('test')
  //       // console.log('===', data)
  //       this.setState({ c_sid: data[0].c_sid })
  //       this.setState({ c_title: data[0].c_title })
  //       console.log('test')
  //       this.setState({ c_subtitle: data[0].c_subtitle })
  //       this.setState({ c_intro: data[0].c_intro })
  //       console.log('test')
  //       this.setState({ c_coachName: data[0].c_coachName })
  //       console.log('test')
  //       this.setState({ c_coach_avatar: data[0].c_coach_avatar })
  //       console.log('test')
  //       this.setState({ c_backers: data[0].c_backers })
  //       console.log('test')
  //       this.setState({ c_fundNow: data[0].c_fundNow })
  //       console.log('test')
  //       this.setState({ c_fundGoal: data[0].c_fundGoal })
  //       console.log('test')
  //       this.setState({ c_createDate: data[0].c_createDate })
  //       console.log('test')
  //       this.setState({ c_startDate: data[0].c_startDate })
  //       console.log('test')
  //       this.setState({ c_endDate: data[0].c_endDate })
  //       console.log('test')
  //       this.setState({ c_status: data[0].c_status })
  //       console.log('test')
  //       this.setState({ c_level: data[0].c_level })
  //       // todo: 用下面的map函式處理上面的wet code
  //       // {
  //       //   data.map((item, key) =>
  //       //     this.setState({ course: data[0].key })
  //       //   )
  //       // }
  //       // console.log(this.state.course)
  //     })
  //     .catch(err => {
  //       console.log(err)
  //     })
  // }

  componentDidUpdate(prevProps, prevState) {
    // console.log(this.props)
    if (!this.state.course) {
      let id = this.state.id

      fetch(`http://localhost:5000/course/${id}`)
        .then(res => res.json())
        .then(data => {
          this.setState({ course: data })
        })
        .catch(err => {
          console.log(err)
        })
    }
    // console.log(this.state.course)
  }

  componentDidMount() {
    // 8 spaces of strings - "/course/"
    let id = this.props.history.location.pathname.slice(8)
    // console.log(id)
    // console.log('mount')
    this.setState({
      id: id,
    })
  }

  // Methods

  // Rendering
  render() {
    let list1 = null
    let list2 = null
    let list3 = null
    let list4 = null
    if (this.state.course) {
      // console.log(this.state.course)
      list1 = <CourseMainTitle course={this.state.course} />
      list2 = <CourseBanner course={this.state.course} />
      list3 = <CourseTab course={this.state.course} />
      list4 = <MapDiv course={this.state.course} />
    }
    return (
      <>
        <Container fluid className="p-0">
          <CourseNav />
          {list1}
          {list2}
          {list3}
          {list4}
        </Container>
      </>
    )
  }
}

export default withRouter(CourseMain)
