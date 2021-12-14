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
      let tempsFiltered = state.allDogs.filter((el) =>
        el.temperament.includes(action.payload)
      );
      return {
        ...state,
        dogs: tempsFiltered,
      };
    case "FILTER_BY_CREATED":
      let creados = state.allDogs.filter((d) => typeof d.id === "string"); // creados
      let api = state.allDogs.filter((d) => typeof d.id !== "string"); // api
      return {
        ...state,
        dogs: action.payload === "created" ? creados : api,
      };
    case "FILTER_BY_ORDER":
      let orderTrick =
        action.payload === "A-Z"
          ? state.dogs.sort((a, b) => {
              if (a.name > b.name) return 1;
              if (b.name > a.name) return -1;
              return 0;
            })
          : state.dogs.sort((a, b) => {
              if (a.name > b.name) return -1;
              if (b.name > a.name) return 1;
              return 0;
            });
      return {
        ...state,
        dogs: orderTrick,
      };
    case "FILTER_BY_WEIGHT":
      let array =
        action.payload === "ASC"
          ? state.dogs.sort((a, b) => {
              return (
                (a.weight.split(" - ")[0] !== "NaN"
                  ? a.weight.split(" - ")[0]
                  : 10) -
                (b.weight.split(" - ")[0] !== "NaN"
                  ? b.weight.split(" - ")[0]
                  : 10)
              );
            })
          : state.dogs.sort((a, b) => {
              return (
                (b.weight.split(" - ")[0] !== "NaN"
                  ? b.weight.split(" - ")[0]
                  : 10) -
                (a.weight.split(" - ")[0] !== "NaN"
                  ? a.weight.split(" - ")[0]
                  : 10)
              );
            });
      return {
        ...state,
        dogs: array,
      };
    default:
      return state;
  }
}

export default rootReducer;
