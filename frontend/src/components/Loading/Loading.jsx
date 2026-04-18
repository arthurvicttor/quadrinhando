import "./Loading.css";

function Loading({ text = "Carregando..." }) {
  return (
    <div className="loading-container">
      <div className="loading-spinner" />
      <p className="loading-text">{text}</p>
    </div>
  );
}

export default Loading;
