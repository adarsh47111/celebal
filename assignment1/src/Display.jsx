import React from "react";
import { useLocation } from "react-router-dom";

const Display = () => {
  const location = useLocation();
  const formData = location.state;

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="border rounded-lg shadow-lg w-[30%] space-y-2 p-4">
        <h1 className="text-2xl font-bold w-fit mx-auto mb-3">Submitted Data</h1>
        <p>
          <strong>First Name:</strong> {formData.firstName}
        </p>
        <p>
          <strong>Last Name:</strong> {formData.lastName}
        </p>
        <p>
          <strong>Username:</strong> {formData.username}
        </p>
        <p>
          <strong>Password:</strong> {formData.password}
        </p>
        <p>
          <strong>Email:</strong> {formData.email}
        </p>
        <p>
          <strong>Phone Number:</strong> {formData.countryCode}{" "}
          {formData.phoneNo}
        </p>
        <p>
          <strong>Country:</strong> {formData.country}
        </p>
        <p>
          <strong>City:</strong> {formData.city}
        </p>
        <p>
          <strong>PAN Number:</strong> {formData.panNo}
        </p>
        <p>
          <strong>Aadhar Number:</strong> {formData.aadharNo}
        </p>
      </div>
    </div>
  );
};

export default Display;
