// Sample Code !!!

// Array based approach

const streamReducer = (state = [], action) => {
  switch (action.type) {
    case EDIT_STREAM:
      return state.map(stream => {
        if (stream.id === action.payload.id) {
          return action.payload;
        } else {
          return stream;
        }
      });
    default:
      return state;
  }
};

// Object based approach !!!

const streamReducer = (state = {}, action) => {
  switch (action.type) {
    case EDIT_STREAM:
      //must return brand new object from reducer so redux can see taht we did update state and rerender
      // const newState={...state};
      // newSate[action.payload.id] = action.payload;
      // return newState;
      // new  ES2015 syntax (key interpolation)
      return { ...state, [action.payload.id]: action.payload };
    default:
      return state;
  }
};
