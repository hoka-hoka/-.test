import './ModalWindow.scss';
import React, { useState } from 'react';
import { lang, langData, viewMode } from '../../constants';

const ModalWindow = ({
  title,
  view,
  persons,
  render,
  updateState,
  getData,
}) => {
  const [fieldData, setFieldData] = useState({
    firstName: '',
    lastName: '',
    id: 0,
  });

  const addPerson = () => {
    const { firstName, lastName } = fieldData;
    const data = {
      firstName,
      lastName,
      image: 'img/ava.png',
    };
    getData('persons', data).then((resp) => {
      if (!resp?.success) {
        updateState({ update: false }).notice = {
          error: true,
          message: lang[langData.empError],
        };
      } else {
        persons.push(resp.d);
        updateState({ update: false }).notice = {
          error: false,
          message: lang[langData.createEmp],
        };
      }
      updateState({ update: true })({ bubbling: true });
    });
  };

  const enrichPerson = () => {
    const { firstName, lastName, id } = fieldData;
    if (!id) {
      return;
    }
    const data = {
      id: id,
      firstName,
      lastName,
      image: 'img/ava.png',
    };
    getData('persons', data).then((resp) => {
      if (!resp?.success) {
        updateState({ update: false }).notice = {
          error: true,
          message: lang[langData.fillingError],
        };
      } else {
        updateState({ update: false }).notice = {
          error: false,
          message: lang[langData.update],
        };
      }
      updateState({ update: true })({ bubbling: true });
    });

    const foundFieldIndex = persons.findIndex((field) => field.id == id);
    if (~foundFieldIndex) {
      const editField = persons[foundFieldIndex];
      persons[foundFieldIndex] = { ...editField, firstName, lastName };
    }
  };

  const savePerson = () => {
    const { firstName, lastName } = fieldData;
    const isFilled = firstName && lastName;
    if (!isFilled) {
      updateState({ update: false }).notice = {
        error: true,
        message: lang[langData.fillingError],
      };
      updateState({ update: true })({ bubbling: true });
    } else {
      switch (view) {
        case viewMode.add:
          addPerson();
          break;
        case viewMode.edit:
          enrichPerson();
          break;
        default:
          break;
      }
    }
  };

  const comeBack = () => {
    updateState({ update: true })({ view: viewMode.list });
  };

  return (
    <div className="modal">
      <div className="modal__overley" />
      <div className="modal__cont">
        <div className="modal__title">{title}</div>
        <div className="modal__menu">
          <button className="modal__back" type="button" onClick={comeBack}>
            {lang[langData.back]}
          </button>
          {render(setFieldData)}
          <div className="modal__btn">
            <button className="modal__save" type="button" onClick={savePerson}>
              {lang[langData.save]}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

ModalWindow.defaultProps = {
  title: '',
  view: viewMode.load,
  persons: [],
  render: (f) => f,
  updateState: (f) => f,
  getData: (f) => f,
};

export default ModalWindow;
