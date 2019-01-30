var remoteArray=[];
var idByName={};
var siteurlByName={};
var apiUrl="http://52.27.185.113/api";
var tunnelUrl="/wp-content/plugins/hub-spoke/apitunnel.php";
listRecords();
function filterChanged(value){
  console.log('filterChanged('+value+')');
  route=value;
  listRecords();
}
function listRecords(){
   console.log('listRecords '+route);
   var foundSelf=false;
   remoteArray=[];
   $.post(tunnelUrl, {route:route}, function(result){
      result=JSON.parse(result);
      console.log(result);
      var str='';//      <div style="border:1px solid grey; background-color:white; width:45%; float:left; padding:5px; margin:5px;">';
      var records=result.records;
      //console.log('blogname='+blogname);
      var selfApproved=false;
      for (var r=0; r<records.length; r++){
        console.log(r);
        console.log(records[r]);
        //console.log(selectedHubSpokes);
        remoteArray.push(records[r]);
        idByName[records[r].blogName]=records[r]['_id'];
        siteurlByName[records[r].blogName]=records[r]['siteUrl'];
        var selected="";
        if(selectedHubSpokes !==false){
          //console.log('indexOf = '+selectedHubSpokes.indexOf(records[r].blogName));
          for (var s=0; s<selectedHubSpokes.length; s++){
            if(selectedHubSpokes[s].siteUrl==records[r].siteUrl){selected="checked";}
          }

        }
        str+='<input type="checkbox" onchange="saveSelections()" name="'+records[r].blogName+'" style="margin:2px;" '+selected+'>'+records[r].blogName+'</input><br>';
        //console.log("selected="+selected);
        if(records[r].siteUrl==siteurl){
          foundSelf=true;
          if(records[r].isApproved=="true"){selfApproved=true;}
          //alert((typeof records[r].isApproved)+selfApproved+" "+records[r].isApproved);
        }
      }
      //str+="</div>";
      document.getElementById('selectSites').innerHTML=str;
      var syn='';
      if(foundSelf==false){
        syn+='<h3>Your content is not listed</h3>';
        syn+='<div><input type="button" onclick="syndicate()" value="Syndicate '+blogname+'"></input></div>';
      }
      else{
        syn+='<h3>Your content is listed';
        if(selfApproved){
          syn+=' and Approved';
        }
        syn+='</h3>';
        syn+='<div><input type="button" onclick="unlistSelf()" value="Unlist '+blogname+'"></input></div>';
      }
      document.getElementById('syndicate').innerHTML=syn;
      saveSelections();

   })
 }
function saveSelections(){
  var selectedArray=[];
  for(var r=0;r<remoteArray.length; r++){
    var el=document.getElementsByName(remoteArray[r].blogName)[0];
    console.log(remoteArray[r].blogName+' '+el.checked);
    if(el.checked){selectedArray.push(remoteArray[r]);}
  }
  var field=document.getElementsByName("hub_spoke_selected")[0];
  field.value=JSON.stringify(selectedArray);
}
function detailRecord(id){
  console.log('detailRecord '+id);
}
/*
function updateNameSiteurl(id, name,url){

  $.ajax({
    url: apiUrl+'/tasks/'+id,
    type: 'PUT',
    data:{name:name, siteurl:url},
    success: function(data) {
      console.log(data);
    }
  });
}
*/

function unlistSelf(){
  var siteId=idByName[blogname];
  console.log(siteId)
  unsyndicateRecord(siteId);
}

//type was 'unsyndicate'
function unsyndicateRecord(siteId){
  console.log('unsyndicateRecord('+siteId+')');
  $.post(tunnelUrl, {route:'unsyndicate', siteId:siteId}, function(result){
    console.log(result);
    listRecords();
  });
}
/*
data: {
  name:blogname,
  siteurl:siteurl
},
*/
function syndicate(){
  $.post(tunnelUrl, {
    route:'syndicate',
    blogName:blogname,
    siteUrl:siteurl,
    isBanned:false,
    isApproved:false,
    isUnsyndicated:false,
    detail:'',
    priority:'Low',
    isComplete:false,
    dueDate:'',
    summary:''
  }, function(result){
    console.log(result);
    listRecords();
  });

}
