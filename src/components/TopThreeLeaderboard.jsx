import React from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti-boom";
const TopThreeLeaderboard = ({ leaderboard, userId }) => {
  const topThree = leaderboard.slice(0, 3);

  const positions = ["#2", "#1", "#3"]; // Left, Center, Right

  const containerOrder = [1, 0, 2]; // To visually center #1

  return (
    <div className="flex justify-center h-full items-end gap-8  py-3 rounded-lg text-white">
      {containerOrder.map((pos, idx) => {
        const player = topThree[pos];

        if (!player) return null;

        return (
          <div
            key={player._id}
            className={`flex flex-col relative items-center justify-end w-[100px] ${
              idx === 1 ? "scale-130" : "scale-95"
            }`}
          >
            {idx === 1 && (
              <Confetti
                className="absolute z-10 "
                mode="fall"
                particleCount={100}
                effectInterval={5000}
                colors={["#ff577f", "#ff884b"]}
              />
            )}

            {player?._id === userId && (
              <motion.div
                className="absolute  bottom-10 z-10 left-5 bg-pink-500 text-white text-xs font-bold px-2 py-1 rounded-bl-xl"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                YOU
              </motion.div>
            )}
            {player?._id === userId && (
              <Confetti
                className="absolute z-10 "
                mode="boom"
                particleCount={100}
                effectInterval={5000}
                colors={["#ff577f", "#ff884b"]}
              />
            )}
            <div className="text-xl font-bold mb-1 text-yellow-400">
              {positions[idx]}
            </div>

            <div className="relative">
              <img
                src={player.image}
                alt={player.userName}
                className={`rounded-full border-4 ${
                  idx === 1 ? "border-yellow-400 " : "border-gray-300"
                } w-20 h-20 object-cover`}
              />
              {idx === 1 && (
                <div className="absolute bottom-0 right-0 bg-yellow-100 text-black font-bold text-xs px-2 py-0.5 rounded-full">
                  🏆
                </div>
              )}
            </div>

            <div className="mt-2 font-semibold text-sm">{player.userName}</div>
            <div className="text-xs text-gray-200">{player.points} pts</div>
          </div>
        );
      })}
    </div>
  );
};

export default TopThreeLeaderboard;
