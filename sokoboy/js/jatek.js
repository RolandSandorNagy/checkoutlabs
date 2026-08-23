var guy = fw.image('img/Guy.png');
var wall = fw.image('img/jungle.png');
var box = fw.image('img/box.png');
var box2 = fw.image('img/checkedBox.png');
var bullet = fw.image('img/bullets.png');
var explosionImg = fw.image('img/explosion.png');
var checkpoint = fw.image('img/checkpoint.png');
var sideBar = fw.image('img/sideBar.png');
var side = fw.image('img/side.png');
var gate = fw.image('img/gate.png');
var story1 = fw.image('img/Story1.png');
var story2 = fw.image('img/Story2.png');
var help1 = fw.image('img/Help1.png');
var help2 = fw.image('img/Help2.png');
var m = fw.image('img/MENU/menu1.png');
var m2 = fw.image('img/MENU/menu2.png');
var m3 = fw.image('img/MENU/menu3.png');
var m4 = fw.image('img/MENU/menu4.png');
var endMap_B = false;
var map = 1;
var bulletsAvailable = 0;
var mapBoxes = 0;
var checkedBoxes = 0;
var interval;
var index;

var KEYS = {
    UP: 38,
    LEFT: 37,
    RIGHT: 39,
    DOWN: 40,
    ESC: 27
};

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var Bullet = fw.entity(fw.EntityWithSprite, {
    init: function () {
        this.image = bullet;
        this.imageColumns = 4;
        this.imageRows = 1;
        this.imageRow = 0;
    },

    $frame: function () {
        this.x += this.speedX;
        this.y += this.speedY;

        if (index.hasCollision(this, Wall, 0, 0) ||
            index.hasCollision(this, Box, 0, 0)
        ) {
            scene.remove(this);
        }
    }
});

var Wall = fw.entity(fw.EntityWithSprite, {
    init: function () {
        this.image = wall;
    },
    $frame: function () {
        this.depth = this.y + wall.height;
    },
    getHeight: function () {
        return wall.height;
    },
    getTop: function () {
        return this.y;
    }
});

var Box = fw.entity(fw.EntityWithSprite, {
    init: function () {
        this.image = box;
        this.wasChecked = false;
        this.exp = false;
        this.exist = true;
    },
    $frame: function () {
        this.depth = this.y + wall.height;
    },
    $draw: function () {
            if (!this.image) {
                return;
            }
            ctx.drawImage(this.image, this.getSourceLeft(), this.getSourceTop(), this.getSourceWidth(), this.getSourceHeight(), this.getTargetLeft(), this.getTargetTop(), this.getTargetWidth(), this.getTargetHeight()); //felrajzoljuk a hőst        
            if(this.exp) {
                this.imageColumn += 0.5;
            }
            if(this.imageColumn === 13 && this.exist === true) {
                this.exist = false;
                if(this.wasChecked === true) {
                    checkedBoxes -= 1;
                }
                mapBoxes -=1;
                scene.remove(this);  
            }
    },
    explosion: function () {
        playSound('sound/explosion.mp3');
        this.exp = true;
        this.image = explosionImg;
        this.imageRows = 1;
        this.imageColumns = 13;
        this.imageColumn = 0;
        this.imageRow = 0;
    },
    move: function (x, y) {
        if(this.exp === true) {
            return false;
        }

        if (index.hasCollision(this, Checkpoint, x, y)) {
            if(this.image === box) {
                if(this.wasChecked === false) {
                    this.wasChecked = true;
                    playSound('sound/lockOn.mp3');                
                }
                checkedBoxes +=1;
            }
            this.image = box2;
        } else {
            if(this.image === box2) {
                if(this.wasChecked === true) {
                    this.wasChecked = false;
                    playSound('sound/lockOff.mp3');                
                }
                checkedBoxes -=1;
            }
            this.image = box;            
        }                        

        if (index.hasCollision(this, Box, x, y)) {
            return true;
        }
        if (index.hasCollision(this, Wall, x, y)) {
            return true;
        }
        this.x += x;
        this.y += y;

        return false;
    },
    getHeight: function () {
        //return 34;
        return this.image.height;
    },
    getWidth: function () {
        //return 34;
        return this.image.width;
    },
    getLeft: function () {
        return this.x;
    },
    getTop: function () {
        return this.y;
    },
    getImage: function() {
        return this.image;
    }
});

