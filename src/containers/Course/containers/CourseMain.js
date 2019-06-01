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
      c_sid: null, // c_sid
      // Show buttons or not
      buttonDisplay: 'block',
      // Check collect or not
      user_id: '',
      collectionCourse: [],
      // for test use
      c_course: '',
      // c_course: '',
      // TRUE為已收藏；FALSE為未收藏
      isLiked: false,
      user: null,
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // if this.state.course is TRUE
    if (!this.state.course) {
      let c_sid = this.state.c_sid

      fetch(`http://localhost:5000/course/${c_sid}`)
        .then(res => res.json())
        .then(data => {
          this.setState({ course: data })
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  componentDidMount() {
    // console.log('line103: enter componentDidMount!')
    // get id from url
    // 8 spaces of strings - "/course/"
    let c_sid = this.props.history.location.pathname.slice(8)
    this.setState({ c_sid: c_sid })
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
        // 若為登入狀態
        if (data.user_id) {
          this.setState({ user: data })
          axios
            .get('http://localhost:5000/collectionCourse', {
              params: {
                sid: data.user_id,
              },
            })
            .then(res => {
              // 將此會員已收藏的課程ID從c_course欄位拿出來，並指定至collectionCourse狀態
              this.setState({
                collectionCourse: JSON.parse(res.data[0].c_course),
              })
            })
            .then(() => {
              if (this.state.collectionCourse) {
                let collectionCourse = this.state.collectionCourse
                for (let id of collectionCourse) {
                  console.log('loop thru id: ' + id)
                  // 當collectionCourse裡面有此課程的ID：
                  if (id === c_sid) {
                    this.setState({ isLiked: true })
                    break
                  } else {
                    this.setState({ isLiked: false })
                  }
                }
              }
            })
        }
      })
    // console.log('this.state.id ' + this.state.id) // can not get this.state.id at this moment
    // let c_course = this.state.c_course
    // let isLiked = this.state.isLiked
    // console.log(this.state.collectionCourse)
    // for (let id of c_course) {
    //   console.log('loop thru id: ' + id)
    //   // 當collectionCourse裡面有此課程的ID：
    //   if (id === c_sid) {
    //     // collectionCourse = collectionCourse.filter(item => item !== c_sid)
    //     isLiked = true
    //     break
    //   } else {
    //     isLiked = false
    //   }
    // }
    // this.setState({ isLiked: isLiked })
    // console.log('isLiked: ' + isLiked)
  }

  collectHandler = () => {
    let collectionCourse = []
    let c_sid = this.props.history.location.pathname.slice(8)
    // let isLiked = this.state.isLiked
    // console.log(typeof this.state.c_course)/**/
    // let c_course = this.state.c_course // convert it into object
    // console.log(c_course)
    // console.log('typeof c_course: ' + typeof c_course)
    // c_course = String(c_course)
    // c_course = c_course.split(',')
    // console.log('typeof c_course: ' + typeof c_course)
    // 若有已收藏，拿掉此c_sid
    let isLiked = false
    if (collectionCourse.length > 0) {
      for (let id of collectionCourse) {
        if (id === c_sid) {
          collectionCourse = collectionCourse.filter(item => item !== c_sid)
          isLiked = true
          break
        }
      }
    }

    if (!isLiked) {
      collectionCourse.push(c_sid)
    }
    // 更新收藏狀態
    // console.log(typeof c_course)
    // this.setState({ isLiked: isLiked })
    // this.setState({ c_course: c_course })
    // // console.log('isLiked: ' + this.state.isLiked)
    // // console.log('c_course: ' + this.state.c_course)
    // c_course = String(c_course)
    // console.log('typeof c_course: ' + typeof c_course)
    // console.log('c_course: ' + c_course)
    axios
      .post('http://localhost:5000/collectionCourse_update', {
        collectionCourse: JSON.stringify(collectionCourse),
        sid: localStorage.meber,
      })
      .then(() => this.setState({ isLiked: !this.state.isLiked }))
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
