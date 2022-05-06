/**
 *
 * Original code
 * https://github.com/Jxck/html2json
 */
var HTMLParser = require('./htmlparser');

function json2html(json) {
  // Empty Elements - HTML 4.01
  var empty = [
    'area',
    'base',
    'basefont',
    'br',
    'col',
    'frame',
    'hr',
    'img',
    'input',
    'isindex',
    'link',
    'meta',
    'param',
    'embed'
  ];

  let child = '';
  if (json.child) {
    child = json.child
      .map(function (c) {
        return json2html(c);
      })
      .join('');
  }

  var attrs = '';
  if (json.attrs) {
    attrs = Object.keys(json.attrs)
      .map(function (key) {
        var value = json.attrs[key];
        if (Array.isArray(value)) value = value.join(' ');
        return key + '=' + q(value);
      })
      .join(' ');
    if (attrs !== '') attrs = ' ' + attrs;
  }

  if (json.node === 'element') {
    var tag = json.tag;
    if (empty.indexOf(tag) > -1) {
      // empty element
      return '<' + json.tag + attrs + '/>';
    }

    // non empty element
    var open = '<' + json.tag + attrs + '>';
    var close = '</' + json.tag + '>';
    return open + child + close;
  }

  if (json.node === 'text') {
    return json.text;
  }

  if (json.node === 'comment') {
    return '<!--' + json.text + '-->';
  }

  if (json.node === 'root') {
    return child;
  }
}

module.exports = json2html;
