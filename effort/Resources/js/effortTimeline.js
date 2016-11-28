/*****************************************************************************************************
DESCRIPTION: This script displays each rup category / effort data into mutiple area chart as well as
 a pie chart with information relative to the last week
NOTES: 	TO DO: 	Tweak code to accomodate different sprint lengths

LAST MODIFIED BY: João Alves and Pedro Costa
*****************************************************************************************************/
"use strict";

/*	specifies costumization settings of area charts:
	no axes, 
	no legend, 
	no gridlines,
	Y max value
	colors
	...	
*/
var OPTIONS_AREA_CHARTS = {
  	vAxis: {
  		minValue: 0, 
  		gridlines: {
        	color: 'transparent'
    	},
        viewWindow: { // Y max value
            max:6 // TO DO: this is an example, this has to change in our case
        }
  	},
    hAxis: {
  	    gridlines: {
  	        count: 0
        }
    },
 	chartArea: {
 		width: '100%', 
 		height: '100%'
 	},
  	legend: {
  		position: 'none'
  	},
  	areaOpacity: 1,
  	backgroundColor: 'transparent',	
    colors: []
};

/*	specifies costumization settings of pie charts:
 no axes,
 no legend,
 no gridlines,
 Y max value
 colors
 ...
 */
var OPTIONS_DONUT_CHARTS = {
	title: donutChartName,
	pieHole: 0.0,
	colors: ['#ff160a','#ff974b','#ffae2e','#ffff6d','#00ff86','#009486','#4f79ff','#8656cd','#0094bd'],
	legend: {
		position: 'right',
		alignment: 'center'
	},
	 backgroundColor: 'transparent',
	chartArea: {
		width: '90%',
		height: '90%'
	},
    pieSliceTextStyle: {
	    /*color: ['#ff160a','#ff974b','#ffae2e','#ffff6d','#00ff86','#009486','#0094bd','#1637a1','#8656cd']*/
	    color: 'black'
    }
};


//array that contains all of the user's boards
var userBoards;
//the board in which we will work
var projectBoard;
//array that contains all of a board's lists
var boardLists;
//array that contains all of a lists cards for each list (week)
var listCards;
//data to represent on the area charts
var AreaData;
//data to represent on the pie charts
var PieData;
//Day when board was created
var creationDay;
//donut chart title
var donutChartName;


(function() {
	window.addEventListener("load", main);
}());

/*
	main function displays all charts of mutiple RUP categories
*/
function main() {
	// load google charts api - this is essential
	google.charts.load('current', {'packages':['corechart']});

	//make google charts responsive
	if (window.addEventListener) {
   		window.addEventListener('resize', function() {
    		drawRUPCharts(AreaData);
			drawRUPPieCharts(PieData);
    	});
	}
	else {
    	window.attachEvent('onresize', function() {
    		drawRUPCharts(AreaData);
			drawRUPPieCharts(PieData);
    	});
	}

	//Authentication
	var authenticationSuccess = function() {
        console.log('Successful authentication');
        //recolher boards do utilizador
        getBoards();
    };
    var authenticationFailure = function() { console.log('Failed authentication'); };
    console.log("fail");
    Trello.authorize({
        type: 'popup',
        name: 'Getting Started Application',
        scope: {
            read: 'true',
            write: 'true' },
        expiration: 'never',
        success: authenticationSuccess,
        error: authenticationFailure
    });
}

/*	
	draws all the RUP charts
	@ param [][][] data 	contains an example of data <- TEST EFFECTS
*/
function drawRUPCharts(data){
    var numWeeks = data[0].length - 1;
    OPTIONS_AREA_CHARTS.hAxis.gridlines.count = numWeeks;

	google.charts.setOnLoadCallback(function() {
		drawAreaChart(data[0], 'div_chart_BM', '#ff160a');
	});
	google.charts.setOnLoadCallback(function() {
		drawAreaChart(data[1], 'div_chart_REQ', '#ff794b');
	});
	google.charts.setOnLoadCallback(function() {
		drawAreaChart(data[2], 'div_chart_AD', '#ffae2e');
	});
	google.charts.setOnLoadCallback(function() {
		drawAreaChart(data[3], 'div_chart_IMP', '#ffff6d');
	});
	google.charts.setOnLoadCallback(function() {
		drawAreaChart(data[4], 'div_chart_TEST', '#00ff86');
	});
	google.charts.setOnLoadCallback(function() {
		drawAreaChart(data[5], 'div_chart_DEP', '#009486');
	});
	google.charts.setOnLoadCallback(function() {
		drawAreaChart(data[6], 'div_chart_PM', '#4f79ff');
	});
	google.charts.setOnLoadCallback(function() {
		drawAreaChart(data[7], 'div_chart_ENV', '#8656cd');
	});
	google.charts.setOnLoadCallback(function() {
		drawAreaChart(data[8], 'div_chart_SCM', '#0094bd');
	});
}

