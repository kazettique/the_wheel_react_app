import React from 'react'
import classes from './checkout.module.css'
import { TweenMax } from 'gsap/all'
import { Transition } from 'react-transition-group'
import Card from 'react-bootstrap/Card'
// import ContentPage from '../ContentPage/ContentPage'
import {
  Button,
  Container,
  Col,
  Row,
  Form,
  InputGroup,
  FormControl,
  Alert,
} from 'react-bootstrap'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

const startState = { autoAlpha: 0, y: -50 }

class checkout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      product: [],
      display: 'none',
      cart: null,
      isChecked: false,
      pay: [],
      totalprice: null,
      delivery: [],
      id: 90,
    }
    this.handleChecked = this.handleChecked.bind(this)
  }
  componentDidMount() {
    if (!localStorage.getItem('cart')) {
      const cart = null
      cart.push()
      this.setState({
        cart,
      })

      localStorage.setItem('cart', JSON.stringify(cart))
      // console.log(this.state)
    } else {
      const cart = JSON.parse(localStorage.getItem('cart'))
      cart.push()
      this.setState({
        cart,
      })

      localStorage.setItem('cart', JSON.stringify(cart))
    }

    if (localStorage.getItem('totalPrice')) {
      let totalprice = 0
      totalprice = JSON.parse(localStorage.getItem('totalPrice'))

      this.setState({
        totalprice,
      })
    }
  }
  handleChange = event => {
    if (event.target.value === '信用卡') {
      this.setState({
        display: 'block',
      })
      this.setState({
        pay: event.target.value,
      })
      // var number =  document.getElementById('number');
      // const numberVal = number.value
      // console.log(numberVal)
    } else {
      this.setState({
        display: 'none',
      })
      this.setState({
        pay: event.target.value,
      })
    }
  }

  handleChecked() {
    this.setState({ isChecked: !this.state.isChecked })
  }

  inputNumber = event => {
    this.setState({
      pay: ['信用卡:' + event.target.value],
    })
    console.log(this.state)
  }

  deleteCartItem = index => {
    const cart = JSON.parse(localStorage.getItem('cart'))

    cart.splice(index, 1)

    this.setState({
      cart,
    })
    localStorage.setItem('cart', JSON.stringify(cart))
  }

  PlusCartItem = () => {}

  handleSend = () => {
    var obj = {
      id: this.state.id,
      cart: JSON.stringify(this.state.cart),
      pay: this.state.pay,
      totalprice: this.state.totalprice,
    }
    console.log(this.state.cart)
    if (!localStorage.getItem('meber')) {
      alert('請登入會員')
    } else {
      fetch('http://localhost:5000/checkout', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      })
      alert('下單成功')
    }
  }

  render() {
    let cart = ''
    cart = JSON.parse(localStorage.getItem('cart'))

    var txt
    if (this.state.isChecked) {
      txt = 'block'
    } else {
      txt = 'none'
    }
    // console.log(this.state.cart.quantity)

    console.log(this.state.cart)

    return (
      <>
        <Container className={classes.OderCard} style={{ marginTop: '10rem' }}>
          <Card className={classes.OderCardTop}>
            {/* <div className="row">
              {cart.map((item, index) => (
                <Col
                  md={7}
                  className={classes.CheckImg}
                  style={{ textAlign: 'center' }}
                >
                  <Card.Img
                    // variant="top"
                    src={JSON.parse(item.p_photo)[0]}
                    alt=""
                    style={{ width: '70%' }}
                  />
                  
                </Col>
              ))}
              {cart.map((item, index) => (
                <Col md={5} style={{ padding: '20px' }}>
                  <Card.Title style={{ marginTop: '4rem' }}>
                    商品名:{item.p_name}
                  </Card.Title>
                  <Card.Text>商品車種:{item.p_genre}</Card.Text>
                  <Card.Text>商品品牌:{item.p_brand}</Card.Text>
                  <Card.Text>商品說明:{item.p_description}</Card.Text>
                  <Card.Text>數量:{item.quantity}</Card.Text>
                </Col>
              ))}
            </div> */}
            <Card className={classes.top}>
              <div className="row">
                <Col>
                  {cart.map((item, index) => (
                    <Col style={{ padding: '20px' }}>
                      <Card.Title style={{ marginTop: '4rem' }}>
                        商品名:{item.p_name}
                      </Card.Title>
                      <Card.Img
                        // variant="top"
                        src={item.p_photo}
                        alt=""
                        style={{ width: '40%' }}
                      />
                      <Card.Text>商品車種:{item.p_genre}</Card.Text>
                      <Card.Text>商品品牌:{item.p_brand}</Card.Text>
                      <Card.Text>商品說明:{item.p_description}</Card.Text>
                      <Card.Text>
                        數量:{item.quantity}{' '}
                        <Button onClick={() => this.PlusCartItem()}>+</Button>
                      </Card.Text>
                      <Card.Text>
                        <Button
                          color="danger"
                          onClick={() => this.deleteCartItem(index)}
                        >
                          刪除此商品
                        </Button>
                      </Card.Text>
                    </Col>
                  ))}
                </Col>
              </div>
            </Card>
            <Form style={{ padding: '15px' }}>
              <Form.Group as={Col} md={4} controlId="formGridState">
                <Form.Label>付款方式</Form.Label>
                <Form.Control as="select" onChange={this.handleChange}>
                  <option selected>請選擇</option>
                  <option value="信用卡">信用卡</option>
                  <option value="貨到付款">貨到付款</option>
                  <option value="匯款">匯款</option>
                </Form.Control>
              </Form.Group>
              <div style={{ display: `${this.state.display}` }}>
                <Form.Group as={Col} md={3}>
                  <Form.Label>卡號</Form.Label>
                  <input id="number" type="text" onChange={this.inputNumber} />
                  {/* <Form.Control /> */}
                </Form.Group>

                <Form.Group as={Col} md={1} controlId="formGridPassword">
                  <Form.Label>安全碼</Form.Label>
                  {/* <input id="number" type="text"></input> */}
                  <Form.Control />
                </Form.Group>
              </div>

              <div>
                <Form.Group controlId="formBasicChecbox">
                  <Form.Label as="legend" column sm={2}>
                    配送方式
                  </Form.Label>
                  <Form.Check
                    type="checkbox"
                    label="宅配"
                    onChange={this.handleChecked}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicChecbox">
                  <Form.Check type="checkbox" label="7-11寄送" />
                </Form.Group>
                <Form.Group controlId="formBasicChecbox">
                  <Form.Check type="checkbox" label="郵局領取" />
                </Form.Group>
              </div>
              <div style={{ display: `${txt}` }}>
                <Form.Group as={Col} md={4}>
                  <Form.Control />
                </Form.Group>
                {/* <Form.Group as={Col} md={2} controlId="formGridState">
                  <Form.Label>城市</Form.Label>
                  <Form.Control as="select">
                    <option selected>選擇</option>
                    <option>台北市</option>
                    <option>新北市</option>
                    <option>桃園市</option>
                    <option>新竹市</option>
                    <option>高雄市</option>
                    <option>嘉義市</option>
                  </Form.Control>
                </Form.Group> */}
              </div>
            </Form>
            <Container>
              <Row style={{ textAlign: 'right' }}>
                <Col>
                  <h1>NT:{this.state.totalprice}</h1>
                </Col>
              </Row>
              <Row
                className={classes.checkButton}
                style={{ justifyContent: 'flex-end' }}
              >
                <Button
                  className={classes.checkButton2}
                  onClick={this.handleSend}
                >
                  下訂單
                </Button>
              </Row>
            </Container>
          </Card>

          {this.props.children}
        </Container>
      </>
    )
  }
}

export default checkout
