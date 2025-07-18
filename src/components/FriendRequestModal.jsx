import React from "react";
import FriendRequest from "./FriendRequest";

const FriendRequestModal = ({
  user,
  loading,
  setLoading,
  setFriendRequestModal,
}) => {
  return (
    <div className="h-screen w-screen overflow-y-auto absolute top-0 z-10 backdrop-blur-lg">
      <div className="absolute top-0 p-8 flex justify-center items-center min-h-full w-full h-full z-10">
        {/* Close Button */}
        <button
          onClick={() => setFriendRequestModal(false)}
          className="absolute z-20 right-10 top-5 text-2xl"
        >
          <i className="ri-close-large-fill"></i>
        </button>

        <div className="w-full md:w-[80%] lg:w-[40%]  p-4 flex flex-col gap-3 rounded-lg shadow shadow-cyan-200 relative z-10">
          <h2 className="text-center font-bold shadow rounded-lg shadow-emerald-100 text-xl p-4">
            Friend Requests
          </h2>

          <div className="flex flex-col p-2 rounded-lg pb-20 overflow-y-scroll min-h-[40%] gap-3 max-h-[60vh]">
            {loading ? (
              <span className="loader mx-auto"></span>
            ) : user?.friendRequest?.length > 0 ? (
              user.friendRequest.map((friend, index) => (
                <FriendRequest
                  key={friend._id || index}
                  friend={friend}
                  setLoading={setLoading}
                />
              ))
            ) : (
              <p className="text-center text-gray-600">No Friend Requests</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendRequestModal;
