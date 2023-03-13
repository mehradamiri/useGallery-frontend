import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/dashboardcomponents/Navbar";

const Login = () => {
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  const [err, setErr] = useState("");
  const handleSub = (e) => {
    e.preventDefault();
    if (password === "" || username === "") {
      if (password === "") setErr("password input is empty");
      if (username) setErr("password input is empty");
    } else {
      const formData = new URLSearchParams();
      formData.append("username", username);
      formData.append("password", password);
      fetch("http://localhost:3000/api/login", {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setToken(data.token);
            console.log(data, "tokrn");
            navigate("/dashboard");
          } else setErr(data.message);
        });
    }
  };
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <>
      <Navbar isLogin={false} />
      <form onSubmit={(e) => handleSub(e)} className="flex justify-center ">
        <div className="flex flex-col  h-max w-80 justify-center bg-gray-200 m-48 p-10 rounded-xl">
          <p>username</p>
          <input
            className="h-12 mb-6 rounded-md bg-gray-300 opacity-90 px-3 text-black font-bold"
            onChange={(e) => setUsername(e.target.value)}
            name="username"
          ></input>
          <p>password</p>
          <input
            className="h-12 mb-3 rounded-md bg-gray-300 opacity-90 px-3 text-black font-bold"
            onChange={(e) => setPassword(e.target.value)}
            type={"password"}
            name="password"
          ></input>
          <p className="mb-3 text-red-600">{err}</p>
          <button
            type="submit"
            className="text-white bg-black py-2 h-14 rounded-md text-sm"
          >
            login
          </button>
        </div>
      </form>
    </>
  );
};

export default Login;
