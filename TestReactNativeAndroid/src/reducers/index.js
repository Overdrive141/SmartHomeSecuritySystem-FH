import {combineReducers} from 'redux';
import neighborhoodReducer from './neighborhoodReducer';
import testReducer from './testReducer';
import statusReducer from './statusReducer';
import errorReducer from './errorReducer';
import patternReducer from './patternReducer';

export default combineReducers({
  neighborhood: neighborhoodReducer,
  test: testReducer,
  status: statusReducer,
  error: errorReducer,
  patternstamp: patternReducer,
});
