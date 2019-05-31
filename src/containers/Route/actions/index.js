import Data from "../data/countryData.json";

// export const submitCommentFailure = error => {
//     return {
//         type: SUMBMIT_COMMENT_FAILURE,
//         payload: error,
//     };
// };

export const FETCH_POSTS_SUCCESS = "FETCH_POST_SUCCESS";
export const FETCH_POSTS_FAILURE = "FETCH_POST_FAILURE";
export const FETCH_SINGLE_SUCCESS = "FETCH_SINGLE_SUCCESS";
export const FETCH_SINGLE_FAILURE = "FETCH_SINGLE_FAILURE";
export const HANDLE_COUNTRY_CHANGE = "HANDLE_COUNTRY_CHANGE";
export const HANDLE_ADD_NEW_LOCATION = "HANDLE_ADD_NEW_LOCATION";
export const HANDLE_ADD_NEW_LOCATION_DELETE = "HANDLE_ADD_NEW_LOCATION_DELETE";
export const HANDLE_ADD_NEW_LOCATION_COUNTRY_CHANGE =
  "HANDLE_ADD_NEW_LOCATION_COUNTRY_CHANGE";
export const HANDLE_ADD_NEW_LOCATION_UP = "HANDLE_ADD_NEW_LOCATION_MOVE_UP";
export const HANDLE_ADD_NEW_LOCATION_DOWN = "HANDLE_ADD_NEW_LOCATION_DOWN";
export const ADD_NEW_SUCCESS = "ADD_NEW_SUCCESS";
export const ADD_NEW_FAILURE = "ADD_NEW_FAILURE";
export const ADD_NEW_RESET = "ADD_NEW_RESET";
export const SUMBMIT_COMMENT_SUCCESS = "SUMBMIT_COMMENT_SUCCESS";
export const SUMBMIT_COMMENT_FAILURE = "SUMBMIT_COMMENT_FAILURE";
export const HANDLE_IS_NOT_PASSED = "HANDLE_IS_NOT_PASSED";
export const SET_LOGIN_STATUS = "SET_LOGIN_STATUS";
export const UPDATE_COMMENT_SECTION = "UPDATE_COMMENT_SECTION";
export const ALERT_APPEAR = "ALERT_APPEAR ";
export const ALERT_DISAPPEAR = " ALERT_DISAPPEAR";
export const HANDLE_DEPART_ARRIVE_CHANGE = "HANDLE_DEPART_ARRIVE_CHANGE";
export const CLEAR_POSTS_BEFORE = "CLEAR_POSTS_BEFORE";
export const ADD_TO_LIKE_SUCCESS = "ADD_TO_LIKE_SUCCESS";

const ROOT_URL = "http://localhost:5000/route";
const regexp = /^\d{1,3}天\d{1,2}時\d{1,2}分$|^\d{1,3}天\d{1,2}時$|^\d{1,3}天$|^\d{1,2}時\d{1,2}分$|^\d{1,2}時$|^\d{1,2}分$|\d{1,3}天\d{1,2}分$/;

export const setLoginStatus = () => {
  console.log("setLoginStatus action");

  return dispatch => {
    fetch("http://localhost:5000/is_logined", {
      method: "GET",
      credentials: "include",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json"
      })
    })
      .then(r => r.json())
      .then(obj => {
        console.log("dispatch to setLoginStatus action");
        dispatch(setUserStatus(obj));
      })
      .catch(e => console.log(e));
  };
};

export const setUserStatus = status => {
  console.log("setUserStatus action");
  console.log(status);

  return {
    type: SET_LOGIN_STATUS,
    payload: status
  };
};

// export const fetchPosts = payload => ({ type: FETCH_POSTS, payload: payload });
export const fetchPostsAsync = page => {
  return dispatch => {
    if (!page) {
      page = 0;
    }
    fetch(ROOT_URL + "/list?orderby=DESC&page=" + page, {
      //fetch(ROOT_URL, {
      method: "get"
      // credentials: 'include',
    })
      .then(res => res.json())
      .then(obj => {
        // console.log(obj);
        dispatch(fetchPostsSuccess(obj, page));
      })
      .catch(e => {
        dispatch(fetchPostsFailure("" + e));
      });
  };
};

export const fetchPostsSuccess = (payload, page) => {
  return {
    type: FETCH_POSTS_SUCCESS,
    payload: payload,
    page: page
  };
};

export const fetchPostsFailure = error => {
  return {
    type: FETCH_POSTS_FAILURE,
    payload: error
  };
};