/*
 draws the week pie chart
 @ param [][][] data 	contains an example of data <- TEST EFFECTS
 */
function drawRUPPieCharts(data){
	google.charts.setOnLoadCallback(function() {
		drawDonutChart(data, 'div_donut_chart', '#ff160a');
	});
}

/*
	draws an area chart in the placeholder of id div_id using the options
	@ param [][] data 	contains information relative to a rup category
				usage: [['Week', <rup's category name>],
						[0,<hours spent on this rup category>],
						[1, <hours spent on the first week in this caregory>]...]
	@ param String div_id the name of the id of the the div used to placehold te graphic
	@ param String color 	the HTML code of the color

	usage: 	
	google.charts.setOnLoadCallback(function() {
    	drawAreaChart(<data>, <div_id>, <color>);
	});
*/ 
function drawAreaChart(data, div_id, color) {
	// transforms the array into data google charts can use
    var data = google.visualization.arrayToDataTable(data);

    // constructs an area chart
	var chart = new google.visualization.AreaChart(document.getElementById(div_id));
	

	// The select handler. Call the chart's getSelection() method
	function selectHandler() {
	    var selectedItem = chart.getSelection()[0];
	    if (selectedItem) {
	      console.log ('User wants to get information about week: '+ selectedItem.row);
	      // TO DO: display information about a specific week
			displayWeekRUP(selectedItem.row);
	    }
	}

	// Listen for the 'select' event, and call my function selectHandler() when the user selects something on the chart.
	google.visualization.events.addListener(chart, 'select', selectHandler);

	// specify the color of the graphic
	OPTIONS_AREA_CHARTS.colors=[color];
	// draws the area chart
	chart.draw(data, OPTIONS_AREA_CHARTS);
}

/*
	 draws a donut chart in the placeholder of id div_id using the options
	 @ param [][] data 	contains information relative to a rup category
	 			usage: [['Week', <rup's category name>],
	 					[0,<hours spent on this rup category>],
						[1, <hours spent on the first week in this caregory>]...]
	 @ param String div_id the name of the id of the the div used to placehold te graphic
	 @ param String color 	the HTML code of the color

	 usage:
	 google.charts.setOnLoadCallback(function() {
	 drawDonutChart(<data>, <div_id>, <color>);
	 });
 */
function drawDonutChart(data, div_id) {
	// transforms the array into data google charts can use
	//var data = google.visualization.arrayToDataTable(data);

	// constructs an area chart
	var chart = new google.visualization.PieChart(document.getElementById(div_id));

	// draws the pie chart
	chart.draw(data, OPTIONS_DONUT_CHARTS);
}

/*
		call to Trello's API which retrieves the logged user's boards
		this information is stored in userBoards
*/
function getBoards(){
    console.log("---------------BOARDS---------------");
    var success = function(successMsg) {
        console.log(successMsg);
        userBoards = successMsg;
        //aceder ao board do projeto(convém que tenham o mesmo nome)
        getProjectBoard();
    };

    var error = function(errorMsg) {
        console.log(errorMsg);
    };
    Trello.get('/member/me/boards', success, error);
}

/*
		call to Trello's API which retrieves the board in which we are testing this code
		the board name may be changed in the trelloOptions javascript file
		this information is stored in projectBoard
*/
function getProjectBoard(){
    for(let i = 0; i<userBoards.length; i++){
        if(userBoards[i].name == projectBoardName){
            projectBoard = userBoards[i];
			creationDay = moment(new Date(1000*parseInt(projectBoard.id.substring(0,8),16)));
        }
    }
    if(projectBoard)
        //aceder às listas de cada board
        getBoardLists();
}

