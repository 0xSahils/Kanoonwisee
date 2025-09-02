import React from "react";
import SessionManager from "../SessionManager";

/**
 * AuthProvider component that handles global authentication logic
 * This component should wrap the entire app to manage session state
 */
const AuthProvider = ({ children }) => {
  return (
    <>
      <SessionManager />
      {children}
    </>
  );
};

export default AuthProvider;
