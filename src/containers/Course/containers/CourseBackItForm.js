import React from 'react'
// React Bootstrap
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
// import InputGroup from 'react-bootstrap/InputGroup'
import Container from 'react-bootstrap/Container'
// Import Components
// import CourseBanner from '../components/CourseBanner'
// React Router
import { withRouter } from 'react-router-dom'

class CourseBackItForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      validated: false,
      // data from DB
      course: null,
      display: 'none',
      // id: null,
      // backItForm
      // m_sid: 0,
      m_sid: JSON.parse(localStorage.getItem('member'))[0].m_sid,
      c_sid: 0,
      payment_method: null,
      fund_price: 0,
      backer_name: null,
      comment: null,
    }
  }

  // Get data from database
  componentDidUpdate(prevProps, prevState) {
    // console.log(this.props)
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
    // 15 spaces of strings - "/course/backIt/"
    let c_sid = this.props.history.location.pathname.slice(15)
    // console.log(id)
    // console.log('mount')
    this.setState({
      c_sid: c_sid,
    })
  }

  handleSubmit = () => {
    // let id = JSON.parse(localStorage.getItem('member'))[0].m_sid
    // this.setState({ m_sid: id })
    let obj = {
      m_sid: this.state.m_sid,
      c_sid: this.state.c_sid,
      payment_method: this.state.payment_method,
      fund_price: this.state.fund_price,
      backer_name: this.state.backer_name,
      comment: this.state.comment,
    }
    // console.log(obj)
    if (!localStorage.getItem('member')) {
      alert('請登入會員')
    } else {
      let id = JSON.parse(localStorage.getItem('member'))[0].m_sid
      // console.log(id)
      // this.setState({ m_sid: id })
      // console.log(obj)
      // console.log(typeof obj)
      // console.log(obj["m_sid"])
      // console.log(obj)
      fetch(`http://localhost:5000/course/backIt/${this.state.c_sid}`, {
        body: JSON.stringify(obj),
        method: 'POST',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      })
        .then(alert('下單成功'))
        .then(window.history.back())
    }
  }

  handleChange = event => {
    if (event.target.value === '信用卡') {
      this.setState({ display: 'block' })
    } else {
      this.setState({ display: 'none' })
    }
    // console.log(event.target.value)
  }

  handlePrice = event => {
    // console.log(event.target.value)
    this.setState({ fund_price: event.target.value })
  }

  handleBacker = event => {
    // console.log(event.target.value)
    this.setState({ backer_name: event.target.value })
  }

  handleComment = event => {
    // console.log(event.target.value)
    this.setState({ comment: event.target.value })
  }

  render() {
    const { validated } = this.state
    return (
      <>
        <div style={{ height: '10vh' }} />
        {/*{list2}*/}
        <Container className="mb-3 mt-3">
          <Row className="justify-content-center">
            <Col md={8}>
              <Form /*onSubmit={this.handleSubmit().bind(this)}*/>
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Label>付款方式</Form.Label>
                  <Form.Control as="select" onChange={this.handleChange}>
                    <option value="default">請選擇</option>
                    <option value="信用卡" onChange={this.handleChange}>
                      信用卡
                    </option>
                    <option value="便利商店繳費" onChange={this.handleChange}>
                      便利商店繳費
                    </option>
                  </Form.Control>
                  <div style={{ display: `${this.state.display}` }}>
                    <Form.Group controlId="exampleForm.ControlInput1">
                      <Container>
                        <Form.Label>卡號</Form.Label>
                        <Form.Control />
                        <Form.Label>安全碼</Form.Label>
                        <Form.Control />
                      </Container>
                    </Form.Group>
                  </div>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Label>贊助金額</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="$1,000"
                    onChange={this.handlePrice}
                  />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Label>姓名</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="王小明"
                    onChange={this.handleBacker}
                  />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                  <Form.Label>備註</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows="3"
                    placeholder="請填寫備註"
                    onChange={this.handleComment}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Check
                    required
                    label="同意接受服務條款 及隱私權保護政策"
                    feedback="請點選同意接受服務條款 及隱私權保護政策"
                  />
                </Form.Group>
                <Button onClick={this.handleSubmit}>送出</Button>
                {/*<Button onClick={window.location.href = "/course/"}>送出</Button>*/}
              </Form>
            </Col>
          </Row>
        </Container>
      </>
    )
  }
}

export default withRouter(CourseBackItForm)
