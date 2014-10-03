var utils = require('utils');

var baseUrl = casper.cli.get('baseUrl');

casper.start(baseUrl , function() {

	this.test.comment('the section should not be visable');
	this.test.assertExist("#holder", 'holder class exists'); 
//this.echo(this.getHTML());		
	casper.test.assertNotVisible('#displayhistory', 'the section is not visable');

	
});

casper.then(function() {

	this.mouseEvent('click', '#pleaseclicktwo');
	
});

casper.then(function() {
	this.test.comment('the section should  be visable');
//this.echo(this.getHTML());	
	//casper.test.assertVisible('#displayhistory', 'the section is visable');
	casper.test.skip(1, 'one tests skipped');	
	
});

casper.run(function() {
	//	this.debugHTML();
	//this.exit();
	this.test.done();
	
});
