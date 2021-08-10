const db = require("../models");
const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
    if (!req.body.title) {
        res.status(400).send({
            message: "Contenido no puede estar vacio!",
        });
        return;
    }
    // Create a Tutorial
    const tutorial = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false,
    };

    // Save Tutorial in the database
    Tutorial.create(tutorial)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Ocurrio un error.",
            });
        });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ?
        {
            title: {
                [Op.iLike]: `%${title}%`,
            },
        } :
        null;

    Tutorial.findAll({ where: condition })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Ocurrio un error",
            });
        });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Tutorial.findByPk(id)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: "Erro al buscar tutorial con id" + id,
            });
        });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Tutorial.update(req.body, {
            where: { id: id },
        })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Tutorial editado exitosamente.",
                });
            } else {
                res.send({
                    message: `No se puede editar tutorial con id=${id}`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error al editar tutorial con id=" + id,
            });
        });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Tutorial.destroy({
            where: { id: id },
        })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Tutorial borrado exitosamente!",
                });
            } else {
                res.send({
                    message: `No se puede borrar tutorial con id=${id}. `,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "No se puede borrar tutorial con id=" + id,
            });
        });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    Tutorial.destroy({
            where: {},
            truncate: false,
        })
        .then((nums) => {
            res.send({
                message: `${nums} Tutoriales fueron eliminados exitosamente!`,
            });
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Ocurrio un error.",
            });
        });
};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {
    Tutorial.findAll({ where: { published: true } })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Ocurrio un error",
            });
        });
};