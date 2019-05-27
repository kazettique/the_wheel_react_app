import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './DetailPageComment_style.css';

class DetailPageComment extends Component {
    state = {};
    render() {
        // if (!this.props.data.m_name) {
        //     console.log('none');
        //     return (
        //         <Row className="d-flex justify-content-center">
        //             <Col sm={11} xl={9} className="my-5 px-0">
        //                 <Col className="r_fw_bold r_fs_18 py-5 mb-3">留言</Col>

        //                 <Col className="d-flex justify-content-end">
        //                     <Col sm={9} className="p-3 w-100 my-4 ">
        //                         <form>
        //                             <input
        //                                 type="text"
        //                                 className="r_leave_comment w-100"
        //                             />
        //                             <button className="r_comment_btn py-1 px-4 my-2 r_fw_bold">
        //                                 留言
        //                             </button>
        //                         </form>
        //                     </Col>
        //                 </Col>
        //             </Col>
        //         </Row>
        //     );
        // } else {
        //     console.log('yes');
        return (
            <Row className="d-flex justify-content-center m-0">
                <Col xs={11} xl={9} className="mb-5 px-0">
                    <Col className="r_fw_bold r_fs_18 py-3 py-sm-5 mb-3">
                        留言
                    </Col>
                    <Col>
                        {this.props.data.map(i => {
                            return (
                                <Row
                                    key={i.r_c_sid}
                                    className="r_single_comment p-1 p-sm-3 w-100 my-2 my-sm-4 mx-0"
                                >
                                    <Col xs={5} sm={3} className="d-flex">
                                        <div className="d-flex flex-column align-items-center">
                                            <div
                                                className="r_comment_avstar"
                                                style={{
                                                    backgroundImage: `url(${
                                                        i.m_photo
                                                    })`,
                                                }}
                                            />
                                            <p className="r_fw_bold m-0 mt-1 mt-sm-2">
                                                {i.m_name}
                                            </p>
                                        </div>
                                    </Col>
                                    <Col
                                        xs={7}
                                        sm={9}
                                        className="p0 p-sm-3 d-flex flex-column justify-content-between"
                                    >
                                        <div className="d-flex align-items-center flex-grow-1">
                                            {i.r_c}
                                        </div>
                                        <div className="text-right">
                                            {new Date(i.r_c_time)
                                                .toLocaleString()
                                                .slice(0, -3)}
                                        </div>
                                    </Col>
                                </Row>
                            );
                        })}
                        <Col className="d-flex justify-content-end">
                            <Col sm={9} className="p-3 w-100 my-sm-4 ">
                                <form>
                                    <input
                                        type="text"
                                        className="r_leave_comment w-100"
                                    />
                                    <button className="r_comment_btn py-1 px-4 my-2 r_fw_bold">
                                        留言
                                    </button>
                                </form>
                            </Col>
                        </Col>
                    </Col>
                </Col>
            </Row>
        );
    }
}
// }

export default DetailPageComment;
