const express = require('express');
const authMiddleware = require('../middlewares/auth');
const Task = require('../models/task');

const router = express.Router();

router.use(authMiddleware);


//Criar

router.post('/', async (req, res) => {
	try {
  
		const task = await Task.create({...req.body, user: req.userId});
  
		return res.send({ task });
	} catch (err) {
		return res.status(400).send({ error: 'Error creating new project' });
	}});

//Listar

router.get('/', async (req, res) => {
	try {
		const {userId} = req;
		const tasks = await Task.find({user:userId}).populate('user');

		return res.send({ tasks });
	} catch (err) {
		return res.status(400).send({ error: 'Error loading tasks' });
	}
});

//Filtrar por id e mostrar

router.get('/:taskId', async (req, res) => {
	try {
		const task = await Task.findById(req.params.taskId).populate('user');

		return res.send({ task });
	} catch (err) {
		return res.status(400).send({ error: 'Error loading task' });
	}
});

//Atualizar informações

// router.put('/:taskId', async (req, res) => {
// 	try {
// 		const { title, description } = req.body;

// 		const task = await Task.findByIdAndUpdate(req.params.taskId, {
// 			title,
// 			description
// 		}, { new: true });
// 		return res.send({ task });
// 	} catch (err) {
// 		return res.status(400).send({ error: 'Error updating task' });
// 	}
// });


//Atualizar completo ou não

router.put('/:taskId', async (req, res) => {
	try {
		const { completed } = req.body;

		const task = await Task.findByIdAndUpdate(req.params.taskId, {
			completed
		}, { new: true });
		return res.send({ task });
	} catch (err) {
		return res.status(400).send({ error: 'Error updating task' });
	}
});



//Deletar tarefa

router.delete('/:taskId', async (req, res) => {
	try {
		await Task.findByIdAndRemove(req.params.taskId);
		return res.send('sucess in remove task');
	} catch (err) {
		return res.status(400).send({ error: 'Error deleting task' });
	}
});

module.exports = app => app.use('/task', router);