const {createCollaboration,} = require('../controllers/collaborationController');
var express = require('express');
var router = express.Router();

/* POST users listing. */
router.post('/', createCollaboration);

module.exports = router;
//////