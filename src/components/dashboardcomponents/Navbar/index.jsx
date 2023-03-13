import logo from "../../../assets/mxLogo.png";
import { useNavigate } from "react-router-dom";
const Navbar = ({ isLogin, activeTab, setActiveTab }) => {
  const navigate = useNavigate();
  const logout = () => {
    fetch("https://use-gallery-api.onrender.com/api/logout", {
      credentials: "include",
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) navigate("/login");
        else console.log(data);
      });
  };
  return (
    <>
      {isLogin ? (
        <div className="flex flex-col transition ease-in delay-100 h-screen w-52 items-center border-l-2 border-black px-2">
          <div className="w-12 mt-10 ">
            <img src={logo} />
          </div>
          <div
            onClick={() => setActiveTab("allpost")}
            className={
              (activeTab == "allpost" ? "bg-black text-white" : "bg-gray-200") +
              " p-2 w-full mt-5 rounded-md cursor-pointer"
            }
          >
            تمام پست ها
          </div>
          <div
            onClick={() => setActiveTab("addPost")}
            className={
              (activeTab == "addPost" ? "bg-black text-white" : "bg-gray-200") +
              " p-2 w-full mt-5 rounded-md cursor-pointer"
            }
          >
            اضافه کردن پست
          </div>
          <div
            onClick={() => setActiveTab("editPost")}
            className={
              (activeTab == "editPost"
                ? "bg-black text-white"
                : "bg-gray-200") + " p-2 w-full mt-5 rounded-md cursor-pointer"
            }
          >
            ویرایش پست
          </div>
          <div
            onClick={logout}
            className="bg-red-600 p-2 w-full text-white mt-5 rounded-md cursor-pointer"
          >
            خروج
          </div>
        </div>
      ) : (
        <div className="flex transition ease-in delay-100 w-full h-16 py-2 justify-center">
          <img src={logo} />
        </div>
      )}
    </>
  );
};

export default Navbar;
