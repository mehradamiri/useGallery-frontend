import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Control from "../components/dashboardcomponents/Control";
import Navbar from "../components/dashboardcomponents/Navbar";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    fetch("http://localhost:3000/api/checksession", {
      credentials: "include",
      method: "get",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          console.log(data);
          setUser(data.user);
        } else {
          navigate("/login");
        }
      });
  }, []);
  const [activeTab, setActiveTab] = useState("addPost");
  return (
    <>
      {user ? (
        <div dir="rtl" className="flex">
          <Navbar
            isLogin={true}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <Control setActiveTab={setActiveTab} page={activeTab} />
        </div>
      ) : (
        <h1>You are not logged in.</h1>
      )}
    </>
  );
};

export default Dashboard;
