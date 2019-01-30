const { ObjectId } = require('mongodb');
const util = require('./utilController');
const debug = require('debug')('app:apiUnsyndicateController');

exports.unsyndicateSite = async function(req, res) {
  try {
    const { id } = req.params;
    //const siteId=req.body.siteId;
    const dbParams = await util.setupDB();
    var returnObj={headers:req.headers, body:req.body, records:[]};
    returnObj.siteIdParam=id;
    returnObj.auth=util.auth(req.body.url, req.body.time, req.body.payload, req.headers.authorization);
    if(returnObj.auth.auth==true){
      //const sites = await dbParams.collection.find({isUnsyndicated:'false', isBanned:'false'}).sort({ dueDate: 1 }).toArray();
      //returnObj.records=sites;

      //let status = (site.isComplete == 'false') ? 'true' : 'false';
      let status = 'true';
      await dbParams.collection.findOneAndUpdate({ _id: new ObjectId(id) }, { $set: { isUnsyndicated: status } });
      const site = await dbParams.collection.findOne({ _id: new ObjectId(id) });
      returnObj.records.push(site);
    }
    res.json(returnObj);
    dbParams.client.close();
  }
  catch (err) {
    debug(err);
  }
};
