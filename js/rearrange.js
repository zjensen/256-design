
function allowDrop(ev) {
    ev.preventDefault();
}

var upID;

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
    upID = ev.target.parentNode.id;
}

function drop(ev) {
    ev.preventDefault();
    var downID = ev.target.parentNode.id;

    // console.log(ev.target)
    // console.log(ev.target.id
    console.log(downID);
    console.log(upID);
    var placeddown = document.getElementById(downID).innerHTML;
    var pickedup = document.getElementById(upID).innerHTML;
    console.log(placeddown);
    console.log(pickedup);

    // var placeddown = document.getElementById(downID).innerHTML;
    // console.log(placeddown);

    document.getElementById(downID).innerHTML = pickedup;
    document.getElementById(upID).innerHTML = placeddown;

  	//document.getElementByID(downID);
    //var old_up = document.getElementByID(upID);

    //console.log(old_up);
    //console.log(old_down);

    //old_down.id = upID;
    //old_up.id = downID;

    //var data = ev.dataTransfer.getData(downID);
   // ev.target.appendChild(document.getElementById(data));
}



// function onhover(x)
// {
// 	document.getElementById(x).className = "hover";
// 	x = "";
// 	return;
// }

// function mousedown(x)
// {
// 	document.getElementById(x).className = "clicked";

// 	var url;
// 	if (x == "CS920")
// 	{
// 			url = "CS920.txt";
// 	}
// 	if (x == "CS970")
// 	{
// 			url = "CS970.txt";
// 	}

// 	var xmlhttp = new XMLHttpRequest();
			

// 			xmlhttp.onreadystatechange = function() 
// 		{
//     		if (xmlhttp.readyState == 4 && xmlhttp.responseText.length > 0) 
//     		{
//         		var myArr = JSON.parse(xmlhttp.responseText);
//         		ToArray(myArr);
//     		}
// 		}

// 		xmlhttp.open("GET", url, true);
// 		xmlhttp.send();

// 	x = "";
// }

// function mouseup(x)
// {
// 	document.getElementById(x).className = "hover";
	


// 	x = "";
// }

// function mouseout(x)
// {
// 	document.getElementById(x).className = "return";
	


// 	x = "";
// }


// function ToArray(myArr) 
// 	{
//    		var value = pride(myArr);
//    		var   = 0;

//    		var out = "<b>Highest Score: </b>" + myArr[value].name +
//    		"<b></br>GPA: </b>" + myArr[value].gpa + "</br></br>";

// 		out =  out + "<table><col width = 100><col width = 100>" +
// 		"<tr>" +
//     	"<td><b>Name:</b></td>" +
//     	"<td><b>GPA:</b></td>" +
//     	"</tr>";

//     	for (var item in myArr)
//     	{
//     		out = out + "<tr " +
//     		"id = \"" + index++ + "\"" +
//     		"draggable=\"true\"" +
//     		"ondrop=\"drop(event)\"" +
//     		"ondragstart=\"drag(event)\"" +
//     		"ondragover=\"allowDrop(event)\">" + 
//     		"<td>" + 
//     			myArr[item].name + 
//     		"</td>" +
//     		"<td>" + 
//     			myArr[item].gpa + 
//     		"</td>" +
//     		"</tr>";
//     	}
   		
//     	out = out + "</table>";
//     	document.getElementById("table").innerHTML = out;
// 	}

// function pride(myArr)
// {
// 	var store = 0;
// 	var value;
// 	for (var name in myArr)
// 	{
// 		if (store < myArr[name].gpa)
// 		{
// 			store = myArr[name].gpa;
// 			value = name;
// 		}
// 	}
// 	return value;
// }

