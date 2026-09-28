import birthdayConfig from '../config/birthdayConfig';

function GifScreen() {
  return (
    <div id="gifScreen" className="screen active">
      <div className="gif-container">
        <div className="gif-glow" />
        <img src={birthdayConfig.birthdayGif} alt="Happy Birthday" className="gif-image" />
      </div>
      <p className="gif-text">{birthdayConfig.title}</p>
    </div>
  );
}

export default GifScreen;
