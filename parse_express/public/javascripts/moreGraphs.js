var startDate = "2015/08/10 00:00:00";
var endDate = "2015/08/15 00:00:00";
var parameters = {startDate: startDate,	endDate: endDate};

$(document).ready(function() {
	$.get( '/getGraphData',parameters, function(data) {
		for(var i = 0; i < 1; i++){
			$(".chartcontainer").append( "<div id=\"chart_" + i + "\"></div>" );
			buildChart("chart_" + i, data);
		}
	});
});

function buildChart(id,data){
	AmCharts.makeChart(id, {
    "type": "serial",
    "theme": "light",
		"titles": [{
			"size": 15,
			"text": "Week 25"
		}],
    "dataDateFormat": "YYYY-MM-DD JJ:NN:SS",
		"balloonDateFormat": "DD-MM-YYYY JJ:NN",
		//"mouseWheelZoomEnabled": true,
    "balloon": {
				"animationDuration": 0,
        "shadowAlpha": 0
    },
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