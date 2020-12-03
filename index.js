const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const app = express();
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
const port = 3000;

const personsList = [
  {
    personId: '23a1c108-97bf-4906-be5a-5872a566767b',
    name: 'Ola Norman',
    job: 'Elektriker',
  },
  {
    personId: 'abbcdced-aeb2-476b-8df8-d0cf49d7ed98',
    name: 'Kari Norman',
    job: 'Ordfører',
  },
];

const addressesList = [
  {
    addressId: '5f65febc-fb8c-4475-9cf8-045e6554a01e',
    street: "Norge's gate 2",
    country: 'Norge',
  },
  {
    addressId: 'a2432cc6-649a-4787-b6dd-e176d5f1a276',
    street: "Sverige's gate 1",
    country: 'Sverige',
  },
];

app.get('/text', async (req, res) => {
  console.log('GET /text');
  console.log(JSON.stringify(req.headers));
  for (const [key, value] of Object.entries(req.headers)) {
    console.log(key, value);
    res.set(key, value);
  }
  res.send('This is the test text');
});

app.get('/persons', async (req, res) => {
  console.log('GET /persons');
  console.log(JSON.stringify(req.headers));
  res.send(personsList);
});

app.post('/persons', async (req, res) => {
  console.log('POST /persons ' + JSON.stringify(req.body));
  console.log(JSON.stringify(req.headers));
  let b = req.body;
  b.personId = uuidv4();
  personsList.push(b);
  res.send(b);
});

app.put('/persons/:personId', async (req, res) => {
  console.log(
    'PUT /persons/' + req.params.personId + ' ' + JSON.stringify(req.body)
  );
  console.log(JSON.stringify(req.headers));
  let index = personsList.findIndex((p) => p.personId === req.params.personId);
  if (index == -1) {
    return res.sendStatus(404);
  }
  personsList.splice(index, 1);
  let b = req.body;
  b.personId = req.params.personId;
  personsList.push(b);
  res.send(b);
});

app.delete('/persons/:personId', async (req, res) => {
  console.log('DELETE /persons/' + req.params.personId);
  console.log(JSON.stringify(req.headers));
  let index = personsList.findIndex((p) => p.personId === req.params.personId);
  if (index == -1) {
    return res.sendStatus(404);
  }
  personsList.splice(index, 1);
  return res.sendStatus(200);
});

app.get('/persons/:personId', async (req, res) => {
  console.log('GET /persons/' + req.params.personId);
  console.log(JSON.stringify(req.headers));
  let index = personsList.findIndex((p) => p.personId === req.params.personId);
  if (index == -1) {
    return res.sendStatus(404);
  }
  res.send(personsList[index]);
});

app.get('/addresses', async (req, res) => {
  console.log('GET /addresses');
  console.log(JSON.stringify(req.headers));
  res.send(addressesList);
});

app.get('/addresses/:addressId', async (req, res) => {
  console.log('GET /addresses/' + req.params.addressId);
  console.log(JSON.stringify(req.headers));
  let index = addressesList.findIndex(
    (a) => a.addressId === req.params.addressId
  );
  if (index == -1) {
    return res.sendStatus(404);
  }
  res.send(addressesList[index]);
});

app.delete('/addresses/:addressId', async (req, res) => {
  console.log('DELETE /addresses/' + req.params.addressId);
  console.log(JSON.stringify(req.headers));
  let index = addressesList.findIndex(
    (a) => a.addressId === req.params.addressId
  );
  if (index == -1) {
    return res.sendStatus(404);
  }
  addressesList.splice(index, 1);
  return res.sendStatus(200);
});

app.post('/addresses/', async (req, res) => {
  console.log('POST /addresses/' + ' ' + JSON.stringify(req.body));
  console.log(JSON.stringify(req.headers));
  let b = req.body;
  b.addressId = uuidv4();
  addressesList.push(b);
  res.send(b);
});

app.get('/status/:code', async (req, res) => {
  console.log('GET /status/' + req.params.code);
  console.log(JSON.stringify(req.headers));
  res.sendStatus(req.params.code);
});

app.get('/urltest1/:id1/test/:id2', async (req, res) => {
  console.log('GET /urltest/' + req.params.id1 + '/test/' + req.params.id2);
  let url = '/urltest1/' + req.params.id1 + '/test/' + req.params.id2;
  let returnValue = { url: url };
  res.send(returnValue);
});

app.get('/urltest2/:id1/:id2/test', async (req, res) => {
  console.log(
    'GET /urltest/' + req.params.id1 + '/' + req.params.id2 + '/test'
  );
  let url = '/urltest2/' + req.params.id1 + '/' + req.params.id2 + '/test';
  let returnValue = { url: url };
  res.send(returnValue);
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
