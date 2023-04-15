import React from "react";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import { BallTriangle } from "react-loader-spinner";
import { getDatabase, ref, onValue, off } from "firebase/database";
import { UserAuth } from "../store/AuthContext";

const Home = () => {
  const { userContent, userContentHandler } = UserAuth();

  const db = getDatabase();

  const [loading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const uid = localStorage.getItem("userId");

    if (!uid) {
      return setIsLoading(false);
    }

    const blogsRef = ref(db, `users/${uid}/blogs`);

    onValue(blogsRef, (snapshot) => {
      const blogList = [];

      snapshot.forEach((childSnapshot) => {
        const childKey = childSnapshot.key;
        const childData = childSnapshot.val();
        blogList.push({ id: childKey, ...childData });
      });

      userContentHandler(blogList);
      setIsLoading(false);
    });

    return () => {
      // Unsubscribe from the blogsRef when the component unmounts
      // to avoid memory leaks
      off(blogsRef);
    };
  }, [db]);

  // Render the blogs in the state
  return (
    <div>
      <Navbar />

      <h2 className="mt-5 text-2xl text-slate-800 font-semibold text-center">
        My Data
      </h2>

      {loading && (
        <div className="flex justify-center mt-20">
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
        </div>
      )}

      <div className="mt-5 flex flex-col justify-center items-center">
        {userContent &&
          userContent.map((blog) => (
            <div
              key={blog.id}
              className="my-2 w-2/5 border border-slate-300 p-5 shadow-sm rounded-sm"
            >
              <h3 className="text-xl text-slate-800 font-mono font-semibold">
                Name: {blog.name}
              </h3>
              <p className="text-lg text-slate-800 font-mono">
                Title: {blog.title}
              </p>
              <p className="text-base text-slate-800 font-mono">
                Content: {blog.content}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;
