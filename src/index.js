const
  async = require('async'),
  frontMatter = require('front-matter'),
  marked = require('marked'),
  yaml = require('js-yaml');

/*
 * Ditto Markdown with YAML Front Matter Middleware
 */
module.exports = dittoMarkdown;

function dittoMarkdown() {
  /**
   * Safely parse node file buffer containing markdown and option YAML front matter
   * @param {Array} file 
   */
  function parseFile(file, callback) {
    let fileContentStr = file.content.toString('utf8');

    //parse the yaml front matter, and raw markdown
    let content = frontMatter(fileContentStr);

    //assign yaml attributes to the content property of the file
    file.content = content.attributes;

    //parse raw markdown into html
    file.content.body = marked(content.body);

    callback(null);
  };

  return function (files, Ditto, done) {
    async.each(files, parseFile, function (err) {
      done(err, files);
    })
  };
};


