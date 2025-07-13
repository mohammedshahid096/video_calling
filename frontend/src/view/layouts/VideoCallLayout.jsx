import { memo, useEffect, useCallback, useContext, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import UsersList from '../components/UsersList';
import Context from '@/context/context';
import Header from '../components/Header';
import EmptyCall from '../components/EmptyCall';

const VideoCallLayout = () => {
  const {
    authState: { getAllUsersAction, allUsersList, getAllOnlineUserListAction, onlineUsersList },
    sidebarState: { selectedUser },
  } = useContext(Context);

  const onelineUsersObjects = useMemo(() => {
    return onlineUsersList?.reduce((acc, user) => {
      acc[user?.user] = user;
      return acc;
    }, {});
  }, [onlineUsersList]);

  useEffect(() => {
    if (!allUsersList) {
      getAllUsersAction();
      getAllOnlineUserListAction();
    }
  }, []);

  return (
    <div className="flex gap-3 h-screen w-full">
      <UsersList users={allUsersList} onelineUsersObjects={onelineUsersObjects} />

      <div className="flex flex-col flex-1 gap-3">
        <Card className={'border-none m-0 p-0 overflow-hidden'}>
          <Header />
        </Card>
        <Card className="flex-1 border-none flex items-center justify-center">
          <EmptyCall />
        </Card>
      </div>
    </div>
  );
};

export default memo(VideoCallLayout);
