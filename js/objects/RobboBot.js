(function( R ){
    'use strict';
    R.objects.RobboBot = {
        drawOnCreate: true,
        init: function( x, y, game ){
            game.addActionObject(this);
            this.direction = R.rand(0, 3); // Random initial direction
            this.stepAnimation = 0;
            this.ammo = 10; // Bots have ammo
            this.fireDelay = 0;
            this.moveDelay = 0;
            this.thinkDelay = R.rand(5, 15); // Random thinking delay
            this.botId = game.botIdCounter = (game.botIdCounter || 0) + 1;
            this.respawnTime = 156; // ~10 seconds (64ms per tick * 156 ≈ 10s)
            this.isDead = false;
            this.chaseMode = false;
            this.lastPath = null;
            this.pathUpdateDelay = 0;

            // Register this bot
            game.robboBots = game.robboBots || [];
            game.robboBots.push(this);
        },
        demolishable: true,
        demolish: function(){
            console.log('=== DEMOLISH CALLED ===');
            console.log('Bot ID:', this.botId, 'Position:', this.x, this.y);
            console.log('isDead before:', this.isDead);

            if(this.isDead){
                console.log('Bot already dead, skipping demolish');
                return;
            }

            this.isDead = true;
            this.dead = true;
            console.log('Bot marked as dead');

            console.log('RobboBot #' + this.botId + ' killed at', this.x, this.y, '- scheduling respawn in', this.respawnTime, 'ticks');

            // Increment player's kill counter (lives counter shows kills)
            if(this.game.robbo){
                this.game.robbo.set('lives', this.game.robbo.lives + 1);
                console.log('Kill count:', this.game.robbo.lives);
            }

            // Drop a screw at death location
            var screwPos = {x: this.x, y: this.y};
            var screwObj = null;

            console.log('Scheduling screw drop at', screwPos.x, screwPos.y, 'in 3 ticks');
            this.game.delayedFn(function(){
                console.log('Screw drop timer triggered');
                var cell = this.game.getCell(screwPos);
                console.log('Cell at screw position:', cell.type);

                if(cell.is('Empty') || cell.is('Explosion')){
                    screwObj = this.game.setCell(screwPos, 'Screw');
                    this.game.screw++; // Increment screw count
                    console.log('✓ Screw dropped at', screwPos.x, screwPos.y);

                    // Make screw disappear after 5 seconds (~78 ticks)
                    console.log('Scheduling screw disappear in 78 ticks');
                    this.game.delayedFn(function(){
                        console.log('Screw disappear timer triggered');
                        var currentCell = this.game.getCell(screwPos);
                        if(currentCell === screwObj && currentCell.is('Screw')){
                            this.game.setCell(screwPos, 'Empty');
                            this.game.screw--; // Decrement screw count
                            console.log('✓ Screw disappeared at', screwPos.x, screwPos.y);
                        } else {
                            console.log('Screw already gone or replaced');
                        }
                    }.bind(this), 78);
                } else {
                    console.log('✗ Cannot drop screw - cell not empty:', cell.type);
                }
            }.bind(this), 3);

            // Schedule respawn
            console.log('Scheduling respawn in', this.respawnTime, 'ticks');
            this.game.delayedFn(function(){
                console.log('=== RESPAWN TIMER TRIGGERED ===');
                console.log('Bot ID:', this.botId);
                this.respawn();
            }.bind(this), this.respawnTime);

            console.log('=== DEMOLISH COMPLETE ===');
        },
        explodable: true,
        explode: function(){
            this.demolish();
        },
        respawn: function(){
            console.log('=== RESPAWN FUNCTION CALLED ===');
            console.log('Bot ID:', this.botId);
            console.log('isDead:', this.isDead);
            console.log('dead:', this.dead);
            console.log('Current position:', this.x, this.y);

            if(!this.isDead){
                console.log('✗ Bot not dead, aborting respawn');
                return;
            }

            console.log('✓ Bot is dead, proceeding with respawn');

            // Find random empty position
            console.log('Searching for empty cells...');

            // Calculate map dimensions from the map array
            var mapHeight = this.game.map.length;
            var mapWidth = 0;
            for(var i = 0; i < mapHeight; i++){
                if(this.game.map[i] && this.game.map[i].length > mapWidth){
                    mapWidth = this.game.map[i].length;
                }
            }
            console.log('Map dimensions:', mapWidth, 'x', mapHeight);

            var emptyCells = [];
            for(var y = 0; y < mapHeight; y++){
                for(var x = 0; x < mapWidth; x++){
                    var cell = this.game.getCell({x: x, y: y});
                    if(cell && cell.is('Empty')){
                        emptyCells.push({x: x, y: y});
                    }
                }
            }
            console.log('Found', emptyCells.length, 'empty cells');

            if(emptyCells.length > 0){
                var pos = emptyCells[R.rand(0, emptyCells.length - 1)];

                console.log('Selected respawn position:', pos.x, pos.y);

                // Reset bot state BEFORE placing on map
                console.log('Resetting bot state...');
                this.isDead = false;
                this.dead = false;
                this.ammo = 10;
                this.fireDelay = 0;
                this.moveDelay = 0;
                this.direction = R.rand(0, 3);
                this.chaseMode = false;
                this.lastPath = null;
                this.pathUpdateDelay = 0;
                this.x = pos.x;
                this.y = pos.y;
                console.log('✓ Bot state reset');

                // Place bot on map and add to action objects
                console.log('Placing bot on map at', pos.x, pos.y);
                var placedCell = this.game.setCell(pos, this);
                console.log('setCell returned:', placedCell);

                // Make sure bot is in action objects list
                console.log('Checking action objects list...');
                console.log('Total action objects:', this.game.actionObjects.length);
                var inList = false;
                for(var i = 0; i < this.game.actionObjects.length; i++){
                    if(this.game.actionObjects[i] === this){
                        inList = true;
                        console.log('✓ Bot found in action objects at index', i);
                        break;
                    }
                }

                if(!inList){
                    console.log('Bot not in action objects, adding...');
                    this.game.addActionObject(this);
                    console.log('✓ RobboBot added to action objects');
                } else {
                    console.log('✓ Bot already in action objects');
                }

                // Redraw the bot
                console.log('Redrawing bot...');
                this.game.view.redraw(this);
                console.log('✓ Bot redrawn');

                // Verify placement
                var verifyCell = this.game.getCell(pos);
                console.log('Verification - cell at', pos.x, pos.y, 'is:', verifyCell.type);
                console.log('Verification - is RobboBot?', verifyCell.is('RobboBot'));

                console.log('=== RESPAWN COMPLETE ===');
            } else {
                console.log('✗✗✗ RobboBot respawn FAILED - no empty cells found ✗✗✗');

                // Calculate map dimensions for error message
                var mapHeight = this.game.map.length;
                var mapWidth = 0;
                for(var i = 0; i < mapHeight; i++){
                    if(this.game.map[i] && this.game.map[i].length > mapWidth){
                        mapWidth = this.game.map[i].length;
                    }
                }
                console.log('Map size:', mapWidth, 'x', mapHeight);
                console.log('All cells are occupied - need more empty space!');
                console.log('=== RESPAWN FAILED ===');
            }
        },
        findNearestBot: function(){
            var minDist = Infinity;
            var nearest = null;
            var bots = this.game.robboBots || [];

            // Also consider Robbo as a target
            var targets = bots.slice();
            if(this.game.robbo && !this.game.robbo.dead){
                targets.push(this.game.robbo);
            }

            for(var i = 0; i < targets.length; i++){
                var bot = targets[i];
                if(bot === this || bot.isDead) continue;

                var dx = bot.x - this.x;
                var dy = bot.y - this.y;
                var dist = Math.abs(dx) + Math.abs(dy); // Manhattan distance

                if(dist < minDist){
                    minDist = dist;
                    nearest = {bot: bot, dist: dist, dx: dx, dy: dy};
                }
            }

            return nearest;
        },
        // BFS pathfinding to find next move towards target
        findPathDirection: function(targetX, targetY){
            var queue = [{x: this.x, y: this.y, path: []}];
            var visited = {};
            var key = this.x + ',' + this.y;
            visited[key] = true;
            var maxSteps = 50; // Limit search depth
            var steps = 0;

            while(queue.length > 0 && steps < maxSteps){
                steps++;
                var current = queue.shift();

                // Check all 4 directions
                for(var dir = 0; dir < 4; dir++){
                    var next = R.addDirection(current.x, current.y, dir);
                    var nextKey = next.x + ',' + next.y;

                    if(visited[nextKey]) continue;
                    visited[nextKey] = true;

                    var cell = this.game.getCell(next);

                    // Check if we reached target
                    if(next.x === targetX && next.y === targetY){
                        var newPath = current.path.concat([dir]);
                        return newPath[0]; // Return first direction in path
                    }

                    // Can move through empty cells
                    if(cell.is('Empty') || cell.is('RobboBot') || cell.is('Robbo')){
                        queue.push({
                            x: next.x,
                            y: next.y,
                            path: current.path.concat([dir])
                        });
                    }
                }
            }

            return null; // No path found
        },
        shouldShoot: function(){
            var nearest = this.findNearestBot();
            if(!nearest) return false;

            // Check if target is in line of sight
            var inLineOfSight = false;
            var targetDirection = -1;

            if(nearest.dx === 0 && nearest.dy !== 0){
                // Same column
                targetDirection = nearest.dy > 0 ? 1 : 3; // down : up
                if(this.direction === targetDirection){
                    // Check if path is clear
                    var checkY = this.y;
                    var step = nearest.dy > 0 ? 1 : -1;
                    var clear = true;
                    for(var i = 1; i < Math.abs(nearest.dy); i++){
                        checkY += step;
                        var cell = this.game.getCell({x: this.x, y: checkY});
                        if(!cell.is('Empty') && !cell.is('RobboBot') && !cell.is('Robbo')){
                            clear = false;
                            break;
                        }
                    }
                    inLineOfSight = clear;
                }
            } else if(nearest.dy === 0 && nearest.dx !== 0){
                // Same row
                targetDirection = nearest.dx > 0 ? 0 : 2; // right : left
                if(this.direction === targetDirection){
                    // Check if path is clear
                    var checkX = this.x;
                    var step = nearest.dx > 0 ? 1 : -1;
                    var clear = true;
                    for(var i = 1; i < Math.abs(nearest.dx); i++){
                        checkX += step;
                        var cell = this.game.getCell({x: checkX, y: this.y});
                        if(!cell.is('Empty') && !cell.is('RobboBot') && !cell.is('Robbo')){
                            clear = false;
                            break;
                        }
                    }
                    inLineOfSight = clear;
                }
            }

            // Higher probability to shoot if bot is close and in line of sight
            var shootChance = 0.01; // Base 1% chance

            if(inLineOfSight){
                if(nearest.dist <= 3) shootChance = 0.8; // 80% if very close and in sight
                else if(nearest.dist <= 5) shootChance = 0.6; // 60% if close and in sight
                else if(nearest.dist <= 8) shootChance = 0.4; // 40% if nearby and in sight
                else shootChance = 0.2; // 20% if in sight
            } else {
                if(nearest.dist <= 3) shootChance = 0.1; // 10% if very close
                else if(nearest.dist <= 5) shootChance = 0.05; // 5% if close
            }

            return Math.random() < shootChance;
        },
        step: function(){
            if(this.isDead){
                // Log occasionally to see if dead bots are still being stepped
                if(Math.random() < 0.01){ // 1% chance to log
                    console.log('Dead bot #' + this.botId + ' step() called but skipped');
                }
                return;
            }

            this.fireDelay = this.fireDelay > 0 ? this.fireDelay - 1 : 0;
            this.moveDelay = this.moveDelay > 0 ? this.moveDelay - 1 : 0;
            this.thinkDelay = this.thinkDelay > 0 ? this.thinkDelay - 1 : 0;
            this.pathUpdateDelay = this.pathUpdateDelay > 0 ? this.pathUpdateDelay - 1 : 0;

            // Check for nearby targets
            var nearest = this.findNearestBot();
            var chaseDistance = 12; // Chase if within 12 tiles

            if(nearest && nearest.dist <= chaseDistance){
                this.chaseMode = true;
                this.chaseTarget = nearest.bot;
            } else {
                this.chaseMode = false;
                this.chaseTarget = null;
            }

            // Try to shoot
            if(this.fireDelay === 0 && this.ammo > 0 && this.shouldShoot()){
                if(R.behaviors.fire.call(this) !== false){
                    this.game.playSound('shoot_default');
                    this.ammo--;
                    this.fireDelay = R.rand(8, 15);
                    this.animateStep = true;
                }
            }

            // Move around
            if(this.moveDelay === 0 && this.thinkDelay === 0){
                this.moveBot();
                if(this.chaseMode){
                    this.moveDelay = R.rand(1, 3); // Move faster when chasing
                    this.thinkDelay = R.rand(2, 5);
                } else {
                    this.moveDelay = R.rand(3, 8);
                    this.thinkDelay = R.rand(10, 30);
                }
            }
        },
        moveBot: function(){
            var moved = false;
            var targetDirection = null;

            // Chase mode: use pathfinding
            if(this.chaseMode && this.chaseTarget && !this.chaseTarget.dead){
                // Update path every few steps
                if(this.pathUpdateDelay === 0){
                    targetDirection = this.findPathDirection(this.chaseTarget.x, this.chaseTarget.y);
                    this.pathUpdateDelay = R.rand(3, 6);

                    if(targetDirection !== null){
                        this.direction = targetDirection;
                    }
                }
            }

            // Try to move in current direction
            var newPos = R.addDirection(this.x, this.y, this.direction);
            var nextCell = this.game.getCell(newPos);

            if(nextCell.is('Empty')){
                this.game.swap(nextCell, this);
                this.animateStep = true;
                moved = true;
            } else {
                // Hit obstacle - try alternative directions
                if(this.chaseMode && this.chaseTarget){
                    // Try perpendicular directions
                    var altDirections = [
                        (this.direction + 1) % 4,
                        (this.direction + 3) % 4,
                        (this.direction + 2) % 4
                    ];

                    for(var i = 0; i < altDirections.length; i++){
                        var altDir = altDirections[i];
                        var altPos = R.addDirection(this.x, this.y, altDir);
                        var altCell = this.game.getCell(altPos);

                        if(altCell.is('Empty')){
                            this.direction = altDir;
                            this.game.swap(altCell, this);
                            this.animateStep = true;
                            moved = true;
                            break;
                        }
                    }
                }

                // If still not moved, change direction randomly
                if(!moved){
                    this.direction = R.rand(0, 3);
                    this.pathUpdateDelay = 0; // Force path recalculation
                }
            }
        },
        animate: function(){
            if(this.animateStep){
                this.animateStep = false;
                this.stepAnimation = (this.stepAnimation + 1) % 2;
                this.game.view.redraw(this);
            }
        },
        dieCheck: function(){
            // Kill Robbo if adjacent
            R.behaviors.killRobbo.call(this);
        }
    };
})(window.R);

