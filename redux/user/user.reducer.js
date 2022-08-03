
const INITIAL_STATE = {
  signedIn: false,
  role: '',
  name: '',
  notifications: [],
  newNotifications: [],
  user: {}
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SIGNIN":
      return {
        ...state,
        role: action.payload.role,
        signedIn: true,
        name: action.payload.name,
        notifications: action.payload.notifications,
      };
    case "SIGNOUT":
      return {
        ...state,
        signedIn: false,
        role: '',
        name: ''
      };
    case "CLEARNOTIFICATIONS":
      return {
        ...state,
        notifications: [],
      };
    case "SETUSER":
      return {
        ...state,
        user: {...user, ...action.payload},
      };
    default:
    return state;
  }
};

export default userReducer;
