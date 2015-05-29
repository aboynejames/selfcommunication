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

	localsplitstodelete = [];
	
	function localDatalog(callback) {  
		//livepouch.changeLog();
		//livepouch.filterchangeLog(callback, 'swimmers/nameslist');
		livepouch.filterchangeLog(callback, 'session/sessionlist');
		//livepouch.filterchangeLog(callback, 'communication/commlist');			
	};

	localDatalog( function(trainlog) {
		// need to differenciate between the type	
		if(trainlog === undefined || trainlog.results.length == 0)
		{			
			// no data to sync
			$("#syncbackup").html('No new data to sync to cloud');	
		}
		else
		{
			if(trainlog.results[0].doc.session)
			{
				clouddatalist = {};
				peernetworknotified = {};
				// save the training data and delete ready for next batch of data
			
				trainlog.results.forEach(function(rowsswimsplit){

					if (rowsswimsplit.doc.session)
					{				
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
							// save data locally and back to cloud
							liveRecord.swimdataCloud(buildsyncsplits);
						}	
						else
						{
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
	
	function localDatalog(callback) {  
		//livepouch.changeLog();
		//livepouch.filterchangeLog(callback, 'swimmers/nameslist');
		//livepouch.filterchangeLog(callback, 'session/sessionlist');
		livepouch.filterchangeLog(callback, 'communication/commlist');			
	};

	localDatalog( function(trainlog) {
		// need to differenciate between the type
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
				trainlog.results.forEach(function(rowset){
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
	
	function localDatalog(callback) {  
		//livepouch.changeLog();
		livepouch.filterchangeLog(callback, 'swimmers/nameslist');
		//livepouch.filterchangeLog(callback, 'session/sessionlist');
		//livepouch.filterchangeLog(callback, 'communication/commlist');			
	};

	localDatalog( function(trainlog) {
		// need to differenciate between the type
		if(trainlog === undefined || trainlog.results.length == 0)
		{
			// no data to sync
			$("#syncbackup").html('No new data to sync to cloud');	
		}
		else
		{
			if (trainlog.results[0].doc.name)
			{
				// send all the id back to the cloud and from there if multi ID will be contacted via emailemailemail
				trainlog.results.forEach(function(rowident){					
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
						$("#syncbackup").html('No new data to sync to cloud');	
					}						
				});
			}
		}
	});
	
};	
			
