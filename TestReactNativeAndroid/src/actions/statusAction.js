import axios from 'axios';
import {
  GET_FLASK_HEALTHSTATUS,
  GET_NODE_HEALTHSTATUS,
  GET_ERRORS,
} from './types';

export const getNodeHealthStatus = () => dispatch => {
  axios
    .get('http://192.168.200.31:5000/')
    .then(res =>
      dispatch({
        type: GET_NODE_HEALTHSTATUS,
        payload: res.data,
      }),
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err,
      }),
    );
};

export const getFlaskHealthStatus = () => dispatch => {
  axios
    .get('http://192.168.200.3:5000/')
    .then(res =>
      dispatch({
        type: GET_FLASK_HEALTHSTATUS,
        payload: res.data,
      }),
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err,
      }),
    );
};
