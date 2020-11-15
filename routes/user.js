var express = require('express')
var router = express.Router()

var User = require('../models/user')



router.get('/', function(req, res, next) {

    User.find()
        .exec(function(err, result) {
            if (err) {
                return res.status(500).json({
                    errorTitle: 'Erro ao buscar usuarios',
                    error: err
                })
            }
            res.status(200).json({
                objResult: result
            })
        })
});


router.post('/', function (req, res, next) {
    var user = new User(req.body)

    User.findOne({ email: user.email }, function (err, result) {
        if (result) {
            return res.status(400).json({
                errorTitle: 'Já existe um usuário com o email '+ user.email,
                error: err
            })
        }
        user.save(function (err, result) {
            if (err) {
                return res.status(500).json({
                    errorTitle: 'Erro ao salvar usaurio',
                    error: err
                })
            }
            res.status(200).json({
                msg: "Dados salvos com sucesso",
                objResult: result
            })
        })
    })

});

router.post('/signin', function (req, res, next) {
    User.findOne({ email: req.body.email }, function (err, result) {
        if (err) {
            return res.status(500).json({
                errorTitle: 'Erro ao buscar usuário',
                error: err
            })
        }
        if (!result) {
            return res.status(500).json({
                errorTitle: 'Login inválido',
                error: err
            })
        }
        res.status(200).json({
            objResult: result
        })
    })
})

module.exports = router