import React, { Component } from 'react';
import './ReturnBtn_style.css';

class ReturnBtn extends Component {
    state = {};
    render() {
        return (
            <div>
                <a href={document.referrer} className="r_return_btn ">
                    返回
                </a>
            </div>
        );
    }
}

export default ReturnBtn;
