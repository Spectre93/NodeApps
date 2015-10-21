var parameters = { /*search: $(this).val()*/ };
var results = {};
$.get( '/getGraphData',parameters, function(data) {				
		var staticData = [ 	{ date: '2015-09-28 00:10:56', value: 40 },
												{ date: '2015-09-28 00:14:19', value: 60 },
												{ date: '2015-09-28 01:34:23', value: 61 },
												{ date: '2015-09-28 09:45:34', value: 30 },
												{ date: '2015-09-28 09:45:36', value: 10 },
												{ date: '2015-09-28 12:29:25', value: 13 },
												{ date: '2015-09-28 12:30:37', value: 25 },
												{ date: '2015-09-28 18:10:54', value: 25 },
												{ date: '2015-09-28 19:11:15', value: 25 },
												{ date: '2015-09-28 22:55:23', value: 15 },

												{ date: '2015-09-29 00:10:56', value: 40 },
												{ date: '2015-09-29 00:14:19', value: 60 },
												{ date: '2015-09-29 01:34:23', value: 61 },
												{ date: '2015-09-29 09:39:34', value: 30 },
												{ date: '2015-09-29 09:45:36', value: 10 },
												{ date: '2015-09-29 12:29:25', value: 13 },
												{ date: '2015-09-29 12:30:37', value: 25 },
												{ date: '2015-09-29 18:10:54', value: 25 },
												{ date: '2015-09-29 19:11:15', value: 25 },
												{ date: '2015-09-29 22:55:23', value: 15 }];
	
		console.log(data);
		buildChart(data);
});

var chart = {};
function buildChart(data){
	chart = AmCharts.makeChart("chartdiv", {
    "type": "serial",
    "theme": "light",
		"titles": [{
			"size": 15,
			"text": "Week 25"
		}],
    //"dataDateFormat": "YYYY-MM-DD JJ:NN:SS",
		"dataDateFormat": "DD-MM-YYYY JJ:NN:SS",
		"balloonDateFormat": "DD-MM-YYYY JJ:NN",
		"mouseWheelZoomEnabled": true,
    "balloon": {
				"animationDuration": 0,
        "shadowAlpha": 0
    },
		//"maxSelectedTime": 86400000,
		"minSelectedTime": 10800000,
		"legend": {
			//"useGraphSettings": true,
			"valueText": "",
			"rollOverGraphAlpha": 0.1,
			"switchType": "v",
			"maxColumns": 3
		},
    "graphs": [{
				"id": "basalRate",
				"title": "Basal Rate (U/h)",
				"valueAxis": "v1",
        "lineThickness": 2,
				"behindColumns": true,
				"type": "step",
				"showBalloon": false,
        "valueField": "basalRate",
				"balloonText": "Om [[category]]: <b>[[value]]\b"
		},{
				"id": "bgReading",
				"title": "BG Reading (mmol/L)",
				"valueAxis": "v2",
        "bullet": "round",
				"lineAlpha": 0,
        "lineThickness": 2,
				"bulletSize": 11,
        "valueField": "bgReading",
				"labelText": "[[value]] mmol/L",
				"labelPosition": "right",
				"showBalloon": false,
				"balloonText": "Om [[category]]: <b>[[value]]\b"
		},{
				"id": "bolusVolumeSelected",
				"title": "Bolus Volume Selected (U)",
				"valueAxis": "v1",
				"lineColor": "#e1ede9",
				"fillColors": "#e1ede9",
				"fillAlphas": 1,
				"type": "column",
				"clustered": false,
				"columnWidth": 15,
        "valueField": "bolusVolumeSelected",
				"balloonText": "Om [[category]]: <b>[[value]]\b"			    
		},{
				"id": "bolusVolumeDelivered",
				"title": "Bolus Volume Delivered (U)",
				"valueAxis": "v1",
				"lineColor": "#62cf73",
				"fillColors": "#62cf73",
				"fillAlphas": 1,
				"type": "column",
				"clustered": false,
				"columnWidth": 12,
        "valueField": "bolusVolumeDelivered",
				"balloonText": "Om [[category]]: <b>[[value]]\b"
		},{
				"id": "bwzCarbInputG",
				"title": "BWZ Carb Input (grams)",
				"valueAxis": "v3",
        "bullet": "diamond",
				"lineAlpha": 0,
				"bulletSize": 12,
				"labelText": "[[value]]g",
				"showBalloon": false,
        "valueField": "bwzCarbInputG",
				"balloonText": "Om [[category]]: <b>[[value]]\b"
		}],
    // "chartScrollbar": {
        // "graph": "basalRate",
				// "graphType": "step",				
				// "hideResizeGrips": true,
				// "resizeEnabled": false,
				// "scrollDuration": 0
    // },
    "chartCursor": {
				"categoryBalloonDateFormat": "JJ:NN",
				"categoryBalloonText": "[[category]]",
        //"pan": true,
        "valueLineEnabled": true,
        //"valueLineBalloonEnabled": true,
        "cursorAlpha":0,
        "valueLineAlpha":0.3
    },
    "categoryField": "date",
    "categoryAxis": {
				"centerLabels": false,
				"boldPeriodBeginning": true,
        "parseDates": true,
        "minorGridEnabled": true,
				"labelRotation": 45,
				"minPeriod": "mm"
    },"valueAxes": [{
			"id": "v1",
			"title": "U",
			"position": "left",
			//"autoGridCount": false,
			//"minorGridEnabled": true,
			"strictMinMax": true,
			"minimum": 0
		},{
			"id": "v2",
			"title": "mmol/L",
			"position": "right",
			"autoGridCount": false,
			"strictMinMax": true,
			"minimum": 0,
			"gridAlpha": 0
		},{
			"id": "v3",
			//"title": "gram",
			//"position": "right",
			"axisAlpha": 0,
			"labelsEnabled": false,
			"autoGridCount": false,
			"strictMinMax": true,
			"minimum": 0,
			"gridAlpha": 0
		}],
    "dataProvider": data
	});
	//chart.addListener("rendered", zoomChart);
	//zoomChart();
}

//function zoomChart() {
	//chart.zoomToIndexes(0,7);
//}