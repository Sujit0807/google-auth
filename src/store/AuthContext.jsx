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

  const navigate = useNavigate();

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;
        const token = user.accessToken;

        // SETTING UP AUTH TOKEN
        localStorage.setItem("userToken", token);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const logOut = () => {
    signOut(auth);
    localStorage.removeItem('userToken');
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
    <AuthContext.Provider value={{ googleSignIn, logOut, user }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
