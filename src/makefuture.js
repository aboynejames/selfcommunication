/**
* Train TImer
*
* Start node.js  Train Timer
*
*
* @package    Train Timer make future / build programme part of open sport project
* @copyright  Copyright (c) 2012 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
* @version    0.1.0
*/


/**
* Builder a future programme of training
* @class makeProgramme
*/
var makeProgramme = function() {
	this.status = 'default';
};

/**
* Take in clicks/input intentions
* @method makeLogic		
*
*/	
makeProgramme.prototype.makeLogic = function(madeactionin, targetin) {
	divcapturelast = '';
	textmodesettings = '';
	
	/**
	* save one document
	* @method savecommunicationset
	*/
	function savecommunicationset (datein, commgroupdata, smlength) {	

		var indate = Date.parse(datein);
		var datestringday = indate + 7200000;  // account for UK summer time
			swimgroupcomm = {};
			newjsoncomm = {};
				
			commgroupdata.forEach(function(dataid) {
	
			var divcapturein = "#setauthored" + dataid + " .swimsettings .swimsettingslabel select";		
				// get all the set element data
			swimtype = $( divcapturein + "#swimtype").val();
			swimstroke = $( divcapturein + "#swimstroke").val();
			swimtechnique = $( divcapturein + "#swimtechnique").val();
			swimdistance = $( divcapturein + "#swimdistance").val();
			swimrepetition = $( divcapturein + "#swimrepetition").val();	

			// collect into object and save via pouchdb.
			// form swim data
			swimcommstatus = {};
			swimcommstatus.commdate = datein;
			swimcommstatus.commtype = swimtype;
			swimcommstatus.commstroke = swimstroke;
			swimcommstatus.commtechnique = swimtechnique;
			swimcommstatus.commdistance = swimdistance;
			swimcommstatus.commrepetition = swimrepetition;
			
			swimgroupcomm[dataid] = swimcommstatus;
		// save to localpouchdb need to prepare buld array json structure
											
			newjsoncomm.commid = datein;//commgroupdata[dataid].dataset.commid;
			newjsoncomm.commdate = datestringday;
			newjsoncomm.swimmerid = [11111111,222222,333333]; // pick up from list commgroupdata;
			newjsoncomm.communication = swimgroupcomm;				

			});
							
			livepouch.singleSave(newjsoncomm);

			$("#canvasDiv").hide();
				
	} // closes function	
						
	
        if (madeactionin == "newelement")
				{			
					var livecurrentDate = $( "#datepicker" ).datepicker( "getDate" );
					if(livecurrentDate === null )
					{
						//take todays date as standard
						var todaymaster = $("#livetime").text();
						$( "#datepicker" ).datepicker( "setDate", todaymaster);
						livecurrentDate = $( "#datepicker" ).datepicker( "getDate" );
					}				
					$("#swimdate").text(livecurrentDate);
					
					// communication counter id
					cci = new Date().getTime();
					
					// set new current id
					currentliveelementid.push(cci);
					
					//keep a list of unique ids
					uniqueelementids.push(cci);
				
					// make HTML code for edit and un edit mode
					var livecommelemcode =liveHTML.commelementbuild(cci);
					$(".communicationelement").append(livecommelemcode);
					
					// capture the element settings before hiding

					//only if on second the do
					if(uniqueelementids.length > 1)
					{
						// hide previous edit element and show it in text mode
						// work out current position and go back one
						var secondlastid ='';
						if(uniqueelementids.length == 1)
						{
							secondlastid = uniqueelementids[0];
						}
						else
						{
							secondlastid = uniqueelementids[(uniqueelementids.length - 2)];
						}

					divcapturelast = "#setauthored" + secondlastid + " .swimsettings .swimsettingslabel select";
						// get all the set element data
					swimtype = $( divcapturelast + "#swimtype").val();
					swimstroke = $( divcapturelast + "#swimstroke").val();
					swimtechnique = $( divcapturelast + "#swimtechnique").val();
					swimdistance = $( divcapturelast + "#swimdistance").val();
					swimrepetition = $( divcapturelast + "#swimrepetition").val();

					textmodesettings = "#editdate" + secondlastid + ".editswimelement ";					
					$(textmodesettings + "#swimtype").text(swimtype);
					$(textmodesettings + "#swimstroke").text(swimstroke);
					$(textmodesettings + "#swimtechnique").text(swimtechnique);
					$(textmodesettings + "#swimdistance").text(swimdistance);
					$(textmodesettings + "#swimrepetition").text(swimrepetition);			
						
					$("#communicationelement" + secondlastid ).hide();
						
					$("#editdate" + secondlastid ).show();
					}
					
				// hide plain text view
				$("#editdate" + cci).hide();
				// from the set authoring tool abstract
				$("#setauthored" + cci ).html($("#setsettings").html());
				$(".swimsettings").show();					
					
				}
				else if (targetin.attr("id") == "edit")
				{

					var emi = targetin.data("editid");
					// set new current id
					currentliveelementid.push(parseInt(emi));
					// make this text view into form view
					$("#communicationelement" + emi).show();
					$("#editdate" + emi ).hide();
						textmodesettings = "#editdate" + emi + ".editswimelement ";					
						eswimtype = $(textmodesettings + "#swimtype").text();
						eswimstroke = $(textmodesettings + "#swimstroke").text();
						eswimtechnique = $(textmodesettings + "#swimtechnique").text();
						eswimdistance = $(textmodesettings + "#swimdistance").text();
						eswimrepetition = $(textmodesettings + "#swimrepetition").text();		

					// and set the form values
						$( divcapturelast + "#swimtype").val(eswimtype);
						$( divcapturelast + "#swimstroke").val(eswimstroke);
						$( divcapturelast + "#swimtechnique").val(eswimtechnique);
						$( divcapturelast + "#swimdistance").val(eswimdistance);
						$( divcapturelast + "#swimrepetition").val(eswimrepetition);
	
					// the previous id coud by any element, need to track
					// speical case if length of array 1 then only -1
					if(uniqueelementids.length > 1)
					{
						previousid = currentliveelementid.length - 2;
				
					$("#editdate" + currentliveelementid[previousid] ).show();
					$("#communicationelement" + currentliveelementid[previousid] ).hide();
					// turn element before to text view
						divcapturelast = "#setauthored" + currentliveelementid[previousid]  + " .swimsettings .swimsettingslabel select";
			
							// get all the set element data
						swimtype = $( divcapturelast + "#swimtype").val();
						swimstroke = $( divcapturelast + "#swimstroke").val();
						swimtechnique = $( divcapturelast + "#swimtechnique").val();
						swimdistance = $( divcapturelast + "#swimdistance").val();
						swimrepetition = $( divcapturelast + "#swimrepetition").val();
							//now set the text version settings
						var textmodesettings = "#editdate" + currentliveelementid[previousid]  + ".editswimelement ";					
						$(textmodesettings + "#swimtype").text(swimtype);
						$(textmodesettings + "#swimstroke").text(swimstroke);
						$(textmodesettings + "#swimtechnique").text(swimtechnique);
						$(textmodesettings + "#swimdistance").text(swimdistance);
						$(textmodesettings + "#swimrepetition").text(swimrepetition);	
					}
					else
					{
						previousid =  targetin.data("editid"); 				
					$("#communicationelement" +  targetin.data("editid")).show();
					$("#editdate" +  targetin.data("editid") ).hide();
					}

					
				}
				else if (madeactionin == "save")
				{
					// need to capture remove id number
					var smi = $("#save").attr('data-saveid');
					$("#save" + smi).remove();
					$('<div class="editel"><a href="" id="edit' + smi + '">edit</a></div>').appendTo("#communicationelement" + smi );
					
				}
				else if (targetin.attr("id") == "remove")
				{			
					// need to capture remove id number
					var rmi = targetin.data("removeid");   
					// need to remove from tracking arrays
					newinnumber = parseInt(rmi);
					var indexunique = uniqueelementids.indexOf(newinnumber);
					var indexcurrent = currentliveelementid.indexOf(newinnumber);
					uniqueelementids.splice(indexunique, 1);
					currentliveelementid.splice(indexcurrent, 1); 
			
					$("#communicationelement" + rmi ).remove();
					$("#editdate" + rmi ).remove();
				}
				else if (madeactionin == "savecommunication")
				{
					// collect the date
					datein = $( "#datepicker" ).datepicker( "getDate" );					
					// get a list of the unique ids and loop through to extract information
					var smi = $(".communicationelement");
					var smic = $(".communicationelement").children();
					var smiclength = $(".communicationelement").children().length;
					
				// check to see if a date exists if not, promp to add a date
					if(datein === null || smiclength === 0)
					{
						var feedbackcomm = '';
						if(datein === null)
						{
							feedbackcomm = 'Please add a date';
						}
						if(smiclength === 0)
						{
							feedbackcomm += ' Please add a communication element';
						}
						$(".commfeedback").html(feedbackcomm);
					}
					else
					{
						$(".commfeedback").empty();
						$(".liveswimset").empty();
						sdaterecord = '';

							
					var smonth = datein.getUTCMonth() + 1;
					var sday = datein.getDate();
					var syear = datein.getUTCFullYear();
					var sdaterecord = sday + '/' + smonth + '/' + syear;
					var indatet = Date.parse(datein);
					var datestringdayt = indatet + 7200000;
												
						var dateid = '<div class="swimcommdate"><a href="" id="fpdate" data-dcommid="' + datestringdayt + '" >' + sdaterecord + '</a></div>';
						$(dateid).appendTo(".pastfuturecomm");

						// pass the data over for saving
						savecommunicationset(datein, uniqueelementids, smiclength);
						// NEED TO CLEAR UNIQUE AND HISTORY ARRAYS
						uniqueelementids = [];
						currentliveelementid = [];

						$(".communicationelement").empty();
					}
				}
				else if (madeactionin == "sketchpad")
				{
					// show the canvas sketchpad UI
					var smi = 1;
					//$("#sketchpad" + smi).html($("#canvasDiv").html());
						$("#canvasDiv").show();
				}
	
};
	 