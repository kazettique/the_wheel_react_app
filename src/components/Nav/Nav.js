import React from "react";
import Logo from "../Logo/Logo";
import classes from "./Nav.module.css";
import "./Nav.module.css";
import { NavLink, withRouter } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false,
      showNav: true
    };

    this.observer = null;
  }

  menuHandler = () => {
    if (window.innerWidth <= 992) {
      this.setState((prevState, prevProp) => ({
        showMenu: !prevState.showMenu
      }));
    }
  };

  componentDidMount() {
    window.addEventListener("resize", () => {
      if (window.innerWidth > 992 && this.state.showMenu) {
        this.setState({ showMenu: false });
      }
    });
  }

  render() {
    let location = this.props.history.location.pathname;
    // console.log(location);
    const style = {
      background: `linear-gradient(
      45deg,
      rgb(255, 255, 255, 0.2),
      rgb(255, 6, 0, 0.9),
      rgb(255, 255, 255, 0.2)
    )`,
      opacity: "0.7",
      width: "100%"
    };
    let navClass = [classes.Background];
    if (!this.state.showNav) {
      navClass = [classes.Background, classes.Close];
    }

    let menuClass = [classes.Nav];
    let activeStyle = {
      color: "white",
      fontSize: "1.4rem",
      textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column"
    };
    if (this.state.showMenu) {
      menuClass = [classes.Nav, classes.Open];
      activeStyle = { color: "white", fontSize: "2.5rem" };
    }
    return (
      <nav className={classes.Navbar}>
        <div className={navClass.join(" ")} ref={el => (this.nav = el)}>
          <Logo />

          <div className={classes.Menu} onClick={this.menuHandler}>
            <div />
            <div />
            <div />
          </div>
          <ul className={menuClass.join(" ")}>
            <Container fluid={true} className="text-nowrap">
              <Row>
                <Col lg={2}>
                  <li>
                    <NavLink
                      to="/route"
                      activeStyle={activeStyle}
                      onClick={this.menuHandler}
                    >
                      騎車路線
                      <div style={location === "/route" ? style : null} />
                    </NavLink>
                  </li>
                </Col>
                <Col lg={2}>
                  <li className="text-nowrap">
                    <NavLink
                      to="/group"
                      activeStyle={activeStyle}
                      onClick={this.menuHandler}
                    >
                      揪團騎車
                      <div style={location === "/group" ? style : null} />
                    </NavLink>
                  </li>
                </Col>
                <Col lg={2}>
                  <li className="text-nowrap">
                    <NavLink
                      to="/coach"
                      activeStyle={activeStyle}
                      onClick={this.menuHandler}
                    >
                      課程專區
                      <div style={location === "/coach" ? style : null} />
                    </NavLink>
                  </li>
                </Col>
                <Col lg={2}>
                  <li className="text-nowrap">
                    <NavLink
                      to="/news"
                      activeStyle={activeStyle}
                      onClick={this.menuHandler}
                    >
                      文章專區
                      <div style={location === "/news" ? style : null} />
                    </NavLink>
                  </li>
                </Col>
                <Col lg={2}>
                  <li className="text-nowrap">
                    <NavLink
                      to="/products"
                      activeStyle={activeStyle}
                      onClick={this.menuHandler}
                    >
                      商品頁面
                      <div style={location === "/products" ? style : null} />
                    </NavLink>
                  </li>
                </Col>
              </Row>
            </Container>
          </ul>
        </div>
        <div className={classes.Right} />
      </nav>
    );
  }
}

export default withRouter(Nav);
