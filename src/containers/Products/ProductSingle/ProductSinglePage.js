import React from 'react'
import classes from '../Products'
import { TweenMax } from 'gsap/all'
import { Transition } from 'react-transition-group'
// import ContentPage from '../../ContentPage/ContentPage'
import { Button } from 'react-bootstrap'
import { IoIosHeart } from 'react-icons/io'
import ProductControlledCarousel from '../ProductControlledCarousel'
// import ControlledCarousel2 from './ControlledCarousel2'
import SingleImg from './SingleImg'
import SingleSiderBar from './SingleSiderBar'
import SingleProductList from './SingleProductList'
import { withRouter } from 'react-router-dom'
import axios from "axios";
const startState = { autoAlpha: 0, y: -50 }

class ProductSinglePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      p_sid:null,
      id: null,
      product: null,
      collectionProduct:[],
      user:null,
      isLike:false,
    }
  }

  componentDidUpdate(prevporps, prevState) {
    console.log(this.props)
    if (!this.state.product) {
      let p_sid = this.state.p_sid

      // const newproject = this.state.product[0]
      fetch(`http://localhost:5000/product/${p_sid}`)
        .then(res => res.json())
        .then(data => {
          this.setState({ product: data[0] })
        })
        .catch(err => {
          console.log(err)
        })
    }
  
    // console.log(Like)
    console.log(  this.state.p_sid , prevState.p_sid)
    if(this.state.collectionProduct && this.state.p_sid !== prevState.p_sid){
     
    let Like = this.state.collectionProduct
    Like.forEach(num=>{
      if(+this.state.p_sid === +num){
        
        this.setState({
          isLike:true
        })
        
      }else{
        this.setState({
          isLike:false
        })
      }

    })
    if(Like.length === 0){
      this.setState({
        isLike:false
      })
    }
  }
}

  componentDidMount() {
    let p_sid = this.props.history.location.pathname.slice(11)
    this.setState({
      p_sid: p_sid,
    })
    fetch("http://localhost:5000/is_logined", {
            method: "GET",
            credentials: "include",
            headers: new Headers({
              Accept: "application/json",
              "Content-Type": "application/json"
            })
          })
            .then(res => res.json())
            .then(data => {
              console.log(data)
              if(data.user_id){
                  this.setState({user:data});
                  
                  axios
                  .get("http://localhost:5000/collection", {
                    params: {
                      sid: data.user_id
                    }
                    
                  })
                  .then(res => {
                  
                    this.setState({ collectionProduct: JSON.parse(res.data[0].c_product)});
                  })
               
                }
            })
    // //
    // fetch("http://localhost:5000/is_logined", {
    //   method: "GET",
    //   credentials: "include",
    //   headers: new Headers({
    //     Accept: "application/json",
    //     "Content-Type": "application/json"
    //   })
    // })
    //   .then(res => res.json())
    //   .then(data => {
        
 }
//收藏按鈕
 handleCollect=()=>{
     
          
            let collectionProduct = this.state.collectionProduct;
            console.log(collectionProduct)
            let sid =+this.props.history.location.pathname.slice(11)
            if(this.state.collectionProduct){
              console.log("123")
                collectionProduct=this.state.collectionProduct
            }
            let include = false;
            if(collectionProduct.length > 0){
              
                for(let id of collectionProduct ){
                    if(id===sid){
                        collectionProduct=collectionProduct.filter(item => item !== sid);
                        this.setState({collectionProduct:collectionProduct})
                        include = true
                        break;
                    }
                }
            }
            if(!include){
                collectionProduct.push(sid)
                console.log('555')
                this.setState({collectionProduct:collectionProduct})
                console.log(this.state.collectionProduct)
            }
            axios.post("http://localhost:5000/collectionProduct",{
                collectionProduct:JSON.stringify(collectionProduct),
                sid:localStorage.meber
            }).then(res => this.setState({isLike: !this.state.isLike}))
            // console.log(this.state.p_sid, localStorage.meber);
        }



  render() {
    let list2 = null
    let list3 = null
    let list4 = null
    if (this.state.product) {
      list2 = (
        <SingleSiderBar
          product={this.state.product}
          onToggle={this.props.onToggle}
          deleteCartItem={this.props.deleteCartItem}
          modal={this.props.modal}
          ModalReset={this.props.ModalReset}
        />
      )
      list3 = <SingleProductList product={this.state.product} />
      list4 = <SingleImg product={this.state.product} />
    }
    // console.log(this.state.id)

    return (
      <>
        <Transition
          unmountOnExit
          in={this.props.show}
          timeout={1000}
          onEnter={node => TweenMax.set(node, startState)}
          addEndListener={(node, done) => {
            TweenMax.to(node, 0.5, {
              autoAlpha: this.props.show ? 1 : 0,
              y: this.props.show ? 0 : 50,
              onComplete: done,
            })
          }}
        >
          <div>
            {/* <div style={{ height: '100vh' }}> */}
            <div style={{ marginTop: '200px', textAlign: '-webkit-center' }}>
              {list4}
            </div>
            <Button className={classes.productButton} onClick={this.handleCollect}>
              <IoIosHeart size={25} />
             {this.state.isLike ? '已收藏':'加入收藏'}
            </Button>

            {/* <SingleSiderBar /> */}
            {list2}
            {/* </div> */}
            {list3}
            <ProductControlledCarousel />

            {this.props.children}
          </div>
        </Transition>
      </>
    )
  }
}

export default withRouter(ProductSinglePage)
