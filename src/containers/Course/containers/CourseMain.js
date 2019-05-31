import React from 'react'
// React Bootstrap
import { Container } from 'react-bootstrap'
// Import Stylesheet
import './course.scss'
// React Router
import { withRouter } from 'react-router-dom'
// Import axios
import axios from 'axios'
// Import Components
import MapDiv from '../components/MapDiv'
import CourseNav from '../components/CourseNav'
import CourseMainTitle from '../components/CourseMainTitle'
import CourseBanner from '../components/CourseBanner'
import CourseTab from '../components/CourseTab'

class CourseMain extends React.Component {
  // Initializing
  constructor(props) {
    super(props)
    this.state = {
      // map_display: true,
      course: null,
      id: null, // c_sid
      // Show buttons or not
      buttonDisplay: 'block',
      // States for login check
      loginUser: '',
      isLogined: '',
      myCollect: '',
      // Check collect or not
      user_id: '',
      collectionCourse: [],
      // collectionCourseTest: [2, 3, 5, 7, 1],
      isLiked: false,
      user: null,
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
    // if this.state.course is TRUE
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
    console.log(this.state.isLiked)
    // console.log('line99 collectionCourse: ' + this.state.collectionCourse)
    // console.log('collectionCourse: ' + this.state.collectionCourse)
    /*
    let sid = +this.state.id
    let collectionCourse = this.state.collectionCourseTest
    console.log(this.state.collectionCourseTest)
    let isLiked = this.state.isLiked
    for (let id of collectionCourse) {
      if (id === sid) {
        collectionCourse = collectionCourse.filter(item => item !== sid)
        isLiked = true
        break
      }
    }
    console.log('isLiked: ' + isLiked)
    // this.setState({ isLiked: isLiked })
    */
  }

  componentDidMount() {
    // console.log('line103: enter componentDidMount!')
    // get id from url
    // 8 spaces of strings - "/course/"
    let c_sid = this.props.history.location.pathname.slice(8)
    this.setState({ id: c_sid })
    // check login status
    // console.log('line114: diving into fetch!')
    fetch('http://localhost:5000/is_logined', {
      method: 'GET',
      credentials: 'include',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.user_id) {
          this.setState({ user: data })
          // console.log(this.state.user)
          // this.setState({ user_id: data.user_id })
          // console.log('user_id: ' + this.state.user_id) // ok
          // get collection status
          if (this.state.user) {
            axios
              .get('http://localhost:5000/collectionCourse', {
                params: {
                  sid: data.user_id,
                },
              })
              .then(res => {
                this.setState({
                  collectionCourse: JSON.parse(res.data[0].c_course),
                })
              })
          }
        }
      })
    console.log('c_sid ' + c_sid)
    let collectionCourse = this.state.collectionCourse
    console.log(this.state.collectionCourse)
    let isLiked = this.state.isLiked
    for (let id of collectionCourse) {
      console.log('world: ' + id)
      // todo: should I use triple equal sign?
      if (id == c_sid) {
        console.log('hello')
        collectionCourse = collectionCourse.filter(item => item !== c_sid)
        isLiked = true
        break
      }
    }
    console.log('isLiked: ' + isLiked)
    this.setState({ isLiked: isLiked })
  }

  collectHandler = () => {
    let collectionCourse = []
    let sid = +this.state.id
    // console.log('show c_sid: ' + sid)
    // console.log('line159 collectionCourse: ' + this.state.collectionCourse)
    if (this.state.collectionCourse) {
      collectionCourse = this.state.collectionCourse
    }
    // isLiked = false 沒有收藏
    let isLiked = false
    if (collectionCourse.length > 0) {
      console.log('flag166: ' + collectionCourse)
      for (let i of collectionCourse) {
        console.log(i)
        if (i === sid) {
          collectionCourse = collectionCourse.filter(item => item !== sid)
          this.setState({ collectionCourse: collectionCourse })
          isLiked = true
          break
        }
      }
    }
    console.log('isLiked: ' + isLiked)
    // 若為未收藏
    if (!isLiked) {
      console.log('flag179: ' + collectionCourse)
      collectionCourse.push(sid)
      this.setState({ collectionCourse: collectionCourse })
      // this.setState({ isLiked: true })
    }
    axios
      .post('http://localhost:5000/collectionCourse_update', {
        collectionCourse: JSON.stringify(collectionCourse),
        sid: localStorage.meber,
        // sid: this.state.user_id,
      })
      .then(
        // console.log(JSON.stringify(collectionCourse)),
        this.setState({ collectionCourse: JSON.stringify(collectionCourse) })
      )
  }

  // Methods

  // Rendering
  render() {
    let list0 = null
    let list1 = null
    let list2 = null
    let list3 = null
    let list4 = null
    if (this.state.course) {
      // console.log(this.state.course)
      list0 = <CourseNav />
      list1 = <CourseMainTitle course={this.state.course} />
      list2 = (
        <CourseBanner
          course={this.state.course}
          buttonDisplay={this.state.buttonDisplay}
          collectHandler={this.collectHandler}
          isLiked={this.state.isLiked}
        />
      )
      list3 = <CourseTab course={this.state.course} />
      list4 = <MapDiv course={this.state.course} />
    }

    // check collect status`
    // console.log(this.state)
    // if (this.state.myCollect !== '') {
    //   console.log(JSON.parse(this.state.myCollect))
    // }
    let collected = false
    if (this.state.collection) {
      if (this.state.collection.length > 0) {
        for (let sid of this.state.collection) {
          if (sid === +this.props.selectedSid) {
            collected = true
          }
        }
      }
    }
    return (
      <>
        <Container fluid className="p-0">
          <div style={{ height: '35px' }} />
          {list0}
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
