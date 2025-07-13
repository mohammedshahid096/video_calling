import React, { memo, useState, useMemo, useEffect, useCallback, useContext } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import getInitials from '@/helpers/get-initials';
import { cn } from '@/lib/utils';
import { Search, MoreVertical } from 'lucide-react';
import { CircleUserRound } from 'lucide-react'; // Adjust import if necessary
import { useSocket } from '@/providers/SocketContext';
import { user_reciever_listeners } from '@/constants/socket.constants';
import Context from '@/context/context';

const UsersList = ({ users = [], onelineUsersObjects = {} }) => {
  const {
    authState: { updateAuthStateAction, onlineUsersList },
  } = useContext(Context);
  const { socket, mySocketDetails, setMySocketDetails } = useSocket();
  const [search, setSearch] = useState('');

  const filterUsers = useMemo(() => {
    if (search) {
      return users.filter(
        (user) =>
          user.name.toLowerCase().includes(search.toLowerCase()) ||
          user.userName.toLowerCase().includes(search.toLowerCase())
      );
    } else {
      return users || [];
    }
  }, [search, users]);

  useEffect(() => {
    if (!socket) return;

    socket.on(user_reciever_listeners.me, mySocketDetailsFunction);
    socket.on(user_reciever_listeners.newUserJoined, newUserJoinedSocketFunction);
    socket.on(user_reciever_listeners.userDisconnected, userDisconnectedSocketFunction);

    return () => {
      socket?.off(user_reciever_listeners.me, mySocketDetailsFunction);
      socket?.off(user_reciever_listeners.newUserJoined, newUserJoinedSocketFunction);
      socket?.off(user_reciever_listeners.userDisconnected, userDisconnectedSocketFunction);
      setMySocketDetails(null);
    };
  }, [socket]);

  const mySocketDetailsFunction = useCallback(
    (data) => {
      console.log('My socket details:', data);
      setMySocketDetails(data);
    },
    [socket, mySocketDetails]
  );

  const newUserJoinedSocketFunction = useCallback(
    (data) => {
      console.log('new user joined ', data);
      let updatedOnlineUsersList = onlineUsersList?.find((user) => user._id === data._id)
        ? onlineUsersList
        : [...(onlineUsersList || []), data];
      updateAuthStateAction({
        onlineUsersList: updatedOnlineUsersList,
      });
    },
    [socket, onlineUsersList]
  );

  const userDisconnectedSocketFunction = useCallback(
    (data) => {
      console.log('User disconnected or left:', data);
      let updatedOnlineUsersList = onlineUsersList?.filter((user) => user._id !== data._id);
      updateAuthStateAction({
        onlineUsersList: updatedOnlineUsersList,
      });
    },
    [socket, onlineUsersList]
  );

  return (
    <Card className="w-80 border-none h-full flex flex-col bg-gray-50">
      {/* Search Bar */}
      <div className="p-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search contacts"
            className="pl-10 bg-white shadow dark:bg-gray-800 border-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Users List */}
      <ScrollArea className="flex-1">
        <div className="divide-y divide-gray-200 dark:divide-gray-800">
          {filterUsers?.length === 0 ? (
            <div className="p-4 text-center  text-gray-500 dark:text-gray-400">
              <p className="flex gap-3  items-center justify-center">
                <CircleUserRound /> No users found
              </p>
            </div>
          ) : (
            filterUsers?.map((user) => (
              <div
                key={user?._id}
                className={cn(
                  'flex items-center p-3 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer',
                  'transition-colors duration-150'
                )}
              >
                <div className="relative mr-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={user?.profilePhoto || undefined} />
                    <AvatarFallback className="bg-black text-white">
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <span
                    className={cn(
                      'absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-gray-900',
                      onelineUsersObjects?.[user?._id]?.isOnline ? 'bg-green-500' : 'bg-red-500'
                    )}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium truncate">{user?.name}</h3>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {user?.lastSeen}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                    @{user?.userName}
                  </p>
                </div>

                <button className="ml-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                  <MoreVertical className="h-5 w-5" />
                </button>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </Card>
  );
};

export default memo(UsersList);