/*
		call to Trello's API which retrieves the lists inside the
		board in which we are testing this code
		this information is stored in boardLists
		subject to change
 */
function getBoardLists(){
    console.log("---------------LISTAS---------------");
    var success = function(successMsg) {
        console.log(successMsg);
        boardLists = successMsg;

        //get cards for each week
        getCards();
    };

    var error = function(errorMsg) {
        console.log(errorMsg);
    };
    Trello.get('/boards/'+projectBoard.id+'/lists', success, error);
}

/*
		call to Trello's API which retrieves the cards inside every list
		in the board
		cards are stored in listCards[i] where i is the number of the list
		(which in this case represents a week)
		subject to change
*/
function getCards(){
    listCards = [];
    var cardsPlaced = 0;
    var numWeeks = boardLists.length;

    /*
            This local function is necessary to assure that the cards of each list are correctly
            positioned in the listCards array
            It also assures that every card is loaded before the method can proceed by using a counter
            (cardsPlaced)
     */

    function placeCards(i){
        var success = function(successMsg) {
            listCards[i] = successMsg;

            cardsPlaced++;

            if(cardsPlaced == boardLists.length){


                console.log("LISTCARDS");
                console.log(listCards);

                //END OF DEFAULT BEHAVIOUR
                displayGlobalRUP();
                displayWeekRUP(getCurrentWeekNumber() - 1);
            }
        };

        var error = function(errorMsg) {
            console.log(errorMsg);
        };

        Trello.get('/lists/' + boardLists[i].id + '/cards', success, error);
    }


    for(let i = 0; i < numWeeks; i++){
        placeCards(i);
    }
}

/*
 		retrieves the categories and the respective effort for each day of the considered week
 		@ param [] JSON cardsOfTheWeek 	contains the cards of the considered week

		@ return [][] days	for each row (day), contains the cumulative effort for each
							RUP category (column)
 */
function effortAndCategoryByDay(cardsOfTheWeek){
	var days = [];
	var returnedCategories = [];
	var diaMoment;


	//Initializing vector
	for(let i = 0; i < weekLength; i++){
		days[i] = [];
		for(let j = 0; j < rupNumber; j++){
			days[i][j] = 0;
		}
	}

	for(let i = 0; i < cardsOfTheWeek.length; i++){
		diaMoment = moment(cardsOfTheWeek[i].dateLastActivity);
		returnedCategories = cardRUPEffort(cardsOfTheWeek[i]);


		for(let j = 0; j < returnedCategories.length; j++){
			days[diaMoment.isoWeekday() - 1][returnedCategories[j][0]] += returnedCategories[j][1];
		}
	}

	return days;
}

/*
        repeatedly calls the function effortAndCategoryByDay so that an array
        containing the effort for each RUP category (colum) for each week (row)
        may be produced

        @ return [][] weeks	for each row (week), contains the cumulative effort for each
                            RUP category (column)
*/
function globalEffortAndCategory(){
	var elapsedWeeks = boardLists.length;
	var weekCards;
    var weeks = [];
    var days = [];

	for(let i = 0; i < elapsedWeeks; i++){
		weekCards = listCards[i];

        console.log("Week cards: " + i);
        console.log(listCards[i]);
        console.log(listCards[i].length);

		days = effortAndCategoryByDay(weekCards);

        //para dispor por dias: weeks.concat(days);
        weeks.push(rupEffortPerWeek(days));
	}

	return weeks;
}

/*
        sums the total effort for each rup category in the set "days" given in the format
                            DAY		RUP1	RUP2	RUP3	...
                            0		effort	effort	effort	...
                            1		effort	effort	effort	...
                            2		...		...		...		...

        @ param [][] days 	for each row (day), contains the cumulative effort for each
                            RUP category (column)

        @ return [] week    contains the cumulative effort for each RUP category (column)
 */
function rupEffortPerWeek(days){
    var array = [];

    for(let i = 0; i < rupNumber; i++){
        array[i] = 0;
    }

    for(let i = 0; i < rupNumber; i++){
        for(let j = 0; j < days.length; j++){
            array[i] += days[j][i];
        }

    }

    return array;
}

/*
 		retrieves Trello labels (RUP categories) and effort for each card(task)
 		for now, the effort is generated by Math.random
 		@ param JSON card	the card which contains the information we seek

 		@ return [][] array	contains the information described in the following format:
 							[[label1, effort1],
 							 [label2, effort2],
 										   ...]
 */
