import React, { Component } from 'react';
import './Title_style.css';

class Title extends Component {
    state = {};
    render() {
        return (
            <div className="my-4">
                <p className="r_fs_20 m-0 r_color_red r_fw_extra_bold">
                    騎車路線
                </p>
                <p className="m-0 r_fw_medium mt-1">
                    想要找到一起騎車的夥伴是一件很容易的事情
                </p>
            </div>
        );
    }
}

export default Title;
