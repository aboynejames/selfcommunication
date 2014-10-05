/*
* load, select, range etc date testing
*/
var baseUrl = "http://localhost/ll/opensportproject/swimtraintimer/communication/src/index.html";

casper.test.comment("Scenario: select dates and organisation tests");

casper.start(baseUrl, function() {
	this.test.comment('base datepicker div container');
	//casper.test.assertExists('input#datepicker.hasDatepicker', 'the element exists');
	casper.test.skip(1, 'one tests skipped');	

});

casper.then(function() {
	this.test.comment('click on the datepicker button');
	this.mouseEvent('Click', 'input#datepicker');
	
});

casper.thenEvaluate(function() {
	this.testdate = "10/10/2013"
	$( "input#datepicker.hasDatepicker" ).datepicker( "setDate", this.testdate);
			return document;

});

casper.then(function() {
	this.test.comment('click on the datepicker button');
	this.mouseEvent('Click', '#newelement');
	
});
casper.run(function() {
//this.echo(this.getHTML());	

  this.test.done();

});