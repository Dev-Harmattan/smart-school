const express =  require('express');
const { getMessage, postMessage, getResult, postResult, updateResult, deleteResult, getAllResults } = require('../controller/admin');
const router = express.Router();


router.route('/dashboard/message').get(getMessage).post(postMessage);


router.get('/dashboard/result/:userId', getResult);
router.get('/dashboard/result', getAllResults)
router.post('/dashboard/post/result', postResult);
router.patch('/dashboard/update/result/:userId/:courseId', updateResult);
router.delete('/dashboard/delete/result/:userId/:courseId', deleteResult);

module.exports =  router;