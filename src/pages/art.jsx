import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const Art = () => {
  const { id } = useParams();
  const [artData, setArtData] = useState();
  const [imageUrl, setimageUrl] = useState();

  useEffect(() => {
    fetch(`http://localhost:3000/api/artInfo/${id}`)
      .then((res) => res.json())
      .then((data) => setArtData(data));

    fetch(`http://localhost:3000/api/getImg/${id}`)
      .then((res) => res.blob())
      .then((blob) => setimageUrl(URL.createObjectURL(blob)));
  }, [id]);

  document.body.style.background = "rgb(10, 10, 10)";

  return (
    <>
      <div className="flex justify-center mt-5">
        {artData && (
          <>
            <img
              src={imageUrl}
              className="w-1/4 shadow-2xl shadow-slate-800 rounded-md"
            />
            <div className="flex flex-col">
              <h1 className="text-white text-4xl ml-10  ">
                {artData[0].art_name}
              </h1>
              <p className="text-white text-sm ml-10 w-72">
                {artData[0].art_description}
              </p>
            </div>
            <div className="bottom-0 fixed bg-white transition p-2 mb-4 rounded-lg cursor-pointer shadow-2xl hover:shadow-white">
              <Link to="/">go back</Link>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Art;
