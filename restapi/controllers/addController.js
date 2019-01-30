const { MongoClient, ObjectId } = require('mongodb');
const util = require('./utilController');
const debug = require('debug')('app:addController');

exports.addSite = (req, res) => {
  res.render('addSite', { title: 'Adding a Site' });
};

exports.saveSite = async (req, res) => {
  try {
    const site = req.body;
    const dbParams = await util.setupDB();
    await dbParams.collection.insertOne(site);
    dbParams.client.close();
    res.redirect('/');
  }

  catch(err) {
    debug(err);
  }
};
