import React, { useState } from "react";
import Select, { components } from "react-select";
import { addUser } from "../api/users";

// Компонент для отображения опций с чекбоксами
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

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function AddUserModal({ onClose }) {
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [email, setEmail] = useState("");

  const permissions = [
    { value: "all", label: "Все" },
    { value: "moder", label: "Модерация объявлений" },
    { value: "blog", label: "Блог" },
    { value: "sup", label: "Тех. поддержка" },
    { value: "clients", label: "Обращения клиентов" },
    { value: "analitic", label: "Аналитика" },
    { value: "stocks", label: "Акции" },
  ];

  const handleChange = (selectedOptions) => {
    const isAll = selectedOptions.some((item) => item.value == "all");

    if (isAll) {
      selectedOptions = permissions;
    } else {
      selectedOptions = selectedOptions.filter((item) => item.value !== "all");
    }

    setSelectedPermissions(selectedOptions || []);
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = () => {
    const labels = Array.from(selectedPermissions.filter((item) => item.value != "all")).map(item => item.label)

    if (email === "" || labels.length === 0 || !emailRegex.test(email)) {
      alert('Ошибка')
      return
    }

    addUser({
      name: "",
      email: email,
      permissions: labels,
      image: "",
    });
    onClose();
  };

  return (
    <div className="Modal-overlay">
      <div className="Modal">
        <p>Отправить приглашение</p>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleChangeEmail}
        />
        <Select
          options={permissions}
          isMulti
          value={selectedPermissions}
          onChange={(e) => {
            handleChange(e);
          }}
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

export default AddUserModal;