function cardRUPEffort(card){
	var array = [];
	var numLabels = card.labels.length;

	for(let i = 0; i < numLabels; i++){
		array.push([identifyCategory(card.labels[i].name), 1 /*Math.random()*1500 + 300 */]);
	}
	return array;
}

/*
		for the given RUP category, gives the corresponding index used throughout the code
		if the category can't be parsed, -1 is returned

		@ param String	name name of the RUP category
		@ return int	index index of the RUP category, following this convention:
							0- BM
							1- REQ
							2- AD
							3- IMP
							4- TEST
							5- DEP
							6- PM
							7- ENV
							8- SCM
 */
function identifyCategory(name){

	if(name == 'BM' || name == 'bm')
		return 0;
	else if(name == 'REQ' || name == 'req')
		return 1;
	else if(name == 'AD' || name == 'ad')
		return 2;
	else if(name == 'IMP' || name == 'imp')
		return 3;
	else if(name == 'TEST' || name == 'test')
		return 4;
	else if(name == 'DEP' || name == 'dep')
		return 5;
	else if(name == 'PM' || name == 'pm')
		return 6;
	else if(name == 'ENV' || name == 'env')
		return 7;
	else if(name == 'SCM' || name == 'scm')
		return 8;
	else
		return -1;
}

/*
        for the given index, gives the corresponding rup category
        if the index can't be parsed, an empty string is returned

        @ param int	name name of the RUP category
        @ return String	index index of the RUP category, following this convention:
                            0- BM
                            1- REQ
                            2- AD
                            3- IMP
                            4- TEST
                            5- DEP
                            6- PM
                            7- ENV
                            8- SCM
 */
function identifyCategoryByIndex(index){
	switch (index){
		case 0:
			return "BM";
			break;
		case 1:
			return "REQ";
			break;
		case 2:
			return "AD";
			break;
		case 3:
			return "IMP";
			break;
		case 4:
			return "TEST";
			break;
		case 5:
			return "DEP";
			break;
		case 6:
			return "PM";
			break;
		case 7:
			return "ENV";
			break;
		case 8:
			return "SCM";
			break;
	}

	return "";
}

/*
		builds and reorganizes the data so that each axis (x an y) is constructed
		for each RUP category

		@ param [][] data	for each row (week), contains the cumulative effort for each
							RUP category (column), for example:

							WEEK    		RUP1	RUP2	RUP3	...
							0				effort	effort	effort	...
							1				effort	effort	effort	...
							2				...		...		...		...

		@ return [][][]		array which contains the week and total effort for each RUP category
							following the example given in drawAreaChart:

							RUP		AXIS INFO				DAY/WEEK, EFFORT
							cat1	[info, cat1name]		[week1, effort1]	[week2, effort2]	...
							cat2	[info, cat2name]		[week1, effort1]	[week2, effort2]	...
							...			...
 */
function buildGlobalChartData(data){
	//Recebe array no formato
	var array = [];
	var subarray;


	for(let i = 0; i < rupNumber; i++){
		subarray = [];

		subarray.push(["Week", "Effort"]);
		subarray.push([0, 0]); //TBD
		for(let j = 0; j < data.length; j++){		//data.length =  number of days/weeks considered
			if(data[j] == undefined){
				subarray.push([j+1, 0]);
			}
			else{
				subarray.push([j+1, data[j][i]]);
			}
		}
		array.push(subarray);
	}

	console.log(array);
	return array;
}

/*
        builds and reorganizes the data so that each axis (x an y) is constructed
        for each RUP category so a pie chart can be built

        @ param [][] data	for each row (day), contains the cumulative effort for each
                            RUP category (column), for example:

                            DAY		RUP1	RUP2	RUP3	...
                            0				effort	effort	effort	...
                            1				effort	effort	effort	...
                            2				...		...		...		...

        @ return [][]		array which contains the total effort in a week for each RUP category:

                            [[category1, total effort],
                             [category2, total effort]...]
 */
