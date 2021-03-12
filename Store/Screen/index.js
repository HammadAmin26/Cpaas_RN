import { screenConstants } from "../../Shared/Constants/States/screen";
const SCREENS = (
  state = {
    LOGIN: true,
    PROFILE: false,
    MAIN: false,
    LOGOUT: false,
    CONTACTS: false,
    GROUPS: false,
    CHATS: false,
    ROOM: false,
    TABS: false,
    MESSAGE: false,
    CALL: false,
    VIDEOCALL: false,
    VIDEO_CALL_ACCEPTED:false,

    SHOWIMAGE: null,
    OUTGOING_CALL: false,
    INCOMMING_CALL: false,
    UNSEENLIST: [],
    FILE_ERROR: false,
    PARTICIPANTS_LIST: false,
    CALLING_TO: {},
    BADGE:false,
    CALL_FROM:''
  },
  action
) => {
  switch (action.type) {
    case screenConstants.LOGIN:
      return {
        ...state,
        LOGIN: action.status,
      };
    case screenConstants.PROFILE:
      return {
        ...state,
        PROFILE: action.status,
      };
    case screenConstants.MAIN:
      return {
        ...state,
        MAIN: action.status,
      };
    case screenConstants.LOGOUT:
      return {
        ...state,
        LOGOUT: action.status,
      };
    case screenConstants.CONTACTS:
      return {
        ...state,
        CONTACTS: action.status,
      };
    case screenConstants.GROUPS:
      return {
        ...state,
        GROUPS: action.status,
      };
    case screenConstants.CHATS:
      return {
        ...state,
        CHATS: action.status,
      };
    case screenConstants.ROOM:
      return {
        ...state,
        ROOM: action.status,
      };
    case screenConstants.TABS:
      return {
        ...state,
        TABS: action.status,
      };
    case screenConstants.MESSAGE:
      return {
        ...state,
        MESSAGE: action.status,
      };
    case screenConstants.CALL:
      return {
        ...state,
        CALL: action.status,
      };
    case "START_VIDEO_CALL":
      return {
        ...state,
        VIDEOCALL: true,
      };
      case "VIDEO_CALL_ACCEPTED":
        return{
          ...state,
          OUTGOING_CALL: false,
        }
    case "END_VIDEO_CALL":
      return {
        ...state,
        VIDEOCALL: false,
        VIDEO_CALL_ACCEPTED:false
      };
    case "SHOW_IMAGE_FULL":
      return {
        ...state,
        SHOWIMAGE: action.payload,
      };
    case "HIDE_IMAGE_FULL":
      return {
        ...state,
        SHOWIMAGE: null,
      };
    case screenConstants.OUTGOING_CALL:
      return {
        ...state,
        VIDEOCALL: true,
        OUTGOING_CALL: true,
        CALLING_TO: action.payload,
      };
    case screenConstants.CANCEL_OUTGOING_CALL:
      return {
        ...state,
        VIDEOCALL: false,
        CALLING_TO: {},
        OUTGOING_CALL: false,
      };
    case screenConstants.INCOMMING_CALL:
      return {
        ...state,
        CALL_FROM:action.payload,
        INCOMMING_CALL: true

        // VIDEOCALL: true,

      };
    case screenConstants.ACCEPT_INCOMMING_CALL:
      return {
        ...state,
        INCOMMING_CALL: false,
        // VIDEOCALL: true,
        VIDEO_CALL_ACCEPTED:true
      };
    case screenConstants.DECLINE_INCOMMING_CALL:
      return {
        ...state,
        // VIDEOCALL: false,
        INCOMMING_CALL: false,
      };
      case 'VIDEO_CALL_COMPLETED':
      return {
        ...state,
        VIDEOCALL: false,
        VIDEO_CALL_ACCEPTED :false,

      };
    case "UNSEENLIST":
      return {
        ...state,
        UNSEENLIST: action.payload,
      };
    case "FILE_ERROR":
      return {
        ...state,
        FILE_ERROR: action.payload,
      };
    case "PARTICIPANTS_LIST":
      return {
        ...state,
        PARTICIPANTS_LIST: action.payload,
      };
      case "REJECT_VIDEO_CALL":
        return {
          ...state,
          VIDEOCALL: false,
          OUTGOING_CALL: false,
          INCOMMING_CALL: false,
          CALLING_TO: {},
          VIDEO_CALL_ACCEPTED:false
        };
        case "BADGE":
          return {
            ...state,
           BADGE:action.payload
          };

    case screenConstants.COMPACT:
      return { ...state, ...action.status };

      case "LOGOUT_NEW":
        return{
          ...state,
            LOGIN: true,
            PROFILE: false,
            MAIN: false,
            LOGOUT: false,
            CONTACTS: false,
            GROUPS: false,
            CHATS: false,
            ROOM: false,
            TABS: false,
            MESSAGE: false,
            CALL: false,
            VIDEOCALL: false,
            VIDEO_CALL_ACCEPTED:false,
            SHOWIMAGE: null,
            OUTGOING_CALL: false,
            INCOMMING_CALL: false,
            UNSEENLIST: [],
            FILE_ERROR: false,
            PARTICIPANTS_LIST: false,
            CALLING_TO: {},
            BADGE:false,
            CALL_FROM:''
        }
    default:
      return state;
  }
  
};
const current_screen = (state = 1, action) => {
  switch (action.type) {
    case screenConstants.CURRENT_SCREEN:
      return action.screen;
    default:
      return state;
  }
};

export { SCREENS, current_screen };
