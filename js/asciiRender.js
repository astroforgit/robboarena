(function( R ){
    'use strict';
    R.sprites = {
        offset: 2,
        cellSize: 8,
        getKeyByValue: function(object, value) {
            return Object.keys(object).find(key => object[key] === value);
        },
        draw: function( ctx, sprite, rect, blink ){
            var ascii = null;
            var objkey = this.getKeyByValue(this,sprite);
            var ascichar = this.getKeyByValue(R.ascii,objkey) ||" ";
            //debugger;
            if (sprite.sascii) {
                ascii = sprite.sascii;
                sprite = sprite.scolor;
            }
            var zoom = 1;
            rect[0]/=zoom;
            rect[1]/=zoom;
            rect[2]/=zoom;
            rect[3]/=zoom;
           // debugger;
			if( typeof sprite === 'number' ){
				ctx.fillStyle = '#000';
				ctx.fillRect.apply( ctx, rect );
				ctx.fillStyle = '#fff';
				ctx.fillText(sprite.toString(10),rect[0], rect[1]+10);
			}else{

                /*
                ctx.fillStyle = '#000';
                ctx.fillRect.apply( ctx, rect );
                ctx.fillStyle = '#fff';
                ctx.fillText(sprite,rect[0], rect[1]);
                */

                if(ascichar!==" ") sprite='#fff';
				ctx.fillStyle = blink === '#fff' ? blink : sprite;
				ctx.globalAlpha = 1;
				ctx.fillRect.apply( ctx, rect );

                ctx.fillStyle = '#000';
                ctx.fillText.apply( ctx,[ascichar,rect[0]+10, rect[1]+15]);

			}

        },
        modifyColors: function(  ){

        },
        resolveSprite: function( obj, step, step2 ){
            var sprite = this[ obj.type ];
            //debugger;
            sprite.ascii && ( sprite = sprite.ascii[ obj.ascii ] );
            //obj.ascii && (sprite =   obj.ascii);
            var spriteobj = {};
                spriteobj.scolor = sprite;
            obj.ascii && (spriteobj.sascii =   obj.ascii);
            return typeof sprite === 'function' ? sprite.call( obj, step, step2 ) : sprite;
        },
        getHash: function( sprite ){
            return sprite;
        },

        Robbo: '#cc6',
        Empty: '#fff',
        Walls: '#fee',
        Ground: '#aaa',
        Stone: '#ccc',
        PushableStone: '#ddd',
        Door: '#ffd29d',
        Spaceship: function( step ){
            return ( this.game.screw === 0 ? ( step ? '#98bb9b' : '#3baa2f' ) : '#3baa2f' );
        },
        Question: '#eee',
        Bomb: '#777',
        Key: '#dfd',
        Screw: '#ddf',
        Turrel: '#eec',
        Ammo: '#ffd',
        Teleport: function( step ){
            return '#ac'+ (step? 'e': '8');
        },
        Explosion: function(){
            return '#'+((this.animation*2+9).toString(16))+'77';
        },
        Bullet: '#caa',
        Mustache: '#ece',
        Butterfly: '#fa7',
        Bear: '#cec',
        Lava: '#aaf',
        Magnet: '#aba',
        Bright: '#faf200',

        'hud.screw': '#ddf',
        'hud.ammo': '#ffd',
        'hud.keys': '#dfd',
        'hud.planet': '#dfd',
        'hud.lives': '#dfd'


    };
	for( var i = 0; i < 10; i++)
		R.sprites['hud.digit.'+i] = i;
    R.loaded('sprites');

})(window.R);
