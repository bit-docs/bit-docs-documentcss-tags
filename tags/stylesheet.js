/**
 * @constructor documentcss.tags.stylesheet @stylesheet
 * @parent documentcss.tags
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
	add: function(line){
		var m = line.match(/^\s*@\w+\s+([^\s]+)(?:\s+(.+))?/);
		if( m ) {
			this.name = m[1];
			if(m[2]){
				this.title = m[2];
			}
			this.type = "stylesheet";
			this.showChildrenInPage = true;
			this.hideChildrenInMenu = true;
			return ["scope", this];
		}
	}
};
