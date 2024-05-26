import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const formConfig = {
  firstName: {
    label: "First Name",
    type: "text",
    required: true,
    errorMessage: "First Name is required",
  },
  lastName: {
    label: "Last Name",
    type: "text",
    required: true,
    errorMessage: "Last Name is required",
  },
  username: {
    label: "Username",
    type: "text",
    required: true,
    errorMessage: "Username is required",
  },
  email: {
    label: "Email",
    type: "email",
    required: true,
    errorMessage: "Email is required",
  },
  password: {
    label: "Password",
    type: "password",
    required: true,
    errorMessage: "Password is required",
  },
  phoneNo: {
    label: "Phone Number",
    required: true,
    errorMessage: "Phone Number is required",
    options: [
      { country: "India", code: "+91" },
      { country: "USA", code: "+1" },
    ],
  },
  country: {
    label: "Country",
    type: "select",
    required: true,
    errorMessage: "Country is required",
    options: ["India", "USA"],
  },
  city: {
    label: "City",
    type: "select",
    required: true,
    errorMessage: "City is required",
    options: { India: ["Mumbai", "Delhi"], USA: ["New York", "Los Angeles"] },
  },
  panNo: {
    label: "PAN Number",
    type: "text",
    required: true,
    errorMessage: "PAN Number is required",
  },
  aadharNo: {
    label: "Aadhar Number",
    type: "text",
    required: true,
    errorMessage: "Aadhar Number is required",
  },
};

const Form = () => {
  const navigate = useNavigate();
  const initialFormData = Object.keys(formConfig).reduce((acc, key) => {
    acc[key] = "";
    return acc;
  }, {});

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const validateField = (name, value) => {
    let error = "";
    if (formConfig[name].required && !value) {
      error = formConfig[name].errorMessage;
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? e.target.checked : value,
    });
    validateField(name, value);
  };

  const validate = () => {
    let errors = {};
    for (const key in formConfig) {
      if (formConfig[key].required && !formData[key]) {
        errors[key] = formConfig[key].errorMessage;
      }
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      navigate("/display", { state: formData });
    }
  };

  console.log(formData);

  return (
    <div className="flex justify-center items-center bg-slate-200 h-screen">
      <div className="border rounded-md p-4 h-[80%] w-[40%] shadow-lg bg-white">
        <h1 className="text-2xl font-bold w-fit mx-auto mb-4">
          Registration Form
        </h1>
        <form
          className="space-y-2 h-[90%] overflow-y-scroll"
          onSubmit={handleSubmit}
        >
          {Object.keys(formConfig).map((key) => {
            const field = formConfig[key];
            if (field.type === "select") {
              return (
                <div className="flex flex-col gap-1" key={key}>
                  <label>{field.label}</label>
                  <select
                    className="border rounded p-1"
                    name={key}
                    value={formData[key]}
                    onChange={handleChange}
                  >
                    <option value="" disabled>
                      Select {field.label}
                    </option>
                    {key === "country" &&
                      field.options.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    {key === "city" &&
                      formData.country &&
                      field.options[formData.country].map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                  </select>
                  {errors[key] && (
                    <p className="text-red-400 text-sm">{errors[key]}</p>
                  )}
                </div>
              );
            } else if (key === "phoneNo") {
              return (
                <div className="flex flex-col gap-1" key={key}>
                  <label>{field.label}</label>
                  <div className="flex items-center gap-4">
                    <select
                      className="border rounded p-1 w-1/4"
                      name="countryCode"
                      value={formData.countryCode}
                      onChange={handleChange}
                    >
                      <option value="" disabled>
                        Code
                      </option>
                      {field.options.map(({ country, code }) => (
                        <option key={country} value={code}>
                          {country}
                        </option>
                      ))}
                    </select>
                    <input
                      className="border rounded p-1 w-3/4"
                      type="number"
                      name="phoneNo"
                      value={formData.phoneNo}
                      disabled={formData.countryCode == undefined}
                      onChange={handleChange}
                    />
                  </div>
                  {(errors.countryCode || errors.phoneNo) && (
                    <p className="text-red-400 text-sm">
                      {errors.countryCode || errors.phoneNo}
                    </p>
                  )}
                </div>
              );
            } else {
              return (
                <div className="flex flex-col gap-1" key={key}>
                  <label>{field.label}</label>
                  <div className="flex items-center gap-4">
                    <input
                      className="border rounded p-1 w-full"
                      type={
                        showPassword && key === "password" ? "text" : field.type
                      }
                      name={key}
                      value={formData[key]}
                      onChange={handleChange}
                    />
                    {key === "password" &&
                      (showPassword ? (
                        <EyeOff
                          className="cursor-pointer"
                          size={25}
                          strokeWidth={1.5}
                          onClick={() => setShowPassword(false)}
                        />
                      ) : (
                        <Eye
                          className="cursor-pointer"
                          size={25}
                          strokeWidth={1.5}
                          onClick={() => setShowPassword(true)}
                        />
                      ))}
                  </div>
                  {errors[key] && (
                    <p className="text-red-400 text-sm">{errors[key]}</p>
                  )}
                </div>
              );
            }
          })}
          <button
            className={`border rounded w-full p-2 bg-orange-400 text-white hover:bg-opacity-85 ${
              Object.keys(errors).some((key) => errors[key]) &&
              "cursor-not-allowed"
            }`}
            type="submit"
            disabled={Object.keys(errors).some((key) => errors[key])}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
