import React, { Component } from 'react';
import { viewMode, baseURL, lang, langData } from '../constants';
import Preloader from '../common/Preloader';
import Notification from '../common/Notification';
import Sprite from '../common/Sprite';
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
      notice: {
        error: false,
        message: '',
      },
      bubbling: false,
      returnFocus: document.body,
    };
  }

  componentDidMount = () => {
    this.setState({ view: viewMode.load });
    this.getData('persons').then((resp) => {
      this.setState({
        persons: resp,
        view: viewMode.list,
      });
    });
  };

  resetBtnTrigger = (prevState) => {
    const { bubbling } = this.state;
    if (prevState.bubbling == bubbling) {
      return;
    }
    this.setState({ bubbling: false });
  };

  restoreFocus = (prevState) => {
    const { returnFocus, view } = this.state;
    if (prevState.view != view && view == viewMode.list) {
      returnFocus.focus();
    }
  };

  componentDidUpdate = (_, prevState) => {
    this.resetBtnTrigger(prevState);
    this.restoreFocus(prevState);
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
      this.setState({ view: viewMode.error });
      throw new Error(
        `ответ по запросу ${baseURL}/api/v1/${method} имеет статус ${resp.status}`,
      );
    }
    return resp.json();
  };

  addEmployee = (event) => {
    event.stopPropagation();
    this.setState({ view: viewMode.add, returnFocus: event.target });
  };

  editEmployee = (person, target) => {
    this.setState({
      view: viewMode.edit,
      curEmployee: person,
      returnFocus: target,
    });
  };

  delEmployee = (person) => {
    this.getData('persons', {
      id: person.id,
      del: 1,
    }).then((resp) => {
      if (!resp?.success) {
        console.error('Неверный формат данных удаления');
      }
    });
    this.setState(({ persons }) => ({
      persons: persons.filter((item) => item.id != person.id),
    }));
  };

  updateState = ({ update } = {}) => {
    if (update) {
      return (params) => this.setState(params);
    }
    return this.state;
  };

  render() {
    const { view, curEmployee, persons, bubbling, notice } = this.state;
    if (view == viewMode.error) {
      return false;
    }
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
              {persons.map((person) => (
                <Person
                  key={person.id}
                  userData={person}
                  editEmployee={(elem) => this.editEmployee(person, elem)}
                  delEmployee={() => this.delEmployee(person)}
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
            view={view}
            bubbling={bubbling}
            updateState={({ update }) => this.updateState({ update })}
            getData={this.getData}
            render={(update) => <NewPerson setFieldData={update} />}
          />
        )}

        {view == viewMode.edit && (
          <ModalWindow
            title={lang[langData.edit]}
            persons={persons}
            view={view}
            updateState={({ update }) => this.updateState({ update })}
            getData={this.getData}
            render={(update) => (
              <EditPerson curEmployee={curEmployee} setFieldData={update} />
            )}
          />
        )}
        <Notification bubbling={bubbling} notice={notice} />
        <Sprite />
      </>
    );
  }
}