var Checkpoint = fw.entity(fw.EntityWithSprite, {
    init: function () {
        this.image = checkpoint;
        this.depth = 0;
    }
});

var Gate = fw.entity(fw.EntityWithSprite, {
    init: function () {
        this.image = gate;
        this.depth = 0;
    }
});

var Guy = fw.entity(fw.EntityWithSprite, {
    init: function () {
        this.moving = false;
        this.depth = 1;
        this.dir = 'l';
        this.push = 0;

        this.bulletTimer = 0;

        this.image = guy;
        this.imageRows = 8;
        this.imageColumns = 4;
        this.imageRow = 1;
        this.imageColumn = 0;
        this.imageScaleX = 1;
        this.imageScaleY = 1;
        this.width = 84;
        this.height = 352;
    },

    $frame: function () {
        this.bulletTimer--;
        if (this.bulletTimer <= 0) {
            this.bulletTimer = 0;
        }

        this.moving = false;

        if (pressedKeys[KEYS.LEFT]) {
            this.imageRow = 1 + (this.push * 4);
            this.move(-2, 0);
            this.dir = 'l';
        }
        if (pressedKeys[KEYS.RIGHT]) {
            this.imageRow = 2 + (this.push * 4);
            this.move(2, 0);
            this.dir = 'r';
        }

        if (pressedKeys[KEYS.UP]) {
            this.imageRow = 3 + (this.push * 4);
            this.move(0, -2);
            this.dir = 'u';
        }
        if (pressedKeys[KEYS.DOWN]) {
            this.imageRow = 0 + (this.push * 4);
            this.move(0, 2);
            this.dir = 'd';
        }

        if (!this.moving) {
            this.imageColumn = 0;
            this.imageRow =  this.imageRow % 4;
            this.push = 0;
        }

    },

    move: function (x, y) {
        this.push = 0;
        if (index.hasCollision(this, Wall, x, y)) {
            return;
        }

        if (index.hasCollision(this, Box, x, y)) {
            return;
        }
        if (index.hasCollision(this, Gate, x, y)) {
            enterGate();
            return;
        }

        this.x += x;
        this.y += y;

        this.imageColumn += 0.25;
        if (this.imageColumn >= 4) {
            this.imageColumn = 0;
        }
        this.moving = true;
    },

    $keyDown_32: function () {
        if (this.bulletTimer > 0) {
            return;
        }
        if (bulletsAvailable < 1) {
            playSound('sound/empty.mp3');
            this.bulletTimer = 20;
            return;
        }
        bulletsAvailable -= 1;
        var bullet = new Bullet(this.x , this.y + 10);
        playSound('sound/shoot.mp3');

        this.push = 0;
        this.imageColumn = 2;

        bullet.speedX = 0;
        bullet.speedY = 0;
        switch(this.dir) {
            case 'l': 
                bullet.speedX = -20; 
                bullet.imageColumn = 1;
                break;
            case 'r': 
                bullet.speedX = 20; 
                bullet.imageColumn = 2;
                break;
            case 'u': 
                bullet.speedY = -20; 
                bullet.imageColumn = 3;
                break;
            case 'd': 
                bullet.speedY = 20; 
                bullet.imageColumn = 0;
                break;
        }
        scene.add(bullet);

        this.bulletTimer = 20;
    }

});

var pressedKeys = {};

document.body.addEventListener('keydown', function (event) {
    var key = event.which;
    pressedKeys[key] = true;
});

document.body.addEventListener('keyup', function (event) {
    var key = event.which;
    delete pressedKeys[key];
});


function startGame() {
    document.getElementById('container').style.backgroundColor="#9ff38f";
    document.getElementById('body').style.backgroundColor="#9ff38f";
    document.getElementById('canvas').removeEventListener('click', canvasClickListener, false);
    document.getElementById('canvas').removeEventListener('mousemove', canvasMouseMoveListener, false);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    playSound('sound/start.mp3');
    drawSidebar();
    loadMap();
    endMap_B = false;
    interval = setInterval(frame, 16);
}

function frame() {
    index = fw.createIndex(scene, 128);

    for (var i in pressedKeys) {
        scene.fire('keyDown_' + i);
    }

    scene.fire('frame');

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSidebar();

    scene.fire('draw', ctx);

    if(success()) {
        if(endMap_B === true) {
            return;
        }
        endMap_B = true;
        endMap();
    }
    if(pressedKeys[KEYS.ESC]) {
        playSound('sound/quit.mp3');
        endGame();        
    }
}

