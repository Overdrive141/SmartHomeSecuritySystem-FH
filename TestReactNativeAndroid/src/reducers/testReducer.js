import {GET_STREAM} from '../actions/types';

const initialState = {
  loading: true,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_STREAM:
      return {
        ...state,
        loading: false,
        // stream: true,
      };
    default:
      return state;
  }
}
