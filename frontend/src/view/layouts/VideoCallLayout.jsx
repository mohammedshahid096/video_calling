import { memo, useEffect, useCallback, useRef, useContext, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import UsersList from '../components/UsersList';
import Context from '@/context/context';
import Header from '../components/Header';
import EmptyCall from '../components/EmptyCall';
import CallUserComponent from './CallUserComponent';
import VideoStream from './VideoStream';
import Peer from 'simple-peer';
import { useSocket } from '@/providers/SocketContext';
import { user_emit_listeners, user_reciever_listeners } from '@/constants/socket.constants';

const VideoCallLayout = () => {
  const {
    authState: {
      getAllUsersAction,
      allUsersList,
      getAllOnlineUserListAction,
      onlineUsersList,
      profileDetails,
    },
    sidebarState: {
      selectedUser,
      isSidebarOpen,
      reciveingCall,
      callerDetails,
      streamAction,
      reciveingCallAction,
      callerDetailsAction,
    },
  } = useContext(Context);

  const myVideoRef = useRef();
  const remoteVideoRef = useRef();
  const { socket, mySocketDetails } = useSocket();

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

    socket?.on(user_reciever_listeners.callToUser, callRecievingFunctionHandler);

    return () => {
      socket?.off(user_reciever_listeners.callToUser, callRecievingFunctionHandler);
    };
  }, []);

  const startCallingFunctionHandler = useCallback(async () => {
    try {
      const currentStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
        },
      });

      // setstream(currentStream)
      if (myVideoRef.current) {
        myVideoRef.current.srcObject = currentStream;
        myVideoRef.current.muted = true;
        myVideoRef.current.volume = 0;
      }

      currentStream.getAudioTracks().forEach((track) => (track.enabled = true));

      const peer = new Peer({
        initiator: true,
        trickle: false,
        stream: currentStream,
      });

      peer.on('error', (err) => {
        console.error('Peer error:', err);
      });

      peer.on('signal', (data) => {
        console.log('call to user with signal');
        socket.emit(user_emit_listeners.callToUser, {
          callToUserId: selectedUser?._id,
          signalData: data,
          from: mySocketDetails,
          userDetails: profileDetails,
        });
      });

      remoteVideoRef.current = peer;
    } catch (error) {
      console.error('error', error);
    }
  }, [selectedUser, mySocketDetails, profileDetails]);

  const callRecievingFunctionHandler = useCallback(
    (data) => {
      console.log('get callToUser data recieved', data);
      reciveingCallAction(true);
      callerDetailsAction(data);
    },
    [reciveingCall, callerDetails]
  );

  return (
    <div className="flex gap-3 h-screen w-full">
      {isSidebarOpen && (
        <UsersList users={allUsersList} onelineUsersObjects={onelineUsersObjects} />
      )}

      <div className="flex flex-col flex-1 gap-3">
        <Card className={'border-none m-0 p-0 overflow-hidden'}>
          <Header />
        </Card>

        {isSidebarOpen ? (
          <Card className="flex-1 border-none flex items-center justify-center">
            {selectedUser && (
              <CallUserComponent
                user={selectedUser}
                startCallingFunctionHandler={startCallingFunctionHandler}
              />
            )}

            {!selectedUser && <EmptyCall />}
          </Card>
        ) : (
          <Card className="flex-1 border-none flex items-center justify-center">
            {selectedUser && (
              <VideoStream
                myVideoRef={myVideoRef}
                remoteVideoRef={remoteVideoRef}
                myName="You"
                remoteName="Other User"
              />
            )}
          </Card>
        )}
      </div>
    </div>
  );
};

export default memo(VideoCallLayout);
