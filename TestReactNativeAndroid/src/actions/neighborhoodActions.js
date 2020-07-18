import axios from 'axios';
import {
  GET_STREAM,
  KILL_STREAM,
  START_DETECTION,
  STOP_DETECTION,
} from './types';
import {PUBLIC_IP} from '../env';

export const getStream = () => dispatch => {
  axios
    .get(`${PUBLIC_IP}:6000/cameraonly`)
    .then(res =>
      dispatch({
        type: GET_STREAM,
        payload: res.data,
      }),
    )
    .catch(err =>
      dispatch({
        type: GET_STREAM,
        payload: err.response.data,
      }),
    );
};

export const killStream = () => dispatch => {
  axios
    .get(`${PUBLIC_IP}:6000/killcam`)
    .then(res =>
      dispatch({
        type: KILL_STREAM,
        payload: res.data,
      }),
    )
    .catch(err => console.log(err));
};

export const startDetection = () => dispatch => {
  axios.get(`${PUBLIC_IP}:5000/neighbor`).then(res => {
    console.log(res);
  });
  axios
    .get(`${PUBLIC_IP}:6000/testnewnd`)
    .then(res => {
      console.log(res);
    })
    .catch(err => console.log(err));
};

export const stopDetection = () => dispatch => {
  axios
    .get(`${PUBLIC_IP}:6000/killcv`)
    .then(res => {
      dispatch({
        type: STOP_DETECTION,
      });
    })
    .catch(err => console.log(err));
};
