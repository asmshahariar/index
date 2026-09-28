import { useState } from 'react';
import birthdayConfig from '../config/birthdayConfig';

function LockScreen({ onUnlock }) {
  const [showMessage, setShowMessage] = useState(false);

  const handleEnter = () => {
    setShowMessage(true);
  };

  return (
    <div className="screen active lock-screen">
      <div className="lock-content">
        <div className="lock-icon">🔒</div>
        <h1 className="lock-title">A Surprise Awaits...</h1>
        <p className="lock-subtitle">
          Unlocks on {new Date(birthdayConfig.unlockDate).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
        <button className="lock-enter-btn" onClick={handleEnter}>
          Enter
        </button>
        {showMessage && (
          <p className="lock-cute-message">{birthdayConfig.lockedMessage}</p>
        )}
      </div>
    </div>
  );
}

export default LockScreen;
