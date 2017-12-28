import moment from 'moment';
import * as types from '../constants/actionTypes';
import { refreshToken } from './authAction';
import Api, { Action } from '../utils/apiUtil';
import config from '../config';

export function getGroupMember(token) {
  return (dispatch) => {
    dispatch(Action(types.LOAD_DIGITAL_CARD));
    return Api.jsonService(`${config.serviceApi}MDP/api/cards/getGroupMember`, 'get', null, token)
      .then((result) => {
        dispatch(Action(types.LOAD_DIGITAL_CARD_SUCCESS, result.Payload.data));
      })
      .catch((error) => {
        dispatch(Action(types.LOAD_DIGITAL_CARD_FAIL, error.response._bodyText)); // eslint-disable-line
      });
  };
}

export function loadDigitalCard(user) {
  return (dispatch) => {
    if (moment().isBefore(user.expires)) {
      return getGroupMember(`${user.token_type} ${user.access_token}`)(dispatch);
    }
    return refreshToken({ refresh_token: user.refresh_token, grant_type: 'refresh_token' })(dispatch).then(() => getGroupMember(user.access_token)(dispatch));
  };
}
