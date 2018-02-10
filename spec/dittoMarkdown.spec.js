const
	DittMarkdown = require('../src'),
	fs = require('fs');

describe('ditto markdown', function(){
	let file = {};

	beforeAll(function(){
		//mock DittoFile
		var stats = fs.statSync('./spec/support/files/index.md');
		var buffer = fs.readFileSync('./spec/support/files/index.md');

		file = {
			content: buffer,
			path: 'files/index.md',
			stats: stats
		};
	});

	it('should be contents of files/index.md', function(){
		let 
			dittoMarkdown = new DittMarkdown(),
			parsed = dittoMarkdown.parseFile(file.content),
			// shouldEqual = { test: 'test' };

		// expect(parsed).toEqual(shouldEqual);
	});
});