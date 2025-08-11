// src/components/layout/Navbar.jsx
import React from "react";
import { useDispatch } from "react-redux";
import { openSettings } from "../store/slices/settingsSlice";
import { returnHome } from "../store/slices/stageSlice";

/**
 * Renders the Navbar component.
 * @returns {JSX.Element} - The Navbar component.
 */
const Navbar = () => {
  const dispatch = useDispatch();

  return (
    <div className="flex justify-between items-center w-full h-20 px-10 bg-white z-50">
      <h1 className="text-darkBlue font-bold pl-4">MY YOUTHSPAN</h1>
      <div>
        <button
          className="bg-lightBlue hover:bg-darkBlue text-white px-4 py-2 rounded-md mr-4"
          onClick={() => dispatch(openSettings())}
        >
          Settings
        </button>
        <button className="bg-lightBlue hover:bg-darkBlue text-white px-4 py-2 rounded-md"
        onClick={() => {
            dispatch(returnHome());
        }}>
          Return to Home
        </button>
      </div>
    </div>
  );
};

export default Navbar;
