import React from 'react';

function DeleteModal({ onClose }) {
  return (
    <div className="Modal-overlay" onClick={onClose}>
      <div className="Modal" onClick={(e) => e.stopPropagation()}>
        <p>Пользователь успешно удален</p>
        <button onClick={onClose}>Закрыть</button>
      </div>
    </div>
  );
}

export default DeleteModal;
