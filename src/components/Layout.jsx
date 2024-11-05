import React, { useState, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";
import { ImCart } from "react-icons/im";
import { RiImageAddFill, RiLoginCircleFill } from "react-icons/ri";
import { BiSolidLogOutCircle } from "react-icons/bi";
import AllProducts from "../assets/allProducts.json";
import "../styles/Layout.css";
import { IoIosBackspace } from "react-icons/io";
import Axios from "axios";

const Layout = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [userData, setUserData] = useState({
    name: null,
    token: null,
  });
  const [toggleSearchDiv, setToggleSearchDiv] = useState(false);
  const [data, setData] = useState([]);

  const navigate = useNavigate();

  const btnRecordStart = async () => {
    try {
      if (!isRecording) {
        resetTimer();
        console.log("record started");
        let res = await Axios.get("https://ondc-server.onrender.com/start_recording");
        console.log(res);
        setIsRunning(true);
        setIsRecording(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const btnRecordStop = async () => {
    try {
      if (isRecording) {
        setIsRunning(false);
        setIsRecording(false);
        resetTimer();
        console.log("record stopped");
        let res = await Axios.get("https://ondc-server.onrender.com/stop_recording");
        handleSearch(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const resetTimer = () => {
    setSeconds(0);
  };

  const handleFileUpload = async (e) => {
    if (!e.target.files[0]) return;

    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    try {
      const response = await Axios.post(
        "https://ondc-server.onrender.com/process_image",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log("Response:", response?.data?.primary_keyword);
      handleSearch(response?.data?.primary_keyword);
      // Use response.data.primary_keyword or any other returned data as needed
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  useEffect(() => {
    let timerInterval;

    if (isRunning) {
      timerInterval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    }
    return () => {
      clearInterval(timerInterval);
    };
  }, [isRunning]);

  useEffect(() => {
    let username = localStorage.getItem("user");
    let token = localStorage.getItem("token");
    setUserData({
      name: username,
      token: token,
    });
  }, [window.location.pathname]);

  const handleSearch = (searchQuery) => {
    setToggleSearchDiv(true);
    const results = AllProducts.filter((product) => {
      // Convert each property value to string and check if it includes the search query
      return Object.values(product).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });

    // Use the results as needed, for example:
    setData(results);
  };

  return (
    <>
      <nav>
        <div className="logo">
          <span>
            <ImCart />
          </span>
          <h1>E-Commerce</h1>
        </div>
        <div className="links">
          <Link
            to="/"
            onClick={() => {
              setToggleSearchDiv(false);
            }}
          >
            Home
          </Link>
          <Link
            to="/carts"
            onClick={() => {
              setToggleSearchDiv(false);
            }}
          >
            Cart
          </Link>
        </div>
        <div className="search">
          <input
            type="text"
            className="bar"
            onChange={(e) => {
              handleSearch(e.target.value);
            }}
          />
          {isRecording ? (
            <button
              className="mikeOff"
              onClick={() => {
                btnRecordStop();
              }}
            >
              <FaMicrophoneSlash className="search_icons"/>
            </button>
          ) : (
            <button
              className="mikeOn"
              onClick={() => {
                btnRecordStart();
              }}
            >
              <FaMicrophone className="search_icons"/>
            </button>
          )}
          <div className="upload">
            <label htmlFor="img" className="imgLabel">
              <RiImageAddFill className="search_icons"/>
            </label>
            <input
              type="file"
              name="img"
              id="img"
              className="img"
              accept="image/*"
              onChange={handleFileUpload}
            />
          </div>
          {seconds > 0 && <p className="timer">{formatTime(seconds)}</p>}
        </div>
        <div className="auth">
          {userData.token !== null ? (
            <div className="profile_info_navbar">
              <div className="user_profile_logo">
                {userData.name[0].toUpperCase()}
              </div>
              <div className="user_profile_name">{userData.name}</div>
              <div
                className="user_logout_btn_container"
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("user");
                  navigate("/auth");
                  setToggleSearchDiv(false);
                }}
              >
                <BiSolidLogOutCircle />
              </div>
              <p>Logout</p>
            </div>
          ) : (
            <>
              <button
                className="btnLogin"
                onClick={() => {
                  navigate("/auth");
                  setToggleSearchDiv(false);
                }}
              >
                <RiLoginCircleFill />
                {/* <p>Login</p> */}
              </button>
              <p>Login</p>
            </>
          )}
        </div>
      </nav>
      {!toggleSearchDiv ? (
        <div className="outlet_container">
          <Outlet />
        </div>
      ) : (
        <div className="layout_product_listing_container">
          <div className="back_btn_container">
            <button
              onClick={() => {
                setToggleSearchDiv(false);
              }}
              className="back_btn"
            >
              <IoIosBackspace />
              Back
            </button>
          </div>
          <div className="products">
            {data.map((item, index) => (
              <div className="product_container" key={index}>
                <Link
                  to={`/product_details/${item.asin}`}
                  className="product_details_wrapper"
                  onClick={() => {
                    setToggleSearchDiv(false);
                  }}
                >
                  <img
                    src={item.product_photo}
                    alt="productImg"
                    className="productImage"
                  />
                  <p className="product_title">{item.product_title}</p>
                  <h3 className="product_price">
                    {item.product_original_price || item.product_price}
                  </h3>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Layout;
