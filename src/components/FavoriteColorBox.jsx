export const FavoriteColorBox = (props) => {
  return (
    <div
      style={{
        width: 40,
        height: 40,
        backgroundColor: props.color,
        borderRadius: 5,
        marginRight: 14,
        marginLeft: 14,
        marginBottom: 4,
        cursor: "pointer",
      }}
    ></div>
  );
};
