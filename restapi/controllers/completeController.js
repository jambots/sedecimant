const { MongoClient, ObjectId } = require('mongodb');
const util = require('./utilController');
const debug = require('debug')('app:completeController');

exports.commitComplete = async (req, res) => {
  try {
      const { id } = req.params;
      const dbParams = await util.setupDB();
      const site = await dbParams.collection.findOne({ _id: new ObjectId(id) });
      let status = (site.isComplete == 'false') ? 'true' : 'false';
      await dbParams.collection.findOneAndUpdate({ _id: new ObjectId(id) }, { $set: { isComplete: status } });
      dbParams.client.close();
      res.redirect('/');
  }

  catch (err) {
      debug(err);
  }
};
