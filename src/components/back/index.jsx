import "./style.css";

const Back = ({ ...props }) => {
  return (
    <>
      <div className="page">{props.children}</div>
    </>
  );
};

export default Back;
