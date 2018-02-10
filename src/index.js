const 
  async = require('async'),
  frontMatter = require('front-matter'),  
  marked = require('marked'),
  yaml = require('js-yaml');

/*
 * Ditto Markdown with YAML Front Matter Middleware
 */
module.exports = DittoMarkdown;

function DittoMarkdown() {};

/**
 * Ditto Markdown with YAML Front Matter parsing middleware
 * @param {Array.<Object.<DittoFile>>} files 
 * @param {Object.<Ditto>} Ditto 
 * @param {Function} done 
 */
DittoMarkdown.prototype.run = function(files, Ditto, done) {
  async.each(files, this.parseFile, function(err) {
    done(err, files);
  })
};

/**
 * Safely parse node file buffer containing markdown and option YAML front matter
 * @param {Array} fileBuffer 
 */
DittoMarkdown.prototype.parseFile = function(fileBuffer, callback) {
  let fileContentStr = fileBuffer.content.toString('utf8');

  let content = frontMatter(fileContentStr);

  fileBuffer.content = content.attributes;
  fileBuffer.content.body = marked(content.body);

  callback(null);
};
