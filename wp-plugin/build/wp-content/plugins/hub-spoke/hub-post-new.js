console.log('hub-post-new.js ran');
var postImageArray=[];
var checkTimeout;
function imageCheck(){
  var canv=document.getElementById('CursorLayer');
  var ctx=canv.getContext('2d');
  if( tinyMCE.activeEditor.dom !==null){
    var images=tinyMCE.activeEditor.dom.doc.getElementsByClassName('postImage');
    console.log(images.length);
    for (var i=0; i<images.length; i++){
      ctx.drawImage(images[i],i*100,0,100,100);
    }
  }
  checkTimeout=window.setTimeout("imageCheck()", 400);

}
jQuery(document).ready(function($) {
  checkTimeout=window.setTimeout("imageCheck()", 400);
  // your code here
var canvas = document.createElement('canvas');

canvas.id = "CursorLayer";
canvas.width = 400;
canvas.height = 100;
canvas.style.right = "20px";
canvas.style.top = "60px";
canvas.style.zIndex = 8000;
canvas.style.position = "fixed";
canvas.style.border = "1px solid";


var body = document.getElementsByTagName("body")[0];
body.appendChild(canvas);

cursorLayer = document.getElementById("CursorLayer");

console.log(php_vars);

// below is optional

var ctx = canvas.getContext("2d");
ctx.fillStyle = "rgba(255, 0, 0, 0.2)";
ctx.fillRect(100, 100, 200, 200);
ctx.fillStyle = "rgba(0, 255, 0, 0.2)";
ctx.fillRect(150, 150, 200, 200);
ctx.fillStyle = "rgba(0, 0, 255, 0.2)";
ctx.fillRect(200, 50, 200, 200);

});
