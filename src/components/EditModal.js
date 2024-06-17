import React from 'react';

function EditModal({onDelete, onChange, onSendCode }) {
    return (
        <div className="Modal-overlay">
            <div className="Modal">
                <ul>
                    <li onClick={onChange}>Изменить права доступа</li>
                    <li onClick={onSendCode}>Отправить код повторно</li>
                    <li onClick={onDelete}>Удалить</li>
                </ul>
            </div>
        </div>
    );
}

export default EditModal;
