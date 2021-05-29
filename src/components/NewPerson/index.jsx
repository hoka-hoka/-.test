import './NewPerson.scss';
import React, { useEffect, useState } from 'react';
import { lang, langData } from '../../constants';

const NewPerson = ({ setFieldData, bubbling }) => {
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');

  useEffect(() => {
    if (bubbling) {
      setFieldData({
        firstName: fname,
        lastName: lname,
      });
    }
  }, [bubbling]);

  const writeFieldData = (val, index) => {
    if (!index) {
      setFname(val);
    } else {
      setLname(val);
    }
  };

  return (
    <div className="add-per">
      {[lang[langData.inpFirstName], lang[langData.inpLastName]].map(
        (fieldName, index) => (
          <input
            key={index}
            className="add-per__field"
            placeholder={fieldName}
            value={!index ? fname : lname}
            onChange={(event) => writeFieldData(event.target.value, index)}
          />
        ),
      )}
    </div>
  );
};

NewPerson.defaultProps = {
  setFieldData: (f) => f,
  bubbling: false,
};

export default NewPerson;
