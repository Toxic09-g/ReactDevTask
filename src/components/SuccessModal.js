import React from "react";

const SuccessModal = ({ onClose }) => {
    return (
        <div className="Modal-overlay">
            <div className="Modal">
                <span className="close" onClick={onClose}>&times;</span>
                <p>Приглашение успешно отправлено!</p>
            </div>
        </div>
    );
};

export default SuccessModal;
