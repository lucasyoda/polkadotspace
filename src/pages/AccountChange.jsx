import React, { useState, useEffect } from "react";
import { BASE_URL, UPDATE_MYSELF_USER_URL, UPDATE_PASSWORD_URL } from "../commons/constant";
import { toast } from "react-toastify";
import { getUserData, getToken, setUserData } from "../auth";

import person from "../assets/images/person.jpg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

// const penIcon = <FontAwesomeIcon icon={faPen} />;

const AccountChange = () => {
  const [selectedFile, setSelectedFile] = useState();
  const [isSelected, setIsSelected] = useState(false);

  const [user, setUser] = useState({});

  const [first_name, setFirstname] = useState("");
  const [last_name, setLastname] = useState("");
  const [email, setEmail] = useState("");

  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")

  const changeFileHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsSelected(true);
    console.log("fileHandler clicked!");
  };

  const imageEditClicked = (e) => {
    document.getElementById("profile_image").click();
  };

  const updateProfile = async (e) => {
    e.preventDefault();


    try {
      const response = await axios.patch(
        UPDATE_MYSELF_USER_URL,
        {
          email: email,
          first_name: first_name,
          last_name: last_name
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`
          },
        }
      );

      if ((response.status === 201) || (response.status === 200)) {
          localStorage.setItem("first_name", first_name);
          localStorage.setItem("last_name", last_name);
          localStorage.setItem("email", email);
          toast.success("User Information updated successfully!");
      }
      else {
          toast.error("Something went wrong")
          toast.error(response.status)
      }
  } catch (error) {
      toast.error(error)
  }
 
  };

  const updatePassword = async (e) => {
    e.preventDefault();


    try {
      const response = await axios.put(
        UPDATE_PASSWORD_URL,
        {
          "old_password": oldPassword,
          "new_password": newPassword
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`
          },
        }
      );

      if ((response.status === 201) || (response.status === 200)) {
          toast.success("Password changed successfully!");
          localStorage.clear()
          window.location.href = '/pages/login';
      }
      else {
          toast.error("Something went wrong")
          toast.error(response.status)
      }
  } catch (error) {
      toast.error(error)
  }
 
  };

  useEffect(() => {
    setFirstname(localStorage.getItem("first_name"));
    setLastname(localStorage.getItem("last_name"));
    setEmail(localStorage.getItem("email"));
  }, []);

  console.log("selectedFile: ", selectedFile);
  console.log("isSelected: ", isSelected);

  return (
    <div className="app_accountChange app_profile app_forms w-12/12 lg:w-10/12 xl:w-9/12 sm:mx-auto mt-6 py-[20px] px-10 md:pl-[30px] rounded-[30px] md:pr-[63px] bg-white">
      <div className="text-center">
        <div className="text-[40px] font-[600] relative flex">
          {/* <img
            src={ user?.profile?.profile_image ? `${BASE_URL}${user.profile.profile_image}` : person}
            alt="Person"
            className="rounded-full w-[125px] border-[0.5px]"
          /> */}
          <img
            src={
              isSelected
                ? `${URL.createObjectURL(selectedFile)}`
                : user?.profile?.profile_image
                ? `${BASE_URL}${user.profile.profile_image}`
                : person
            }
            alt="Person"
            className="rounded-full w-[100px] border-[0.5px]"
          />
          <span className="edit_pen absolute top-16 left-16 cursor-pointer w-[35px] h-[35px] bg-white rounded-full text-[18px] leading-[36px]">
            <FontAwesomeIcon icon={faPen} onClick={imageEditClicked} />
            <input
              id="profile_image"
              type="file"
              name="image"
              className="hidden"
              onChange={changeFileHandler}
            />
          </span>
          <h2 className="flex flex-col text-[15px] md:text-[30px] text-left justify-center ml-[16px] font-[500]">
            <span>{first_name}</span>
            <span>{last_name}</span>
          </h2>
        </div>
        <form
          className="app_forms-form mt-4 text-[12px] md:text-[18px]"
          onSubmit={updateProfile}
        >
          <div className="flex flex-col md:flex-row justify-between">
            <div className="w-full md:w-1/2 md:mr-[60px]">
              <label className="font-[300] mt-[20px] block text-[15px] text-left ml-8 mb-[10px]">
                Change Name
              </label>
              <input
                type="text"
                name="first_name"
                className="w-full border-2 rounded-[46px] py-3 indent-6 font-[400]"
                placeholder="Name"
                value={first_name}
                onChange={(e) => setFirstname(e.target.value)}
              />
            </div>
            <div className="w-full md:w-1/2">
              <label className="font-[300] mt-[20px] block text-[15px] text-left ml-8 mb-[10px]">
                Change Last name
              </label>
              <input
                type="text"
                name="last_name"
                className="w-full border-2 rounded-[46px] py-3 indent-6 font-[400]"
                placeholder="Last Name"
                value={last_name}
                onChange={(e) => setLastname(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between">
            <div className="w-full md:w-1/2">
              <label className="font-[300] mt-[20px] block text-[15px] text-left ml-8 mb-[10px]">
                Change Email
              </label>
              <input
                type="text"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-2 rounded-[46px] py-3 indent-6 font-[400]"
                placeholder="Email"
              />
            </div>
          </div>
         
          <button
            className="main_btn mt-10 bg-pink-600 text-white text-[15px]"
            type="submit"
          >
            Save Changes
          </button>
        </form>
        <br/>
        <form
          className="app_forms-form mt-4 text-[12px] md:text-[18px]"
          onSubmit={updatePassword}
        >
          <div className="flex flex-col md:flex-row justify-between">

            <div className="w-full md:w-1/2 md:mr-[60px]">
              <label className="font-[300] mt-[20px] block text-[15px] text-left ml-8 mb-[10px]">
                Old Password
              </label>
              <input
                type="text"
                name="last_name"
                className="w-full border-2 rounded-[46px] py-3 indent-6 font-[400]"
                placeholder="old password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>
            <div className="w-full md:w-1/2">
              <label className="font-[300] mt-[20px] block text-[15px] text-left ml-8 mb-[10px]">
                New Password
              </label>
              <input
                type="text"
                name="email"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full border-2 rounded-[46px] py-3 indent-6 font-[400]"
                placeholder="new password"
              />
            </div>
          </div>
          
         
          <button
            className="main_btn mt-10 bg-pink-600 text-white text-[15px]"
            type="submit"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default AccountChange;
