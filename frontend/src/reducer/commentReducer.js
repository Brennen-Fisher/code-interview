export const INITIAL_STATECOM = {
    userId: "",
    postId: "",
    comment: "",
  };
  
  export const commentReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_INPUT":
        return {
          ...state,
          [action.payload.name]: action.payload.value,
        };
      case "ADD_IMAGES":
        return {
          ...state,
          cover: action.payload.cover,
          images: action.payload.images,
        };
      case "ADD_FEATURE":
        return {
          ...state,
          features: [...state.features, action.payload],
        };
      case "REMOVE_FEATURE":
        return {
          ...state,
          features: state.features.filter(
            (feature) => feature !== action.payload
          ),
        };
  
      default:
        return state;
    }
  };