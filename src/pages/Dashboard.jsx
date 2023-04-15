import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../store/AuthContext";
import Navbar from "../components/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BallTriangle } from "react-loader-spinner";
import { getDatabase, ref, set, push } from "firebase/database";


const Dashboard = () => {
  const { user } = UserAuth();
  const navigate = useNavigate();
  const db = getDatabase();

  const toastSuccess = (msg) => {
    toast.success(msg);
  };

  const toastWarn = (msg) => {
    toast.warn(msg);
  };

  // FORM STATES
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  const submitFormHandler = () => {
    if (!name || !title || !content) {
      toastWarn("Please enter all fields");
      return;
    }
  
    const blogRef = ref(db, `users/${user.uid}/blogs`);
    const newBlogRef = push(blogRef);
  
    set(newBlogRef, {
      name,
      title,
      content
    })
      .then(() => {
        toastSuccess("Form Submitted!");
        setTitle("");
        setName("");
        setContent("");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  useEffect(() => {
    if (!localStorage.getItem("userToken")) {
      navigate("/login");
    }
  }, []);

  return (
    <div>
      <Navbar />

      <div className="flex justify-center mt-20">
        {!user && (
          <BallTriangle
            height={100}
            width={100}
            radius={5}
            color="purple"
            ariaLabel="ball-triangle-loading"
            wrapperClass={{}}
            wrapperStyle=""
            visible={true}
          />
        )}
      </div>

      {user && (
        <div className="flex justify-center">
          <div className="w-1/2 shadow-md border border-slate-300 p-5 mt-10">
            <div className="flex flex-col relative">
              <label
                htmlFor="Name"
                className="text-xs text-slate-700 mb-1 left-2 top-1 absolute"
              >
                Name
              </label>
              <input
                type="text"
                id="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Name"
                className="px-2 pt-5 pb-1 border border-slate-400 focus:border-slate-600 outline-none rounded-md"
              />
            </div>

            <div className="flex flex-col relative mt-5">
              <label
                htmlFor="Title"
                className="text-xs text-slate-700 mb-1 left-2 top-1 absolute"
              >
                Title
              </label>
              <input
                type="Title"
                id="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter Title"
                className="px-2 pt-5 pb-1 border border-slate-400 focus:border-slate-600 outline-none rounded-md"
              />
            </div>
            <div className="flex flex-col relative mt-5">
              <label
                htmlFor="content"
                className="text-xs text-slate-700 mb-1 left-2 top-1 absolute"
              >
                Text
              </label>
              <textarea
                type="text"
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="px-2 pt-5 pb-1 border border-slate-400 focus:border-slate-600 outline-none rounded-md"
                placeholder="Enter Content"
              />
            </div>

            <div className="flex flex-col relative mt-5">
              <button
                onClick={submitFormHandler}
                className="text-lg py-2 px-4 text-white bg-green-400 hover:bg-green-500 border-2 border-green-400 hover:border-green-500"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default Dashboard;
