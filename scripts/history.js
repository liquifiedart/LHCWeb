//Member Variables
var historyEntries=[];
// var historyEntries=[
// 	"Founded in 2018, and based in the small town of Stormville, New York, the newely created start-up was the owner's, Wayne Johnson Jr., first foray into a small business venture. At 36 years old, he determined that his wealth of knowledge, over the last 10+ years of development efforts could be used to better serve his own future clients, where high quality software would be his main tenant.",
// 	"His first client was Morgan Stanley, where he was put to task re-designing and developing the re-marketing desk's application, based on internal Morgan Stanley framework's. Using C#/WPF as a base for the client and interfacing with a java backend."
// 	];

var currentHistoryIdx = 0;

window.onload = function() {

	LoadHistoryContent();
};

function LoadHistoryContent(){
	var xhttp = new XMLHttpRequest();
	xhttp.onerror = function(){
		alert(this.responseText);
	};

	xhttp.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200 ){

			try	
			{
				var json = JSON.parse(this.responseText);
				historyEntries = json.workhistory.items;

				historyEntries.forEach(element => {
					console.log("read: " + element);
				});
				currentHistoryIdx = 0;

				SetupHistoryButtons();
				SetupHistoryMarkers();


				// Show page 2
				document.getElementById("history-content").innerHTML= historyEntries[0];				
				document.getElementById("page2").style.display = "block"

			}
			catch(e)
			{
				console.log(e);
			}

		}
	};

	xhttp.on
	//You can't make AJAX requests (by default) from a file:/// URL scheme. Use an HTTP server to serve your files
	// file needs to be on a webserver
	xhttp.open("GET", "/ajax/workhistory.json", true);
	xhttp.send();
}

function SetupHistoryButtons(){
	var ele = window.document.getElementById('history-content');
	ele.innerHTML = historyEntries[currentHistoryIdx];

	var ele = window.document.getElementById('prevHistory');
	ele.className = "disabled-history-button";
	ele.disabled = true;	
}

function SetupHistoryMarkers(){

	// Setup History Markers
	// <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40">
	// <circle cx="20" cy="20" r="10" stroke="black" stroke-width="2" fill="white" />
	// </svg>
	// <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40">
	// <circle cx="20" cy="20" r="10" stroke="black" stroke-width="2" fill="white" />
	// </svg>	
	
	for (var i = historyEntries.length-1; i >= 0; i--) 
	{
		var ele = window.document.getElementById('history-marker-container');
		var historyMarkerId = "historyMarker" + i;
		var svgns = '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"><circle id=' + '"' + historyMarkerId + '"' + ' cx="20" cy="20" r="10" stroke="#726140" stroke-width="2" fill="white" /></svg>';
		ele.outerHTML += svgns;
		

	// 	var svgns = "http://www.w3.org/2000/svg";
	// 	var svgDocument = evt.target.ownerDocument;
	// 	svgDocument.width = 40;
	// 	svgDocument.height = 40;
	// 	var shape = svgDocument.createElementNS(svgns, "circle");
	// 	shape.setAttributeNS(null, "cx", 20);
	// 	shape.setAttributeNS(null, "cy", 20);
	// 	shape.setAttributeNS(null, "r",  10);
	// 	shape.setAttributeNS(null, "fill", "white"); 
	// 	shape.setAttributeNS(null, "stroke", "black"); 
	// 	shape.setAttributeNS(null, "stroke-width", "2"); 
	
	// 	svgDocument.append(shape);
	// 	var ele = window.document.getElementById('history-marker-container');
	// 	ele.append(svgDocument);
	}

	// update history marker position
	var ele = window.document.getElementById('historyMarker0');
	ele.style.fill="#7F6A00";

}

function NextHistory(){
	
	currentHistoryIdx++;
	if( currentHistoryIdx > historyEntries.length - 1)
	{
		currentHistoryIdx = 1;
		return;
	}

	var ele = window.document.getElementById('history-content');
	ele.innerHTML = historyEntries[currentHistoryIdx];

	var ele = window.document.getElementById('prevHistory');
	ele.className = "history-button";
	ele.disabled = false;

	if( currentHistoryIdx == historyEntries.length - 1 )
	{
		var ele = window.document.getElementById('nextHistory');
		ele.className = "disabled-history-button";
		ele.disabled = true;
	}

	// update history marker position
	var id = "historyMarker" + (currentHistoryIdx - 1);
	var ele = window.document.getElementById(id);
	ele.style.fill="white";

	var id = "historyMarker" + currentHistoryIdx;
	var ele = window.document.getElementById(id);
	ele.style.fill="#7F6A00";
};

function PreviousHistory(){

	currentHistoryIdx--;
	if( currentHistoryIdx < 0)
	{	
		currentHistoryIdx = 0;
		return;
	}

	var ele = window.document.getElementById('history-content');
	ele.innerHTML = historyEntries[currentHistoryIdx];

	var ele = window.document.getElementById('nextHistory');
	ele.className = "history-button";
	ele.disabled = false

	if( currentHistoryIdx == 0)
	{
		var ele = window.document.getElementById('prevHistory');
		ele.className = "disabled-history-button";
		ele.disabled = true;
	}

	// update history marker position
	var id = "historyMarker" + (currentHistoryIdx + 1);
	var ele = window.document.getElementById(id);
	ele.style.fill="white";

	var id = "historyMarker" + currentHistoryIdx;
	var ele = window.document.getElementById(id);
	ele.style.fill="#7F6A00";
};

// $(document).ready(function(){
// 	$("#hiddenText").hover(function(){
// 		$(this).css("color", "blue");
// 	},
// 	function(){
// 		//callback fucntion
// 		$(this).css("color", "yellow");
// 	});
// });