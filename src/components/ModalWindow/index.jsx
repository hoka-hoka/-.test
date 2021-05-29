import './ModalWindow.scss';
import React, { useEffect, useState, useRef } from 'react';
import { lang, langData, viewMode } from '../../constants';

const ModalWindow = ({ title, persons, render, updateState, getData }) => {
  const [fieldData, setFieldData] = useState({ firstName: '', lastName: '' });
  const [bubbling, setBubbling] = useState(false);
  const tempId = useRef(persons.length + 1);

  const enrichPersons = () => {
    const { firstName, lastName } = fieldData;
    persons.push({
      firstName,
      lastName,
      id: tempId.current,
      image: 'img/ava.png',
    });
    tempId.current += 1;
  };

  useEffect(() => {
    setBubbling(false);
    const { firstName, lastName } = fieldData;
    const isFilled = firstName && lastName;
    if (!isFilled) {
      return;
    }
    const data = {
      firstName,
      lastName,
      image: 'img/ava.png',
    };
    // getData('persons', data);
    enrichPersons();
  }, [fieldData]);

  const comeBack = () => {
    updateState({ update: true }).view = viewMode.list;
  };

  const savePerson = () => {
    setBubbling(true);
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
          {render(setFieldData, bubbling)}
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
  persons: [],
  render: (f) => f,
  updateState: (f) => f,
  getData: (f) => f,
};

export default ModalWindow;
