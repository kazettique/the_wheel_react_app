import Data from '../data/countryData.json';
export const FETCH_POSTS_SUCCESS = 'FETCH_POST_SUCCESS';
export const FETCH_POSTS_FAILURE = 'FETCH_POST_FAILURE';
export const FETCH_SINGLE_SUCCESS = 'FETCH_SINGLE_SUCCESS';
export const FETCH_SINGLE_FAILURE = 'FETCH_SINGLE_FAILURE';
export const HANDLE_COUNTRY_CHANGE = 'HANDLE_COUNTRY_CHANGE';
export const HANDLE_ADD_NEW_LOCATION = 'HANDLE_ADD_NEW_LOCATION';
export const HANDLE_ADD_NEW_LOCATION_DELETE = 'HANDLE_ADD_NEW_LOCATION_DELETE';
export const HANDLE_ADD_NEW_LOCATION_COUNTRY_CHANGE =
    'HANDLE_ADD_NEW_LOCATION_COUNTRY_CHANGE';
export const HANDLE_ADD_NEW_LOCATION_UP = 'HANDLE_ADD_NEW_LOCATION_MOVE_UP';
export const HANDLE_ADD_NEW_LOCATION_DOWN = 'HANDLE_ADD_NEW_LOCATION_DOWN';
export const ADD_NEW_SUCCESS = 'ADD_NEW_SUCCESS';
export const ADD_NEW_FAILURE = 'ADD_NEW_FAILURE';
export const SUMBMIT_COMMENT_SUCCESS = 'SUMBMIT_COMMENT_SUCCESS';
export const SUMBMIT_COMMENT_FAILURE = 'SUMBMIT_COMMENT_FAILURE';
export const ALERT_DISAPPEAR = 'ALERT_DISAPPEAR';
export const HANDLE_IS_NOT_PASSED = 'HANDLE_IS_NOT_PASSED';

const ROOT_URL = 'http://localhost:5000/route';
const regexp = /^\d{1,3}天\d{1,2}時\d{1,2}分$|^\d{1,3}天\d{1,2}時$|^\d{1,3}天$|^\d{1,2}時\d{1,2}分$|^\d{1,2}時$|^\d{1,2}分$|\d{1,3}天\d{1,2}分$/;

// export const fetchPosts = payload => ({ type: FETCH_POSTS, payload: payload });
export const fetchPostsAsync = page => {
    return dispatch => {
        fetch(ROOT_URL + '/list?orderby=ASC&page=' + page, {
            //fetch(ROOT_URL, {
            method: 'get',
            // credentials: 'include',
        })
            .then(res => res.json())
            .then(obj => {
                console.log(obj);
                dispatch(fetchPostsSuccess(obj, page));
            })
            .catch(e => {
                dispatch(fetchPostsFailure('' + e));
            });
    };
};

export const fetchPostsSuccess = (payload, page) => {
    return {
        type: FETCH_POSTS_SUCCESS,
        payload: payload,
        page: page,
    };
};

export const fetchPostsFailure = error => {
    return {
        type: FETCH_POSTS_FAILURE,
        payload: error,
    };
};

export const fetchSingleAsync = r_sid => {
    return dispatch => {
        fetch(ROOT_URL + '/' + r_sid, {
            method: 'get',
        })
            .then(res => res.json())
            .then(obj => {
                dispatch(fetchSingleSuccess(obj));
            })
            .catch(e => {
                dispatch(fetchSingleFailure('' + e));
            });
    };
};

export const fetchSingleSuccess = payload => {
    return {
        type: FETCH_SINGLE_SUCCESS,
        payload: payload,
    };
};

export const fetchSingleFailure = error => {
    return {
        type: FETCH_SINGLE_FAILURE,
        payload: error,
    };
};

export const handleCountryChange = country => {
    if (Data[country]) {
        return {
            type: HANDLE_COUNTRY_CHANGE,
            payload: Data[country],
        };
    } else {
        return {
            type: HANDLE_COUNTRY_CHANGE,
            payload: [],
        };
    }
};

