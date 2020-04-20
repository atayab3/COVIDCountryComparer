let apiEndPoints = "https://pomber.github.io/covid19/timeseries.json";

addToDataList =() =>{
	fetch(apiEndPoints)
	.then(response => { return response.json() } ) 
	.then(json => { 
// 		console.log(json); 	
// 		console.log(Object.keys(json)[24]); //gets Burkina Fasa a country or something
		
		let countryCount = (Object.keys(json).length);
		for(var i = 0; i < countryCount; ++i){
			let dataOption = document.createElement("option");
			dataOption.value = Object.keys(json)[i];
			document.getElementById("browsers").appendChild(dataOption);
		}//end for loop
	})
}//end function

//use countryList
var dataArr = [] ; 


createTable = () => {
	dataArr = [];
	var headerArr = ["Date"];
	
	fetch(apiEndPoints)
	.then(response => { return response.json() } ) 
	.then(json => { 
		let tbl1 = document.getElementById("myTable");
		var row1 = tbl1.insertRow(0);
		
var cell1 = row1.insertCell(0);// Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
cell1.innerHTML = "Date: ";// Add some text to the new cells:
		
// 	create first row
	for(var i = 1 ; i <= countryList.length ; ++i){
		var cellGen = row1.insertCell(i);
		cellGen.innerHTML = countryList[i-1];
		headerArr.push(countryList[i-1]);
	}
	dataArr.push(headerArr); // push in Column Headers for Chart -- Date Afghanistan Albania etc.
		
		
	var casesArr = [];
// 	console.log(json[Object.keys(json)[0]]); 	
// 	console.log(json[  Object.keys(json)[0]   ][0]["date"]) ;
	for(var x = 0 ; x < json[Object.keys(json)[0]  ].length; ++x){
		casesArr = [];
		
		var rowDate = tbl1.insertRow(x+1);
		var cellDate = rowDate.insertCell(0);
		cellDate.innerHTML = json[  Object.keys(json)[0]  ][x]["date"];
		
		casesArr.push(json[  Object.keys(json)[0]  ][x]["date"]);
		
		for(var i = 1 ; i <= countryList.length ; ++i){
			var cellGen = rowDate.insertCell(i);
			cellGen.innerHTML = json[countryList[i-1]][x]["confirmed"];
// 			console.log(json[countryList[i-1]][x]["confirmed"]);
			casesArr.push(  json[countryList[i-1]][x]["confirmed"]   );
		}
// 		}
		

		dataArr.push(casesArr);
		}
	})
		console.log("after for loops !");
		console.log(dataArr);
} 
// google.charts.load('current', {'packages':['corechart']});
// 				google.charts.setOnLoadCallback(drawChart ); 
drawChart = ()=> {
	console.log("in drawChart");
	console.log(dataArr);
        var data = google.visualization.arrayToDataTable(dataArr);

        var options = {
          title: "Covid 19 Confirmed Cases",
          legend: { position: 'bottom' }
        };

        var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

        chart.draw(data, options);
}

//          ^
// FUNCTION |
// Function Calls below
//                

mdc.topAppBar.MDCTopAppBar.attachTo(document.querySelector('header.mdc-top-app-bar'));
addToDataList(); // this creates the data list so when user types options will come up
document.getElementById("search").style.display = "block"; // sets the first screen as visible



//global variables
var countryList = [];
var arrayVisual ;
var pressNum = 0;

var arrayTwoD = [];
// let tableChartMade = false;

document.getElementById("addToList").addEventListener("click",  (e)=> {
	
	let countryName = document.getElementById("getCountry").value;
	console.log(countryName);
	countryList.push(countryName);
	createTable();
	
	
	
	//modify this whole if else into just a for loop to make the array List look a lot better
	if(pressNum == 0){
		arrayVisual = document.createElement("p");
		arrayVisual.textContent = "[ " + countryList + " ]";
		document.getElementById("search").appendChild(arrayVisual);
		pressNum++;
	}
	else{
		document.getElementById("search").removeChild(arrayVisual);
		arrayVisual = document.createElement("p");
		arrayVisual.textContent = "[ " + countryList + " ]";
		document.getElementById("search").appendChild(arrayVisual);
	}
	
	//clear search text field
	document.getElementById("getCountry").value = "";
	console.log(countryList);
	return countryList;
})


document.getElementById("clearList").addEventListener("click",  (e)=> {
	countryList = [];
	document.getElementById("search").removeChild(arrayVisual);
	pressNum = 0;
})

//event listener to go to table screen
document.getElementById("goSecondScreen").addEventListener("click",  (e)=> {
	//gives button same functionality as button in top app bar
		document.getElementById("search").style.display = "none";
		document.getElementById("table").style.display = "block";
		
		
})


document.querySelectorAll('header.mdc-top-app-bar button.mdc-top-app-bar__action-item')
	.forEach(item => {
	// use href to know which thing to change, read value of href and use that to construct a query Selector
  item.addEventListener('click', event => {
	// close all Views
    document.querySelectorAll("div.view").forEach( item=>{
		item.style.display = "none";	
	}) //whenever we show one we need to hide the other one
	  
	//handle click
    console.log(item.getAttribute("href"));
	let target = item.getAttribute("href");
	  
	
	if( (target == "#table" || target == "#chart") ){
		
		google.charts.load('current', {'packages':['corechart']});
 	 	google.charts.setOnLoadCallback(drawChart ); 
// 		tableChartMade = true;
	}
	document.querySelector(target).style.display = "block";
	
 
  }  )

}  )