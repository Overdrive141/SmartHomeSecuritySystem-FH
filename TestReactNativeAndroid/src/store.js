import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
// import neighborhoodReducer from './reducers/neighborhoodReducer';
import rootReducer from './reducers';
import {composeWithDevTools} from 'remote-redux-devtools';

const initialState = {};

const middleware = [thunk];

// const store = createStore(
//   neighborhoodReducer,
//   initialState,
//   compose(applyMiddleware(...middleware)),
// );

const composeEnhancers = composeWithDevTools({realtime: true});

const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(applyMiddleware(...middleware)),
);
// const configureStore = () => {
//   return createStore(
//     neighborhoodReducer,
//     initialState,
//     composeWithDevTools(applyMiddleware(...middleware)),
//   );
// };

// export default function configureStore() {
//   const store = createStore(
//     neighborhoodReducer,
//     initialState,
//     composeWithDevTools(applyMiddleware(...middleware)),
//   );
//   return store;
// }

export default store;
