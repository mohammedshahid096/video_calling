import { initialState } from './state';

const actionHandlers = {
  IS_SIDEBAR_OPEN: (state, action) => ({
    ...state,
    isSidebarOpen: action.payload,
  }),
  SELECTED_USER_STATE: (state, action) => ({
    ...state,
    selectedUser: action.payload,
  }),

  RECIEVING_CALL_STATE: (state, action) => ({
    ...state,
    reciveingCall: action.payload,
  }),

  CALLER_STATE: (state, action) => ({
    ...state,
    callerDetails: action.payload,
  }),

  UPDATE_SIDEBAR_STATE: (state, action) => ({
    ...state,
    ...action.payload,
  }),
  RESET_STATE: () => ({ ...initialState }),
};
const Reducer = (state, action) => {
  const handler = actionHandlers[action?.type];
  return handler ? handler(state, action) : state;
};

export default Reducer;
