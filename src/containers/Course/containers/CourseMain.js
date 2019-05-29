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
      id: null,
      // Show buttons or not
      buttonDisplay: 'block',
      // States for login check
      loginUser: '',
      isLogined: '',
      user_id: '',
      myCollect: '',
      // Check collect or not
      user: null,
      collection: null,
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
    // console.log(this.state.course)
  }

  componentDidMount() {
    // 8 spaces of strings - "/course/"
    let id = this.props.history.location.pathname.slice(8)
    this.setState({ id: id })

    let sid = this.props.selectedSid
    if (!this.props.selectedSid) {
      sid = this.props.match.params.id
    }
    // check login status
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
          if (this.state.user) {
            axios
              .get('http://localhost:5000/collection.api', {
                params: {
                  sid: data.user_id,
                },
              })
              .then(res => {
                this.setState({
                  collection: JSON.parse(res.data[0].collection),
                })
              })
          }
        }
      })
  }

  collectHandler = () => {
    let collection = []
    let sid = this.props.selectedSid
    if (this.state.collection) {
      collection = this.state.collection
    }
    let included = false
    if (collection.length > 0) {
      for (let id of collection) {
        if (id === sid) {
          collection = collection.filter(item => item !== sid)
          this.setState({ collection: collection })
          included = true
          break
        }
      }
    }
    if (!included) {
      collection.push(sid)
      this.setState({ collection: collection })
    }

    //52.221.144.169
    axios.post('http://localhost:5000/new_collection.api', {
      collection: JSON.stringify(collection),
      sid: this.state.user.user_id,
    })
    // .then(res => {
    //   this.props.dispatch({
    //     type: "NEW_COLLECTION",
    //     user: res.data[0]
    //   });
    // });
  }

  // Methods

  // Rendering
  render() {
    let list0 = null
    let list1 = null
    let list2 = null
    let list3 = null
    let list4 = null
    // let list5 = null
    if (this.state.course) {
      // console.log(this.state.course)
      list0 = <CourseNav />
      list1 = <CourseMainTitle course={this.state.course} />
      list2 = (
        <CourseBanner
          course={this.state.course}
          buttonDisplay={this.state.buttonDisplay}
          collectHandler={this.collectHandler}
        />
      )
      list3 = <CourseTab course={this.state.course} />
      list4 = <MapDiv course={this.state.course} />
      // list5 = <CourseBackItForm course={this.state.course} />
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
          <CourseNav />
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
