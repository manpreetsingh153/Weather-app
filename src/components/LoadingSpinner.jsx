import React from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { FaSpinner } from "react-icons/fa";
import { PiSpinnerBold } from 'react-icons/pi';
const LoadingSpinner = () => {
    return (
        <div className="loading-spinner">
            {/* <AiOutlineLoading3Quarters /> */}
            <PiSpinnerBold  fill='#4a90e2' size={50}  />
            <p style={{paddingTop:"10px",marginTop:"10px"}}>Loading weather data...</p>
        </div>
    );
};

export default LoadingSpinner;