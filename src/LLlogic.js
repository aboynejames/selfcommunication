/**
* LifestyleLinking 
*
* Framework Logic controls
* @class llLogic
*
* @package    LifestyleLinking part of open sport project
* @copyright  Copyright (c) 2012 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
* @version    $Id$
*/
var llLogic = function(localDB, localHTML) {
	this.status = 'default';
	this.livepouch = localDB;
	this.liveHTML = localHTML;
	this.nameholder = {};
	this.emailholder = {};
	this.idname = '';
	this.tokenid = '';
	
	this.settrainingData();


};

/**
* Take in clicks/input intentions
* @method frameworklogic		
*
*/	
llLogic.prototype.frameworklogic = function(intentionin) {
	idclick = $(intentionin).attr("id");

	switch(idclick){

	case "me": 
	// make live section
	$("#meflow").show();
	$("#streamflow").hide();
	$("#recordflow").hide();
	$("#makeflow").hide();
	$(".identity").css('background', '#009900');
	$(".stream").css('background', 'white');
	$(".recordme").css('background', 'white');
	$("#make").css('background', 'white');		
	break;
	
	case "stream":
	$("#streamflow").show();
	$("#meflow").hide();
	$("#recordflow").hide();
	$("#makeflow").hide();
	$(".stream").css('background', '#009900');
	$(".identity").css('background', 'white');
	$("#record").css('background', 'white');
	$("#make").css('background', 'white');	
	break;

	case "recordme":	
	$("#recordflow").show();
	$("#meflow").hide();
	$("#streamflow").hide();
	$("#makeflow").hide();
	$("#record").css('background', '#009900');
	$(".stream").css('background', 'white');
	$(".identity").css('background', 'white');
	$("#make").css('background', 'white');	
	break;
		
	case "make": 
	$("#makeflow").show();
	$("#streamflow").hide();
	$("#recordflow").hide();
	$("#meflow").hide();
	$("#make").css('background', '#009900');
	$(".stream").css('background', 'white');
	$(".identity").css('background', 'white');
	$("#record").css('background', 'white');	
	break;

	case "pleaseclicktwo":
		$("#displayhistory").hide();
	break;

	case "datecontext":
	// need to check for status of button
	var datesetstatus = $("#datecontext").data("datestatus");
		if(datesetstatus == "on")
		{
			$("#displayhistory").show();
			$("#datecontext").css('background', 'green');		
			$("#datecontext").data("datestatus", "off");
		}
		else
		{
			$("#displayhistory").hide();
			$("#datecontext").css('background', 'white');		
			$("#datecontext").data("datestatus", "on");
		}
		
	break;
		
	case "socialcontext": 
	// need to check for status of button
	var socialstatus = $("#socialcontext").data("socialstatus");
		if(socialstatus == "on")
		{
			$(".social").show();
			$("#socialcontext").css('background', 'green');		
			$("#socialcontext").data("socialstatus", "off");
			
			$("#thelaneoptions").val(-1);
			$("#theswimmeroptions").val(-1);
			$("#welcomesummary").hide();
			$("#loadlaneselect").show();
			$("#loadswimmers").show();
			$("#addnewswimmer").show();
			$("#loadclearswimmers").show();
			$("#controloptions").show();
			$(".ui-state-default").css("width", "100%");
			$("#loadlane").attr('class', 'control-textpressed');
			
			$("#startsort").attr("title", "on");
			$("#startremove").attr("title", "on");
			$("#viewdata").attr("title", "on");
			$("#viewdata").attr('class', 'control-text');
			$("#startsort").attr('class', 'control-text');
			$("#startremove").attr('class', 'control-text');
		}
		else
		{
			$(".social").hide();
			$("#socialcontext").css('background', 'white');		
			$("#socialcontext").data("socialstatus", "on");
			
			$("#loadlaneselect").hide();
			$("#loadswimmers").hide();
			$("#addnewswimmer").hide();
			$("#loadclearswimmers").hide();
			$("#controloptions").hide();
			$("#addalpha").hide();
			$("#addalpha2").hide();
			$("#loadlane").attr("title", "on");
			$("#loadlane").attr('class', 'control-text');
			
		}
	break;
		
	case "toolscontext": 
	// need to check for status of button
	var toolsstatus = $("#toolscontext").data("toolsstatus");
		if(toolsstatus == "on")
		{
			$(".tools").show();
			$("#toolscontext").css('background', 'green');		
			$("#toolscontext").data("toolsstatus", "off");
		}
		else
		{
			$(".tools").hide();
			$("#toolscontext").css('background', 'white');		
			$("#toolscontext").data("toolsstatus", "on");
		}
	break;
		
	case "poolcontext": 
	// need to check for status of button
	var poolstatus = $("#poolcontext").data("poolstatus");
		if(poolstatus == "on")
		{
			$(".pool").show();
			$("#poolcontext").css('background', 'green');		
			$("#poolcontext").data("poolstatus", "off");
		}
		else
		{
			$(".pool").hide();
			$("#poolcontext").css('background', 'white');		
			$("#poolcontext").data("poolstatus", "on");
		}
	break;

	case "analysiscontext":

		$("#analysistype").show();
		var analysisstatus = $("#analysiscontext").data("analysisstatus");
		if(analysisstatus == 'on') {
			// need to make live all the edit / analysis feature options
			$(".peredit").hide();
			$(".peranalysis").show();
			$(".peranalysis").show();
			$("#perrealtime").show();
			$(".historicalplace").show();
			$("#analysiscontext").data("analysisstatus", "off");
			$("#startsort").attr("title", "on");
			$(".ui-state-default").css("width", "100%");
			//$("#analysiscontext").attr('class', 'control-textpressed');
			$("#startsort").attr('class', 'control-text');
		}
		else
		{
			$(".peredit").hide();
			$(".peranalysis").hide();
			$(".analysislabel").hide();
			$(".historicalplace").hide();
			$(".historicalchart").hide();						
			$(".historicalsummary").hide();
			$(".historicalbio").hide();
			$("#viewdatalive").empty();
			$("#visualisedata").empty();
			$(".splitviewrep").remove();
			$(".splitview").remove();
			$(".splitviewcompare").remove();
		
			$("#analysiscontext").data("analysisstatus", "on");
			$("[class^='peranalysisid']").attr("data-statusanalysis", "on");
			$("[class^='peranalysisid']").css("color", "#1c94c4");
			$("[class^='pereditidremove']").attr("data-statusanalysis", "on");
			$("[class^='perchartid']").attr("data-statusanalysis", "on");
			$("[class^='perchartid']").css("color", "#1c94c4");
			$("[class^='persummaryid']").attr("data-statusanalysis", "on");
			$("[class^='persummaryid']").css("color", "#1c94c4");
			$("[class^='perbioid']").attr("data-statusanalysis", "on");
			$("[class^='perbioid']").css("color", "#1c94c4");
			//$("#analysiscontext").attr('class', 'control-text');
		}
	break;	
		
	case "hidecontext":
		$("#analysistype").show();
		var hidestatus = $("#hidecontext").data("attention-hide");
		if(hidestatus == 'on') {
			
			//$("#attention-live").hide(); 
			$("nav#timetext").hide();
			$("#hidecontext").data("attention-hide", "off");
			$("#hidecontext").text('Show');	
			//$("#hidecontext").show();
		}
		else
		{
			$("nav#timetext").show();
			//$("#attention-live").show();
			$("#hidecontext").data("attention-hide", "on");
			$("#hidecontext").text('Hide');	
			
		}
	
	break;
		
	case "skipelement":
		starttiming.activetimeclock.startclock.recordmanagement();
	break;
		
	case "backelement":
		starttiming.activetimeclock.startclock.backrecordmanagement();
	break;
		
	}
		
};

