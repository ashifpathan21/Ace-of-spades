import React, { useEffect, useState } from 'react';
import moment from 'moment';

const ChatFriend = ({ friend, chat, onSelect, decryptMessage }) => {
  const [isActive, setIsActive] = useState(friend?.active);
  const [latestMessage, setLatestMessage] = useState(null);
  const [isNewMessage, setIsNewMessage] = useState(false);

  // 🔄 Update state every 10 seconds
  useEffect(() => {
    const updateValues = () => {
      setIsActive(friend?.active);
      const latest = chat?.messages?.[chat.messages.length - 1];
      setLatestMessage(latest);

      const isNew = latest &&
        !latest.isSeen &&
        latest.from === friend._id;
      setIsNewMessage(isNew);
    };

    updateValues(); // initial
    const interval = setInterval(updateValues, 10000); // every 10 sec

    return () => clearInterval(interval);
  }, [chat, friend]);

  return (
    <div
      onClick={onSelect}
      className='cursor-pointer p-2 hover:shadow shadow-cyan-300 rounded flex items-center gap-3 relative'
    >
      {/* 🟢 Online Dot */}
      {isActive && (
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

        {latestMessage?.timestamp && (
          <span className='text-xs text-gray-400'>
            {moment(latestMessage.timestamp).fromNow()}
          </span>
        )}
      </div>
    </div>
  );
};

export default ChatFriend;
