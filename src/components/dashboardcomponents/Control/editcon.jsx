import { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const EditPost = ({ editId, setEditId }) => {
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const MySwal = withReactContent(Swal);
  const handleSub = (e) => {
    e.preventDefault();

    const formData = new URLSearchParams();
    formData.append("name", newName);
    formData.append("password", newDescription);
    fetch(`https://use-gallery-api.onrender.com/api/updatePost/${editId}`, {
      credentials: "include",
      method: "PUT",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          MySwal.fire({
            position: "center",
            icon: "success",
            width: 500,
            title: `پست با ایدی ${editId} بروز شد`,
            showConfirmButton: false,
            timer: 2000,
          });
        } else
          MySwal.fire({
            position: "center",
            icon: "error",
            width: 500,
            title: `یه مشکل پیش آمده ${data.mess}`,
            showConfirmButton: false,
            timer: 2000,
          });
      });
  };
  return (
    <>
      <form onSubmit={handleSub}>
        <div className="p-4">
          <div className="flex flex-col ">
            <p className="mb-2 ">ایدی اثر</p>
            <input
              className="h-12 mb-6 rounded-md bg-gray-200 opacity-70 px-3 text-black font-bold"
              name="name"
              value={editId}
              onChange={(e) => setEditId(e.target.value)}
            ></input>
            <p className="mb-2 ">نام جدید اثر</p>
            <input
              className="h-12 mb-6 rounded-md bg-gray-200 opacity-70 px-3 text-black font-bold"
              name="name"
              onChange={(e) => setNewName(e.target.value)}
              value={newName}
            ></input>
            <p className="mb-2 ">توضیحات جدید اثر</p>
            <textarea
              className="h-20 mb-6 rounded-md py-2  bg-gray-200 opacity-70 px-3 text-black font-bold"
              name="description"
              onChange={(e) => setNewDescription(e.target.value)}
              value={newDescription}
            ></textarea>
            <p className="text-green-400 font-bold text-base"></p>
            <button
              type="submit"
              className="text-white bg-black py-2 h-14 rounded-md mt-5"
            >
              ثبت
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default EditPost;
