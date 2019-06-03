import React from 'react'
import Container from 'react-bootstrap/Container'
// Import Components
import BackerCommentCard from '../components/BackerCommentCard'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import BackCommentCard from '../components/BackerCommentCard'
import Row from 'react-bootstrap/Row'
import Col from 'reactstrap/es/Col'
import Swal from 'sweetalert2'

class CourseComment extends React.Component {
  constructor(props) {
    super(props)
    const c_sid = this.props.c_sid
    this.state = {
      isLogined: false,
      user_id: null,
      c_sid: c_sid,
      user: null,
      comment: [],
      m_name: '',
      commentInput: null,
    }
  }

  componentDidMount = () => {
    axios
      .get('http://localhost:5000/courseComment', {
        params: {
          sid: this.props.c_sid,
        },
      })
      .then(res => {
        // console.log(res.data)
        this.setState({ comment: res.data })
      })
  }

  handleSubmitComment = () => {
    if (localStorage.getItem('meber')) {
      let obj = {
        c_sid: this.props.c_sid,
        m_sid: localStorage.getItem('meber'),
        c_comment: this.state.commentInput,
      }

      fetch('http://localhost:5000/NewCourseComment', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        // .then(res => res.json())
        .then(res => {
          console.log(res)
          axios
            .get('http://localhost:5000/courseComment', {
              params: {
                sid: this.props.c_sid,
              },
            })

            .then(res => {
              this.setState({ comment: res.data })
              document.querySelector('#text').value = ''
            })
        })
      // .then(() => localStorage.clear('meber'))
    } else {
      // alert('請先登入！')
      Swal.fire('請先登入', '您需要登入後才能進行贊助', 'warning')
    }
  }

  handleInput = event => {
    this.setState({
      commentInput: event.target.value,
    })
  }

  render() {
    console.log(this.state.user)
    console.log(this.state.comment)
    let list = this.state.comment.map(item => {
      return (
        <BackerCommentCard
          key={item.c_c_sid}
          c_comment={item.c_comment}
          m_name={item.m_name}
          m_photo={item.m_photo}
        />
      )
    })

    return (
      <>
        <Container fluid>
          <Container className="my-lg-5">
            <Row className="d-flex justify-content-center">
              <Col lg={8}>
                <Form>
                  <Form.Group>
                    <Form.Label className="text-center">
                      對這個課程有任何問題嗎？先看看<strong>問與答</strong>
                      或是直接在下面留言！
                    </Form.Label>
                    <Form.Control
                      type="textarea"
                      placeholder="請輸入留言內容"
                      id="text"
                      onChange={this.handleInput}
                    />
                    <Form.Text className="text-muted text-right">
                      留言區為討論課程內容用。請勿張貼私下交易（含揪團）、廣告、個資、或其他違反使用條款的內容。
                    </Form.Text>
                  </Form.Group>
                  <div className="text-right">
                    <Button
                      variant="secondary"
                      type="submit"
                      onClick={this.handleSubmitComment}
                    >
                      送出
                    </Button>
                  </div>
                </Form>
              </Col>
            </Row>
          </Container>
          {list}
        </Container>
      </>
    )
  }
}

export default CourseComment
