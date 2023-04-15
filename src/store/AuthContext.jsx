import { useContext, createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import { auth } from "../../firebaseConfig";

// CREATING AUTH CONTEXT
const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  // SETTING UP USER STATE
  const [user, setUser] = useState(null);
  const [userContent, setUserContent] = useState(null);

  const navigate = useNavigate();

  const userContentHandler = (data) => {
    setUserContent(data);
  }

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;
        const token = user.accessToken;

        // SETTING UP AUTH TOKEN
        localStorage.setItem("userToken", token);
        localStorage.setItem("userId", user.uid);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const logOut = () => {
    signOut(auth);
    setUserContent(null);
    localStorage.removeItem('userToken');
    localStorage.removeItem('userId');
    navigate('/');
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ googleSignIn, logOut, userContentHandler, user, userContent }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
