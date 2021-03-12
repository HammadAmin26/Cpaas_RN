import { userConstants } from "../../../Shared/Constants/States/user";

  const initialState = {
    channels: [],
  };
  
  const UserData = (state = initialState, action) => {
    switch (action.type) {
      case userConstants.CHANNELS:
        return {
          ...state,
          channels: action.channels,
        };
        case userConstants.CLEAR_USER_DATA: //on logout
            return{
                ...state,
                channels:[]
            }
      default:
        return state;
    }
  };
  
  export default UserData;