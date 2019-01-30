const util = require('./utilController');
const debug = require('debug')('app:apiListController');

exports.approvedSites = async function(req, res) {
  try {
    const dbParams = await util.setupDB();
    var returnObj={headers:req.headers, body:req.body, records:[]};
    returnObj.auth=util.auth(req.body.url, req.body.time, req.body.payload, req.headers.authorization);
    if(returnObj.auth.auth==true){
      const sites = await dbParams.collection.find({isApproved:'true', isBanned:'false'}).sort({ dueDate: 1 }).toArray();
      returnObj.records=sites;
    }
    res.json(returnObj);
    dbParams.client.close();
  }
  catch (err) {
    debug(err);
  }
};
exports.bannedSites = async function(req, res) {
  try {
    const dbParams = await util.setupDB();
    var returnObj={headers:req.headers, body:req.body, records:[]};
    returnObj.auth=util.auth(req.body.url, req.body.time, req.body.payload, req.headers.authorization);
    if(returnObj.auth.auth==true){
      const sites = await dbParams.collection.find({isBanned:'true'}).sort({ dueDate: 1 }).toArray();
      returnObj.records=sites;
    }
    res.json(returnObj);
    dbParams.client.close();
  }
  catch (err) {
    debug(err);
  }
};
exports.listSites = async function(req, res) {
  try {
    const dbParams = await util.setupDB();
    var returnObj={headers:req.headers, body:req.body, records:[]};
    returnObj.auth=util.auth(req.body.url, req.body.time, req.body.payload, req.headers.authorization);
    if(returnObj.auth.auth==true){
      const sites = await dbParams.collection.find({isUnsyndicated:'false', isBanned:'false'}).sort({ dueDate: 1 }).toArray();
      returnObj.records=sites;
    }
    res.json(returnObj);
    dbParams.client.close();
  }
  catch (err) {
    debug(err);
  }
};
