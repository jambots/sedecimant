let express = require('express');
let router = express.Router();

//const booksController = require('../controllers/booksController');
const showController = require('../controllers/showController');
const addController = require('../controllers/addController');
const editController = require('../controllers/editController');
const deleteController = require('../controllers/deleteController');
const completeController = require('../controllers/completeController');
const toggleController = require('../controllers/toggleController');

router.post('/site/approving/:id', toggleController.toggleApproving);
router.post('/site/banning/:id', toggleController.toggleBanning);
router.post('/site/syndication/:id', toggleController.toggleSyndication);
router.post('/site/complete/:id', completeController.commitComplete);
router.get('/site/delete/:id', deleteController.deleteSite);
router.post('/site/delete/:id', deleteController.confirmDelete);
router.get('/site/edit/:id', editController.editSite);
router.post('/site/edit/:id', editController.commitEdit);
router.get('/site/add/', addController.addSite);
router.post('/site/add/', addController.saveSite);
router.get('/', showController.showSites);
router.post('/', showController.showSites);
//router.get('/api/books', booksController.showBooks);

module.exports = router;
