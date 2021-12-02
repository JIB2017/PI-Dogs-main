const initialState = {
  allDogs: [],
  dogs: [],
  dogDetail: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_DOGS":
      return {
        ...state,
        dogs: action.payload,
        allDogs: action.payload,
      };
    case "GET_DOG_DETAIL":
      return {
        ...state,
        dogDetail: action.payload,
      };
    default:
      return state;
  }
}

export default rootReducer;
