var utils = require('utils');

var baseUrl = casper.cli.get('baseUrl');

casper.start(baseUrl , function() {



});

casper.then(function() {
    this.bypass(0);
});

casper.then(function() {
	
	this.test.comment('the section should be visable');
	this.test.assertExist("#holder", 'holder class exists'); 
//this.echo(this.getHTML());		
	casper.test.assertVisible('#holder', 'the section is visable');
	
});

casper.then(function() {

	this.mouseEvent('click', '#pleaseclick');
	
});



casper.then(function() {
	this.test.comment('the section should not  be visable');
	casper.test.assertNotVisible('#holder', 'the section is not visable');
	
});

casper.then(function() {
	this.test.comment('the section should not  be visable');
		casper.test.skip(1, 'One tests skipped');
	//casper.test.assertNotVisible('#holder', 'the section is not visable');

	
});

casper.run(function() {
	//	this.debugHTML();
	//this.exit();
	this.test.done();
	
});
