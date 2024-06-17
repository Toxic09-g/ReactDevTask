import React, { useState } from 'react';
import Select, { components } from 'react-select';

// Компонент для отображения опций с чекбоксами
const CheckboxOption = (props) => (
  <components.Option {...props}>
    <input
      type="checkbox"
      checked={props.isSelected}
      onChange={() => null} // onChange обрабатывается react-select
    />{' '}
    <label>{props.label}</label>
  </components.Option>
);

function AddUserModal({ onClose }) {
  const [selectedPermissions, setSelectedPermissions] = useState([]);

  const permissions = [
    { value: 'all', label: 'Все' },
    { value: 'moder', label: 'Модерация объявлений' },
    { value: 'blog', label: 'Блог' },
    { value: 'sup', label: 'Тех. поддержка' },
    { value: 'clients', label: 'Обращения клиентов' },
    { value: 'analitic', label: 'Аналитика' },
    { value: 'stocks', label: 'Акции' },

  ];

  const handleChange = (selectedOptions) => {
    setSelectedPermissions(selectedOptions || []);
  };

  return (
    <div className="Modal-overlay">
      <div className="Modal">
        <p>Отправить приглашение</p>
        <input type="email" placeholder="Email" />
        <Select
          options={permissions}
          isMulti
          value={selectedPermissions}
          onChange={handleChange}
          closeMenuOnSelect={false}
          hideSelectedOptions={false}
          components={{
            Option: CheckboxOption
          }}
        />
        <button onClick={onClose}>Отправить приглашение</button>
      </div>
    </div>
  );
}

export default AddUserModal;
