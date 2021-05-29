import './EditPerson.scss';
import React, { useState } from 'react';

import { lang, langData } from '../../constants';

const EditPerson = ({ firstName, lastName }) => {
  const [state, setState] = useState();
  return (
    <div className="edit-per">
      <input
        className="add-per__field"
        placeholder={lang[langData.inpFirstName]}
        defaultValue={firstName ?? ''}
      />
      <input
        className="add-per__field"
        placeholder={lang[langData.inpLastName]}
        defaultValue={lastName ?? ''}
      />
    </div>
  );
};

EditPerson.defaultProps = {
  firstName: '',
  lastName: '',
};

export default EditPerson;