export const fetchSingleAsync = r_sid => {
  return dispatch => {
    fetch(ROOT_URL + "/" + r_sid, {
      method: "get"
    })
      .then(res => res.json())
      .then(obj => {
        dispatch(fetchSingleSuccess(obj));
      })
      .catch(e => {
        dispatch(fetchSingleFailure("" + e));
      });
  };
};

export const fetchSingleSuccess = payload => {
  return {
    type: FETCH_SINGLE_SUCCESS,
    payload: payload
  };
};

export const fetchSingleFailure = error => {
  return {
    type: FETCH_SINGLE_FAILURE,
    payload: error
  };
};
export const handleChangeDepartArrive = (depart, arrive) => {
  return {
    type: HANDLE_DEPART_ARRIVE_CHANGE,
    depart: depart,
    arrive: arrive
  };
};
export const handleCountryChange = country => {
  if (Data[country]) {
    return {
      type: HANDLE_COUNTRY_CHANGE,
      payload: Data[country]
    };
  } else {
    return {
      type: HANDLE_COUNTRY_CHANGE,
      payload: []
    };
  }
};

export const handleAddNewLocation = () => {
  return {
    type: HANDLE_ADD_NEW_LOCATION
  };
};

export const handleAddNewLocationDelete = num => {
  return {
    type: HANDLE_ADD_NEW_LOCATION_DELETE,
    payload: num
  };
};

export const handleAddNewLocationCountryChange = (num, country) => {
  if (Data[country]) {
    return {
      type: HANDLE_ADD_NEW_LOCATION_COUNTRY_CHANGE,
      num: num,
      payload: Data[country]
    };
  } else {
    return {
      type: HANDLE_ADD_NEW_LOCATION_COUNTRY_CHANGE,
      num: num,
      payload: []
    };
  }
};

export const handleAddNewLocationUp = num => {
  return {
    type: HANDLE_ADD_NEW_LOCATION_UP,
    num: num
  };
};

export const handleAddNewLocationDown = num => {
  return {
    type: HANDLE_ADD_NEW_LOCATION_DOWN,
    num: num
  };
};

export const handleAddNewSubmit = userid => {
  console.log("msid=" + typeof userid);
  return dispatch => {
    let form1 = new FormData(document.form1);
    let isPassed = true;
    // let notPassedObj={
    //     r_name: true,
    //     r_time: true,
    //     r_country: true,
    //     r_depart: true,
    //     r_arrive: true,
    // }
    // console.log('bbbbbbbbbbbbbbbb')
    //console.log(typeof form1.get('r_country'))
    if (form1.get("r_name").trim().length === 0) {
      console.log(form1.get("r_name"));
      //notPassedObj.r_name=false;
      isPassed = false;
      dispatch(handleIsNotPassed({ r_name: false }));
    } else {
      dispatch(handleIsNotPassed({ r_name: true }));
    }
    if (form1.get("r_country").length === 0) {
      isPassed = false;
      dispatch(handleIsNotPassed({ r_country: false }));
    } else {
      dispatch(handleIsNotPassed({ r_country: true }));
    }
    if (form1.get("r_arrive").length === 0) {
      isPassed = false;
      dispatch(handleIsNotPassed({ r_arrive: false }));
    } else {
      dispatch(handleIsNotPassed({ r_arrive: true }));
    }
    if (form1.get("r_depart").length === 0) {
      isPassed = false;
      dispatch(handleIsNotPassed({ r_depart: false }));
    } else {
      dispatch(handleIsNotPassed({ r_depart: true }));
    }
    if (
      form1.get("r_time").length === 0 ||
      form1.get("r_time").match(regexp) == null
    ) {
      isPassed = false;
      //notPassedObj.r_time=false;
      dispatch(handleIsNotPassed({ r_time: false }));
    } else {
      dispatch(handleIsNotPassed({ r_time: true }));
    }
    if (!isPassed) {
      //dispatch(handleIsNotPassed(notPassedObj))
      return dispatch(addNewFail2("資料輸入不完整或不符合格式"));

      //throw new Error("資料輸入不完整或不符合格式");
    }
    //console.log(form1);
    form1.append("m_sid", userid);
    form1.append("r_time_added", new Date().toGMTString());
    fetch(ROOT_URL + "/list", {
      method: "post",
      body: form1
    })
      .then(res => res.json())
      .then(obj => {
        if (!obj.success) {
          //console.log('1:route insert not success');
          throw new Error(obj.errMsg);
        }
        //console.log('2:route insert success');
        let a = document.getElementsByClassName("rr_sid");
        for (let i = 0; i < a.length; i++) {
          a[i].value = obj.thisRoute;
        }
        return a.length;
      })
      .then(a => {
        if (+a === 0) {
          dispatch(addNewSuccess());
          dispatch(alertAppear(true, "路線新增成功"));
          throw new Error("NOT");
        }
      })
      .then(r => {
        //console.log('3:location insert success');
        let form2 = new FormData(document.form2);
        return fetch(ROOT_URL + "/location", {
          method: "post",
          body: form2
        });
      })
      .then(r => r.json())
      .then(obj => {
        if (!obj.success) {
          //console.log('4:location insert not success');
          throw new Error(obj.errMsg);
        } else {
          //console.log('5:location insert success');
          dispatch(addNewSuccess());
          dispatch(alertAppear(true, "路線新增成功"));
        }
      })
      .catch(e => {
        //console.log(e)
        //console.log(typeof e)
        if ("" + e === "Error: NOT") {
          dispatch(addNewSuccess());
          dispatch(alertAppear(true, "路線新增成功"));
        } else {
          console.log("in fail2");
          dispatch(addNewFailure("" + e));
          dispatch(alertAppear(false, e + "".slice(6)));
        }
      });
  };
};

