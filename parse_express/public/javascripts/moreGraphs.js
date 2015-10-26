function addLeadingZeros(input){
	if(input<10)
		return "0" + input;
	return input;
}

Date.prototype.toString = function(){
	return this.getFullYear() + "/" + addLeadingZeros(this.getMonth()+1) + "/" + addLeadingZeros(this.getDate()) + " " +
				 addLeadingZeros(this.getHours()) + ":" + addLeadingZeros(this.getMinutes()) + ":" + addLeadingZeros(this.getSeconds());
}

var startDate = new Date('2015/08/10 00:00:00');
var endDate = new Date('2016/09/07 00:00:00');

//var startDate = "2015/08/10 00:00:00";
//var endDate = "2015/09/07 00:00:00";

var parameters = {startDate: startDate.toString(),endDate: endDate.toString()};

$(document).ready(function() {
	$.get( '/getGraphData',parameters, function(data) {
		var totalTime = endDate.getTime() - startDate.getTime();
		var lastDate = startDate;
	
		var lastKnownBasal = undefined;
		
		//split the data in 5 day pieces
		for(var i = 0; i < Math.round(totalTime/518399000); i++){
			var date1 = lastDate;
			var date2 = new Date(lastDate.getTime()+518400000);
			console.log("date1: " + date1);
			console.log("date2: " + date2);
			var resGraphData = [];
			
			var firstPointAtStart = false;
			for(var j = 0; j < data.length; j++){
				if(data[j].basalRate != undefined)
					lastKnownBasal = data[j].basalRate;
				if(data[j].date >= date1.toString() && data[j].date <= date2.toString()){
					if(!firstPointAtStart){ //add data point at start of split with last known basal rate
						if(data[j].date == date1.toString()){
							resGraphData.push(data[j]);
						}else{
							if(lastKnownBasal != undefined)
								resGraphData.push({date: date1, basalRate: lastKnownBasal});
							else{
								resGraphData.push({date: date1});
							}
						}
						firstPointAtStart = true;
					}else{
						resGraphData.push(data[j]);
					}
				}
			}
			//add data point at end of split with last known basal rate
			if(resGraphData.length == 0){	//if graph split is empty, still make it visible by adding two empty points
				resGraphData.push({date: date1});	//EMPTY GRAPHS ARE HIDDEN ATM SEE BELOW
				resGraphData.push({date: date2});
			}else{
				if(resGraphData[resGraphData.length-1].date != date2.toString()){
					if(lastKnownBasal != undefined)
						resGraphData.push({date: date2.toString(), basalRate: lastKnownBasal});
					else
						resGraphData.push({date: date2.toString()});
				}
			}
			lastDate = date2;
			
			//make graphs for every chunk
			if(resGraphData.length > 2){	//hide all empty charts for now
				$(".chartcontainer").append( "<div id=\"chart_" + i + "\"></div>" );
				buildChart("chart_" + i, resGraphData);
			}
		}
	});
});

function buildChart(id,data){
	AmCharts.makeChart(id, {
    "type": "serial",
    "theme": "light",
    "dataDateFormat": "YYYY-MM-DD JJ:NN:SS",
		"balloonDateFormat": "DD-MM-YYYY JJ:NN",
		//"mouseWheelZoomEnabled": true,
    "balloon": {
				"animationDuration": 0,
        "shadowAlpha": 0
    },
		"guides": [{
			"tickLength": 0,
			"fillAlpha": 0.1,
			"fillColor": "#00FF00",
			"id": "Guide-1",
			"lineAlpha": 0,
			"position": "top",
			"toValue": 8,
			"value": 3,
			"valueAxis": "v1"
		}],
    "graphs": [{
				"id": "basalRate",
				"valueAxis": "v1",
        "lineThickness": 1,
				"behindColumns": true,
				"type": "step",
				"showBalloon": false,
        "valueField": "basalRate"
		},{
				"id": "bgReading",
				"valueAxis": "v1",
        "bullet": "round",
				"lineAlpha": 0,
        "lineThickness": 2,
				"bulletSize": 6,
        "valueField": "bgReading",
				"showBalloon": false
		},{
				"id": "bolusVolumeSelected",
				"valueAxis": "v1",
				"lineColor": "#e1ede9",
				"fillColors": "#e1ede9",
				"fillAlphas": 1,
				"type": "column",
				"clustered": false,
				"columnWidth": 35,
        "valueField": "bolusVolumeSelected"
		},{
				"id": "bolusVolumeDelivered",
				"valueAxis": "v1",
				"lineColor": "#62cf73",
				"fillColors": "#62cf73",
				"fillAlphas": 1,
				"type": "column",
				"clustered": false,
				"columnWidth": 35,
        "valueField": "bolusVolumeDelivered"
		},{
				"id": "bwzCarbInputG",
				"valueAxis": "v2",
        "bullet": "diamond",
				"lineAlpha": 0,
				"bulletSize": 8,
				"showBalloon": false,
        "valueField": "bwzCarbInputG"
		}],
    "chartCursor": {
				"categoryBalloonDateFormat": "JJ:NN",
				"categoryBalloonText": "[[category]]",
        //"pan": true,
        "valueLineEnabled": true,
        "valueLineBalloonEnabled": true,
        "cursorAlpha":0,
        "valueLineAlpha":0.3
    },
    "categoryField": "date",
    "categoryAxis": {
				"centerLabels": false,
				"boldPeriodBeginning": true,
        "parseDates": true,
				"labelRotation": 45,
				"minPeriod": "mm"
    },"valueAxes": [{
			"id": "v1",
			"title": "Bolus(U)/BGL(mmol/L)",
			"position": "left",
			"includeAllValues": true,
			"minorGridEnabled": true,
			//"strictMinMax": true,
			"minimum": 0,
			//"maximum": 25
		},{
			"id": "v2",
			"title": "Carbohydrates (g)",
			"position": "right",
			"includeAllValues": true,
			//"strictMinMax": true,
			"minimum": 0,
			//"maximum": 150,
			"gridAlpha": 0
		}],
    "dataProvider": data
	});
}