/**
* Set the ids and names of swimmers live
* @method setNameID		
*
*/	
llLogic.prototype.setNameID = function(namein, idin) {
		
	this.nameholder[idin] = namein;
	
};

/**
* Set the ids and email
* @method setEmailID		
*
*/	
llLogic.prototype.setEmailID = function(emailin, idin) {
		
	this.emailholder[idin] = emailin;
	
};

/**
* Set token user for REST calls
* @method setToken		
*
*/	
llLogic.prototype.setToken = function(setIDname, settokenin) {
	
	this.idname = setIDname;
	this.tokenid = settokenin;
	
	
};

/**
* Sets existing training data
* @method settrainingData		
*
*/	
llLogic.prototype.settrainingData = function() {
// check and see if there is any existing communication dates
	function localCommcall(commdate, callback) { 
		
		this.livepouch.mapQueryCommdate(commdate, callback);
	}  
      

	localCommcall('133', function(rtmap) {  

		var livecommcode = this.liveHTML.livecommunicationset(rtmap.rows);
			
		$(".pastfuturecomm").html(livecommcode);	
			
	});	
	
};

/**
* Sets existing training data
* @method setwelcomeMessage		
*
*/	
llLogic.prototype.setwelcomeMessage = function() {

	// welcome summary  call pouch get no. active swimmers
	function welcomeDatacall(callback) {  
		livepouch.mapQueryswimmers(callback);
	}  

	welcomeDatacall(function(wmap) { 
		if(wmap.rows.length > 0)
		{
		
			welcomedata = wmap.rows.length + " active swimmers";
			$("#welcomesummary").html(welcomedata);
			$("#sortable1").show();
			presentswimmer = '';

			wmap.rows.forEach(function(rowswimrs){
				
				//pass the lane data to get html ready
				presentswimmer += liveHTML.fromswimmers(rowswimrs.value[1], rowswimrs.value[0]);
				liveLogic.setNameID(rowswimrs.value[1], rowswimrs.value[0]);
				liveLogic.setEmailID(rowswimrs.value[2], rowswimrs.value[0]);
			});
			
			$("#sortable1").html(presentswimmer);	
			$("#sortable1").show();
			
		$(".peredit").hide();
		$(".peranalysis").hide();
		$(".historicalplace").hide();
		$(".historicalchart").hide();
		$(".historicalsummary").hide();
		$(".historicalbio").hide();						
		$("#analysistype").hide();
		$("#viewdata").attr("title", "on");
		}
		else
		{		
			welcomedata = 'No swimmmers present.<br /><br />Please press <b>Swimmers</b> button';
			$("#welcomesummary").html(welcomedata);
			
		}
	});
	
};