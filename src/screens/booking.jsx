import { Formik } from "formik";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useBookTimeSlotMutation, useGetTimeSlotQuery } from "../redux/services/timeSlot";

export const Booking = () => {
  const timeSlot = useSelector((state) => state.time.value);

  const navigate = useNavigate();

  const { data, isLoading, isSuccess, error } = useGetTimeSlotQuery(timeSlot);
  const [bookTimeSlot] = useBookTimeSlotMutation();

  const timingVariants = {
    hidden: {
      x: "100vw",
      transition: { ease: "easeInOut" },
    },
    visible: {
      x: 0,
      transition: { delay: 0.1, duration: 0.3, ease: "easeInOut" },
    },
    exit: {
      x: "-100vw",
      transition: { ease: "easeInOut" },
    },
  };

  return (
    <div className="flex justify-center h-screen items-center">
      {isLoading && <div>loading</div>}
      {isSuccess && (
        <motion.div
          variants={timingVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className=" flex rounded-lg card-bg-secondary flex-col m-auto w-fit h-fit justify-center items-center"
        >
          <Formik
            initialValues={{
              firstName: data?.data?.[0]?.["first-name"] || "",
              lastName: data?.data?.[0]?.["last-name"] || "",
              phoneNumber: data?.data?.[0]?.["phone-number"] || "",
            }}
            validate={(values) => {
              const errors = {};
              if (!values.firstName) {
                errors.firstName = "Required";
              } else if (!values.lastName) {
                errors.lastName = "Required";
              } else if (!values.phoneNumber) {
                errors.phoneNumber = "Required";
              } else if (values.phoneNumber.length < 10) {
                errors.phoneNumber = "Invalid phone number";
              }
              return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
              const dataToSave = { ...values, timeSlot };
              const data = await bookTimeSlot(dataToSave);
              if (data?.data?.status === "success") {
                return navigate("/");
              }
              setTimeout(() => {
                setSubmitting(false);
              }, 400);
            }}
          >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
              <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h2 className="mb-4">Please Enter Your Information.</h2>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">First Name</label>
                  <input
                    name="firstName"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="firstname"
                    type="text"
                    placeholder="First Name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.firstName}
                  />
                  {errors.firstName && touched.firstName && <div className="text-red-700">{errors.firstName}</div>}
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Last Name</label>
                  <input
                    className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="lastname"
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.lastName}
                  />
                  {errors.lastName && touched.lastName && <div className="text-red-700">{errors.lastName}</div>}
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Phone Number</label>
                  <input
                    className="shadow appearance-none border  rounded w-full py-2 px-3 mb-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="phonenumber"
                    type="tel"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.phoneNumber}
                  />
                  {errors.phoneNumber && touched.phoneNumber && (
                    <div className="text-red-700">{errors.phoneNumber}</div>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-blue-400 disabled:cursor-not-allowed"
                    type="submit"
                    disabled={isSubmitting || Object.keys(errors).length > 0}
                  >
                    Book Now
                  </button>
                  <Link
                    to="/"
                    className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                  >
                    Cancel
                  </Link>
                </div>
              </form>
            )}
          </Formik>
        </motion.div>
      )}
    </div>
  );
};
