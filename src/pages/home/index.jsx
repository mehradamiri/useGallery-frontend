import { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Back from "../../components/back";
import "./style.css";
const Home = () => {
  const navigate = useNavigate();
  const mainRef = useRef(null);
  const [artData, setArtData] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  window.onmousemove = (e) => {
    const mouseX = e.clientX,
      mouseY = e.clientY;

    const xDecimal = mouseX / window.innerWidth,
      yDecimal = mouseY / window.innerHeight;

    const maxX = mainRef.current.offsetWidth - window.innerWidth,
      maxY = mainRef.current.offsetHeight - window.innerHeight;

    const panX = maxX * xDecimal * -1,
      panY = maxY * yDecimal * -1;

    mainRef.current.animate(
      {
        transform: `translate(${panX}px, ${panY}px)`,
      },
      {
        duration: 4000,
        fill: "forwards",
        easing: "ease",
      }
    );
  };

  useEffect(() => {
    componentWillMount();
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
  const componentWillMount = () => {
    document.body.style.overflow = "hidden";
    document.body.style.background = "rgb(10, 10, 10)";
    document.body.style.margin = "0px";
    document.body.style.height = "100vh";
  };
  return (
    <>
      <Back>
        <div ref={mainRef} className="absolute w-[140vmax] h-[140vmax]">
          {artData.map((element, i) => {
            console.log(imageUrls[i]);
            return (
              <Link to={`/art/${element.art_id}`}>
                <div
                  key={element.art_id}
                  className="tile opacity-80 hover:z-20 hover:opacity-100 cursor-pointer"
                  style={{
                    left: `${Math.floor(Math.random() * 80)}%`,
                    top: `${Math.floor(Math.random() * 80)}%`,
                    width: `${Math.random() * (700 - 300) + 300}px`,
                    background: `#${Math.floor(
                      Math.random() * 16777215
                    ).toString(16)}`,
                  }}
                >
                  <img src={imageUrls[i]} />
                </div>
              </Link>
            );
          })}
        </div>
      </Back>
    </>
  );
};

export default Home;
