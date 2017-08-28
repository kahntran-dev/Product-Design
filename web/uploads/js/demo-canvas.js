// function clearCanvas(mainCanvas, mainCtx) {
//     mainCtx.clearRect(0,0,mainCanvas.width,mainCanvas.height);
// }
//
// function changeStateToNormal(mainCtx) {
//     mainCtx.globalCompositeOperation = 'source-over';
// }
//
// function drawWithColor(mainCanvas, mainCtx, mainColor, mainImg) {
//     mainCtx.fillStyle = mainColor;
//     mainCtx.fillRect(0,0,mainCanvas.width,mainCanvas.height);
//     mainCtx.globalCompositeOperation = 'destination-atop';
//     mainCtx.drawImage(mainImg,0,0,mainCanvas.width, mainCanvas.height);
//     mainCtx.globalCompositeOperation = 'multiply';
//     mainCtx.drawImage(mainImg,0,0,mainCanvas.width, mainCanvas.height);
// }
//
// function drawWithTextAndFillingShapes(mainCtx) {
//     mainCtx.globalCompositeOperation = 'source-atop';
//     mainCtx.fillStyle = '#905656';
//     mainCtx.font = 'italic 40pt Calibri';
//     mainCtx.fillText('Hello world', 10, 50);
// }
//
// function drawWithTextAndShapesOutlines(mainCtx) {
//     mainCtx.globalCompositeOperation = 'source-atop';
//     mainCtx.strokeStyle = '#eceeef';
//     mainCtx.font = 'italic 40pt Calibri';
//     mainCtx.strokeText('Hello world', 10, 50);
// }
//
// function mainRunning(mainCanvas, mainCtx, mainColor, mainImg) {
//     clearCanvas(mainCanvas,mainCtx);
//     drawWithColor(mainCanvas,mainCtx,mainColor,mainImg);
//     changeStateToNormal(mainCtx);
// }
//
// var canvas1 = document.getElementById('canvas1');
// var ctx1 = canvas1.getContext('2d');
// var img1 = document.getElementById('img1');
// var img2 = document.getElementById('img2');
// var counting = 0;
// var setColor = 'white';
// var setImg = new Image();
//
// // ctx1.fillStyle = 'white';
// // ctx1.fillRect(0,0,canvas1.width,canvas1.height);
// setImg.src = img1.src;
// // mainRunning(canvas1, ctx1, setColor, setImg);
//
// var myBtn = document.getElementById('myBtn');
// var imgDragNDrop = new Image();
// imgDragNDrop.src = img1.src;
// myBtn.onclick = function () {
//     if (counting%2 == 0) {
//         setColor = '#2af747';
//         imgDragNDrop.src = img1.src;
//         // setImg.src = img1.src;
//         // img1.src = '../images/shirt1.png';
//     } else {
//         setColor = '#85041a';
//         imgDragNDrop.src = img2.src;
//         // setImg.src = img2.src;
//         // img1.src = '../images/shirt2.png';
//     }
//     mainRunning(canvas1, ctx1, setColor, setImg);
//     drawWithTextAndFillingShapes(ctx1);
//     changeStateToNormal(ctx1);
//     drawWithTextAndShapesOutlines(ctx1);
//     changeStateToNormal(ctx1);
//     counting++;
// };
//
// var canvasX = document.getElementById('layer1');
// var ctxX = canvasX.getContext('2d');
// var tmpColor = '#2776f7';
// // var tmpColor = '#85041a';
// mainRunning(canvasX, ctxX, tmpColor, img1);
// var canvasWrapper = document.getElementById('canvasWrapper');
// var canvasY = document.getElementById('layer2');
// var ctxY = canvasY.getContext('2d');
// var xPoint = 150;
// var yPoint = 100;
// var iconSizeX = 60;
// var iconSizeY = 60;
// var dragok = false;
//
// function clear() {
//     ctxY.clearRect(0, 0, canvasY.width, canvasY.height);
// }
//
// function init() {
//     return setInterval(drawOnDragNDrop, 10);
// }
//
// function drawOnDragNDrop() {
//     clear();
//     ctxY.drawImage(imgDragNDrop,xPoint - iconSizeX/2,yPoint - iconSizeY/2,iconSizeX,iconSizeY);
// }
//
// function myMove(e){
//     if (dragok){
//         xPoint = e.pageX - canvasWrapper.offsetLeft;
//         yPoint = e.pageY - canvasWrapper.offsetTop;
//     }
// }
//
// function myDown(e){
//     // console.log(e);
//     // console.log(e.target);
//     if (e.pageX < xPoint + 30 + canvasWrapper.offsetLeft && e.pageX > xPoint - 30 +
//         canvasWrapper.offsetLeft && e.pageY < yPoint + 30 + canvasWrapper.offsetTop &&
//         e.pageY > yPoint - 30 + canvasWrapper.offsetTop) {
//         xPoint = e.pageX - canvasWrapper.offsetLeft;
//         yPoint = e.pageY - canvasWrapper.offsetTop;
//         dragok = true;
//         canvasWrapper.onmousemove = myMove;
//     }
// }
//
// function myUp(){
//     dragok = false;
//     canvasY.onmousemove = null;
// }
//
// function mainDragNDrop() {
//     init();
//     canvasWrapper.onmousedown = myDown;
//     canvasWrapper.onmouseup = myUp;
// }
//
// window.onload = function () {
//     mainDragNDrop();
// };

