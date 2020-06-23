import axios from 'axios';

import {GET_PATTERNSTAMP} from './types';
import {PUBLIC_IP} from '../env';

export const getPatternStamp = () => dispatch => {
  axios
    // .get('http://192.168.200.3:5000/pattern')
    .get(`${PUBLIC_IP}:5000/pattern`)
    .then(res =>
      dispatch({
        type: GET_PATTERNSTAMP,
        payload: res.data,
      }),
    )
    .catch(err =>
      dispatch({
        type: GET_PATTERNSTAMP,
        payload: err,
      }),
    );
};
