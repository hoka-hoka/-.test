import React, { Component } from 'react';
import { viewMode, baseURL, lang, langData } from '../constants';
import Sprite from '../common/Sprite';
import Preloader from '../common/Preloader';
import Person from './Person';
import ModalWindow from './ModalWindow';

import EditPerson from './EditPerson';
import NewPerson from './NewPerson';
import './App.scss';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: viewMode.load,
      curEmployee: { firstName: '', lastName: '' },
      persons: [],
    };
  }

  componentDidMount = () => {
    this.getData('persons').then((resp) => {
      this.setState({ persons: resp, view: viewMode.add });
    });
  };

  getData = async (method, data) => {
    const resp = await fetch(
      `${baseURL}/api/v1/${method}`,
      data
        ? {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(data),
          }
        : {},
    );
    if (!resp?.ok) {
      this.setState({ error: true });
      return new Error('Ответ на запрос пустой');
    }
    return resp.json();
  };

  addEmployee = (event) => {
    event.stopPropagation();
    this.setState({ view: viewMode.add });
  };

  editEmployee = (person) => {
    this.setState({ view: viewMode.edit, curEmployee: person });
  };

  delEmployee = (index) => {
    this.setState(({ persons }) => ({
      persons: persons.filter((_, pos) => pos != index),
    }));
  };

  updateState = ({ update } = {}) => {
    if (update) {
      this.forceUpdate();
    }
    return this.state;
  };

  render() {
    const { view, curEmployee, persons } = this.state;

    console.log(persons);

    return (
      <>
        {view == viewMode.load ? <Preloader /> : false}
        <div
          className={`employees${
            view == viewMode.list ? '' : ' employees_hidden'
          }`}
        >
          <table className="employees__list">
            <thead>
              <tr className="employees__line">
                <th />
                <th className="employees__fname" colSpan="1">
                  {lang[langData.firstName]}
                </th>
                <th className="employees__lname" colSpan="2">
                  {lang[langData.lastName]}
                </th>
              </tr>
            </thead>
            <tbody>
              {persons.map((person, index) => (
                <Person
                  userData={person}
                  key={person.id}
                  editEmployee={() => this.editEmployee(person)}
                  delEmployee={() => this.delEmployee(index)}
                />
              ))}
            </tbody>
          </table>
          <button
            className="employees__add"
            type="button"
            onClick={this.addEmployee}
          >
            {lang[langData.add]}
          </button>
        </div>
        {view == viewMode.add && (
          <ModalWindow
            title={lang[langData.create]}
            persons={persons}
            updateState={({ update }) => this.updateState({ update })}
            getData={this.getData}
            render={(update, bubbling) => (
              <NewPerson setFieldData={update} bubbling={bubbling} />
            )}
          />
        )}
        {/* {view == viewMode.edit && (
          <ModalWindow
            title={lang[langData.edit]}
            updateState={({ update }) => this.updateState({ update })}
          >
            <EditPerson
              firstName={curEmployee.firstName}
              lastName={curEmployee.lastName}
            />
          </ModalWindow>
        )} */}
        <Sprite />
      </>
    );
  }
}
