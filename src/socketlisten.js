/**
* Self Communication contex mixer
*
* Control websocket flows
* @class llListener
*
* @package    Communication Mixer part of open sport project
* @copyright  Copyright (c) 2012 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
* @version    $Id$
*/
var llListener = function(starttiming) {

	this.socketpi = io.connect('http://localhost:8881');
	starttiming.setsocket(this.socketpi);
	this.socketpi.emit('swimmerclient', { swimmerdevice: 'localhitchup' });
	this.activeListeners();
	
};

/**
*  all the listeners
* @method activeListeners		
*
*/
llListener.prototype.activeListeners = function() {

	
	/*
	*  Listens for live bluetooth tags and display on start or refresh button on UI
	*/
	this.socketpi.on('startSwimmers', function (startSwimmerID) {
		// produce starting swimmers
		var startswimmers = '';
		startSwimmerID.forEach(function(idswimmer){
			
			if(idswimmer != '9059af0b879c' &&  idswimmer != '9059af0b86e2' &&  idswimmer != '9059af0b8744' &&  idswimmer != '9059af0b869c' )
			{
			//pass the lane data to get html ready
				startswimmers += liveHTML.fromswimmers(idswimmer, idswimmer);
				liveLogic.setNameID(idswimmer, idswimmer);
			}
		});
		
		$("#sortable1").append(startswimmers);
		$(".social").hide();
		$("#socialcontext").css('background', 'white');		
		$("#socialcontext").data("socialstatus", "on");		
				
		$(".peredit").hide();
		$(".peranalysis").hide();
		$(".historicalplace").hide();
		$(".historicalchart").hide();
		$(".historicalsummary").hide();
		$(".historicalbio").hide();						
		$("#analysistype").hide();
		$("#viewdata").attr("title", "on");
			
	});	
		
	/*
	*  Event based stopwatch times coming from the SERVER
	*/
	this.socketpi.on('startEventout', function (tEventin) {

		liveServerclock.IDtimeController(tEventin);		
	
	});
	
	
	/*
	* Touchpad listening socket
	*/
	 // when you get a serialdata event, do this:
	this.socketpi.on('stopwatchEvent', function (data) {
	
		serialin = JSON.parse(data.value);
		inser = Object.keys(serialin);
		inser.forEach(function(thein) {
			textaction = thein;
			timein = serialin[thein];
		});

	// whatever the 'value' property of the received data is:
		if(data.value == 1)
		{
			// call the split function
			starttiming.activetimeclock.splitswimmerid(starttiming.activetimeclock.startclock.totalsplitarray[starttiming.activetimeclock.startclock.itp]);
			starttiming.activetimeclock.split(starttiming.activetimeclock.startclock.totalsplitarray[starttiming.activetimeclock.startclock.itp]);
			starttiming.activetimeclock.startclock.itp++;

		}
		else if(textaction == 'lap')
		{
			starttiming.activetimeclock.splitswimmerid(starttiming.activetimeclock.startclock.totalsplitarray[starttiming.activetimeclock.startclock.itp]);
			starttiming.activetimeclock.split(starttiming.activetimeclock.startclock.totalsplitarray[starttiming.activetimeclock.startclock.itp]);
			starttiming.activetimeclock.startclock.itp++;
		}

		else if(textaction == "Start")
		{
			starttiming.activetimeclock.startclock.startStop();

		}
		else if (textaction == 'Reset')
		{
			starttiming.activetimeclock.startclock.reset();
		}

	});


	// listen to server for DUP call over local network data.
	this.socketpi.on('DUPinfo', function (dataDUP) {
	// whatever the 'value' property of the received data is:
	if(dataDUP == 'stop')
	{		

		// call the split function
		starttiming.activetimeclock.splitswimmerid(starttiming.activetimeclock.startclock.totalsplitarray[starttiming.activetimeclock.startclock.itp]);
		starttiming.activetimeclock.split(starttiming.activetimeclock.startclock.totalsplitarray[starttiming.activetimeclock.startclock.itp]);
		starttiming.activetimeclock.startclock.itp++; 
		
	}
	else if(dataDUP == 'start')
	{
		// start button pressed
		starttiming.activetimeclock.startclock.startStop();

	}

	else if(dataDUP == 'reset')
	{
		// reset button pressed
		starttiming.activetimeclock.startclock.reset();

	}
	
});	

	
	this.socketpi.emit('swimmerclientstart', { swimmerdevice: 'localhitchupstart' });

	this.socketpi.on('startnews', function (startnews) {
	// whatis status of local connection
		if( startnews == 'localpi')
		{		

			$("#localpi").text('CONNECTED');
			//setInterval(function() {socketpi.emit('swimmerclient', { swimmerdevice: 'localhitchup' })}, 100000);
		}
		else
		{
		// off local pi network
		$("#localpi").text('DIS--CONNECTED');
			
		}
	
	});


	this.socketpi.on('repeatnews', function (startnews) {
	// whatis status of local connection
		if( startnews == 'localpilive')
		{		
		
		}
		else
		{
		// off local pi network
		
		}
		
	});		

};
	