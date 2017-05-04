var Browser = require('zombie');
var assert = require('assert');
var express = require('express');
var generate = require('bit-docs-generate-html/generate');
var path = require('path');
var rmrf = require('rimraf');
var style = require('./tags/style');
var stylesheet = require('./tags/stylesheet');

Browser.localhost('*.example.com', 3003);

/*
 * Debug options:
 *	npm --debug test
 *	npm --devBuild test
 *	npm --skipGenerate test
 *	npm --debug --devBuild test
 *	npm --debug --skipGenerate test
 */

describe('bit-docs-documentcss-tags', function () {
	var server = express(),
		browser = new Browser(),
		temp = path.join(__dirname, 'temp');

	before(function () {
		if (!!process.env.npm_config_debug) { browser.debug(); }
		return new Promise(function (resolve, reject) {
			server = server.use('/', express.static(__dirname)).listen(3003, resolve);
			server.on('error', reject);
		});
	});

	describe('temp directory', function () {
		before(function (done) {
			if (!!process.env.npm_config_skipGenerate) { this.skip(); }
			rmrf(temp, done);
		});

		it('is generated', function () {
			this.timeout(60000);

			var docMap = Promise.resolve({
				index: {
					name: "index",
          type: "stylesheet",
					body: "This is the @stylesheet generated page."
				}
			});

			var siteConfig = {
				dest: temp,
				debug: !!process.env.npm_config_debug,
				devBuild: !!process.env.npm_config_devBuild,
				parent: "index",
				forceBuild: true,
				minifyBuild: false
			};

			return generate(docMap, siteConfig);
		});
	});

	describe('tag', function () {
    it("@stylesheet",function(){
      var obj = {};
      stylesheet.add.call(obj, "@stylesheet mypage My Page");
      assert.deepEqual(obj, {name: "mypage", title: "My Page", type: "page",
                       type: "stylesheet", showChildrenInPage: true,
                       hideChildrenInMenu: true});
    });

    it("@style",function(){
      var parentObj = {};
      var obj = {}
      var scope = stylesheet.add.call(parentObj, "@stylesheet mypage My Page");
      console.log('@stylesheet', parentObj);
      style.add.call(obj, "@style food-icons Food Icons 1", '', scope, parentObj);
      console.log('@style', obj);
      //style.add.call(obj, "@style misc-icons Misc Icons 1\n@parent lib/icons");
      assert.deepEqual(obj, {
        name: 'food-icons',
        title: 'Food Icons 1',
        order: 0,
        type: 'style',
        parent: null,
        hideInParentMenu: true
      });
    });

		describe('generated page', function () {
			before(function () {
				return browser.visit('/temp/index.html');
			});

			it('exists', function () {
				browser.assert.success();
				browser.assert.global('PACKAGES');
			});
		});
	});

	after(function () {
		browser.destroy();
		server.close();
	});
});
