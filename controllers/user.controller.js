const database = require('../config/connect');

//read

function getAllUsers(req, res) {
    database.con.query('SELECT userId, email, username, firstName, lastName, city, active FROM User  order by userId;', function (err, rows, fields) {
        if (!err) {
            if (rows.length == 0) {
                res.status(404).send("Data not found");
            } else {
                res.status(200).send(rows);
            }
        } else {
            res.status(400).send({
                "msg": err.code
            });
        }
    });
}

//readID 
//TODO form validation
function getUser(req, res) {
    const paymentId = parseInt(req.params['id']);
    database.con.query('SELECT userId, email, username, firstName, lastName, city, active FROM User WHERE userId=?', userId, function (err, rows, fields) {
        if (!err) {
            //verifica os resultados se o número de linhas for 0 devolve dados não encontrados, caso contrário envia os resultados(rows).
            if (rows.length == 0) {
                res.status(404).send({
                    "msg": "data not found"
                });

                console.log("data not found");
            } else {
                res.status(200).send(rows);
                console.log("inserido com sucesso")

            }
        } else
            res.status(400).send({
                "msg": err.code
            });
    });
}


//save
function addUser(req, res) {
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const city = req.body.city;

    let postData = {
        email: email,
        username: username,
        password: password,
        firstName: firstName,
        lastName: lastName,
        city: city
    };
    database.con.query('INSERT INTO User SET ?', postData, function (err, rows, fields) {
        if (!err) {
            res.status(201).location(rows.insertId).send({
                'msg': 'Inserted with Sucess'
            });
            console.log ("inserido com sucesso");


        } else {
            if (err.code == 'ER_DUP_ENTRY') {
                res.status(409).send({
                    'msg': err.code
                });
                console.log("nao inserido erro 409");
            } else {
                res.status(400).send({
                    'msg': err.code
                });
                console.log("nao inserido erro 400");
            }
        }
    });
}

//update
function updateUser(req, res) {
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const city = req.body.city;

    let postData = {
        email: email,
        username: username,
        password: password,
        firstName: firstName,
        lastName: lastName,
        city: city
    };

    database.con.query('UPDATE User SET username = ?, password = ?, firstName = ?, lastName = ?, city = ? WHERE userId = ?;', postData, function (err, rows, fields) {

        if (!err) {
            res.status(200).send({
                'msg': 'update with success'
            });
        } else {
            res.status(400).send({
                'msg': err.code
            });
        }
    });
}

//deleteID
function deleteUser(req, res) {
    const userId = parseInt(req.body.id);
    database.con.query('DELETE User WHERE userId = ?', userId, function (err, rows, fields) {
        if (!err) {
            if (rows.length == 0) {
                res.status(404).send({
                    "msg": "data not found"
                });
            } else {
                res.status(200).send({
                    "msg": "success"
                });
            }
        } else
            console.log(err.code);
    });
}

module.exports = {
    getAllUsers: getAllUsers,
    getUser: getUser,
    addUser: addUser,
    updateUser: updateUser,
    deleteUser: deleteUser
}