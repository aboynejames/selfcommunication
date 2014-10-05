buster.spec.expose(); // Make spec functions global

var spec = describe("class to control use of socket between cilent and server", function () {
	before(function () {
	    
		var mocktimer = new SwimtimeController();
		this.testlisten = new llListener(mocktimer);
	});

	it("check logic object is defined", function () {

		buster.assert.defined(llListener); 
			
	});

	it("check object is setup", function () {

		buster.assert.isObject(this.testlisten);
	});   
	
	it("check function active listener function", function () {
	   
		buster.assert.isFunction(this.testlisten.activeListeners);
	}); 
	
});