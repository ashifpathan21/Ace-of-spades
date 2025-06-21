import React, { useState, useEffect, useContext, useRef } from 'react';
import Navbar from "../components/Basic/Navbar.jsx";
import ChatFriend from "../components/ChatFriend.jsx";
import FriendRequestModal from '../components/FriendRequestModal.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { sendMessage, markMessagesAsSeen } from '../services/operations/messageApi.js';
import { SocketContext } from '../context/SocketContext.jsx';
import CryptoJS from 'crypto-js';
import toast from 'react-hot-toast';
import moment from 'moment';
import { updateUser } from '../Slices/userSlice.js';
const secretKey = import.meta.env.VITE_CHAT_SECRET_KEY;

const Message = () => {
  const socket = useContext(SocketContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.user);

  const [friendRequestModal, setFriendRequestModal] = useState(false);
  const [chatFriend, setChatFriend] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (chatFriend) {
      setMessages(chatFriend.chat.messages || []);
      const latestMsg = chatFriend.chat.messages?.at(-1);
      if (latestMsg?.from === chatFriend._id && !latestMsg.isSeen) {
        dispatch(markMessagesAsSeen(chatFriend.chat._id, token));
        socket.emit("seen-message", { chatId: chatFriend.chat._id, to: chatFriend._id });
      }
    }
  }, [chatFriend]);

  // Listen for socket events
  useEffect(() => {
    if (socket && user?._id) {
      socket.emit('join', { userId: user._id });

     // Inside socket.on("newMessage")
socket.on('newMessage', (data) => {
  if (data.from === chatFriend?._id) {
    const newMsg = { ...data, isNew: true };
    setMessages(prev => [...prev, newMsg]);

 
const updatedFriends = user.friends.map(f =>
  f.user._id === chatFriend._id
    ? {
        ...f,
        chat: {
          ...f.chat,
          messages: [...(f.chat.messages || []), newMsg], // ✅ newMsg add करो
        },
      }
    : f
);

const updatedUser = {
  ...user,
  friends: updatedFriends,
};

dispatch(updateUser(updatedUser)); // ✅ Pure object payload




    dispatch(markMessagesAsSeen(chatFriend.chat._id, token));
    socket.emit("seen-message", { chatId: chatFriend.chat._id, to: chatFriend._id });

    setTimeout(() => {
      setMessages(prev =>
        prev.map((msg, i) =>
          i === prev.length - 1 ? { ...msg, isNew: false, isSeen: true } : msg
        )
      );
    }, 300);
  }
});

      socket.on("typing", ({ from }) => {
        if (chatFriend && from === chatFriend._id) setIsTyping(true);
      });

      socket.on("stopTyping", ({ from }) => {
        if (chatFriend && from === chatFriend._id) setIsTyping(false);
      });

      // Real-time seen update (for sender)
      socket.on("messageSeen", ({ chatId, by }) => {
        if (chatFriend?.chat?._id === chatId) {
          setMessages(prev =>
            prev.map((msg, idx) =>
              msg.to === by ? { ...msg, isSeen: true } : msg
            )
          );
        }
      });
    }

    return () => {
      socket?.off('newMessage');
      socket?.off('typing');
      socket?.off('stopTyping');
      socket?.off('messageSeen');
    };
  }, [socket, user, chatFriend]);

  // Fallback checker when messages change
  useEffect(() => {
    const last = messages.at(-1);
    if (chatFriend && last?.from === chatFriend._id && !last?.isSeen) {
      dispatch(markMessagesAsSeen(chatFriend.chat._id, token));
      socket.emit("seen-message", { chatId: chatFriend.chat._id, to: chatFriend._id });
    }
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    try {
      const encryptedText = CryptoJS.AES.encrypt(message, secretKey).toString();
      const res = await dispatch(sendMessage({ to: chatFriend._id, text: encryptedText }, token));
      setMessages([...messages, res.data]);
      setMessage('');
      socket.emit("stopTyping", { to: chatFriend._id });
        const updatedFriends = user.friends.map(f =>
  f.user._id === chatFriend._id
    ? {
        ...f,
        chat: {
          ...f.chat,
          messages: [...(f.chat.messages || []), res.data], // ✅ newMsg add करो
        },
      }
    : f
);

const updatedUser = {
  ...user,
  friends: updatedFriends,
};

dispatch(updateUser(updatedUser)); // ✅ Pure object payload
    } catch (err) {
      toast.error("Could not send message.");
    }
 




  };

  const decryptMessage = (cipher) => {
    try {
      const bytes = CryptoJS.AES.decrypt(cipher, secretKey);
      return bytes.toString(CryptoJS.enc.Utf8);
    } catch (err) {
      return "[🔒 Can't decrypt]";
    }
  };

  const handleTyping = (e) => {
    setMessage(e.target.value);
    socket.emit("typing", { to: chatFriend._id });
    clearTimeout(window.typingTimeout);
    window.typingTimeout = setTimeout(() => {
      socket.emit("stopTyping", { to: chatFriend._id });
    }, 1500);
  };

  return (
    <div className='min-h-screen'>
      <Navbar />

      {friendRequestModal && (
        <FriendRequestModal
          user={user}
          setFriendRequestModal={setFriendRequestModal}
        />
      )}

      <div className='pt-20 px-4 max-w-[1200px] mx-auto flex flex-col md:flex-row gap-6'>
        <div className='w-full md:w-1/2 flex flex-col'>
          <div className='flex justify-between items-center mb-4'>
            <h2 className='text-xl font-bold'>Friends</h2>
            <div className='flex gap-4 text-xl'>
              <button onClick={() => setFriendRequestModal(true)}>
                <i className="ri-user-add-fill"></i>
              </button>
              <button onClick={() => navigate('/find-friends')}>
                <i className="ri-add-box-line"></i>
              </button>
            </div>
          </div>

          <div className={`flex-col md:flex ${chatFriend ? 'hidden' : 'flex'} p-4 gap-4`}>
            {user?.friends?.map((friendObj, idx) => (
              <ChatFriend
                key={idx}
                friend={friendObj.user}
                chat={friendObj.chat}
                decryptMessage={decryptMessage}
                onSelect={() => {
                  setChatFriend({ ...friendObj.user, chat: friendObj.chat });
                }}
              />
            ))}
          </div>
        </div>

        {chatFriend && (
          <div className='w-full md:w-1/2 border rounded-lg h-screen  p-4 relative flex flex-col min-h-[80vh]'>
            <div className='flex items-center gap-3 mb-4'>
              <div className='p-4 cursor-pointer' onClick={() => setChatFriend(null)}>
                <i className="ri-close-large-fill"></i>
              </div>
              <img
                src={chatFriend.image || `https://api.dicebear.com/5.x/initials/svg?seed=${chatFriend.firstName + ' ' + chatFriend.lastName}`}
                className='w-10 h-10 aspect-square object-cover rounded-full'
              />
              <h2 className='font-bold'>{chatFriend.firstName} {chatFriend.lastName}</h2>
            </div>

            <div className='flex-1 overflow-y-scroll mb-4'>
          
{messages.map((msg, idx) => (
  <div
    key={idx}
    className={`p-2 my-1 text-black rounded-lg max-w-[70%]
      ${msg.from === user._id ? 'bg-blue-100 ml-auto' : 'bg-gray-100'}
      ${msg.isNew ? 'border border-green-500 shadow shadow-green-300' : ''}`}
  >
    <p>{decryptMessage(msg.text)}</p>

    {/* ✅ Only show "seen" on last message sent by user */}
    {msg?.isSeen && msg?.from === user._id && idx === messages.length - 1 && (
      <small className='text-[10px] text-blue-500 mt-1 block'>
        ✔ Seen at {moment(msg.updatedAt).format("h:mm A")}
      </small>
    )}
  </div>
))}

              <div ref={messagesEndRef} />
            </div>

            {isTyping && <p className='text-xs text-gray-400 italic mb-1'>Typing...</p>}

            <div className='flex items-center gap-2'>
             <textarea
           rows={1}
          className='flex-1 p-2 border rounded resize-none'
          placeholder='Type your message...'
          value={message}
         onChange={handleTyping}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault(); // new line add न हो
         handleSendMessage(); // message भेजो
      }
          }}
         />

              <button onClick={handleSendMessage} className='text-2xl'>
                <i className="ri-send-plane-fill"></i>
              </button>
            </div>
            <div className='text-xs text-green-500 italic text-center mt-2'>
              Messages are end-to-end encrypted
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;
