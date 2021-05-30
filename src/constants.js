const baseURL = 'http://localhost:3001';

const viewMode = {
  load: 'load',
  list: 'list',
  add: 'add',
  edit: 'edit',
};

const lang = [
  'Имя',
  'Фамилия',
  'Добавить сотрудника',
  'Создание сотрудника',
  'Назад к списку',
  'Введите имя сотрудника',
  'Введите фамилию сотрудника',
  'Сохранить',
  'Редактировать сотрудника',
  'Ошибка заполнения',
  'Сотрудник создан',
  'Сотрудник уже существует',
  'Данные обновлены',
];

const langData = {
  firstName: 0,
  lastName: 1,
  add: 2,
  create: 3,
  back: 4,
  inpFirstName: 5,
  inpLastName: 6,
  save: 7,
  edit: 8,
  fillingError: 9,
  createEmp: 10,
  empError: 11,
  update: 12,
};

export { viewMode, baseURL, lang, langData };
