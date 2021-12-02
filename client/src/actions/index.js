import axios from "axios";

export function getDogs() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/dogs");
    return dispatch({
      type: "GET_DOGS",
      payload: json.data,
    });
  };
}

export function getDogDetail(id) {
  return async function (dispatch) {
    var json = await axios.get(`http://localhost:3001/dogs/${id}`);
    return dispatch({
      type: "GET_DOG_DETAIL",
      payload: json.data,
    });
  };
}
