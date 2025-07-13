import { Card } from '@/components/ui/card';
import React, { memo, useCallback, useContext } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import getInitials from '@/helpers/get-initials';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { PhoneCall } from 'lucide-react';
import Context from '@/context/context';

const CallUserComponent = ({ user, startCallingFunctionHandler }) => {
  const {
    sidebarState: { selectedUserAction, isSidebarOpenAction },
  } = useContext(Context);

  const cancelCallFunction = useCallback(() => {
    selectedUserAction(null);
    isSidebarOpenAction(true);
  }, []);

  const startCallFunction = useCallback(() => {
    isSidebarOpenAction(false);
    startCallingFunctionHandler();
  }, []);

  return (
    <Card className="w-full max-w-lg bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <div className="flex justify-end px-4 pt-4"></div>
      <div className="flex flex-col items-center pb-10">
        <div className="relative my-4">
          <Avatar className="h-24 w-24">
            <AvatarImage src={user?.profilePhoto || undefined} />
            <AvatarFallback className="bg-black text-white text-3xl">
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>
          <span
            className={cn(
              'absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-gray-900'
              //   onelineUsersObjects?.[user?._id]?.isOnline ? 'bg-green-500' : 'bg-red-500'
            )}
          />
        </div>
        <h5 className="mb-1 text-xl  text-gray-900 dark:text-white font-bold capitalize">
          {user?.name}
        </h5>
        <span className="text-md text-gray-500 dark:text-gray-400 my-1">{user?.email}</span>
        <span className="text-sm text-gray-500 dark:text-gray-300">{user?.userName}</span>
        <div className="flex mt-4 md:mt-6 gap-3">
          <Button
            className="inline-flex items-center px-8 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-green-600 dark:hover:bg-green-700 w-30 cursor-pointer"
            onClick={startCallFunction}
          >
            Call <PhoneCall />
          </Button>
          <Button className={'cursor-pointer'} onClick={cancelCallFunction}>
            Cancel
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default memo(CallUserComponent);
