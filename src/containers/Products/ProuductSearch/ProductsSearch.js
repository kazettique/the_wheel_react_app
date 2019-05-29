// import Card from 'react-bootstrap/Card'
import React from 'react'
import classes from '../Products.module.css'
// import { TweenMax } from 'gsap/all'
// import { Transition } from 'react-transition-group'
// import ContentPage from '../../ContentPage/ContentPage'
import { Button, Form } from 'react-bootstrap'
// import { IoIosCart } from 'react-icons/io'
// import ControlledCarousel from './ControlledCarousel'
import { IoIosHand } from 'react-icons/io'

class ProductsSearch extends React.Component {
  render() {
    return (
      <>
        <Form>
          <Form.Group>
            <Form.Control
              placeholder="搜尋"
              onChange={this.props.handleInput}
              id="filter"
              name="filter"
              // value="null"
            />

            <Form.Label>車種</Form.Label>
            <Form.Control
              id="type"
              name="type"
              as="select"
              onChange={this.props.handleType}
            >
              <option selected value="">
                請選擇
              </option>
              <option value="公路車">公路車</option>
              <option value="特技車">特技車</option>
              <option value="單速車">單速車</option>
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>部件</Form.Label>
            <Form.Control
              id="genre"
              name="genre"
              as="select"
              onChange={this.props.handleGenre}
            >
              <option selected value="">
                請選擇
              </option>
              <option value="全車">全車</option>
              <option value="車架">車架</option>
              <option value="握把.龍頭">握把.龍頭</option>
              <option value="坐墊.坐管">坐墊.坐管</option>
              <option value="煞車零件">煞車零件</option>
              <option value="鍊條">鍊條</option>
              <option value="輪胎">輪胎</option>
              <option value="踏板">踏板</option>
            </Form.Control>
          </Form.Group>
          <Button
            variant="primary"
            type="button"
            className={classes.SearchButton}
            onClick={this.props.handleSearch}
          >
            搜尋
          </Button>
        </Form>
      </>
    )
  }
}

export default ProductsSearch
