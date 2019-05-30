import React from 'react'
import classes from './Products.module.css'
import { Carousel } from 'react-bootstrap'
// import { Link, withRouter } from 'react-router-dom'

class ProductControlledCarousel extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.handleSelect = this.handleSelect.bind(this)

    this.state = {
      index: 0,
      direction: null,
      product: [],
    }
  }

  componentDidMount() {
    fetch('http://localhost:5000/prouductcarousel')
      .then(res => res.json())
      .then(data => {
        console.log(data)
        this.setState({ product: data })
      })
      .catch(err => {
        console.log(err)
      })
  }
  handleSelect(selectedIndex, e) {
    this.setState({
      index: selectedIndex,
      direction: e.direction,
    })
  }

  render() {
    const { index, direction } = this.state

    return (
      <>
        <div>
          <h4 className={classes.CarouselTitle2}>推薦濕品</h4>
        </div>
        <Carousel
          activeIndex={index}
          direction={direction}
          onSelect={this.handleSelect}
          className={classes.Carousel}
          // style={{ 'margin-bottom':'15rem' }}
        >
          {this.state.product.map(item => (
            <Carousel.Item
              style={{ textAlign: 'center' }}
              className={classes.ProductControlledCarousel}
            >
              <img
                className="d-block w-100  "
                className={classes.imgHeight}
                src="http://www.sportslab.com.tw/image/member/album/resize/623/629/1504596555497.png"
                alt="First slide"
                style={{ objectFit: 'contain' }}
              />

              <p>{item.p_name}</p>
            </Carousel.Item>
          ))}

          {/* <Carousel.Item style={{ 'text-align': 'center' }}>
            <img
              className="d-block w-100"
              className={classes.imgHeight}
              src="http://www.sportslab.com.tw/image/member/album/resize/623/629/1504596555497.png"
              alt="First slide"
              style={{ 'object-fit': 'contain' }}
            />
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Item> */}
        </Carousel>
      </>
    )
  }
}

export default ProductControlledCarousel
