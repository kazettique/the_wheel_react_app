import React, { Component } from 'react'
// import Loading from "./components/LoadingAnimation/Loading";
import Nav from './components/Nav/Nav'
import Main from './containers/Main/Main'
import Routes from './containers/Route/Route'
import Group from './containers/Group/Group'
import Course from './containers/Course/Course'
import News from './containers/News/News'
import Products from './containers/Products/Products'
import Footer from './containers/Footer/Footer'
import Login from './components/member/page/Login'
import edit from './components/member/page/edit'
import password from './components/member/page/password'
import road from './components/member/page/road'
import product from './components/member/page/product'
import course from './components/member/page/course'
import news from './components/member/page/news'
import { isLoading } from './store/loadingActions'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import './App.css'
import CourseMain from './containers/Course/containers/CourseMain'
import CourseBackItForm from './containers/Course/containers/CourseBackItForm'
// import CourseList from "./containers/Course/containers/CourseList";
//Route--------------------------------------------
import RouteDisplay from './containers/Route/containers/RrouteDisplay'
import RouteDetail from './containers/Route/containers/RouteDetail'
import RouteAddNew from './containers/Route/containers/RouteAddNew'

const routes = [
  // { path: '/', name: 'Home', Component: Main },
  { path: '/route', name: 'About', Component: RouteDisplay },
  { path: '/route/:id', name: 'About', Component: RouteDetail },
  { path: '/route/newroute', name: 'About', Component: RouteAddNew },
  { path: '/group', name: 'Contact', Component: Group },
  { path: '/course/backIt/:id/', name: 'Contact', Component: CourseBackItForm },
  { path: '/course/:id', name: 'Contact', Component: CourseMain },
  { path: '/course', name: 'Contact', Component: Course },
  { path: '/news', name: 'Contact', Component: News },
  { path: '/products', name: 'Contact', Component: Products },
  { path: '/login', name: 'Contact', Component: Login },
  { path: '/member/edit/:id', name: 'Contact', Component: edit },
  { path: '/member/password/:id', name: 'Contact', Component: password },
  { path: '/member/road/:id', name: 'Contact', Component: road },
  { path: '/member/product/:id', name: 'Contact', Component: product },
  { path: '/member/course/:id', name: 'Contact', Component: course },
  { path: '/member/news/:id', name: 'Contact', Component: news },
]

{
  /* 



<Route path="/member/course/:id" component={course} />
<Route path="/member/news/:id" component={news} />
 */
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount() {
    setTimeout(() => this.props.dispatch(isLoading()))
  }

  render() {
    const { isLoading, isAnimated } = this.props

    // return isLoading || !isAnimated ? (
    //   <Loading {...this.props} />
    // ) :
    return (
      <Router>
        <div>
          <Nav {...this.props} />
          <Switch>
            <Route path="/" exact component={Main} />
            {routes.map(({ path, Component }) => (
              <Route key={path} path={path}>
                {({ match }) => (
                  <Component {...this.props} show={match !== null} />
                )}
              </Route>
            ))}
          </Switch>
          <Footer />
        </div>
      </Router>
    )
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.loading.isLoading,
    isAnimated: state.loading.isAnimated,
  }
}

export default connect(mapStateToProps)(App)
