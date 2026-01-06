(function( R ){
    'use strict';
    R.objects.Robbo = {
        drawOnCreate: false,
        init: function( x, y, game ){
            game.robbo = this;
            this.direction = 1;
            this.stepAnimation = 0;
            this.keys = 0;
            this.ammo = 1;  // Start with 1 pistol ammo
            this.flamethrower = 1;  // Start with 1 flamethrower ammo
            this.bazooka = 1;  // Start with 1 bazooka ammo
            this.shield = 0;  // Start with 0 shield
            this.lives = 0;  // Start with 0 kills (kill counter)
            this.currentWeapon = 1;  // 1=pistol, 2=flamethrower, 3=bazooka
            this.inited = true;
            game.addActionObject(this);
            //this.noMove = true;
            this.scrolled = false;
            game.delayedFn(function(){
                this.game.set('screw', this.game.screw);
            }.bind(this),6);
            /*game.once('scrolled',function(){
                this.inited = true;
                debugger;
                game.setCell( x, y, 'Explosion', {after: {type: this}, single: true, build: true, callback: function(  ){

                    this.drawOnCreate = true;
                    this.noMove = false;
                    this.game.removeActiveObject(this);
                    this.game.setCell( this, this ); // redraw manually
                    this.game.set('screw', this.game.screw);
                }.bind(this) });
            }, this);*/


        },
        demolishable: true,
        demolish: function(  ){
            console.log('=== ROBBO DEMOLISH CALLED ===');
            console.log('Shields:', this.shield);

            // Check if player has shields
            if( this.shield > 0 ){
                // Lose 1 shield instead of dying
                this.set('shield', this.shield - 1);
                console.log('✓ Shield protected you! Shields remaining:', this.shield);
                this.game.playSound('key'); // Play sound for shield use

                // Brief invulnerability flash
                this.game.view.blink = 2;

                return false; // Don't die
            }

            // No shields - die normally
            console.log('✗ No shields - Robbo dies');
            !this.dead && this.game.restart();
            this.dead = true;
        },
        explodable: true,
        explode: function(  ){
            console.log('=== ROBBO EXPLODE CALLED ===');
            return this.demolish();
        },
        fireAction: function( ){
            this.fire = false;
            this.animateStep = true;
            if( this.fireDelay || this.noMove )
                return;

            var weaponType, ammoKey;

            // Determine weapon type and ammo key based on currentWeapon
            if(this.currentWeapon === 1){
                weaponType = 'gun';
                ammoKey = 'ammo';
            } else if(this.currentWeapon === 2){
                weaponType = 'flamethrower';
                ammoKey = 'flamethrower';
            } else if(this.currentWeapon === 3){
                weaponType = 'bazooka';
                ammoKey = 'bazooka';
            }

            // Check if we have ammo for this weapon
            if(!this[ammoKey] || this[ammoKey] <= 0)
                return;

            this.set( ammoKey, this[ammoKey] - 1 );

            if(weaponType === 'bazooka'){
                // Bazooka fires a special explosive bullet
                if( R.behaviors.fireBazooka.call( this ) !== false ){
                    this.game.playSound('shoot_default');
                    this.fireDelay = 4;  // Longer delay for bazooka
                }
            } else if(weaponType === 'flamethrower'){
                // Flamethrower fires multiple bullets in a spread
                if( R.behaviors.fireFlamethrower.call( this ) !== false ){
                    this.game.playSound('shoot_default');
                    this.fireDelay = 3;  // Medium delay for flamethrower
                }
            } else {
                // Regular gun
                if( R.behaviors.fire.call( this ) !== false ){
                    this.game.playSound('shoot_default');
                    this.fireDelay = 2;
                }
            }
        },
        step: function(  ){
            this.fireDelay = this.fireDelay > 0 ? this.fireDelay - 1 : 0;
            this.move && this.moveAction();
            this.fire && this.fireAction();
        },
        teleport: function( obj ){
            obj.transfer( this );
        },
        moveAction: function(  ){
            this.move = false;
            if( this.noMove )
                return;
            var newPos, nextCell, noStep = false;

            newPos = R.addDirection( this.x, this.y, this.direction);
            nextCell = this.game.getCell( newPos );

            if( nextCell.is( 'Empty' ) ){
                this.game.swap( nextCell, this );
            }else{
                noStep = true;
                if( nextCell.eatable )
                    if( !(nextCell.eat && nextCell.eat( this ) === false )){
                        nextCell = this.game.setCell( newPos, 'Empty' );
                        this.game.swap( nextCell, this );
                    }

                if( nextCell.movable )
                    if( !(nextCell.move && nextCell.move( this.direction ) === false) ){
                        nextCell = this.game.setCell( newPos, 'Empty' );
                        this.game.swap( nextCell, this );
                    }

                if( nextCell.getNextCell ){ // duck typing. teleport have such method. portal would also have it
                    this.teleport( nextCell );
                }
            }
            if( !noStep ){
                this.animateStep = true;
                this.game.playSound('walk_default');
            }
        },
        animate: function(  ){
            if( this.animateStep ){
                this.animateStep = false;
                this.stepAnimation = (this.stepAnimation + 1) % 2;
                this.game.view.redraw( this );
            }
        },
        set: function( key, val ){
            if( val < 0 )
                val = 0;

            this[ key ] = val;

            this.game.fire( 'robboSet', key, val );
        }
    };
} )(window.R);