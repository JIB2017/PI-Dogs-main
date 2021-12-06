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
      const tempsFiltered =
        action.payload === "Todos"
          ? state.dogs
          : state.dogs.filter((el) =>
              el.name.includes(action.payload) ? el.name : ""
            );
      return {
        ...state,
        dogs: action.payload === "Todos" ? state.dogs : tempsFiltered,
      };
    case "FILTER_BY_CREATED":
      const created =
        action.payload === "created"
          ? state.dogs.filter((d) => d.createdInDb)
          : state.dogs.filter((d) => !d.createdInDb);
      return {
        ...state,
        dogs: action.payload === "Todos" ? state.dogs : created,
      };
    case "FILTER_BY_ORDER":
      let orderTrick =
        action.payload === "A-Z"
          ? state.dogs.sort((a, b) => {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : state.dogs.sort((a, b) => {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        dogs: action.payload === "Nada" ? state.dogs : orderTrick,
      };
    case "FILTER_BY_WEIGHT":
      let weight =
        action.payload === "ASC"
          ? state.dogs.sort((a, b) => {
              if (a.weight.charAt(0) > b.weight.charAt(0)) {
                return 1;
              }
              if (b.weight.charAt(0) > a.weight.charAt(0)) {
                return -1;
              }
              return 0;
            })
          : state.dogs.sort((a, b) => {
              if (a.weight.charAt(0) > b.weight.charAt(0)) {
                return -1;
              }
              if (b.weight.charAt(0) > a.weight.charAt(0)) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        dogs: action.payload === "" ? state.allDogs : weight,
      };
    default:
      return state;
  }
}

export default rootReducer;
