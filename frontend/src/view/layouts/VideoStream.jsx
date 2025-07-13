import React, { memo } from 'react';

const VideoStream = ({ myVideoRef, remoteVideoRef, remoteName, myName }) => {
  return (
    <div className="relative w-full h-full bg-black rounded-lg overflow-hidden flex items-center justify-center">
      {/* Remote video fills the area */}
      <video ref={remoteVideoRef} autoPlay playsInline className="w-full  rounded-lg bg-black" />
      {/* Remote name overlay (optional) */}
      {remoteName && (
        <div className="absolute top-3 left-3 bg-black/60 text-white text-xs px-3 py-1 rounded-full shadow">
          {remoteName}
        </div>
      )}
      {/* My video as small overlay at bottom right */}
      <div className="absolute bottom-4 right-4 w-28 h-36 md:w-40 md:h-52 shadow-lg border-2 border-white rounded-lg overflow-hidden bg-gray-900">
        <video
          ref={myVideoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full  object-cover rounded-lg"
        />
        {/* My name overlay (optional) */}
        {myName && (
          <div className="absolute bottom-1 left-1 bg-black/60 text-white text-xs px-2 py-0.5 rounded">
            {myName}
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(VideoStream);
