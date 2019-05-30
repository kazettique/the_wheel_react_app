import Card from 'react-bootstrap/Card'
import React from 'react'
import classes from './Products.module.css'
import { Link } from 'react-router-dom'
// import { TweenMax } from 'gsap/all'
// import { Transition } from 'react-transition-group'
// import ContentPage from '../ContentPage/ContentPage'
import { Button, Col } from 'react-bootstrap'
// import { Link } from 'fs';
// import { IoIosCart } from 'react-icons/io'
// import ControlledCarousel from './ControlledCarousel'
// import { IoIosHand } from 'react-icons/io'

class ProductsCard extends React.Component {
  constructor(props) {
    super(props)
    // const product = this.props.product
    this.state = {
      collectionProduct:[],
        id:this.props.p_sid,
    }
  }

  handleClick = () => {
    console.log(this.props.p_sid)
    this.setState({
      p_sid: this.props.p_sid,
    })
  }

  render() {
    // const a = this.props.product
    // console.log(this.props)
    
    const single = this.props.p_sid
    return (
      <>
        <Card className={classes.top}>
          <div className="row">
            <Col md={4}>
              <Card.Img
                variant="top"
                src={this.props.pic}
                alt=""
              />
            </Col>
            <Col md={7}>
              <Card.Title>{this.props.name} <br/>車種類別:{this.props.genre}</Card.Title>
              <Card.Text>{this.props.description}</Card.Text>
              <Card.Body>
                <Card.Text className={classes.Space}>
                  NT{this.props.price}
                </Card.Text>
             
                {/* <Button variant="primary" className={classes.ButtonSpace} onClick={this.props.handleCollect}>
                  加入收藏
                </Button> */}
                <Link
                  to={{
                    pathname: `/products2/${single}`,
                    state: {
                      p_sid: this.props.p_sid,
                      toggle: this.props.toggle,
                    },
                  }}
                >
                  <Button
                    variant="primary"
                    className={classes.ButtonSpace2}
                    onClick={this.handleClick}
                    deleteCartItem={this.props.deleteCartItem}
                    toggle={this.props.toggle}
                    modal={this.props.modal}
                  >
                    查看商品
                  </Button>
                </Link>
              </Card.Body>
            </Col>
          </div>
        </Card>
      </>
    )
  }
}

export default ProductsCard
