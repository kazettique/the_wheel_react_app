import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InfoCard from '../InfoCard/InfoCard';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchPostsAsync } from '../../actions';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import './InfoCardList_style.css';

class InfoCardList extends Component {
    state = {};

    componentDidMount() {
        this.props.fetchPostsAsync(0);
    }

    handleLoadMore = () => {
        this.props.fetchPostsAsync(this.props.r.postsList.page + 1);
    };

    render() {
        let style = {
            backgroundColor: '#FAFAFA',
        };
        return (
            <Container style={style} fluid className="py-2">
                <Row className="d-flex justify-content-center py-3">
                    <Col
                        md={11}
                        xl={9}
                        className="d-flex justify-content-end p-0"
                    >
                        <a
                            href="www.google.com"
                            className="m-3 r_fw_medium r_infocard_list"
                        >
                            最新路線
                        </a>
                        <a
                            href="www.google.com"
                            className="m-3 r_fw_medium r_infocard_list"
                        >
                            熱門路線
                        </a>
                    </Col>
                </Row>
                <Row className="d-flex justify-content-center">
                    <Col md={11} xl={9}>
                        {this.props.r.postsList.posts.map(items => {
                            return <InfoCard key={items.r_sid} data={items} />;
                        })}
                    </Col>
                </Row>
                <Row className="d-flex jusityfy-content-center m-5">
                    <Col className="d-flex justify-content-center mb-4">
                        <LoadMoreBtn onClick={this.handleLoadMore} />
                    </Col>
                </Row>
            </Container>
        );
    }
}

const mapStateToProps = store => ({ r: store.routeReducer });

const mapDispatchToProps = dispatch =>
    bindActionCreators({ fetchPostsAsync }, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InfoCardList);
