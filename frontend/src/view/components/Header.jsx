import React, { useContext, memo } from 'react';
import Context from '@/context/context';
import getInitials from '@/helpers/get-initials';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Header = () => {
  const {
    authState: { profileDetails },
  } = useContext(Context);

  return (
    // <header className="w-full bg-white shadow flex items-center px-6 py-3">
    //   <div className="flex items-center gap-4">
    //     <img
    //       src={profileDetails?.profilePhoto || '/default-avatar.png'}
    //       alt={profileDetails?.name || 'User'}
    //       className="w-12 h-12 rounded-full object-cover border border-gray-200"
    //     />
    //     <div>
    //       <div className="font-semibold text-lg text-gray-800">{profileDetails?.name}</div>
    //       <div className="text-sm text-gray-500">{profileDetails?.email}</div>
    //     </div>
    //   </div>
    // </header>
    <div
      className={cn(
        'flex items-center p-3 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer',
        'transition-colors duration-150'
      )}
    >
      <div className="relative mr-3">
        <Avatar className="h-12 w-12">
          <AvatarImage src={profileDetails?.profilePhoto || undefined} />
          <AvatarFallback className="bg-black text-white">
            {getInitials(profileDetails?.name)}
          </AvatarFallback>
        </Avatar>
        <span
          className={cn(
            'absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-gray-900',
            'bg-green-500'
          )}
        />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center">
          <h3 className="font-medium truncate">{profileDetails?.name}</h3>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {profileDetails?.lastSeen}
          </span>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
          @{profileDetails?.userName} ({profileDetails?.email})
        </p>
      </div>
    </div>
  );
};

export default memo(Header);
