import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useGetTimeSlotsQuery } from "../redux/services/timeSlot";
import { setCurrentTime } from "../redux/timeSlice";

export const Timing = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data, refetch } = useGetTimeSlotsQuery();

  useEffect(() => {
    refetch()
  },[refetch])

  const [times] = useState([9, 10, 11, 12, 13, 14, 15, 16, 17]);

  const timingVariants = {
    hidden: {
      x: "100vw",
      transition: { ease: "easeInOut" },
    },
    visible: {
      x: 0,
      transition: { delay: 0, duration: 0.3, ease: "easeInOut" },
    },
    exit: {
      x: "-100vw",
      transition: { ease: "easeInOut" },
    },
  };

  const handleLink = (time) => {
    dispatch(setCurrentTime(time));
    navigate("/book");
  };

  const isBooked = (time) => {
    const getIsBooked = data?.data?.find(timeData => timeData["time-slot"] === time)
    if(getIsBooked) {
      return true
    } else {
      return false
    }
  }

  const getAMPM = (hour) => {
    const ampm = hour >= 12 ? "PM" : "AM";
    let hour12 = hour % 12;
    hour12 = hour12 ? hour12 : 12;
    return `${hour12} ${ampm}`;
  };

  return (
    <div className="flex justify-center h-screen items-center">
      <motion.div
        variants={timingVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className=" flex rounded-lg card-bg flex-col m-auto w-60 h-fit justify-center items-center"
      >
        {times.map((time) => (
          <motion.div
            onClick={() => handleLink(time)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
            key={time}
            className={`${isBooked(time) && 'bg-red-700'} p-3 text-white shadow border-bottom cursor-pointer w-full`}
          >
            {getAMPM(time)}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};
