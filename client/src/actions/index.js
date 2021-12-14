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

export function getDogName(name) {
  return async function (dispatch) {
    var json = await axios.get(`http://localhost:3001/dogs?name=${name}`);
    return dispatch({
      type: "GET_DOG_NAME",
      payload: json.data,
    });
  };
}

export function getTemperaments() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/temperament");
    return dispatch({
      type: "GET_TEMPERAMENTS",
      payload: json.data,
    });
  };
}

export function postDog(form) {
  return async function (dispatch) {
    var json = await axios.post("http://localhost:3001/dog", form);
    return json;
  };
}

export function filterByTemperament(payload) {
  return {
    type: "FILTER_BY_TEMP",
    payload,
  };
}

export function filterByCreated(payload) {
  return {
    type: "FILTER_BY_CREATED",
    payload,
  };
}

export function filterByOrder(payload) {
  console.log(payload);
  return {
    type: "FILTER_BY_ORDER",
    payload,
  };
}

export function filterByWeight(payload) {
  return {
    type: "FILTER_BY_WEIGHT",
    payload,
  };
}
