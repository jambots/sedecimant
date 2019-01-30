const { ObjectId } = require('mongodb');
const util = require('./utilController');
const debug = require('debug')('app:deleteController');

exports.deleteSite = async (req, res) => {
  try {
    const { id } = req.params;
    const dbParams = await util.setupDB();
    const site = await dbParams.collection.findOne({ _id: new ObjectId(id) });
    dbParams.client.close();
    res.render('confirmDelete', { site, title: 'Confirm Delete' });
  }

  catch (err) {
    debug(err);
  }
}

exports.confirmDelete = async (req, res) => {
  try {
    const { id } = req.params;
    const dbParams = await util.setupDB();
    const site = await dbParams.collection.deleteOne({ _id: new ObjectId(id) });
    const sites = await dbParams.collection.find({}).sort({ dueDate: 1 }).toArray();
    dbParams.client.close();
    res.redirect('/');
  }

  catch (err) {
    debug(err);
  };
};
