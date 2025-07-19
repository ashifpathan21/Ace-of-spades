import React, { useEffect, useState } from "react";
import Navbar from "../components/Basic/Navbar.jsx";
import { getLeaderboardData } from "../services/operations/leaderBoard.js";
import Player from "../components/Player";
import { useDispatch, useSelector } from "react-redux";
import '../index.css'
import TopThreeLeaderboard from "../components/TopThreeLeaderboard.jsx";
const LeaderBoard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const token = localStorage.getItem("token");
  const { globalLeaderboard, collegeLeaderboard } = useSelector(
    (state) => state.leaderboard
  );
  const [global, setGlobal] = useState(globalLeaderboard);
  const [college, setCollege] = useState(collegeLeaderboard);
  const [leaderboard, setLeaderboard] = useState(globalLeaderboard);
  const [collegeMode, setCollegeMode] = useState(false);
  const [loading , setLoading ] = useState(false) ; 
  useEffect(() => {
    setLoading(true)
    const getDetails = async () => {
      try {
        const res = await dispatch(getLeaderboardData(token));
        setGlobal(res?.globalLeaderboard);
        setLeaderboard(res?.globalLeaderboard);
        setCollege(res?.collegeLeaderboard);
      } catch (error) {}
    };
    getDetails();
    setLoading(false)
  }, [token]);
 
  if(loading){
    return <div className='h-screen w-screen flex justify-center items-center '>
      <span className='loader'></span>
    </div>
  }
  return (
    <div className="min-h-screen h-screen  w-screen ">
      <Navbar />
      <div className="w-full items-center p-2 pt-20  flex justify-around">
        <h2 className=" text-2xl text-center font-semibold ">{`${
          collegeMode ? "College" : "Global"
        } Leaderboard`}</h2>
        <button
          className={`font-semibold p-2 transition-all duration-300  ${
            collegeMode
              ? "bg-amber-500 hover:bg-amber-600"
              : "bg-rose-500 hover:bg-rose-600 "
          }  text-white rounded-lg  `}
          onClick={() => {
            collegeMode ? setLeaderboard(global) : setLeaderboard(college);
            setCollegeMode(!collegeMode);
          }}
        >
          {" "}
          {collegeMode ? "Global Mode" : "College Mode"}
        </button>
      </div>

      <div className=" flex flex-col gap-5   p-4 ">
        <TopThreeLeaderboard leaderboard={leaderboard} userId={user?._id} />
        <div className="max-h-[45vh] overflow-y-auto flex flex-col gap-5 px-3">
          {leaderboard?.slice(3).map((player, i) => (
            <Player
              key={player._id}
              rank={i + 4}
              player={player}
              userId={user?._id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeaderBoard;
