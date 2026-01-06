(function( R ){
    'use strict';
    R.objects.Spaceship = {
        init: function( x, y, game ){
            game.addActionObject(this);
        },
        movable: true,
        eatable: true,
        eat: function( eater ){
            // Arena mode: All spaceships/capsules give +1 shield
            eater.set('shield', eater.shield + 1);
            this.game.playSound('key'); // Use key sound for shield pickup

            if( this.fromQuestion ){
                console.log('Got 1 shield from capsule!');
            } else {
                console.log('Got 1 shield from spaceship!');
            }

            // Capsule/spaceship disappears after pickup
            return true;
        },
        move: R.behaviors.move
    };
} )(window.R);