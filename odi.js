/*
			OdiArt JS
	Canvas Animation Framework
*/
/*
		TODO
	Créer un objet du quel toute les autres éléments vont hériter
	
*/

var odi = function(){
	this.canvas = null;
	this.ctx = null;
		
	this.components = [];	
	
	this.component = function(x, y, width, height) {
		if(typeof x !== 'undefined' && typeof y !== 'undefined' && typeof width !== 'undefined' && typeof height !== 'undefined') {
			this.x = x;
			this.y = y;
			this.width = width;
			this.height = height;
		}
	}
};

odi.prototype = {
		about: 	function(){
			return 	{
						name: "OdiArtJS",
						version: "0.1",
						author: "Jean-Pierre Audy",
						createOn: "21/10/2017",
						lastUpdate: "24/10/2017"
					};
		},
		create:	function(id){		
					if(typeof id !== 'undefined'){							
						var canvas = document.getElementById(id);		
						if (canvas.nodeName.toLowerCase() !== 'canvas') {
							return console.log('Error, Element with id ' + id + ' is not a valid canvas element.');
						}else {		
							this.canvas = canvas;
							this.ctx = canvas.getContext("2d");			
						}						
					}	
				},
		text:	function(text, x, y, font, fill, stroke){
					var _x = x, _y = y, _font = "14px Arial", _fill = '#000';
					if(typeof text === 'undefined'){
						return console.log('Error, can\'t write nothing.');
					}
					if(typeof x === 'undefined' || typeof x !== 'number' || typeof y === 'undefined' || typeof y !== 'number'){
						_x = 0;
						_y = 0;
					}
					if(typeof font !== 'undefined' || typeof font === 'string'){
						_font = font;
					}
					this.ctx.font = _font;					
									
					if(typeof stroke !== 'undefined') {							
						if(stroke.indexOf(',') != -1) {
							var tmpColor = '';
							var tmpThickness = '';
							for(var i = 0; i < stroke.length; i++) {
								if(i < stroke.indexOf(',')) {
									tmpColor += stroke[i];
								}
								else if(i > stroke.indexOf(',') && stroke[i] != ' ' && stroke[i] != ',') {
									tmpThickness += stroke[i];
								}
							}	

							if(tmpThickness != '') {
								if(tmpThickness.indexOf('px') != -1)
									tmpThickness.replace('px', '');
								if(tmpThickness.indexOf('pt') != -1)
									tmpThickness.replace('pt', '');
								if(tmpThickness.indexOf('em') != -1)
									tmpThickness.replace('em', '');
								this.ctx.lineWidth = tmpThickness;								
							}							
							if(tmpColor != '') {
								if(getValidColor(tmpColor) != 'invalid') {									
									this.ctx.strokeStyle = getValidColor(tmpColor);
								}
							}
						}
						else {
							if(getValidColor(stroke) != 'invalid') {
								this.ctx.strokeStyle = getValidColor(stroke);
							}
						}	
						
						this.ctx.strokeText(text, _x, _y);
					}
					if(typeof fill !== 'undefined'){	
							_fill = getValidColor(fill);	
					}		
					this.ctx.fillStyle = _fill;
					this.ctx.fillText(text, _x, _y);					
				},
		image:	function(source, x, y, width, height) {
					
				}
};

function getValidColor(color) {
		var lower = color.toLowerCase();
		for(var c = 0; c < COLOR_NAMES.length; c++) {
			if(COLOR_NAMES[c] == lower) {									
				return lower;
			}
		}	
		return 'invalid';
}

var COLOR_NAMES = ["aliceblue","antiquewhite","aqua","aquamarine","azure","beige","bisque","black","blanchedalmond","blue","blueviolet","brown","burlywood","cadetblue","chartreuse","chocolate","coral","cornflowerblue","cornsilk","crimson","cyan","darkblue","darkcyan","darkgoldenrod","darkgray","darkgrey","darkgreen","darkkhaki","darkmagenta","darkolivegreen","darkorange","darkorchid","darkred","darksalmon","darkseagreen","darkslateblue","darkslategray","darkslategrey","darkturquoise","darkviolet","deeppink","deepskyblue","dimgray","dimgrey","dodgerblue","firebrick","floralwhite","forestgreen","fuchsia","gainsboro","ghostwhite","gold","goldenrod","gray","grey","green","greenyellow","honeydew","hotpink","indianred","indigo","ivory","khaki","lavender","lavenderblush","lawngreen","lemonchiffon","lightblue","lightcoral","lightcyan","lightgoldenrodyellow","lightgray","lightgrey","lightgreen","lightpink","lightsalmon","lightseagreen","lightskyblue","lightslategray","lightslategrey","lightsteelblue","lightyellow","lime","limegreen","linen","magenta","maroon","mediumaquamarine","mediumblue","mediumorchid","mediumpurple","mediumseagreen","mediumslateblue","mediumspringgreen","mediumturquoise","mediumvioletred","midnightblue","mintcream","mistyrose","moccasin","navajowhite","navy","oldlace","olive","olivedrab","orange","orangered","orchid","palegoldenrod","palegreen","paleturquoise","palevioletred","papayawhip","peachpuff","peru","pink","plum","powderblue","purple","red","rosybrown","royalblue","saddlebrown","salmon","sandybrown","seagreen","seashell","sienna","silver","skyblue","slateblue","slategray","slategrey","snow","springgreen","steelblue","tan","teal","thistle","tomato","turquoise","violet","wheat","white","whitesmoke","yellow","yellowgreen"];