var express = require('express')
var router = express.Router()

var Message = require('../models/message')

router.get('/', function(req, res, next) {

    Message.find().populate('user')
        .exec(function(err, result) {
            if (err) {
                return res.status(500).json({
                    errorTitle: 'Erro ao buscar mensagens',
                    error: err
                })
            }
            res.status(200).json({
                objResult: result
            })
        })
});

router.post('/', function(req, res, next) {
    var message = new Message({
        content: req.body.content,
        user: req.body.user,
    })


    message.save(function(err, result) {
        if (err) {
            return res.status(500).json({
                errorTitle: 'Erro ao salvar a mensagem',
                error: err
            })
        }
        res.status(200).json({
            msg: "Dados salvos com sucesso!",
            objResult: result
        })
    })
});

router.delete('/:id', function(req, res, next) {
    Message.findById(req.params.id, function(err, result) {
        if (err) {
            return res.status(500).json({
                errorTitle: 'Erro ao buscar mensagem',
                error: err
            })
        }
        if (!result) {
            return res.status(500).json({
                errorTitle: 'Não existe uma mensagem cadastrada com os parametros informados',
                error: err
            })
        }
        result.remove(function(err, deleteResult) {
            if (err) {
                return res.status(500).json({
                    errorTitle: ' Erro ao remover mensagem',
                })
            }
            res.status(200).json({
                msg: "Mensagem removida com sucesso!",
                objResult: deleteResult
            })
        })
    })
});

router.patch('/:id', function(req, res, next) {
    Message.findById(req.params.id, function(err, result) {
        if (err) {
            return res.status(500).json({
                errorTitle: 'Erro ao buscar mensagem',
                error: err
            })
        }
        if (!result) {
            return res.status(500).json({
                errorTitle: 'Não existe uma mensagem cadastrada com os parametros informados',
            })
        }

        result.content = req.body.content
        result.user = req.body.user
        result.save(function(err, updateResult) {
            if (err) {
                return res.status(500).json({
                    errorTitle: 'Erro ao editar mensagem',
                    error: err
                })
            }
            res.status(200).json({
                msg: "Mensagem alterada com sucesso!",
                objResult: updateResult
            })
        })
    })
});

module.exports = router;