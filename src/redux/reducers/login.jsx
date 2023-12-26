const initialState = false;

const reducer = ( state = initialState, action ) => {
  if(action.type === "Login"){
    state = action.payload;
  }
  return state;
}

export default reducer;