/**
* Communication contex mixer
*
* Data sync cloud
* @class synccloud
*
* @package    Communication Mixer part of open sport project
* @copyright  Copyright (c) 2012 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
* @version    $Id$
*/
var synccloud = function() {

};

/**
*  
* @method dataPushcloud		
*
*/	
synccloud.prototype.dataPushcloud = function(datelastsync) {
	var syncmessage = '<a  href=""><img  id="syncicon" alt="sync in progress" src="images/sync.png" ></a>';
	$("#syncbackup").html(syncmessage);
	//  first check design docs have been save to pouch	
	this.sessionDatacall(datelastsync);
	this.dataIdentitycall(datelastsync);
	this.dataSetcall(datelastsync);
	
};

/**
*  default filter maps for pouch (new pouch query plugin to look at)
* @method checkDatafilters		
*
*/	
synccloud.prototype.checkDatafilters = function() {

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
			// design filters are all saved to pouch
		}	
			
	});	
	
};

/**
*  make the session time recording data call
* @method sessionDatacall		
*
*/	
synccloud.prototype.sessionDatacall = function(datelastsync) {
console.log('LIST of training session data');	
	localsplitstodelete = [];
	
	function localDatalog(callback) {  
		//livepouch.changeLog();
		//livepouch.filterchangeLog(callback, 'swimmers/nameslist');
		livepouch.filterchangeLog(callback, 'session/sessionlist');
		//livepouch.filterchangeLog(callback, 'communication/commlist');			
	};

	localDatalog( function(trainlog) {
		// need to differenciate between the type
console.log('last DATE live session');
console.log(datelastsync);
console.log(trainlog);	
		if(trainlog === undefined || trainlog.results.length == 0)
		{
console.log(trainlog.results.length)
console.log('session pass first logic');			
			// no data to sync
			$("#syncbackup").html('No new data to sync to cloud');	
		}
		else
		{
			if(trainlog.results[0].doc.session)
			{
console.log('LIST of training session data');				
console.log(trainlog.results);	

				clouddatalist = {};
				peernetworknotified = {};
				// save the training data and delete ready for next batch of data
			
				trainlog.results.forEach(function(rowsswimsplit){

					if (rowsswimsplit.doc.session)
					{
console.log('session date');
console.log(rowsswimsplit.doc.session.sessionid);
//rowsswimsplit.doc.session.sessionid = 1732720898000;	
console.log('current last sync date4');
console.log(datelastsync);						
						// only save data new since last sync data
						if( rowsswimsplit.doc.session.sessionid > datelastsync )
						{
							// form JSON to sync back to couch
							buildsyncsplits = {};
							buildsyncsplits.session = rowsswimsplit.doc.session;
							buildsyncsplits.swimmerid = rowsswimsplit.doc.swimmerid;
							buildsyncsplits.emailstatus = 'newdata';		
						
							//keep track of id of data being sent.
							clouddatalist[rowsswimsplit.doc.swimmerid] = 1;
console.log('make ajax request to cloud');
							// save data locally and back to cloud
							liveRecord.swimdataCloud(buildsyncsplits);
						}	
						else
						{
console.log('no data to sync back SESSION');
							$("#syncbackup").html('No new data to sync to cloud');	
						}
						
					}
				});
				
			}
		}
	//  TODO should get a cloud update of average, summary statistics and save/update locally
	});	
};

/**
*  make the email identity data call
* @method dataIdentitycall		
*
*/	
synccloud.prototype.dataSetcall  = function(datelastsync) {
console.log('LIST of SET data');		
	function localDatalog(callback) {  
		//livepouch.changeLog();
		//livepouch.filterchangeLog(callback, 'swimmers/nameslist');
		//livepouch.filterchangeLog(callback, 'session/sessionlist');
		livepouch.filterchangeLog(callback, 'communication/commlist');			
	};

	localDatalog( function(trainlog) {
		// need to differenciate between the type
console.log('last DATE SET live');
console.log(datelastsync);
		if(trainlog === undefined || trainlog.results.length == 0)
		{
			// no data to sync
			$("#syncbackup").html('No new data to sync to cloud');	
		}
		else
		{
			if(trainlog.results[0].doc.commdate)
			{
			// save the training test authored and keep a local copy			
console.log('LIST of SET data');				
console.log(trainlog.results);	
console.log(datelastsync);				
				trainlog.results.forEach(function(rowset){
console.log(rowset.doc.commdate);					
//rowset.doc.commdate = 1732720898000;
					// only save data new since last sync data
					if(rowset.doc.commdate > datelastsync)
					{							
						// form JSON to sync back to couch
						buildsetsid = {};
						buildsetsid.commdate = rowset.doc.commdate;
						buildsetsid.commid = rowset.doc.commid;	
						buildsetsid.commicationset = rowset.doc.communication;
						// save data locally and back to cloud				
						liveRecord.swimdataCloud(buildsetsid);
					}	
					else
					{
	console.log('no data to sync back SET COMM');
						$("#syncbackup").html('No new data to sync to cloud');	
					}						
				});
			}	
		}
		
	});

};


/**
*  make the email identity data call
* @method dataIdentitycall		
*
*/	
synccloud.prototype.dataIdentitycall = function(datelastsync) {
console.log('LIST of identity data');		
	function localDatalog(callback) {  
		//livepouch.changeLog();
		livepouch.filterchangeLog(callback, 'swimmers/nameslist');
		//livepouch.filterchangeLog(callback, 'session/sessionlist');
		//livepouch.filterchangeLog(callback, 'communication/commlist');			
	};

	localDatalog( function(trainlog) {
		// need to differenciate between the type
console.log('last DATE ID live');
console.log(datelastsync);
		if(trainlog === undefined || trainlog.results.length == 0)
		{
			// no data to sync
			$("#syncbackup").html('No new data to sync to cloud');	
		}
		else
		{
			if (trainlog.results[0].doc.name)
			{
console.log('LIST of identity data');				
console.log(trainlog.results);				

				// send all the id back to the cloud and from there if multi ID will be contacted via emailemailemail
				trainlog.results.forEach(function(rowident){
//rowident.doc.startdate =1732720898000;						
					// only save data new since last sync data
					if( rowident.doc.startdate > datelastsync )
					{							
						
						// form JSON to sync back to couch
						buildsid = {};
						buildsid.idlocal = rowident.doc.swimmerid;
						buildsid.username = rowident.doc.name;	
						buildsid.email = rowident.doc.emailid;
						buildsid.emailstatus = rowident.doc.emailstatus;  // set to 1,  risk does not save  need to set local email status to 1	
						buildsid.idpouch = rowident.doc._id;	
						// save data locally and back to cloud
						liveRecord.swimdataCloud(buildsid);
					}
					else
					{
	console.log('no data to sync back ID email etc');
						$("#syncbackup").html('No new data to sync to cloud');	
					}						
				});
			}
		}
	});
	
};	
			
