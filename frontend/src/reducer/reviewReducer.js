export const INITIAL_STATEREV = {
    userId: "",
    postId: "",
    star: "",
  };
  
  export const reviewReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_INPUT":
        return {
          ...state,
          [action.payload.name]: action.payload.value,
        };
  
      default:
        return state;
    }
  };