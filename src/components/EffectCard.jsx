import "./EffectCard.scss";

export const EffectCard = (props) => {
  return (
    <div className="effect-card">
      <h1>{props.title}</h1>
      <p>{props.description}</p>
    </div>
  );
};
