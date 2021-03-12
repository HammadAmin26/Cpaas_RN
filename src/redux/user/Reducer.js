import { userConstants } from "../../../Shared/Constants/States/user";

  const initialState = {
    user: null, 
  };
  
  const User = (state = initialState, action) => {
    switch (action.type) {
      case userConstants.USER:
        return {
          ...state,
          user: action.user,
        };
        case userConstants.LOGOUT:
        return {
          ...state,
          user: null,
        };
      default:
        return state;
    }
  };
  
  export default User;