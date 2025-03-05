import playIcon from "../assets/icon-play.svg";

function PlayButton() {
  return (
    <div className="hover-opacity-0 hover:hover-opacity-100">
      <button className="play-button-bg">
        <div className="inner-play-button">
          <div className="inner-play-button-content">
            <img
            className="inner-play-button-icon"
              src={playIcon}
              alt="play icon"
            />
            <p className="inner-play-button-text">Play</p>
          </div>
        </div>
      </button>
    </div>
  );
}

export default PlayButton;
