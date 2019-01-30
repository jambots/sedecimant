<?php

$siteId = "";
$route="unset";
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $route = test_input($_POST["route"]);
}

$endPoint="http://52.27.185.113/api/".$route."/";
//$endPoint="http://52.27.185.113/api/foo/";

$string="http://localhost:8000 localPassword123!";//source of hash
$secret="031987ad563836dd8339615bae2abbb3";
$payload="A nice message";
$myUrl="localhost:8000";
$myTime=time();
$myHostname=gethostname();
$authString=$myUrl.$myTime.$payload.$secret;
$authToken=md5($authString);

$postData = array(
  "hostname" => $myHostname,
  "route" => $route,
  "payload" => $payload,
  "time" => $myTime,
  "url" => $myUrl
);
if($route=="unsyndicate"){
  $postData["siteId"]=test_input($_POST["siteId"]);// not in use
  $endPoint=$endPoint.test_input($_POST["siteId"]);
}
if($route=="syndicate"){
  $postData["blogName"]=test_input($_POST["blogName"]);
  $postData["siteUrl"]=test_input($_POST["siteUrl"]);
  $postData["isBanned"]=test_input($_POST["isBanned"]);
  $postData["isApproved"]=test_input($_POST["isApproved"]);
  $postData["isUnsyndicated"]=test_input($_POST["isUnsyndicated"]);
  $postData["detail"]=test_input($_POST["detail"]);
  $postData["priority"]=test_input($_POST["priority"]);
  $postData["isComplete"]=test_input($_POST["isComplete"]);
  $postData["dueDate"]=test_input($_POST["dueDate"]);
  $postData["summary"]=test_input($_POST["summary"]);
}
// Setup cURL
$ch = curl_init($endPoint);
curl_setopt_array($ch, array(
  CURLOPT_POST => TRUE,
  CURLOPT_RETURNTRANSFER => TRUE,
  CURLOPT_HTTPHEADER => array(
    'Authorization: '.$authToken,
    'Content-Type: application/json'
  ),
  CURLOPT_POSTFIELDS => json_encode($postData)
));
// Send the request
$response = curl_exec($ch);
if($response === FALSE){
  die("error");
}
//curl_error($ch)
////$responseData = json_decode($response, TRUE);
//echo $route."|".$endPoint;
echo $response;

function test_input($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}
