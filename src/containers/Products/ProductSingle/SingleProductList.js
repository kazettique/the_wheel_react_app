// import Card from 'react-bootstrap/Card'
import React from 'react'
import classes from '../Products.module.css'
import { Container, Col, Row } from 'react-bootstrap'

// import { TweenMax } from 'gsap/all'
// import { Transition } from 'react-transition-group'
// import ContentPage from '../ContentPage/ContentPage'

// import { IoIosCart } from 'react-icons/io'
// import ControlledCarousel from './ControlledCarousel'
// import { IoIosHand } from 'react-icons/io'

class SingleProductList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    console.log(this.state)

    // console.log('product', a[0])
    //console.log(a[0].quantity)
    // console.log(this.props.match.params)
    return (
      <>
        <Container>
          <Row>
            <Col style={{ textAlign: 'center' }}>
              <img
                className={classes.imgSmallGroups}
                style={{ width: '80%' }}
                src={this.props.product.p_photo}
                alt=""
              />
            </Col>
            <Col style={{ textAlign: 'center' }}>
              <img
                className={classes.imgSmallGroups}
                style={{ width: '80%' }}
                src={this.props.product.p_photo}
                alt=""
              />
            </Col>
          </Row>
        </Container>
        <Container>
          <Row className={classes.productDescription}>
            <Col>
              <p>{this.props.product.p_description}</p>
            </Col>
            <Col>
              <p>{this.props.product.p_description}</p>
            </Col>
          </Row>
        </Container>
        <Container fluid style={{ marginTop: '5rem' }}>
          <Row>
            <Col
              style={{ textAlign: 'center' }}
              className={classes.productDescriptionImg}
            >
              <img
                className={classes.productDescriptionImg}
                style={{ width: '70%' }}
                src={this.props.product.p_photo}
                alt=""
              />
            </Col>
            <Col className={classes.productDescription2}>
              <div className={classes.productDescription3}>
                <p style={{ marginTop: '60px' }}>
                  {this.props.product.p_description}
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </>
    )
  }
}

export default SingleProductList
