import React, { Component } from 'react';
import Title from '../components/Title/Title';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import AdvanceSearch from '../components/AdvanceSearch/AdvanceSearch';
import RouteListMap from '../components/RouteListMap/RouteListMap';
import InfoCardList from '../components/InfoCardList/InfoCardList';

class RouteDisplay extends Component {
    state = {
    };
    render() {
        return (
            <Container fluid className="p-0">
                <div style={{height:'60px'}}></div>
                <div className="d-flex justify-content-center">
                    <Col sm={11} xl={10}>
                        <Title />
                        <AdvanceSearch />
                        <RouteListMap />
                    </Col>
                </div>

                <InfoCardList />
            </Container>
        );
    }
}

export default RouteDisplay;
