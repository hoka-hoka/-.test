import React, { useState, useEffect } from 'react';
import { lang, langData } from '../../constants';
import './EditPerson.scss';

const EditPerson = ({ curEmployee, setFieldData }) => {
  const [fname, setFname] = useState(curEmployee.firstName);
  const [lname, setLname] = useState(curEmployee.lastName);

  useEffect(() => {
    setFieldData({
      firstName: fname,
      lastName: lname,
      id: curEmployee.id,
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
    <div className="edit-per">
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

EditPerson.defaultProps = {
  curEmployee: {
    firstName: '',
    lastName: '',
  },
  setFieldData: (f) => f,
};

export default EditPerson;
