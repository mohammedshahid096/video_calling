import { useMemo } from 'react';
import { AuthState } from '@context/auth/state';
import { SidebarState } from '@context/sidebar/state';

const useCombineState = () => {
  const authState = AuthState();
  const sidebarState = SidebarState();
  return useMemo(() => ({ authState, sidebarState }), [authState, sidebarState]);
};

export default useCombineState;
