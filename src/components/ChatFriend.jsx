import React from 'react';
import moment from 'moment';

const ChatFriend = ({ friend, chat, onSelect, decryptMessage }) => {
  const latestMessage = chat?.messages?.at(-1);
  const isNewMessage = latestMessage &&
    !latestMessage.isSeen &&
    latestMessage.from === friend._id;

  return (
    <div
      onClick={onSelect}
      className='cursor-pointer p-2 hover:shadow shadow-cyan-300 rounded flex items-center gap-3 relative'
    >
      {/* 🟢 Online Dot */}
      {friend?.active && (
        <div className='absolute bottom-4 left-14 w-3 h-3 bg-green-500 rounded-full animate-pulse'></div>
      )}

      <img
        src={
          friend.image ||
          `https://api.dicebear.com/5.x/initials/svg?seed=${friend.firstName} ${friend.lastName}`
        }
        className='w-14 aspect-square object-cover rounded-full'
        alt='friend'
      />

      <div className='flex flex-col'>
        <h3 className='font-semibold'>
          {friend.firstName} {friend.lastName}
        </h3>

        <div className='text-sm flex items-center gap-2'>
          {isNewMessage && <span className='text-green-600 font-bold'>• New</span>}
          <span className='text-gray-500 truncate max-w-[150px]'>
            {latestMessage?.text ? decryptMessage(latestMessage.text).slice(0, 20) : 'No message yet'}
          </span>
        </div>

        {latestMessage?.updatedAt && (
          <span className='text-xs text-gray-400'>
            {moment(latestMessage.updatedAt).fromNow()}
          </span>
        )}
      </div>
    </div>
  );
};

export default ChatFriend;
