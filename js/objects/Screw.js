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

            // Random chance to get ammo when collecting screw
            var rand = Math.random();

            // 40% chance to get 1-3 bullets
            if(rand < 0.4){
                var bullets = R.rand(1, 3);
                eater.set('ammo', eater.ammo + bullets);
                console.log('Got', bullets, 'bullets from screw!');
            }
            // 20% chance to get 1 flamethrower ammo
            else if(rand < 0.6){
                eater.set('flamethrower', eater.flamethrower + 1);
                console.log('Got 1 flamethrower ammo from screw!');
            }
            // 20% chance to get 1 bazooka ammo
            else if(rand < 0.8){
                eater.set('bazooka', eater.bazooka + 1);
                console.log('Got 1 bazooka ammo from screw!');
            }
            // 20% chance to get nothing extra
        },
        explodable: true
    };
} )(window.R);