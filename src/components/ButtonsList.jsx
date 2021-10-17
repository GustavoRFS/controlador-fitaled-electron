import "./ButtonsList.scss";
export const ButtonsList = (props) => {
  return (
    <div className="buttons-list-container">
      <h1>{props.title}</h1>
      <div className="buttons-list">{props.children}</div>
    </div>
  );
};
