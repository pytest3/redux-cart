import { useState, useEffect } from "react";
import styled from "styled-components";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase-config";

export default function Login() {
  const [emailLogin, setEmailLogin] = useState();
  const [emailRegister, setEmailRegister] = useState();
  const [passwordLogin, setPasswordLogin] = useState();
  const [passwordRegister, setPasswordRegister] = useState();
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    // setCurrentUser(auth.currentUser);
    onAuthStateChanged(auth, (currentUser) => {
      console.log("auth ran");
      setCurrentUser(currentUser);
    });
  }, []);

  console.log(currentUser);

  const register = async () => {
    // returns a promise. generates a new user,adds it to firebase and login
    // user info stored in user variable
    try {
      console.log("here");
      // pass in Auth to reference to which firebase app we talking about
      const user = await createUserWithEmailAndPassword(
        auth,
        emailRegister,
        passwordRegister
      );
      console.log(user);
    } catch (e) {
      console.log(e.message);
    }
  };

  const login = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        emailLogin,
        passwordLogin
      );
      const user = userCredential.user;
      console.log(user);
    } catch (e) {
      console.log(e);
    }
    return;
  };

  const logout = async () => {
    try {
      signOut(auth);
    } catch (e) {
      console.log(e);
    }

    return;
  };

  return (
    <>
      <div>
        <div>Login</div>
        <label htmlFor="email">Username:</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          onChange={(e) => setEmailLogin(e.target.value)}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          required
          onChange={(e) => setPasswordLogin(e.target.value)}
        />
        <button onClick={login} type="button">
          Login
        </button>
      </div>
      <div>
        <div>Create user</div>
        <label htmlFor="email">Username:</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          onChange={(e) => setEmailRegister(e.target.value)}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          required
          onChange={(e) => setPasswordRegister(e.target.value)}
        />
        <button onClick={register} type="button">
          Create user
        </button>
      </div>
      <div>User Logged In: </div>
      {currentUser ? currentUser.email : ""}
      <button onClick={logout}>sign out</button>
    </>
  );
}
