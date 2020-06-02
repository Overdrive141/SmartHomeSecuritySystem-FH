import {GET_PATTERNSTAMP} from '../actions/types';

const initialState = {
  //   loading: true,
  patternstamp: '',
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PATTERNSTAMP:
      return {
        ...state,
        // loading: false,
        patternstamp: action.payload,
        // stream: true,
      };

    default:
      return state;
  }
}
