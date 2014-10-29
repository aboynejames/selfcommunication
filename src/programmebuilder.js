
/**
*  jQuery listen for clicks and interaction	
* 
*/	
$(document).ready(function(){

	var startobject = new visability();

	/*
	* TEST click and making visable and hiding
	*

	$("#pleaseclick").click(function(e) {

		//$("#pleaseclick").hide();
		startobject.viewstatus();
			
	});
	*/				

	$("#setsettings").hide();
	$("#canvasDiv").hide();
	
	// create pouchdb object
	livepouch = new pouchdbSettings();
	//delete local pouchdb database		
	//livepouch.deletePouch();
	livellHTML = new llHTML();
	liveLogic = new llLogic(livepouch, livellHTML);
	//fire up the classes
	starttiming = new SwimtimeController();
	liveMake = new makeProgramme();
	liveServerclock = new serverClock();
	liveRecord = new recordQS();
	liveHTML = new ttHTML();
	llliveListen = new llListener(starttiming);
	
	$("#pleaseclicktwo").click(function(e) {
		e.preventDefault(e);
		//$("#displayhistory").hide();
		liveLogic.frameworklogic(this);
			
	});
	
	elementliverecid = 0;
	uniqueelementids = [];
	currentliveelementid = [];

	var today = new Date();
	var month = today.getUTCMonth() + 1;
	var day = today.getUTCDate();
	var year = today.getUTCFullYear();
	
	// connect to socket.io
	cloudurl = 'http://localhost:8881';
	homeurl = 'http://localhost/ll/selfcommunication/src/index.html';
	// make socket available to timing classes
	
	var qs = $.param.querystring();
	var qsobject = $.deparam(qs, true);
	
	if(qsobject.token)
	{
	// signin authorised, change to signout button
		liveLogic.setToken(qsobject.swimmer, qsobject.token);
		$("#twitterin").text('Sign-out');
		$("#twitterin").attr('id', 'twitterout');
		//$("#facebookin").text('Sign-out');
		//$("#facebookin").attr('id', 'facebookout');
		$("#syncdata").show();
		$("#clearpouchdb").show();
		
	}
	
	// datepicker 
	$( "#datepicker" ).datepicker({
		changeMonth: true,
		changeYear: true,
		onSelect: 		function() {
			liveRecord.recordLogic("pfdate", "pfdate")}
	});

	$("#datepicker" ).datepicker( "setDate", today );
	$('#ui-datepicker-div').css('display','none');
	liveRecord.recordLogic("pfdate", "pfdate");		

	$("a,#communication,#recordcommunication,#attention,.liveswimset").click(function(e) {
		e.preventDefault(e);
		var $sotgt = $(e.target);			
		liveLogic.frameworklogic(this);	

			var resultord = $('#sortable1').sortable('toArray');
			idclick = $(this).attr("id");
			idtitle = $(this).attr("title");	
			// pass on the id of the swimmer  2 pass on the type of click,  start, reset, split, stop	
			starttiming.identifyswimmer(idtitle, idclick);
			
			// make programme logic
			liveMake.makeLogic(idclick, $sotgt);

			// record DS data
			liveRecord.recordLogic(idclick, $sotgt);			
	});			


	/**
	stopwatch jquery code from stopwatch3.js
	*
	*
	*/
	$(window).unload( function () { 

		passwordin = '';
		$("#loadlaneselect").hide();
		$("#loadswimmers").hide();
		$("#addnewswimmer").hide();
		$("#syncdata").hide();
		$("#clearpouchdb").hide();
		$("#sortable1").empty();
		$("#signinopener").show();

			// need to tell the server of the log out too
		$.get("/signout/" + $.cookie("traintimer"), function(resultout){
					});
		$.cookie("traintimer", null);
		//alert("You haved signed out of TrainTimer");

	});
	
	/*
	*  Hide in place html
	*/
	$("#loadlaneselect").hide();
	$("#loadswimmers").hide();
	$("#addnewswimmer").hide();
	$("#loadclearswimmers").hide();
	$(".swimsettings").hide();
	$("#analysistype").hide();
	$(".peredit").hide();
	$(".historicalplace").hide();
	$("#signupspace").hide();		
	$("#welcomesummary").show();		
	$("#siginformarea").hide();
		
    $("#signinopener").click(function(e) {
        usernamein = '';
        passwordin = '';
        cookieidhash = '';
        passwordhash= '';
    // sigin modal
    loginhtml = '';
    loginhtml += '<div>Welcome, to Train Timer </div>';
    loginhtml += '<form method="post" action="#" id="siginform" >';
    loginhtml += '<div><label for="name">Username</label><input id="name" class="text ui-widget-content ui-corner-all" type="text" title="name" size="16" ></div>';
    loginhtml += '<div><label for="password">Password</label><input id="password" class="text ui-widget-content ui-corner-all" type="password" value="" name="password" size="16" ></div></form>';
    loginhtml += '<div class="ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"> <div class="ui-dialog-buttonset"><button class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" type="button" role="button" aria-disabled="false"><span class="ui-button-text">Sign me in</span></button></div></div><div id="responsemessage"></div>';

    $("#siginformarea").dialog({
            autoOpen: false,
            height: 340,
            width: 260, 
            title: 'Signin to Train Timer',
            buttons: {
                                        "Sign me in": function() {
                                            // need to make couchdb call to accept user details
                                        usernamein = $("#name").val();
                                        passwordin = $("#password").val();                                            

                                            hashCode = function(str){
                                                var hash = 0;
                                                if (str.length === 0) return hash;
                                                for (i = 0; i < str.length; i++) {
                                                        char = str.charCodeAt(i);
                                                        hash = ((hash<<5)-hash)+char;
                                                        hash = hash & hash; // Convert to 32bit integer
                                                }
                                                return hash;
						};
                                        passwordhash = hashCode(passwordin);
                                        cookieidhash = hashCode((usernamein + passwordin));                                    
                                            
                                        this.acceptdetails = '';
        
                                                                                                // Wrap up the PUT request execution.
        var makePUTRequest = function(){

            // Make the PUT request.
            $.ajax({
                type: "GET",
                url: "http://www.mepath.co.uk:8833/signinmepath/" + usernamein + '/' + cookieidhash + '/' + passwordin,
                contentType: "application/json",
                dataType: "text",
success: function( resultback ){

					this.acceptdetails = JSON.parse(resultback);
					
					if(this.acceptdetails.signin == 'passed') {		
												$.cookie("traintimer", cookieidhash,  { expires: 7 });
												$("#ifsignedin").show();	
												$("#ifsignedin").html('<a class="control-text" text="SignOut" title="signout" href="#"  id="signincloser" >Sign-out</a> ' + usernamein );
												$("#siginformarea").dialog( "close" );
												$("#signinopener").hide();
												$("#sortable1").empty();
												$("#signupstart").hide();
												$("#syncdata").show();
												$("#clearpouchdb").show();
										
																				
												}
												else {
													$("#responsemessage").html('Signin Failed, try again');
												}

				},
				error: function( error ){
					// Log any error.
//console.log( "ERROR:", error );
				},
				complete: function(){

				}
			});

		};

		// Execute the PUT request.
		makePUTRequest();

										},
										Cancel: function() {
										$( this ).dialog( "close" );
										}

			},
			close: function() {
			$("#name").val( "" );
			$("#password").val( "" );
			cookieidhash = '';
			passwordhash= '';
				
			}

		});
	$("#siginformarea").show();
	$("#siginformarea").dialog('open');

		// prevent the default action, e.g., following a link
		return false;

	});
	
	/*
	* Clear pouchDB
	*
	*/
	$("#clearpouchdb").click(function(e) {
		
		livepouch.deletePouch();
		
	});
	
	/*
	* Sync data back to couchdb online
	*
	*/
	$("#syncdata").click(function(e) {
	
		function checkdesigndocStatus(callback) {  
			livepouch.getDoc(callback, "_design/swimmers");
		}  

		checkdesigndocStatus( function(deisgnlog) {
			
			if(!deisgnlog)
			{
				designdocjson = {"_id": "_design/swimmers",  "filters" : {"nameslist" : "function(doc) { return doc.name}"}};
				livepouch.putDoc(designdocjson);
				
				// for session training data
				designdocjson = {"_id": "_design/session",  "filters" : {"sessionlist" : "function(doc) { return doc.session}"}};
				livepouch.putDoc(designdocjson);
							
				// for commuication training set authored
				designdocjson = {"_id": "_design/communication",  "filters" : {"commlist" : "function(doc) { return doc.communication}"}};
				livepouch.putDoc(designdocjson);				
			
			}
			else if (deisgnlog.filters)
			{

			}	
				
		});
		


		// get all current doc from pouchdb and pass them on to nodejs to couchdb and delete local data (ideally leave 1 month or user directed future todo )
		var syncmessage = '<a  href=""><img  id="syncicon" alt="sync in progress" src="images/sync.png" ></a>';
		
		localsplitstodelete = [];
		
		function localDatalog(callback) {  
			livepouch.changeLog();
			livepouch.filterchangeLog(callback, 'swimmers/nameslist');
			livepouch.filterchangeLog(callback, 'session/sessionlist');
			livepouch.filterchangeLog(callback, 'communication/commlist');			
		}  

		localDatalog( function(trainlog) {
	
			// need to differenciate between the type
			if(trainlog.results[0].doc.session)
			{
				// save the training data and delete ready for next batch of data
				$("#syncbackup").html(syncmessage);				
				trainlog.results.forEach(function(rowsswimsplit){

					if (rowsswimsplit.doc.session)
					{
						// form JSON to sync back to couch
						buildsyncsplits = {};
						buildsyncsplits.session = rowsswimsplit.doc.session;
						buildsyncsplits.swimmerid =rowsswimsplit.doc.swimmerid;
						//syncdataforsave =  JSON.stringify(buildsyncsplits);
						liveRecord.swimdataCloud(buildsyncsplits);	
						livepouch.deleteDoc(rowsswimsplit.doc._id);
					}
				});
			
			}
			else if(trainlog.results[0].doc.commdate)
			{
				// save the training test authored and keep a local copy			
				
			}
			else if (trainlog.results[0].doc.name)
			{
				// do nothing, keep all identity info local copy
			
			}
		//  TODO should get a cloud update of average, summary statistics and save/update locally
			

		});
	});

	$("#ifsignedin").click(function(e) {
			e.preventDefault(e);
			var $sotgt = $(e.target);
        if ($sotgt.is("#signincloser")) {

					$("#ifsignedin").fadeOut("slow");
						//$("#ifsignedin").hide();	
					$("#loadlaneselect").hide();
					$("#syncdata").hide();
					$("#clearpouchdb").hide();
					$("#sortable1").empty();
					$("#signinopener").show();
					$("#signupstart").show();
	
					// need to tell the server of the log out too
						$.get("/signout/" + $.cookie("traintimer"), function(resultout){
							
						});
					$.cookie("traintimer", null);

				}
					
	});
		
	/*
	* add swimmer form produced after default layout therefore need to delegate to existing DOM element	
	*/	
	$("#newmaster").click(function (e) {
				
					e.preventDefault(e);
					// has the user signed in?
					setsaveallowed = '';
					setsaveallowed = $.cookie("traintimer");
				
				var $tgt = $(e.target);
	
		if ($tgt.is("#newmasteradd")) {
					
					// need to be both a name and a lane number validation
					newmastnameis = $("#newmasteradd input#newmastid ").val();
					newlane = $("#thelaneoptionsnew").val();
	
					if(newmastnameis.length > 0 && (newlane.length > 0 && newlane != -1) )
					{
												hashCode = function(str){
												var hash = 0;
												if (str.length === 0) return hash;
												for (i = 0; i < str.length; i++) {
														char = str.charCodeAt(i);
														hash = ((hash<<5)-hash)+char;
														hash = hash & hash; // Convert to 32bit integer
												}

												return hash;
												};
												var newidnumberstart = new Date();
												newswimmerguid = Date.parse(newidnumberstart);
							
						newmastidish = hashCode(newmastnameis);
						newmastidisrand = Math.floor((Math.random()*10000000)+1);
									
						newmastidis = newmastidisrand + '-' + newmastidish;														
					
// need to save new master to couch, name and masters id,  validate unique ID number
					firstsavenewmaster = {};
					firstsavenewmaster.name = newmastnameis;
					firstsavenewmaster.swimmerid = newmastidis;
					firstsavenewmaster.lanetrain	= newlane;
					jsonfirstsavenewmaster =  JSON.stringify(firstsavenewmaster);

						//  make save to poudbfirst
						livepouch.singleSave(firstsavenewmaster);	
				
				$("#newmaster").hide();
// add html code for new swimmer added
					newswimcode = '';		
					newswimcode = liveHTML.fromswimmers(newmastnameis, newmastidis);
					liveLogic.setNameID(newmastnameis, newmastidis);	
							
				$("#sortable1").append(newswimcode);
				$("#saveconfirmswimmer").text('new master added');
				$("#saveconfirmswimmer").show();
				$("#saveconfirmswimmer").fadeOut("slow");
				$("#addswimmer").attr("title", "on");
				$(".peredit").hide();
				$(".peranalysis").hide();		
				
				$("#controloptions").hide();
				$(".peredit").hide();
				$(".historicalchart").hide();
				$(".historicalsummary").hide();
				$(".historicalbio").hide();
				$("#viewdata").attr("title", "on");
				$("#startsort").attr("title", "on");
				$("#loadlane").attr("title", "on");
				$("#loadlane").attr("class", "control-text");
				
				$(".social").hide();
				$("#socialcontext").css('background', 'white');		
				$("#socialcontext").data("socialstatus", "on");		

				}
				else
				{
					// need to prompt to add name or select lane number
					adderrormessage = 'Please ';
					if(newmastnameis.length === 0 )
					{ 
						adderrormessage += 'add a name ';
					}
					if(newlane == -1 )
					{
							adderrormessage += 'select a lane ';
					}
					$("#newswimerror").html(adderrormessage);
				}
			}
			
	});
		
	/*
	*  load swimmer by lane number
	*/
	$("select#thelaneoptions").change(function () {
		//livepouch.deletePouch();
				$("#viewdatalive").empty();
				$("#visualisedata").empty();
				$("#splittimeshistorical").empty();
				$("#loadlane").attr("title", "on");
				selectedlanenow = $("select#thelaneoptions").val();

				//first check local
					function localDatacall(selectedlanenow, callback) {  
						livepouch.mapQueryname(selectedlanenow, callback);
					}  
      
			localDatacall(selectedlanenow, function(rtmap) {  

						presentswimmer = '';
	
					rtmap.rows.forEach(function(rowswimrs){

							if(rowswimrs.key == selectedlanenow )
							{
								//pass the lane data to get html ready
								presentswimmer += liveHTML.fromswimmers(rowswimrs.value[1], rowswimrs.value[0]);
								liveLogic.setNameID(rowswimrs.value[1], rowswimrs.value[0]);
								}
						});

				$("#sortable1").html(presentswimmer);	
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
				$("#loadlane").attr('class', 'control-text');
						
				// test splits data recall						
				function localDataSPcall(dataspin, callback) {  
						livepouch.mapQuerySplits(dataspin, callback);

					}  
      
					localDataSPcall('1', function(spmap) {  
	
					});						
						
			});  
							
				$("#controloptions").hide();

			})
			.change();	

	/*
	* first time start
	*/
	$("#welcomesummary").on("click", function (e) {
		e.preventDefault(e);
		var $swtgt = $(e.target);
		if ($swtgt.is("a")) {
			idclick = $swtgt.attr("id");
			idname =$swtgt.attr("title");
// pass on the id of the swimmer  2 pass on the type of click,  start, reset, split, stop	
			starttiming.identifyswimmer(idname, idclick);
		}
	});

			
	/*
	*
	* List swimmer alphabetically
	*/
	$("#theswimmeroptions").change(function () {

				$("#viewdatalive").empty();
				$("#visualisedata").empty();
				$("#splittimeshistorical").empty();
		
				$("#loadlane").attr("title", "on");
				selectedswimmernow = $("#theswimmeroptions").val();
				//first check local
					function localDatacall(selectedswimmernow, callback) {  
						livepouch.mapQueryname(selectedswimmernow, callback);
					}  
      
					localDatacall(selectedswimmernow, function(rtmap) 
					{  

						presentswimmer = '';
						presentswimmer = '<form id="alphaswimmeradd" class="menu-text" action="#" method="post">';					
					rtmap.rows.forEach(function(rowswimrs){
						getfirstletter = rowswimrs.value[1].charAt(0);
						makelettersmall = getfirstletter.toLowerCase();
						
							if(makelettersmall == selectedswimmernow )
							{
								// prepare list box  select and append HTML
								presentswimmer += liveHTML.checkboxswimmers(rowswimrs.value[1], rowswimrs.value[0]);
							
								}
								
					});
				presentswimmer += '</form>';
				$("#addalpha").show();
				$("#addalpha").html(presentswimmer);					
				
					presentclose = '<br /><br /><a href="" id="closealphalist" class="control-text" >Close</a>';
					$("#addalphatwo").html(presentclose);

				});  
							
				// make post request to get swimmer for this lane and dispaly
				$("#loadlaneselect").hide();
				$("#loadswimmers").hide();
				$("#loadclearswimmers").hide();
				$("#addnewswimmer").hide();
				$("#loadlane").attr('class', 'control-text');

	}).change();	

	/*
	*  Take name clicke form a to z listing and display them in live area
	*/
	$("#addalpha").click(function (e) {
		e.preventDefault(e);
		var $tgt = $(e.target);		
		// which name checked?
		swimnamealpha = $tgt.text();
		swimidalpha = $tgt.attr("id");

		// prepare list box  select and append HTML
		presentswimmeralpha = liveHTML.fromswimmers(swimnamealpha, swimidalpha);
		liveLogic.setNameID(swimnamealpha, swimidalpha);

		$("#sortable1").append(presentswimmeralpha);
	
		$(".peredit").hide();
		$(".peranalysis").hide();
		$(".historicalchart").hide();
		$(".historicalsummary").hide();
		$(".historicalbio").hide();
		$("#viewdata").attr("title", "on");
		$("#startsort").attr("title", "on");
		
		
	});

	/*
	*  To pickup new appended content within the recordflow UI
	*/
	$("#recordflow").click(function (e) {	
		e.preventDefault(e);
							
		var $tgt = $(e.target);
	
		if($tgt.attr('id') == "pereditidremove")
		{
			var removeid = $tgt.attr('title');
			// html body section#recordflow div.container ul#sortable1.droptrue li#2222985--1618959307.ui-state-default
			var stringtoremove = "#sortable1 li#n" + removeid + ".ui-state-default";	
			$(stringtoremove).remove();
		}
		
	});

	/*
	* Close alphalist
	*/
	$("#addalphatwo").click(function (e) {
		e.preventDefault(e);
		$("#addalpha").hide();
		$("#addalphatwo").hide();
		
	});

	/*
	* Clear all swimmer from sort div
	*/
	$("#clearallswimmers").click(function (e) {
		e.preventDefault(e);		

			$("#sortable1").empty();
			$("#loadlaneselect").hide();
			$("#loadswimmers").hide();
			$("#addnewswimmer").hide();
			$("#loadclearswimmers").hide();
			$("#loadlane").attr("title", "on");
			$("#loadlane").attr('class', 'control-text');
				$(".social").hide();
				$("#socialcontext").css('background', 'white');		
				$("#socialcontext").data("socialstatus", "on");		

	});	
	
	/*
	* delgation of add alpha swimmer
	*/
	$("#aselectswimmer").click(function (e) {
		e.preventDefault(e);
			var $tgt = $(e.target);

			if ($tgt.is("#aselectswimmer")) {
				aselectswimmerlist = $(".demo input#aselectswimmer ").val();			

				}
	});					

	// drag and drop
		$("ul.droptrue").sortable({
			connectWith: 'ul',
			opacity: 0.6,
			update : updatePostOrder
		});

		
//		$("#sortable1, #sortable2").disableSelection();
		$("#sortable1, #sortable2").css('minHeight',$("#sortable1").height()+"px");
	
			function updatePostOrder() { 
			var arrorder = [];
				$("#sortable1 .ui-state-default").each(function(){
				arrorder.push($(this).attr('id'));
				});
				$('#postOrder').val(arrorder.join(','));
			}
			
	// need to identify which swimmers css markup has been clicked
	$("#contactin").click(function(e){
			e.preventDefault(e);

			idclick = $(this).attr("id");
			idtitle = $(this).attr("title");	
			// pass on the id of the swimmer  2 pass on the type of click,  start, reset, split, stop	
			starttiming.identifyswimmer(idtitle, idclick);
		
	});	
	
	
	
	$("#sortable1").on("click", function (e) {
		e.preventDefault(e);
		var $swtgt = $(e.target);
		if ($swtgt.is("a")) {
			idclick = $swtgt.attr("id");
			idname =$swtgt.attr("title");	
			// pass on the id of the swimmer  2 pass on the type of click,  start, reset, split, stop	
			starttiming.identifyswimmer(idname, idclick);
		}
	});
	
	currentsetset = 'int-' + $("#swiminterval").val() + 'sec ' + $("#swimstyle").val() + ' ' + $("#swimstroke").val() + ' ' + $("#swimtechnique").val() + ' ' + $("#swimdistance").val() + ' ' + $("#swimsplit").val();
$("#liveswimset").text('live: ' + currentsetset);			
		
});