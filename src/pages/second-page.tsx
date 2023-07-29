import React from "react";
import { useSelector } from "react-redux";
// import { selectAuthState } from "../store/authSlice";
import { selectAuthState, setAuthState } from "@/stores/reducers/authSlice";

export default function SecondPage() {
  const authState = useSelector(selectAuthState);

  return (
    <div>
      {" "}
      <div>{authState ? "Logged in" : "Not Logged In"}</div>
    </div>
  );
}
