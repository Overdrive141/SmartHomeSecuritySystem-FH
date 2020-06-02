import {
  GET_STREAM,
  KILL_STREAM,
  START_DETECTION,
  STOP_DETECTION,
} from '../actions/types';

const initialState = {
  loading: true,
  stream: false,
  detection: false,
  suspect: {},
  message: {},
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_STREAM:
      return {
        ...state,
        loading: false,
        message: action.payload,
        // stream: true,
      };
    case KILL_STREAM:
      return {
        ...state,
        message: action.payload,
        loading: true,
        stream: false,
      };
    case START_DETECTION:
      return {
        ...state,
        loading: true,
        detection: true,
        suspect: action.payload,
      };
    case STOP_DETECTION:
      return {
        ...state,
        loading: false,
        detection: false,
      };
    default:
      return state;
  }
}
