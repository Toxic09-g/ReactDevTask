import React from 'react';

function ConfirmationModal({ userEmail, onClose }) {
  return (
    <div className="Modal-overlay">
      <div className="Modal">
        <p>Код отправлен на почту <br/>{userEmail}</p>
        <button onClick={onClose}>Закрыть</button>
      </div>
    </div>
  );
}

export default ConfirmationModal;
