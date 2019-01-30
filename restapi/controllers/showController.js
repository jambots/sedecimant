const util = require('./utilController');
const { MongoClient } = require('mongodb');
const os = require("os");
const debug = require('debug')('app:showController');


exports.showSites = async function (req, res) {
  try {
    const dbParams = await util.setupDB();
    const sites = await dbParams.collection.find({}).sort({ dueDate: 1 }).toArray();
    const hostname = os.hostname();
    res.render('showSites', { sites, title: 'Admin Sites', hostname });
    dbParams.client.close();
  }

  catch (err) {
    debug(err);
  }
}
