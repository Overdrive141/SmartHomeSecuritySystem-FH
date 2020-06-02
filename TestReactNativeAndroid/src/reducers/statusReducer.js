import {GET_NODE_HEALTHSTATUS} from '../actions/types';
import {GET_FLASK_HEALTHSTATUS} from '../actions/types';

const initialState = {
  //   loading: true,
  nodeStatus: '',
  flaskStatus: '',
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_NODE_HEALTHSTATUS:
      return {
        ...state,
        // loading: false,
        nodeStatus: action.payload,
        // stream: true,
      };

    case GET_FLASK_HEALTHSTATUS:
      return {
        ...state,
        // loading: false,
        flaskStatus: action.payload,
        // stream: true,
      };

    default:
      return state;
  }
}
