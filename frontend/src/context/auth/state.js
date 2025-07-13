import { useReducer } from 'react';
import { Actions } from './action';
import { authBase, userBase, endpoints } from './constants';
import Reducer from './reducer';
import { setAccessToken, getAccessToken } from '@/helpers/local-storage';
import Service from '@/services';

export const initialState = {
  profileDetails: null,
  allUsersList: null,
  onlineUsersList: null,
};

export const AuthState = () => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  const loginUserAction = async (json) => {
    const url = `${authBase}${endpoints.login}`;
    const response = await Service.fetchPost(url, json);
    if (response[0] === true) {
      const { accessToken, data } = response?.[1];
      setAccessToken(accessToken);
      dispatch({ type: Actions.USER_PROFILE_STATE, payload: data });
    }
    return response;
  };

  const registerUserAction = async (json) => {
    const url = `${authBase}${endpoints.register}`;
    const response = await Service.fetchPost(url, json);
    return response;
  };

  const getUserProfileAction = async () => {
    const url = `${userBase}${endpoints.profile}`;
    const token = getAccessToken();
    const response = await Service.fetchGet(url, token);
    if (response[0] === true) {
      dispatch({ type: Actions.USER_PROFILE_STATE, payload: response[1]?.data });
    }
    return response;
  };

  const getAllUsersAction = async () => {
    const url = `${userBase}${endpoints.allUsers}`;
    const token = getAccessToken();
    const response = await Service.fetchGet(url, token);
    if (response[0] === true) {
      dispatch({ type: Actions.ALL_USERS_STATE, payload: response[1]?.data });
    }
    return response;
  };

  const getAllOnlineUserListAction = async () => {
    const url = `${userBase}${endpoints.onlineUsers}`;
    const token = getAccessToken();
    const response = await Service.fetchGet(url, token);
    if (response[0] === true) {
      dispatch({ type: Actions.ONLINE_USERS_STATE, payload: response[1]?.data });
    }
    return response;
  };

  const updateAuthStateAction = (payload) => {
    dispatch({ type: Actions.UPDATE_AUTH_STATE, payload });
  };

  const resetChatAgentAction = () => {
    dispatch({ type: Actions.RESET_STATE });
  };

  return {
    ...state,
    loginUserAction,
    registerUserAction,
    getUserProfileAction,
    getAllUsersAction,
    getAllOnlineUserListAction,
    updateAuthStateAction,
    resetChatAgentAction,
  };
};
