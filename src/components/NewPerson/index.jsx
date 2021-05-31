import React, { useEffect, useState } from 'react';
import { lang, langData } from '../../constants';
import './NewPerson.scss';

const NewPerson = ({ setFieldData }) => {
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');

  useEffect(() => {
    setFieldData({
      firstName: fname,
      lastName: lname,
    });
  }, [fname, lname]);

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
};

export default NewPerson;
