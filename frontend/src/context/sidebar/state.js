import { useReducer } from 'react';
import { Actions } from './action';
import Reducer from './reducer';

export const initialState = {
  isSidebarOpen: true,
  selectedUser: null,
  stream: null,
  reciveingCall: false,
  callerDetails: null,
};

export const SidebarState = () => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  const isSidebarOpenAction = (isOpen) => {
    dispatch({ type: Actions.IS_SIDEBAR_OPEN, payload: isOpen });
  };

  const selectedUserAction = (details = null) => {
    dispatch({ type: Actions.SELECTED_USER_STATE, payload: details });
  };

  const streamAction = (stream = null) => {
    dispatch({ type: Actions.SET_STREAM_STATE, payload: stream });
  };

  const reciveingCallAction = (reciveing = false) => {
    dispatch({ type: Actions.RECIEVING_CALL_STATE, payload: reciveing });
  };

  const callerDetailsAction = (details = null) => {
    dispatch({ type: Actions.CALLER_STATE, payload: details });
  };

  const updateSidebarStateAction = (payload) => {
    dispatch({ type: Actions.UPDATE_SIDEBAR_STATE, payload });
  };

  const resetSidebarAction = () => {
    dispatch({ type: Actions.RESET_STATE });
  };

  return {
    ...state,
    isSidebarOpenAction,
    selectedUserAction,
    streamAction,
    reciveingCallAction,
    callerDetailsAction,
    updateSidebarStateAction,
    resetSidebarAction,
  };
};
