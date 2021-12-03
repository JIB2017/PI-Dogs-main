const initialState = {
  dogs: [],
  allDogs: [],
  temperaments: [],
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
        dogs: action.payload,
      };
    case "GET_DOG_NAME":
      return {
        ...state,
        dogs: action.payload,
      };
    case "GET_TEMPERAMENTS":
      return {
        ...state,
        temperaments: action.payload,
      };
    case "POST_DOG":
      return {
        ...state,
      };
    case "FILTER_BY_TEMP":
      const allDogs = state.dogs;
      const allTemps = state.temperaments;
      const tempsFiltered =
        action.payload === "Todos"
          ? allDogs
          : allDogs
      return {
        ...state,
        dogs: tempsFiltered,
      };
    default:
      return state;
  }
}

export default rootReducer;
