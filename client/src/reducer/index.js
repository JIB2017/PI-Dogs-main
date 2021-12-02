const initialState = {
  allDogs: [],
  dogs: [],
  dogDetail: [],
  temperaments: []
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
    case "GET_DOG_NAME":
      return {
        ...state,
        dogs: action.payload,
      };
      case "GET_TEMPERAMENTS":
        return {
          ...state,
          temperaments: action.payload
        }
      case "POST_DOG":
        return {
          ...state,
        }
    default:
      return state;
  }
}

export default rootReducer;
