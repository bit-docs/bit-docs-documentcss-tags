var pageTag = require('bit-docs-dev/tags/page');

	/**
	 * @constructor documentcss.tags.stylesheet @stylesheet
	 * @parent documentcss.stylesheet
   *
   * Alias for "page".
	 * 
	 * Declares this comment as a page. Use pages to
	 * represent content that doesn't belong to part of the
	 * application structure.
	 * 
	 * @signature `@stylesheet NAME [TITLE]`
	 * 
	 * @codestart 
     * /**
     *  * @@stylesheet lib/icons Icons
     *  * @@parent UI
     *  * 
     *  * Check out these icons for your UI.
     *  *
     *  * @@body
     *  *
     *  * ## How to use icons with your HTML.
     *  *|
	 * @codeend
	 * 
	 * @param {String} NAME The unique name of the stylesheet.
	 * @param {String} [TITLE] The title of the article used for display purposes.
	 * 
	 */
	module.exports = {
		add: function( line ) {
      this.alias = 'stylesheet';
      pageTag.add.call(this, line);
		}
	};
