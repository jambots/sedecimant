let express = require('express');
let router = express.Router();

const apiListController = require('../controllers/apiListController');
const apiUnsyndicateController = require('../controllers/apiUnsyndicateController');
const apiSyndicateController = require('../controllers/apiSyndicateController');

router.post('/api/list/', apiListController.listSites);
router.post('/api/banned/', apiListController.bannedSites);
router.post('/api/approved/', apiListController.approvedSites);
router.post('/api/unsyndicate/:id', apiUnsyndicateController.unsyndicateSite);
router.post('/api/syndicate/', apiSyndicateController.syndicateSite);
module.exports = router;