export const addNewSuccess = () => {
  return {
    type: ADD_NEW_SUCCESS
  };
};

export const addNewFailure = error => {
  return {
    type: ADD_NEW_FAILURE,
    payload: error
  };
};

export const addNewFail2 = error => {
  return dispatch => {
    dispatch(addNewFailure(error));
    dispatch(alertAppear(false, error));
  };
};

export const addNewReset = () => {
  return {
    type: ADD_NEW_RESET
  };
};

//----------------------------------------------------------------comment ----
export const submitCommentAsync = () => {
  return dispatch => {
    let form_comment = new FormData(document.form_comment);

    fetch(ROOT_URL + "/comment", {
      method: "post",
      body: form_comment
    })
      .then(res => res.json())
      .then(r => {
        if (r.success) {
          dispatch(submitCommentSuccess());
          return r.rsid;
        } else {
          throw new Error(r.errMsg);
        }
      })
      .then(rsid =>
        fetch(ROOT_URL + "/comment/" + rsid, {
          method: "get"
        })
      )
      .then(res => res.json())
      .then(r => dispatch(updateCommentSection(r.comment)))
      .catch(e => {
        dispatch(submitCommentFailure("" + e));
      });
  };
};

export const updateCommentSection = payload => {
  return {
    type: UPDATE_COMMENT_SECTION,
    payload: payload
  };
};

export const submitCommentSuccess = () => {
  return {
    type: SUMBMIT_COMMENT_SUCCESS
  };
};
export const submitCommentFailure = error => {
  return {
    type: ALERT_APPEAR,
    payload: error
  };
};
//alert -------------------alert

export const alertAppear = (success, msg) => {
  return {
    type: ALERT_APPEAR,
    payload: { success: success, msg: msg }
  };
};

export const alertDisappear = () => {
  return {
    type: ALERT_DISAPPEAR
  };
};

export const handleIsNotPassed = payload => {
  return {
    type: HANDLE_IS_NOT_PASSED,
    payload: payload
  };
};

export const handleSearch = page => {
  let formSearch = new FormData(document.searchform);
  return dispatch => {
    fetch(ROOT_URL + "/search", {
      method: "post",
      body: formSearch
    })
      .then(res => res.json())
      .then(obj => {
        console.log("fetch-search-success");
        console.log(obj);
        if (obj.errMsg !== "未輸入關鍵字") {
          dispatch(clearPostsBefore());
        }
        dispatch(fetchPostsSuccess(obj.data, 0));
      })
      .catch(e => {
        dispatch(fetchPostsFailure("" + e));
      });
  };
};

export const clearPostsBefore = () => {
  return {
    type: CLEAR_POSTS_BEFORE
  };
};

// export const handlelikeAsync = r_sid => {
//   return dispatch => {
//     r_sid;
//     let a = new FormData();
//     a.append();
//     fetch(ROOT_URL + "/like", {
//       method: "put",
//       body: "a"
//     })
//       .then(res => res.json())

//         dispatch(addToLikeSuccess(obj.data, 0));
//       })
//       .catch(e => {
//         console.log(e);
//       });
//   };
// };
// export const addToLikeSuccess = r_sid => {
//   return {
//     type: ADD_TO_LIKE_SUCCESS,
//     payload: payload
//   };
// };