function success() {
    return mapBoxes === checkedBoxes;
}

function loadMap() {
    switch(map) {
        case 1: loadFirstMap(); break;
        case 2: loadSecondMap(); break;
        case 3: loadThirdMap(); break;
    }
}

function menu() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(m, 0, 0);
    drawSide();
    setMouseMoveListenerOnCanvas();
    setOnClickListenerOnCanvas();
    document.getElementById('container').style.backgroundColor="black";
    document.getElementById('body').style.backgroundColor="black";
    canvas.style.borderBottomLeftRadius = "450px";
    canvas.style.borderTopLeftRadius = "450px";
    canvas.style.borderBottomRightRadius = "75px";
    canvas.style.borderTopRightRadius = "75px";
}

function setMouseMoveListenerOnCanvas() {
    document.getElementById('canvas').addEventListener('mousemove', canvasMouseMoveListener,false);
}

function setOnClickListenerOnCanvas() {
    document.getElementById('canvas').addEventListener('click', canvasClickListener,false);
}

function setMouseMoveListenerOnCanvasForStory() {
    document.getElementById('canvas').addEventListener('mousemove', canvasMouseMoveListenerForStory,false);
}

function setOnClickListenerOnCanvasForStory() {
    document.getElementById('canvas').addEventListener('click', canvasClickListenerForStory,false);
}

function setMouseMoveListenerOnCanvasForHelp() {
    document.getElementById('canvas').addEventListener('mousemove', canvasMouseMoveListenerForHelp,false);
}

function setOnClickListenerOnCanvasForHelp() {
    document.getElementById('canvas').addEventListener('click', canvasClickListenerForHelp,false);
}

var m2Btn = false;
var m3Btn = false;
var m4Btn = false;

var canvasMouseMoveListener = function (e) {
        var eX = e.layerX;
        var eY = e.layerY;
        if(133 < eX && eX < 355 && 275 < eY && eY < 330) {
            ctx.drawImage(m2, 0, 0);
            if(m2Btn === false) {
                playSound('sound/menuSound.mp3');
                m2Btn = true;
            }
        } else if(133 < eX && eX < 355 && 365 < eY && eY < 425) {
            ctx.drawImage(m3, 0, 0);
            if(m3Btn === false) {
                playSound('sound/menuSound.mp3');
                m3Btn = true;
            }
        } else if(133 < eX && eX < 305 && 465 < eY && eY < 535) {
            ctx.drawImage(m4, 0, 0);
            if(m4Btn === false) {
                playSound('sound/menuSound.mp3');
                m4Btn = true;
            }
        } else {
            m2Btn = false;
            m3Btn = false;
            m4Btn = false;
            ctx.drawImage(m, 0, 0);
        }
    };

var canvasClickListener = function (e) {
        //console.log(e);
        var eX = e.layerX;
        var eY = e.layerY;
        if(133 < eX && eX < 355 && 275 < eY && eY < 330) {
            document.getElementById('canvas').removeEventListener('click', canvasClickListener, false);
            document.getElementById('canvas').removeEventListener('mousemove', canvasMouseMoveListener, false);
            playSound('sound/tick.mp3');
            startGame()
        } 
        else if(133 < eX && eX < 355 && 365 < eY && eY < 425) {
            playSound('sound/tick.mp3');
            loadStoryPage();            

        } else if(113 < eX && eX < 305 && 465 < eY && eY < 535) {
            playSound('sound/tick.mp3');
            loadHelpPage();            

        }
    };


var canvasMouseMoveListenerForStory = function (e) {
        var eX = e.layerX;
        var eY = e.layerY;
        if(30 < eX && eX < 140 && 260 < eY && eY < 340) {
            ctx.drawImage(story2, 0, 0);
        } else {
            ctx.drawImage(story1, 0, 0);
        }
    };

var canvasClickListenerForStory = function (e) {
        var eX = e.layerX;
        var eY = e.layerY;
        if(30 < eX && eX < 140 && 260 < eY && eY < 340) {
            document.getElementById('canvas').removeEventListener('click', canvasClickListenerForStory, false);
            document.getElementById('canvas').removeEventListener('mousemove', canvasMouseMoveListenerForStory, false);
            playSound('sound/tick.mp3');
            menu()
        } 
    };

