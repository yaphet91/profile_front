import React from 'react';

const StateMessage = ({ message, tone = 'info' }) => (
  <div className={`app__section-state ${tone === 'error' ? 'app__section-state--error' : ''}`}>
    <p className="p-text">{message}</p>
  </div>
);

export default StateMessage;
