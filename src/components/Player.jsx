import React from "react";
import { useNavigate } from "react-router-dom";

const Player = ({ player, userId, rank }) => {
  const navigate = useNavigate();
  const isCurrentUser = player._id === userId;

  return (
    <div
      onClick={() =>
        navigate(`/user/${player?.userName}`, { state: { user: player } })
      }
      className={`w-full flex items-center shadow-md  justify-between px-4 py-2 transition-all duration-200 rounded-lg
 ${
   isCurrentUser
     ? "sticky bottom-0 z-10 bg-fuchsia-400 shadow-emerald-600 scale-[1.01] border border-yellow-300"
     : ""
 }

`}
    >
      <div className="flex items-center gap-4">
        <span className="font-bold text-lg w-6 text-right">{rank}</span>
        <img
          src={player?.image}
          alt="profile"
          className="w-10 aspect-square object-cover h-10 rounded-full"
        />
        <div className="flex flex-col">
          <span className="font-medium">
            {player?.firstName + " " + player?.lastName}
          </span>
          <span className="text-sm text-gray-200">
            {player.additionalDetails?.collegeName || "No College"}
          </span>
        </div>
      </div>
      <div className="text-right font-semibold text-blue-700">
        {player.points} pts
      </div>
    </div>
  );
};

export default Player;
