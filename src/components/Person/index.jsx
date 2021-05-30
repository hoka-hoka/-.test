import React from 'react';
import './Person.scss';

const Person = ({ userData, editEmployee, delEmployee }) => {
  const handlerEdit = (event) => {
    event.stopPropagation();
    editEmployee(event.target);
  };

  const handlerDel = (event) => {
    event.stopPropagation();
    delEmployee();
  };

  return (
    <tr className="person">
      <td className="person__icon">
        <img className="person__ava" src={userData.image} alt="Avatar" />
      </td>
      <td className="person__fname">{userData.firstName}</td>
      <td className="person__sname">{userData.lastName}</td>
      <td className="person__btns">
        <button className="person__edit" type="button" onClick={handlerEdit}>
          <svg viewBox="0 0 512 512" width="20" height="20">
            <use xlinkHref="#edit" />
          </svg>
        </button>
        <button className="person__del" type="button" onClick={handlerDel}>
          <svg viewBox="0 0 48 48" width="20" heigth="20">
            <use xlinkHref="#close" />
          </svg>
        </button>
      </td>
    </tr>
  );
};

Person.defaultProps = {
  userData: {
    ava: '',
    sname: '',
    fname: '',
  },
  editEmployee: (f) => f,
  delEmployee: (f) => f,
};

export default Person;
