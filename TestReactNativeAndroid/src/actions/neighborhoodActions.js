import axios from 'axios';
import {
  GET_STREAM,
  KILL_STREAM,
  START_DETECTION,
  STOP_DETECTION,
} from './types';

export const getStream = () => dispatch => {
  axios
    .get('http://192.168.200.31:5000/cameraonly')
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
    .get('http://192.168.200.31:5000/killcam')
    .then(res =>
      dispatch({
        type: KILL_STREAM,
        payload: res.data,
      }),
    )
    .catch(err => console.log(err));
};

// export const startDetection = () => dispatch => {
//   axios
//     .post('http://192.168.200.31:5000/opencv')
//     .then(res => {
//       dispatch({
//         type: START_DETECTION,
//         payload: res.data,
//       });
//     })
//     .catch(err => console.log(err));
// };

export const startDetection = () => dispatch => {
  axios
    .get('http://192.168.200.31:5000/testnewnd')
    .then(res => {
      console.log(res);
    })
    .catch(err => console.log(err));
  axios.get('http://192.168.200.194:5000/neighbor').then(res => {
    console.log(res);
  });
};

export const stopDetection = () => dispatch => {
  axios
    .get('http://192.168.200.31:5000/killcv')
    .then(res => {
      dispatch({
        type: STOP_DETECTION,
      });
    })
    .catch(err => console.log(err));
};
