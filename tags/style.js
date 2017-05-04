var getParent = require("bit-docs-process-tags/get-parent"),
	tnd = require("bit-docs-type-annotate").typeNameDescription;

/**
 * @constructor documentcss.tags.style @style
 * @parent documentcss.style
 *
 * Declares this comment as belonging to an @stylesheet page.
 * 
 * @signature `@style [NAME] [TITLE] [ORDER]`
 * 
 * @codestart 
   * /**
   *  * @@style food-icons Food Icons 1
   *  * @@parent lib/icons
   *  * 
   *  * Check out these icons for your UI.
   *  *
   *  * @@body
   *  *
   *  * ## Food icons for your application. Keep reading for how to use.
   *  *|
 * @codeend
 *
 * @param {String} [NAME] The name of the style. The name is used as a
 * reference for other tags
 *
 * @param {String} [TITLE] The title of the section used for display purposes.
 *
 * @param {String} [ORDER] The order in relation to other @style tags on the
 * same page.
 */
module.exports = {
	add: function(line, curData, scope, docMap){
		var m = line.match(/^\s*@\w+\s+([^\s]+)(?:\s+(.+))?/);
		if( m ) {
			this.name = m[1];
			if(m[2]){
				this.title = m[2];
			}
      this.order = parseInt(m[3],10) || 0,
			this.type = "style";
			var parentAndName = getParent.andName({
				parents: '*',
				useName: ['stylesheet'],
				scope: scope,
				docMap: docMap,
				name: this.name
			});
			if(!this.parent){
				this.parent = parentAndName.parent;
			}
			this.hideInParentMenu = true;
		}
	}
};


/*
	module.exports = {
		add: function (line, curData, scope, docMap) {
			var m = line.match(/@group[\s+](.*?)([\s+]([\d]+))?[\s+](.*)/),
				currentName = this.name;

			if (m) {
				var name = m[1],
					title = m[4] || m[1],
					order = parseInt(m[3],10) || 0,
					docObject = docMap[name] ?
						docMap[name] :
						docMap[name] = {
							name: name,
							title: title || name,
							type: "group",
							parent: currentName,
							description: '',
							order: order
						};

				return ["scope", docObject]
			} else {
				console.warn("WARN!: did not match @group for ",line);
			}
		}
	};

module.exports = {
	add: function(line, curData, scope, docMap){

		var noNameData = tnd(line, true);
		if(!noNameData || !noNameData.types || !noNameData.types[0] || !noNameData.types[0].type) {
			console.log("WARNING!!\n>"+line+"\nShould look like:\n`@deprecated {VERSION} DESCRIPTION`");
		} else {
			if(!this.deprecated){
				this.deprecated = [];
			}
			var deprecate = {
				version: noNameData.types[0].type,
				description: noNameData.description
			};
			this.deprecated.push(deprecate);
			return deprecate;
		}


	},
	addMore: function( line, last ) {
		if ( last ) last.description += "\n" + line;
	}
};
*/