export const handleAddNewLocation = () => {
    return {
        type: HANDLE_ADD_NEW_LOCATION,
    };
};

export const handleAddNewLocationDelete = num => {
    return {
        type: HANDLE_ADD_NEW_LOCATION_DELETE,
        payload: num,
    };
};

export const handleAddNewLocationCountryChange = (num, country) => {
    if (Data[country]) {
        return {
            type: HANDLE_ADD_NEW_LOCATION_COUNTRY_CHANGE,
            num: num,
            payload: Data[country],
        };
    } else {
        return {
            type: HANDLE_ADD_NEW_LOCATION_COUNTRY_CHANGE,
            num: num,
            payload: [],
        };
    }
};

export const handleAddNewLocationUp = num => {
    return {
        type: HANDLE_ADD_NEW_LOCATION_UP,
        num: num,
    };
};

export const handleAddNewLocationDown = num => {
    return {
        type: HANDLE_ADD_NEW_LOCATION_DOWN,
        num: num,
    };
};

export const handleAddNewSubmit = () => {
    return dispatch => {
        let form1 = new FormData(document.form1);
        let isPassed = true;
        if (!form1.has('r_name')) {
            isPassed = false;
            dispatch(handleIsNotPassed({ r_name: false }));
        } else if (!form1.has('r_country')) {
            isPassed = false;
            dispatch(handleIsNotPassed({ r_country: false }));
        } else if (
            !form1.get('r_time') ||
            form1.get('r_time').match(regexp) == null
        ) {
            isPassed = false;
            dispatch(handleIsNotPassed({ r_time: false }));
        }
        if (!isPassed) {
            throw new Error('資料輸入不完整或不符合格式');
        }
        console.log(form1);
        form1.append('r_time_added', new Date().toGMTString());
        fetch(ROOT_URL + '/list', {
            method: 'post',
            body: form1,
        })
            .then(res => res.json())
            .then(obj => {
                if (!obj.success) {
                    console.log('1:route insert not success');
                    throw new Error(obj.errMsg);
                }
                console.log('2:route insert success');
                let a = document.getElementsByClassName('rr_sid');
                for (let i = 0; i < a.length; i++) {
                    a[i].value = obj.thisRoute;
                }
            })
            .then(r => {
                console.log('3:location insert success');
                let form2 = new FormData(document.form2);
                return fetch(ROOT_URL + '/location', {
                    method: 'post',
                    body: form2,
                });
            })
            .then(r => r.json())
            .then(obj => {
                if (!obj.success) {
                    console.log('4:location insert not success');
                    throw new Error(obj.errMsg);
                } else {
                    console.log('5:location insert success');
                    dispatch(addNewSuccess());
                }
            })
            .catch(e => {
                dispatch(addNewFailure('' + e));
            });
    };
};

export const addNewSuccess = () => {
    return {
        type: ADD_NEW_SUCCESS,
    };
};

export const addNewFailure = error => {
    return {
        type: ADD_NEW_FAILURE,
        payload: error,
    };
};

//----------------------------------------------------------------comment ----
export const submitCommentAsync = () => {
    return dispatch => {
        let form_comment = new FormData(document.form_comment);

        fetch(ROOT_URL + '/comment', {
            method: 'post',
            body: form_comment,
        })
            .then(res => res.json())
            .then(r => dispatch(submitCommentSuccess()))
            .catch(e => {
                dispatch(submitCommentFailure('' + e));
            });
    };
};

export const submitCommentSuccess = () => {
    return {
        type: SUMBMIT_COMMENT_SUCCESS,
    };
};

export const submitCommentFailure = error => {
    return {
        type: SUMBMIT_COMMENT_FAILURE,
        payload: error,
    };
};

export const alertDisappear = successType => {
    return {
        type: ALERT_DISAPPEAR,
        successType: successType,
    };
};

export const handleIsNotPassed = payload => {
    return {
        type: HANDLE_IS_NOT_PASSED,
        payload: payload,
    };
};