var canvasMouseMoveListenerForHelp = function (e) {
        var eX = e.layerX;
        var eY = e.layerY;
        if(35 < eX && eX < 140 && 267 < eY && eY < 360) {
            ctx.drawImage(help2, 0, 0);
        } else {
            ctx.drawImage(help1, 0, 0);
        }
    };

var canvasClickListenerForHelp = function (e) {
        var eX = e.layerX;
        var eY = e.layerY;
        if(35 < eX && eX < 140 && 267 < eY && eY < 360) {
            document.getElementById('canvas').removeEventListener('click', canvasClickListenerForHelp, false);
            document.getElementById('canvas').removeEventListener('mousemove', canvasMouseMoveListenerForHelp, false);
            playSound('sound/tick.mp3');
            menu()
        } 
    };


function loadStoryPage() {
    document.getElementById('canvas').removeEventListener('click', canvasClickListener, false);
    document.getElementById('canvas').removeEventListener('mousemove', canvasMouseMoveListener, false);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(story1, 0, 0);
    drawSide();
    setMouseMoveListenerOnCanvasForStory();
    setOnClickListenerOnCanvasForStory();
    document.getElementById('container').style.backgroundColor="black";
    document.getElementById('body').style.backgroundColor="black";
    canvas.style.borderBottomLeftRadius = "450px";
    canvas.style.borderTopLeftRadius = "450px";
    canvas.style.borderBottomRightRadius = "75px";
    canvas.style.borderTopRightRadius = "75px";
}               

function loadHelpPage() {
    document.getElementById('canvas').removeEventListener('click', canvasClickListener, false);
    document.getElementById('canvas').removeEventListener('mousemove', canvasMouseMoveListener, false);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(help1, 0, 0);
    drawSide();
    setMouseMoveListenerOnCanvasForHelp();
    setOnClickListenerOnCanvasForHelp();
    document.getElementById('container').style.backgroundColor="black";
    document.getElementById('body').style.backgroundColor="black";
    canvas.style.borderBottomLeftRadius = "450px";
    canvas.style.borderTopLeftRadius = "450px";
    canvas.style.borderBottomRightRadius = "75px";
    canvas.style.borderTopRightRadius = "75px";
}               

function setCanvasBgImg(fName) {
    canvas.style.background = 'url("' + fName + '")';
    canvas.style.backgroundSize = 'auto';
    canvas.style.backgroundRepeat = 'no-repeat';
}

function endMap() {
    openGate();
}

function openGate() {
    var gX; 
    var gY;
    switch(map) {
        case 1: gX = 640; gY = 320; break;
        case 2: gX = 400; gY = 480; break;
        case 3: gX = 280; gY = 480; break;
    }
    scene.forEach(function(entity){
        if(entity instanceof Wall && entity.getTargetLeft() === gX && entity.getTargetTop() === gY) {
            scene.remove(entity);
        }
    });
    playSound('sound/openGate.mp3');
    scene.add(new Gate(gX, gY));
}

function enterGate() {
    if(map === 3) {
        playSound('sound/victory.mp3');
        endGame();
        return;
    }    
    playSound('sound/mapSuccess.mp3');
    clearInterval(interval);
    setTimeout(function () {
        scene = new fw.Scene();
        map += 1;
        startGame();
    },32)
}

function endGame() {    
    clearInterval(interval);
    setTimeout(function () {
        scene = new fw.Scene();
        menu();
    },32)
}

function drawSidebar() {
    ctx.drawImage(sideBar, 800,0);
    ctx.font = "15px Verdana";
    var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop("1.0", "#111");
    ctx.fillStyle = gradient;
    ctx.fillText(mapBoxes, 971 - (Math.floor(mapBoxes / 10) * 5), 281);
    ctx.fillText(checkedBoxes, 971 - (Math.floor(checkedBoxes / 10) * 5), 311);
    ctx.fillText(bulletsAvailable, 971 - (Math.floor(bulletsAvailable / 10) * 5), 341);
}

function drawSide() {
    ctx.drawImage(side, 800,0);
}

function playSound(fName) {
    var audio = new Audio(fName);
    audio.play();                        
}

var scene = new fw.Scene();

fw.load([guy, wall, box, box2, bullet, explosionImg, checkpoint, sideBar, side, m, m2, m3, m4, gate, story1, story2, help1, help2], function () {
    menu();
});