/*
When dragging 1+ images on a canvas, the procedure is:

In mousedown:
get the current mouse position
set the isDragging flag on any image that is under the mouse
save the current mouse position

In mousemove:
get the current mouse position
calculate how far the mouse has moved ( distance = newMousePosition-oldMousePosition )
add the distance to the position of any image that isDragging
save the current mouse position
redraw the scene with images in their new positions

In mouseup and mouseout:
clear all isDragging flags
 */

//==============================================================================
var canvas1 = document.getElementById('canvas1');
var img1 = document.getElementById('img1');
var img2 = document.getElementById('img2');
var icon1 = document.getElementById('icon1');
var icon2 = document.getElementById('icon2');
var WIDTH = canvas1.width;
var HEIGHT = canvas1.height;
var ctx1 = canvas1.getContext('2d');
//var changeColor = "#2aabe5";
var changeColor = $('#changeColor').val();
$myCanvas = $('#canvas1');

//drag Image
var isDragging = false;
var startX;
var startY;

// drag Anchor
var pi2=Math.PI*2;
var resizerRadius=8;
var rr=resizerRadius*resizerRadius;
var draggingResizer={x:0,y:0};
var imageX=50;
var imageY=50;
var imageWidth,imageHeight,imageRight,imageBottom;

//array of image objects
var images=[];
var NUM_IMAGES=0;

// test Symbol
imageWidth=60;
imageHeight=60;
addImage(20,20,1,img2.src);

// trigger all images to load
for (var i=0;i<images.length;i++) {
    images[i].image.src=images[i].url;
}

//////////////////////////////
// functions
//////////////////////////////

function getImageData(x,y,width,height) {
    imageX = x;
    imageY = y;
    imageWidth = width;
    imageHeight = height;
    imageRight = imageX + imageWidth;
    imageBottom = imageY + imageHeight;
}

// queue up another image
function addImage(x,y,scaleFactor,imgURL){
    var img55 = new Image();
    // img55.crossOrigin='anonymous';
    img55.onload = startInteraction;
    images.push({image:img55,x:x,y:y,scale:scaleFactor,isDragging:false,isAnchorDragging:false,url:imgURL,width:60,height:60});
    NUM_IMAGES++;
}

// called after each image fully loads
function startInteraction() {
    // return until all images are loaded
    if(--NUM_IMAGES>0){return;}

    // render all images
    renderAll();

    // listen for mouse events
    $myCanvas.mousedown(onMouseDown);
    $myCanvas.mouseup(onMouseUp);
    $myCanvas.mouseout(onMouseUp);
    $myCanvas.mousemove(onMouseMove);
}

function drawWithColor(mainCtx, mainColor, mainImg) {
    mainCtx.fillStyle = mainColor;
    mainCtx.fillRect(0,0,WIDTH,HEIGHT);
    mainCtx.globalCompositeOperation = 'destination-atop';
    mainCtx.drawImage(mainImg,0,0,WIDTH, HEIGHT);
    mainCtx.globalCompositeOperation = 'multiply';
    mainCtx.drawImage(mainImg,0,0,WIDTH, HEIGHT);
}
function changeStateToNormal(mainCtx) {
    mainCtx.globalCompositeOperation = 'source-over';
}

// flood fill canvas and
// redraw all images in their assigned positions
function renderAll() {
    // clear the canvas
    ctx1.clearRect(0,0,canvas1.width,canvas1.height);
    // draw the image
    drawWithColor(ctx1,changeColor,img1);
    changeStateToNormal(ctx1);

    // draw Symbol(s)
    for (var i=0;i<images.length;i++) {
        var r=images[i];
        ctx1.drawImage(r.image,r.x,r.y,r.width,r.height);

        getImageData(r.x, r.y, r.width, r.height);
        // optionally draw the draggable anchors
        drawDragAnchor(imageX,imageY);
        drawDragAnchor(imageRight,imageY);
        drawDragAnchor(imageRight,imageBottom);
        drawDragAnchor(imageX,imageBottom);
        // optionally draw the connecting anchor lines
        ctx1.beginPath();
        ctx1.moveTo(imageX,imageY);
        ctx1.lineTo(imageRight,imageY);
        ctx1.lineTo(imageRight,imageBottom);
        ctx1.lineTo(imageX,imageBottom);
        ctx1.closePath();
        ctx1.stroke();

    }
}

