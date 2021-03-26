const express = require('express');
const router = express.Router();

const sha1 = require('sha1');
const mysql = require('../mysql').pool;


//GET by email
router.get('/:email', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {
            console.log(error);
            conn.release();
            return;
        }

        conn.query("CALL getUserData(?)",
            [req.params.email],
            (error, result, field) => {
                conn.release();

                if (error) {
                    res.status(500).send({
                        error: error,
                        response: "Algo deu errado"
                    })
                }

                res.status(200).send({
                    result: result[0]
                })
            });
    })
});

//GET all
router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {
            conn.release();
            return;
        }

        conn.query('SELECT * FROM user ORDER BY points DESC', (error, result, field) => {
            conn.release();

            if (error) {
                res.status(500).send({
                    error: error,
                    response: "Algo deu errado"
                })
            }

            res.status(200).send({
                response: "Sucesso!",
                result: result
            })
        });
    })
});

//POST basic
router.post('/', (req, res, next) => {

    let userFriendCode = sha1(req.body.email);

    let refFriendCode = req.body.friendCode;
    let refFriendId = req.body.friendCode;

    let refFriendScored = false;

    mysql.getConnection((error, conn) => {
        if (error) {
            conn.release();
            return;
        }

        if (refFriendCode.friendCode !== "") {

            conn.query('SELECT id, friendCode, points FROM user WHERE friendCode LIKE ? AND user.email <> ?',
                [refFriendCode, req.body.email],
                (error, result, field) => {

                    if (result[0] != null) {
                        refFriendScored = true;
                        refFriendId = result[0].id;
                    }
                })
        }

        conn.query(
            'insert INTO user (name, email, phone, friendCode) VALUES (?, ?, ?, ?)',
            [req.body.name, req.body.email, req.body.phone, userFriendCode],
            (error, result, field) => {
                conn.release();

                if (error !== null) {
                    res.status(500).send({
                        error: error,
                        response: "Algo deu errado"
                    })
                } else {

                    let userID = result.insertId;

                    if (refFriendScored) {
                        conn.query('UPDATE user SET points = (points + 1) WHERE id = ?', [refFriendId],
                            (err, re, f) => { });
                    }

                    res.status(201).send({
                        response: "Sucesso!",
                        idUser: userID
                    })
                }
            }
        )
    })
});

module.exports = router;