function buildPieChartData(data){
	var array = [];
	var effort;

	array.push(["RUP Category", "Hours per Week"]);
	for(let i = 0; i < rupNumber; i++){
		effort = 0;

        if(data.length != weekLength){
            console.log("Something went wrong... data.length != weekLength.");
        }


		for(let j = 0; j < data.length; j++){
			if(data[j] != undefined && data[j][i] != null && data[j][i] != undefined){
				effort += data[j][i];
			}
		}
		array.push([identifyCategoryByIndex(i), effort]);
	}

	return array;
}

/*
		displays the RUP category/effort pie chart for the current week
		For now, we are considering that each week starts on a Monday and ends on a Sunday
 		This may be modified in the future to accomodate each group's needs / processes

 		it calls the necessary functions to display the mentioned information
 		for more details on each function please read their respective notes

 		@param week number of the week whose info should be displayed
 */
function displayWeekRUP(week){
	if(week == 0){
		var days = effortAndCategoryByDay(listCards[week]);
	}
	else{
		var days = effortAndCategoryByDay(listCards[week-1]);
	}
	
	PieData = buildPieChartData(days);
	PieData = google.visualization.arrayToDataTable(PieData);
    drawRUPPieCharts(PieData);
	displayWeekRUPInfo(week, days);
}

/*
        this routine builds the necessary HTML elements to contain more explicit information
        about the pie chart. namely, for reach RUP category, it displays how many hours
        were spent (effort) on the given week

        Elements such as <div> and <p> are created with the appropriate class name

        @param week number of the week whose info should be displayed

        @ return [][] days	for each row (day), contains the cumulative effort for each
                            RUP category (column)
 */
function displayWeekRUPInfo(week, days){
	var container = document.getElementById("div_donut_chart_info");
	var effort;

	while(container.hasChildNodes()){
		container.removeChild(container.firstChild);
	}

	var text = document.createElement("p");
	text.innerHTML = "Total effort in week " + week;
    text.className = "donut_chart_info_title";
	container.appendChild(text);

    /*
	for(let i = 0; i < rupNumber; i++){
		effort = 0;
		for(let j = 0; j < days.length; j++){
			effort += days[j][i];
		}

		text = document.createElement("p");
		text.innerHTML = identifyCategoryByIndex(i) + ":" + effort.toFixed(2) + " hours <br>";
		container.appendChild(text);

	}
	*/

    for(let i = 0; i < rupNumber; i++){
        effort = 0;
        for(let j = 0; j < days.length; j++){
            effort += days[j][i];
        }

        var div = document.createElement("div");
        div.className = "donut_chart_info_container";

        text = document.createElement("p");
        text.innerHTML = identifyCategoryByIndex(i);
        div.appendChild(text);

        text = document.createElement("p");
        text.className = "donut_chart_info_hours";
        if(effort == 1){
            text.innerHTML = effort.toFixed(2) + " hour<br>";
        }
        else{
            text.innerHTML = effort.toFixed(2) + " hours<br>";
        }

        div.appendChild(text);


        container.appendChild(div);
    }

}

/*
        this routine builds the necessary HTML elements to create clickable labels under the global chart
        Elements such as <div> and <p> are created with the appropriate class name

        @param numWeeks number of weeks represented
 */
function buildAxisNav(numWeeks){
	console.log("NUM WEEKS: " + numWeeks);
	var container = document.getElementById("div_nav");

	while(container.hasChildNodes()){
		container.removeChild(container.firstChild);
	}

	var box = document.createElement("div");
	box.className = "div_nav_container";
	for(let i = 0; i < numWeeks; i++){
		var text = document.createElement("p");
		text.innerHTML = "" + (i+1);
		text.className = "nav_element";
		text.id = i+1;


		text.addEventListener("click", function(ev){
			var weekClicked = ev.target.id;
			console.log("View info on " + weekClicked);
			displayWeekRUP(parseInt(weekClicked));
		});
		box.append(text);

	}
	container.appendChild(box);
}

/*
        displays the RUP category/effort global charts for every week
        it calls the necessary functions to display the mentioned information
        for more details on each function please read their respective notes
 */
function displayGlobalRUP(){
    var data = globalEffortAndCategory();
    AreaData = buildGlobalChartData(data);
    drawRUPCharts(AreaData);
	buildAxisNav(data.length);
}

/*
        simple function that returns the week number (since the creation of the Trello board)

        @return number  number of the week
*/
function getCurrentWeekNumber(){
	var now = moment();
	return (now.isoWeek() - creationDay.isoWeek()) + 1;
}