function drawDragAnchor(x,y){
    ctx1.fillStyle = "#c82124"; //red
    ctx1.beginPath();
    ctx1.arc(x,y,resizerRadius,0,pi2,false);
    ctx1.closePath();
    ctx1.fill();
}

function anchorHitTest(x,y){
    var dx,dy;

    // top-left
    dx=x-imageX;
    dy=y-imageY;
    if(dx*dx+dy*dy<=rr){ return(0); }
    // top-right
    dx=x-imageRight;
    dy=y-imageY;
    if(dx*dx+dy*dy<=rr){ return(1); }
    // bottom-right
    dx=x-imageRight;
    dy=y-imageBottom;
    if(dx*dx+dy*dy<=rr){ return(2); }
    // bottom-left
    dx=x-imageX;
    dy=y-imageBottom;
    if(dx*dx+dy*dy<=rr){ return(3); }
    return(-1);

}

// handle mousedown events
function onMouseDown(e) {

    // tell browser we're handling this mouse event
    e.preventDefault();
    e.stopPropagation();

    //get current position
    var mx=parseInt(e.clientX-$myCanvas.offset().left);
    var my=parseInt(e.clientY-$myCanvas.offset().top);

    //test to see if mouse is in 1+ images
    isDragging = false;
    for (var i=0;i<images.length;i++) {
        var r=images[i];
        getImageData(r.x,r.y,r.width,r.height);
        draggingResizer = anchorHitTest(mx,my);
        if (mx>r.x && mx<r.x+r.width && my>r.y && my<r.y+r.height && draggingResizer<0) {
            // mouse clicked not on Anchor
            // if true set r.isDragging=true
            r.isDragging=true;
            isDragging=true;
            r.isAnchorDragging = false;
            break;
        }
        if (draggingResizer > -1) {
            r.isAnchorDragging = true;
            break;
        }
    }
    //save mouse position
    startX=mx;
    startY=my;
}

// handle mouseup and mouseout events
function onMouseUp(e) {
    //tell browser we're handling this mouse event
    e.preventDefault();
    e.stopPropagation();

    // clear all the dragging flags
    isDragging = false;
    draggingResizer = -1;
    for (var i=0;i<images.length;i++) {
        images[i].isDragging=false;
        images[i].isAnchorDragging=false;
    }
}

// handle mousemove events
function onMouseMove(e) {

    // do nothing if we're not dragging
    if(!isDragging && (draggingResizer == -1)){return;}

    //tell browser we're handling this mouse event
    e.preventDefault();
    e.stopPropagation();

    //get current mouse position
    var mx = parseInt(e.clientX-$myCanvas.offset().left);
    var my = parseInt(e.clientY-$myCanvas.offset().top);

    if (draggingResizer > -1) {
        for (var a=0;a<images.length;a++) {
            var b = images[a];
            if (b.isAnchorDragging) {
                getImageData(b.x, b.y, b.width, b.height);
                switch (draggingResizer) {
                    case 0: //top-left
                        b.x=mx;
                        b.width=imageRight-mx;
                        b.y=my;
                        b.height=imageBottom-my;
                        break;
                    case 1: //top-right
                        b.y=my;
                        b.width=mx-imageX;
                        b.height=imageBottom-my;
                        break;
                    case 2: //bottom-right
                        b.width=mx-imageX;
                        b.height=my-imageY;
                        break;
                    case 3: //bottom-left
                        b.x=mx;
                        b.width=imageRight-mx;
                        b.height=my-imageY;
                        break;
                }
                // enforce minimum dimensions of 0x0
                if(b.width<0){b.width=0-b.width;}
                if(b.height<0){b.height=0-b.height;}
            }
        }
    }else if (isDragging) {
        //calculate how far the mouse has moved;
        var dx = mx - startX;
        var dy = my - startY;

        //move each image by how far the mouse moved
        for (var i=0;i<images.length;i++) {
            var r=images[i];
            if (r.isDragging) {
                r.x+=dx;
                r.y+=dy;
            }
        }

        //reset the mouse positions for next mouse move;
        startX = mx;
        startY = my;
    }

    //re render the images
    renderAll();
}

var addBtn = document.getElementById('addBtn');
var tempAddImg = 0;
addBtn.onclick = function () {
    if (tempAddImg == 0) {
        ctx1.drawImage(icon1,20,20,60,60);
        addImage(20,20,1,icon1.src);
        tempAddImg++;
    } else {
        addImage(20,20,1,icon2.src);
    }
    for (var i=0;i<images.length;i++) {
        images[i].image.src=images[i].url;
    }
};

var delBtn = document.getElementById('delBtn');
delBtn.onclick = function () {
    images.pop();
    renderAll();
};

// Note: type="color" is not supported in Internet Explorer 11
// and earlier versions or Safari 9.1 and earlier versions.
var chnColor = document.getElementById('changeColor');
chnColor.onchange = function () {
    changeColor = $('#changeColor').val();
    renderAll();
};
// $('#changeColor').on('input', function() {
//     changeColor = $('#changeColor').val();
//     renderAll();
// });

