(function( R ){
    'use strict';
    R.objects.Screw = {
        init: function( x, y, game ){
            !game.levelLoaded && game.screw++;
        },
        eatable: true,
        eat: function( eater ){
            this.game.set( 'screw', this.game.screw - 1 );
            this.game.playSound('screw');

            // Random chance to get bonus items when collecting screw
            var rand = Math.random();

            // 5% chance (1/20) to get 1 shield - VERY RARE!
            if(rand < 0.05){
                eater.set('shield', eater.shield + 1);
                console.log('Got 1 shield from screw! (RARE!)');
            }
            // 40% chance to get 1-3 bullets
            else if(rand < 0.45){
                var bullets = R.rand(1, 3);
                eater.set('ammo', eater.ammo + bullets);
                console.log('Got', bullets, 'bullets from screw!');
            }
            // 20% chance to get 1 flamethrower ammo
            else if(rand < 0.65){
                eater.set('flamethrower', eater.flamethrower + 1);
                console.log('Got 1 flamethrower ammo from screw!');
            }
            // 20% chance to get 1 bazooka ammo
            else if(rand < 0.85){
                eater.set('bazooka', eater.bazooka + 1);
                console.log('Got 1 bazooka ammo from screw!');
            }
            // 15% chance to get nothing extra
        },
        explodable: true
    };
} )(window.R);