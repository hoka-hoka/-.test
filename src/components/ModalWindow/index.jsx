import './ModalWindow.scss';
import React, { useState } from 'react';
import { lang, langData, viewMode } from '../../constants';

const ModalWindow = ({ title, children, updateState }) => {
  const [state, setState] = useState();

  const comeBack = () => {
    updateState({ update: true }).view = viewMode.list;
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
          {children}
          <div className="modal__btn">
            <button className="modal__save" type="button">
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
  children: <></>,
  updateState: (f) => f,
};

export default ModalWindow;
