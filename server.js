const bodyParser = require('body-parser');
const jsonServer = require('json-server');
const { join } = require('path');

const { create, defaults, router: jsonRouter } = jsonServer;

const server = create();
const router = jsonRouter('db.json');
const middlewares = defaults();

const PORT = 3001;

server.use(bodyParser.json());
server.use(middlewares);

const insert = (table, data) => {
  const isFound = table
    .find(
      (item) =>
        item.firstName == data.firstName && item.lastName == data.lastName,
    )
    .value();
  if (!isFound) {
    table.push(data).write();
    return true;
  }
  return false;
};

const generateID = (table) => {
  const lastRecord = table.value().slice(-1)[0];

  const rezult = lastRecord ? lastRecord.id + 1 : 1;
  return rezult;
};

const enrichReq = (body, table) => {
  const rezult = {
    apiId: 'v1',
    id: generateID(table),
    ...body,
  };
  return rezult;
};

const editData = (db, req, res) => {
  const table = db.get('persons');
  const { firstName, lastName } = req.body;
  const isUserData = firstName && lastName;
  if (isUserData) {
    table.find({ id: req.body.id }).assign({ firstName, lastName }).value();
    db.write();
    res.jsonp({ success: 1, d: req.body });
  } else {
    res.jsonp({ success: 0 });
  }
};

const addData = (db, req, res) => {
  const table = db.get('persons');
  const body = enrichReq(req.body, table);
  const isInsert = insert(table, body);
  if (isInsert) {
    res.jsonp({ success: 1, d: body });
  } else {
    res.jsonp({ success: 0 });
  }
};

const delData = (db, req, res) => {
  const table = db.get('persons');
  const id = parseInt(req.body.id, 10);
  const del = parseInt(req.body.del, 10);
  if (del) {
    table.remove({ id }).write();
    res.jsonp({ success: 1 });
  } else {
    res.jsonp({ success: 0 });
  }
};

server.post('/api/v1/persons', (req, res) => {
  const { db } = router;
  if (req.body.id && req.body.del) {
    delData(db, req, res);
  } else if (req.body.id) {
    editData(db, req, res);
  } else {
    addData(db, req, res);
  }
});

server.use(router);

server.listen(PORT, () => {
  console.log(`JSON Server is running on port: ${PORT}`);
});

// Файл server.js включает настраиваемую функцию почтового запроса, которая обращается к экземпляру lowdb, используемому в экземпляре json-server. Данные из запроса POST проверяются на наличие дубликатов, и в БД добавляются только новые записи, идентификатор которых еще не существует. Функция write () lowdb сохраняет данные в файле db.json. Таким образом, данные в памяти и в файле всегда будут совпадать.

// req.body - тело запроса
// db.get('person') - получает обёртку lodash с данными из db.json
// db.get('person').value() - сам объект данных
