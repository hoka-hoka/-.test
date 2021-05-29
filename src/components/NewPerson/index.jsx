import './NewPerson.scss';
import React, { useState } from 'react';
import { lang, langData } from '../../constants';

const NewPerson = ({ updateState }) => {
  const [state, setState] = useState();

  return (
    <div className="add-per">
      <input
        className="add-per__field"
        placeholder={lang[langData.inpFirstName]}
      />
      <input
        className="add-per__field"
        placeholder={lang[langData.inpLastName]}
      />
    </div>
  );
};

NewPerson.defaultProps = {
  updateState: (f) => f,
};

export default NewPerson;
