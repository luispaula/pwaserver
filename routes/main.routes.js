const app = require('../server');
const controllerUser =
require('../controllers/user.controller');

app.get('/users/', controllerUser.getAllUsers);
app.post('/users/', controllerUser.addUser);