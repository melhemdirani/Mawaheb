
const INITIAL_STATE = {
  homeData: [],
  aboutusData:[],
  reload: false
}; 

const PageReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SETHOMEDATA":
      return {
        ...state,
        homeData: action.payload
      };
    case "SETABOUTUSDATA":
      return {
        ...state,
        aboutusData: action.payload
      };
    case "RELOAD":
      return {
        ...state,
        reload: !state.reload
      };
    default:
    return state;
  }
};

export default PageReducer;
