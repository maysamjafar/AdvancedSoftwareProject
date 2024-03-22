const {createCollaboration,deleteCollaboration,getCollaboration,updateCollaboration} = require('../controllers/collaborationController');
//const {deleteCollaboration,} = require('../controllers/collaborationController');

var express = require('express');
var router = express.Router();

/* POST users listing. */
router.post('/', createCollaboration);
router.delete('/:collaborationId',deleteCollaboration);
router.get('/:collaborationId',getCollaboration);
router.put('/:collaborationId',updateCollaboration);
module.exports = router;
/////////