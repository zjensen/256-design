var canvasDiv = document.getElementById('drawingArea');
canvas = document.createElement('canvas');
var canvasWidth = document.getElementById('drawingArea').offsetWidth;
var canvasHeight = document.getElementById('drawingArea').offsetHeight;
canvas.setAttribute('width', canvasWidth);
canvas.setAttribute('height', canvasHeight);
canvas.setAttribute('id', 'canvas');
canvasDiv.appendChild(canvas);
if(typeof G_vmlCanvasManager != 'undefined') {
	canvas = G_vmlCanvasManager.initElement(canvas);
}
context = canvas.getContext("2d");

//Add event handlers for touch events
document.getElementById('canvas').addEventListener("touchstart", touchStartHandler, false);
document.getElementById('canvas').addEventListener("touchmove", touchMoveHandler, false);
document.getElementById('canvas').addEventListener("touchend", touchEndHandler, false);
document.getElementById('canvas').addEventListener("touchleave", touchLeaveHandler, false);
document.getElementById('canvas').addEventListener("touchcancel", touchCancelHandler, false);

var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array();
var clickColor = new Array();
var clickWidth = new Array();
var previous = new Array();
previous.push(0);
var paint;
var color = "black";
var lineWidth = 5;

document.getElementById('canvas').onmousedown = function(e) //mouse held down
{
	var mouseX = e.pageX - this.offsetLeft;
	var mouseY = e.pageY - this.offsetTop;
		
	paint = true;
	addClick(mouseX, mouseY);
	redraw();
}

document.getElementById('canvas').onmousemove = function(e) //mouse moved
{
	if(paint) //only occur when mouse button is pressed and being dragged
	{
		addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
		redraw();
	}
}

document.getElementById('canvas').onmouseup = function(e) //mouse no longer held down (un-clicked)
{
	paint = false;
	if(previous[previous.length -1] != clickX.length)
	{
		previous.push(clickX.length);
	}
}

document.getElementById('canvas').onmouseleave = function(e) //mouse dragged out of element
{
	paint = false;
	if(previous[previous.length -1] != clickX.length)
	{
		previous.push(clickX.length);
	}
}

//TOUCH SCREEN OPTIONS**************************************************

function touchStartHandler(e) //finger pressed to screen
{
	var touch = e.touches[0]
	var mouseX = touch.pageX - this.offsetLeft;
	var mouseY = touch.pageY - this.offsetTop;
		
	paint = true;
	addClick(mouseX, mouseY);
	redraw();
}

function touchMoveHandler(e) //finger dragged
{
	if(paint)
	{
		var touch = e.touches[0]
		var mouseX = touch.pageX - this.offsetLeft;
		var mouseY = touch.pageY - this.offsetTop;

		addClick(mouseX, mouseY, true);
		redraw();
	}
}

function touchEndHandler(e) //finger lifted up
{
	paint = false;
	if(previous[previous.length -1] != clickX.length)
	{
		previous.push(clickX.length);
	}
}

function touchLeaveHandler(e) //finger leaves element
{
	paint = false;
	if(previous[previous.length -1] != clickX.length)
	{
		previous.push(clickX.length);
	}
}

function touchCancelHandler(e) //finger leaves device
{
	paint = false;
	if(previous[previous.length -1] != clickX.length)
	{
		previous.push(clickX.length);
	}
}

//DRAWING OCCURS BELOW

function addClick(x, y, dragging)
{
	clickX.push(x);
	clickY.push(y);
	clickDrag.push(dragging);
	clickColor.push(color);
	clickWidth.push(lineWidth);
}

function redraw()
{
	context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas

	context.strokeStyle = color;
	context.lineJoin = "round";
	context.lineWidth = lineWidth;
		
	for(var i=0; i < clickX.length; i++)
	{		
		context.beginPath();
		if(clickDrag[i] && i)
		{
			context.moveTo(clickX[i-1], clickY[i-1]);
		}
		else
		{
			context.moveTo(clickX[i]-1, clickY[i]);
		}
		context.lineTo(clickX[i], clickY[i]);
		context.closePath();
		context.strokeStyle = clickColor[i];
		context.lineWidth = clickWidth[i];
		context.stroke();
	}
}

function undo()
{
	var l = previous.length;
	if(l > 1)
	{
		var pointsToRemove = previous[l-1] - previous[l-2]; //number of points to paint over

		clickX.splice(previous[l-2], pointsToRemove);
		clickY.splice(previous[l-2], pointsToRemove);
		clickDrag.splice(previous[l-2], pointsToRemove);
		clickColor.splice(previous[l-2], pointsToRemove);
		clickWidth.splice(previous[l-2], pointsToRemove);

		previous.splice(l-1,1);

		redraw();
	}
	
}



//Changing color

function changeColor(id)
{
	document.getElementById("drawingArea").style.cursor = "crosshair";
	color = id;
	lineWidth = 5;
}

function erase()
{
	document.getElementById("drawingArea").style.cursor = 'url("http://dygraphs.com/tests/drawing/cursor-eraser.png"), auto';
	color = "white";
	lineWidth = 20;
}

//Changing the icons when the popup is expanded or closed
function popup(element)
{
	if(element.classList.contains('fa-plus-circle'))
	{
		element.classList.remove('fa-plus-circle');
		element.classList.add('fa-minus-circle');
		document.getElementById('menu2').classList.remove("hidden");
		document.getElementById('topMenu').classList.remove("hidden");
	}
	else
	{
		element.classList.add('fa-plus-circle');
		element.classList.remove('fa-minus-circle');
		document.getElementById('menu2').classList.add("hidden");
		document.getElementById('topMenu').classList.add("hidden");
	}
}

//Functions for using the modals

//create variables for modals (just provide the id of the modal)

var settings_modal = document.getElementById("settings");
var new_modal = document.getElementById("newdrawing");
var save_modal = document.getElementById("savefile");
var open_modal = document.getElementById("openfile");
var share_modal = document.getElementById("sharefile");
var reference_modal = document.getElementById("references");

function openModal(ID) {
   ID.style.visibility = "visible";  
   document.getElementById("overlay").style.visibility = "visible";// The function opens the specified modal
   //Next two lines are email tests with image sending... we may need to actually upload the images to some server to get this to work right...
   //var exportimg = canvas.toDataURL("image/png;base64;");
   //document.getElementById("email_canvas_ahref").href="mailto:?subject=Diagram for O-Chem&body=Here is the image!"+exportimg + "Have a great day!"; 
}
function closeModal() {
   var modals = document.getElementsByClassName("modal");
	for (i = 0; i < modals.length; i++) { 
		modals[i].style.visibility = "hidden";  
	}   
   document.getElementById("overlay").style.visibility = "hidden"; // The function hides all modals
}

//Function to export image
function exportCanvas(){
            var exportimg = canvas.toDataURL("image/png;base64;");
            window.open(exportimg,"");
        }
		
		

