import React, { useState } from 'react';
import Select, { components } from "react-select";
import { updateUser } from '../api/users';

const CheckboxOption = (props) => (
  <components.Option {...props}>
    <input
      type="checkbox"
      checked={props.isSelected}
      onChange={() => null} // onChange обрабатывается react-select
    />{" "}
    <label>{props.label}</label>
  </components.Option>
);

function EditPermissionsModal({ onClose, user, userIndex }) {
  const permissions = [
    { value: "all", label: "Все" },
    { value: "moder", label: "Модерация объявлений" },
    { value: "blog", label: "Блог" },
    { value: "sup", label: "Тех. поддержка" },
    { value: "clients", label: "Обращения клиентов" },
    { value: "analitic", label: "Аналитика" },
    { value: "stocks", label: "Акции" },
    { value: "admin", label: "Администратор" },
  ];

  const [userPermissions, setUserPermissions] = useState(user.permissions.map(label => permissions.find(permission => permission.label === label)))

  const handleChange = (selectedOptions) => {
    const isAll = selectedOptions.some((item) => item.value == "all");

    if (isAll) {
      selectedOptions = permissions;
    } else {
      selectedOptions = selectedOptions.filter((item) => item.value !== "all");
    }

    setUserPermissions(selectedOptions || []);
  };

  const handleSubmit = () => {
    const labels = Array.from(userPermissions.filter((item) => item.value != "all")).map(item => item.label)

    if (labels.length === 0) {
      alert('Ошибка')
      return
    }

    user.permissions = labels
    updateUser(userIndex, user)
    onClose()
  };

  return (
    <div className="Modal-overlay">
      <div className="Modal">
        <Select
          options={permissions}
          isMulti
          value={userPermissions}
          onChange={(selectedPermissions) => handleChange(selectedPermissions)}
          closeMenuOnSelect={false}
          hideSelectedOptions={false}
          components={{
            Option: CheckboxOption,
          }}
        />
        <button onClick={handleSubmit}>Отправить приглашение</button>
      </div>
    </div>
  );
}

export default EditPermissionsModal;