import { initialState } from './state';

const actionHandlers = {
  USER_PROFILE_STATE: (state, action) => ({
    ...state,
    profileDetails: action.payload,
  }),
  ALL_USERS_STATE: (state, action) => ({
    ...state,
    allUsersList: action.payload,
  }),
  ONLINE_USERS_STATE: (state, action) => ({
    ...state,
    onlineUsersList: action.payload,
  }),
  UPDATE_AUTH_STATE: (state, action) => ({
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
