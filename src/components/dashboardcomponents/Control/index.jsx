import { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import EditPost from "./editcon";
import Imgcon from "./Imgcon";
const MySwal = withReactContent(Swal);

const Control = ({ page, setActiveTab }) => {
  const [addPostName, setAddPostName] = useState("");
  const [addPostDescription, setAddPostDescription] = useState("");
  const [artImg, setArtImg] = useState(null);
  const [text, setText] = useState("");
  const [editId, setEditId] = useState("");
  const addPostSub = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", addPostName);
    formData.append("description", addPostDescription);
    formData.append("artImg", artImg);
    fetch("https://use-gallery-api.onrender.com/api/postart/", {
      method: "POST",
      credentials: "include",
      body: formData,
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          MySwal.fire({
            position: "center",
            icon: "success",
            width: 500,
            title: "اثر با موفقیت ثبت شد",
            showConfirmButton: false,
            timer: 2000,
          });
        } else {
          MySwal.fire({
            position: "center",
            icon: "error",
            width: 500,
            title: "یک مشکل پیش آمده",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      })
      .catch((err) => console.log(err));
  };
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setArtImg(file);
  };
  return (
    <>
      {page === "addPost" ? (
        <form onSubmit={addPostSub}>
          <div className="p-4">
            <div className="flex flex-col ">
              <p className="mb-2 ">نام اثر</p>
              <input
                className="h-12 mb-6 rounded-md bg-gray-200 opacity-70 px-3 text-black font-bold"
                name="name"
                value={addPostName}
                onChange={(e) => setAddPostName(e.target.value)}
              ></input>
              <p className="mb-2 ">توضیحات اثر</p>
              <textarea
                className="h-20 mb-6 rounded-md py-2  bg-gray-200 opacity-70 px-3 text-black font-bold"
                name="description"
                value={addPostDescription}
                onChange={(e) => setAddPostDescription(e.target.value)}
              ></textarea>
              <input
                name="artImg"
                type="file"
                onChange={handleFileInputChange}
              />
              <p className="text-green-400 font-bold text-base">{text}</p>
              <button
                type="submit"
                className="text-white bg-black py-2 h-14 rounded-md mt-5"
              >
                ثبت
              </button>
            </div>
          </div>
        </form>
      ) : page === "allpost" ? (
        <div className="flex flex-wrap mr-10 ">
          <Imgcon setEditId={setEditId} setActiveTab={setActiveTab} />
        </div>
      ) : (
        <EditPost editId={editId} setEditId={setEditId} />
      )}
    </>
  );
};

export default Control;
