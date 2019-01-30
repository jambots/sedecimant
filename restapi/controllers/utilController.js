const { MongoClient, ObjectId } = require('mongodb');
const debug = require('debug')('app:utilController');
const md5 = require('md5');

exports.auth=function(bodyUrl, bodyTime, bodyPayload, reqAuthorization){
  var authObj={info:{}, params:{bodyUrl:bodyUrl, bodyTime:bodyTime, bodyPayload:bodyPayload, reqAuthorization:reqAuthorization}};
  const secret="031987ad563836dd8339615bae2abbb3";
  const serverTime=Math.floor(new Date().getTime()/1000);
  const deltaSec=Math.abs(Number(bodyTime)-serverTime);
  let authString=bodyUrl+bodyTime+bodyPayload+secret;
  let authReturn=md5(authString);
  //res.json({sent:req.headers.authorization, returned:authReturn});
  authObj.info.serverTime=serverTime;
  authObj.info.authReturn=authReturn;

  authObj.info.deltaSec=deltaSec;
  authObj.info.timeMatch=false;
  if(deltaSec<60){authObj.info.timeMatch=true;}
  authObj.info.authMatch=false;
  if(reqAuthorization==authReturn){authObj.info.authMatch=true;}
  authObj.auth=false;
  if((authObj.info.authMatch==true)&&(authObj.info.timeMatch==true)){
    authObj.auth=true;
  }

  return authObj;
}

exports.setupDB = async function () {
  const url = process.env.DB_URL;
  debug(`attempting to connect to database at ${url}`);
  const dbName = 'tasks';
  try {
    const client = await MongoClient.connect(url, { useNewUrlParser: true });
    const db = client.db(dbName);
    const collection = await db.collection('tasks');
    return ({ client: client, collection: collection })
  }

  catch (err) {
    debug(err);
  }
};
