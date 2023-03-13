import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import withReactContent from "sweetalert2-react-content";

const Imgcon = ({ setEditId, setActiveTab }) => {
  const [imageUrl, setImageUrl] = useState([]);
  const [artData, setArtData] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const MySwal = withReactContent(Swal);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/api/artInfo")
      .then((res) => res.json())
      .then((data) => setArtData(data));
  }, []);

  useEffect(() => {
    const fetchImageUrls = async () => {
      const urls = await Promise.all(
        artData.map((element) =>
          fetch(`http://localhost:3000/api/getImg/${element.art_id}`)
            .then((res) => res.blob())
            .then((blob) => URL.createObjectURL(blob))
        )
      );
      setImageUrls(urls);
    };
    if (artData.length > 0) {
      fetchImageUrls();
    }
  }, [artData]);

  const deletepost = (id, e) => {
    MySwal.fire({
      title: "ایا از پاک کردن این اثر مطمئن هستی؟",
      text: "این کار راه برگشت ندارد",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "لغو",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "بله",
    }).then((r) => {
      if (r.isConfirmed) {
        fetch(`http://localhost:3000/api/deleteart/${id}`, {
          method: "DELETE",
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Failed to delete artwork");
            }
            MySwal.fire({
              position: "center",
              icon: "success",
              width: 500,
              title: "اثر با موفقیت حذف شد",
              showConfirmButton: false,
              timer: 1500,
            });
            const element = e.target.parentElement;
            element.parentElement.classList.add("hidden");
          })
          .catch((error) => {
            MySwal.fire({
              position: "center",
              icon: "error",
              width: 500,
              title: "یک مشکل پیش آمده",
              showConfirmButton: false,
              timer: 2000,
            });
            // throw error;
          });
      }
    });
  };
  const fixtext = (text) => {
    if (text.length > 20) {
      let newText = [];
      for (let i = 0; i < 20; i++) {
        newText[i] = text[i];
      }
      return newText.join("") + "...";
    } else return text;
  };
  const handleEdit = (id) => {
    setEditId(id);
    setActiveTab("editPost");
  };
  return (
    <>
      {artData.length > 0 ? (
        artData.map((element, i) => {
          console.log(artData[i]);
          return (
            <div
              key={element.art_id}
              className="w-60 h-min bg-gray-200 m-3 rounded-2xl flex flex-col flex-wrap"
            >
              <img
                className={
                  " w-full h-44 bg-black rounded-t-2xl bg-center bg-cover "
                }
                src={imageUrls[i]}
              />
              <div className="px-5 text-center flex flex-col content-between">
                <p className="font-bold text-sm flex flex-wrap w-52 justify-center break-all">
                  {fixtext(artData[i].art_name)}
                </p>
                <p>{artData[i].art_id}</p>
                <div
                  className="bg-gray-300 transition text-center py-2 rounded-lg my-2 cursor-pointer hover:bg-black hover:text-white"
                  onClick={() => handleEdit(element.art_id)}
                >
                  ویرایش
                </div>
                <div
                  className="bg-red-600 text-white transition text-center py-2 rounded-lg my-1 cursor-pointer hover:bg-black"
                  onClick={(e) => deletepost(element.art_id, e)}
                >
                  حذف کردن
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <p>اثری موجود نیست</p>
      )}
    </>
  );
};

export default Imgcon;
