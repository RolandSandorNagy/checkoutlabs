function loadFirstMap() {
    setCanvasBgImg('img/bgfloor.png');
    bulletsAvailable = 3;
    mapBoxes = 12;
    checkedBoxes = 0;
    scene.add(
            new Wall(40,200),  new Wall(40,240), new Wall(40,280), 
            new Wall(40,320),  new Wall(40,360),  

            new Wall(80,200),  new Wall(80,360), 
            new Wall(120,200), new Wall(120,360),
            new Wall(160,200), new Wall(160,360), 
            new Wall(200,200), new Wall(200,360),
            new Wall(240,200), new Wall(240,360), 
            new Wall(280,200), new Wall(280,360),

            new Wall(320,200), new Wall(320,240), 
            new Wall(320,320), new Wall(320,360),

            new Wall(360,40),  new Wall(360,80), 
            new Wall(360,120), new Wall(360,160),
            new Wall(360,200), new Wall(360,240), 
            new Wall(360,320), new Wall(360,360),
            new Wall(360,400), new Wall(360,440), 

            new Wall(400,40),  new Wall(400,440), 
            new Wall(440,40),  new Wall(440,120),
            new Wall(440,200), new Wall(440,440), 
            new Wall(440,480), new Wall(440,520),
            new Wall(480,40),  new Wall(480,200),
            new Wall(480,520), 

            new Wall(520,40),  new Wall(520,80),
            new Wall(520,120), new Wall(520,200), 
            new Wall(520,440), new Wall(520,520),

            new Wall(560,80),  new Wall(560,120), 
            new Wall(560,440), new Wall(560,520),

            new Wall(600,80),  new Wall(600,240),
            new Wall(600,280), new Wall(600,360), 
            new Wall(600,520),

            new Wall(640,80),  new Wall(640,240),
            new Wall(640,280), new Wall(640,320),
            new Wall(640,360), new Wall(640,400), 
            new Wall(640,440), new Wall(640,480), 
            new Wall(640,520),

            new Wall(680,80),  new Wall(680,120), 
            new Wall(680,160), new Wall(680,200), 
            new Wall(680,240),
            
            new Checkpoint(80,240),  new Checkpoint(80,280),
            new Checkpoint(80,320),  new Checkpoint(120,240),
            new Checkpoint(120,280), new Checkpoint(120,320),
            new Checkpoint(160,240), new Checkpoint(160,280),
            new Checkpoint(160,320), new Checkpoint(200,240),
            new Checkpoint(200,280), new Checkpoint(200,320),

            new Guy(610, 325),

            new Box(480,120),   new Box(600,160),
            new Box(400,280),   new Box(400,320),

            new Box(440,240),   new Box(440,400),
            new Box(480,280),   new Box(480,360),

            new Box(520,280),   new Box(520,320),
            new Box(520,400),   new Box(560,240)

            );

}

function loadSecondMap() {       
    setCanvasBgImg('img/bgfloor.png');
    bulletsAvailable += 2;
    mapBoxes = 11;
    checkedBoxes = 0;
    scene.add(
            new Wall(80,200),  new Wall(80,240), 
            new Wall(80,280), new Wall(80,320), 
            new Wall(80,360),  new Wall(80,400), 
            new Wall(80,440), new Wall(80,480), 

            new Wall(120,120), new Wall(120,160), 
            new Wall(120,200),  new Wall(120,360), 
            new Wall(120,480),  

            new Wall(160,120), new Wall(160,480), 

            new Wall(200,120), new Wall(200,240), 
            new Wall(200,280), new Wall(200,320), 
            new Wall(200,360), new Wall(200,480), 

            new Wall(240,80), new Wall(240,120), 
            new Wall(240,160), new Wall(240,240), 
            new Wall(240,440), new Wall(240,480), 

            new Wall(280,80), new Wall(280,240), 
            new Wall(280,360), new Wall(280,440), 

            new Wall(320,80), new Wall(320,160), 
            new Wall(320,240),  new Wall(320,360), 
            new Wall(320,440),  

            new Wall(360,80), new Wall(360,360), 
            new Wall(360,440),  new Wall(360,480), 

            new Wall(400,80), new Wall(400,240), 
            new Wall(400,360),  new Wall(400,480), 

            new Wall(440,80), new Wall(440,120), 
            new Wall(440,160), new Wall(440,240), 
            new Wall(440,280),  new Wall(440,360), 
            new Wall(440,480),  

            new Wall(480,160),  new Wall(480,240), 
            new Wall(480,480),  

            new Wall(520,160), new Wall(520,240), 
            new Wall(520,360),  new Wall(520,440), 
            new Wall(520,480),  

            new Wall(560,120), new Wall(560,160), 
            new Wall(560,240), new Wall(560,280), 
            new Wall(560,320),  new Wall(560,360), 
            new Wall(560,480),  

            new Wall(600,120),  new Wall(600,480), 

            new Wall(640,120), new Wall(640,280), 
            new Wall(640,320),  new Wall(640,360), 
            new Wall(640,480),  

            new Wall(680,120), new Wall(680,160), 
            new Wall(680,200), new Wall(680,240), 
            new Wall(680,280), new Wall(680,360), 
            new Wall(680,400),  new Wall(680,440), 
            new Wall(680,480),  

            new Checkpoint(240,280), new Checkpoint(240,320),
            new Checkpoint(280,280), new Checkpoint(280,320),
            new Checkpoint(320,280), new Checkpoint(360,320),
            new Checkpoint(320,320), new Checkpoint(360,280),
            new Checkpoint(400,320), new Checkpoint(480,320),
            new Checkpoint(520,320),

            new Guy(410,445), 

            new Box(160,280),   new Box(360,280),
            new Box(160,400),   new Box(480,200),
            new Box(280,160),   new Box(480,360),
            new Box(320,200),   new Box(600,360),
            new Box(320,320),   new Box(600,400),
            new Box(360,160)

            );

}

function loadThirdMap() {       
    setCanvasBgImg('img/bgfloor.png');
    bulletsAvailable += 1;
    mapBoxes = 17;
    checkedBoxes = 0;
    scene.add(
            new Wall(80,40),  new Wall(80,80), 
            new Wall(80,120),  new Wall(80,160), 
            new Wall(80,200),  new Wall(80,240), 
            new Wall(80,280),  new Wall(80,320), 
            new Wall(80,360),  new Wall(80,400), 
            new Wall(80,440),  new Wall(80,480), 
            new Wall(80,520),  new Wall(80,560), 
            new Wall(120,40),  new Wall(120,200), 
            new Wall(120,240),  new Wall(120,560), 
            new Wall(160,40),  new Wall(160,240), 
            new Wall(160,280),  new Wall(160,520), 
            new Wall(160,560),  
            new Wall(200,40),  new Wall(200,280), 
            new Wall(200,320),  new Wall(200,480), 
            new Wall(200,520),  
            new Wall(240,40),  new Wall(240,80), 
            new Wall(240,120),  new Wall(240,320), 
            new Wall(240,360),  new Wall(240,440), 
            new Wall(240,480),  
            new Wall(280,120),  new Wall(280,160), 
            new Wall(280,480),  
            new Wall(320,40),  new Wall(320,80), 
            new Wall(320,120),  new Wall(320,160), 
            new Wall(320,200),  new Wall(320,320), 
            new Wall(320,360),  new Wall(320,480), 
            new Wall(360,40),  new Wall(360,200), 
            new Wall(360,240),  new Wall(360,480), 
            new Wall(400,40),  new Wall(400,240), 
            new Wall(400,280),  new Wall(400,320), 
            new Wall(400,480),  new Wall(400,520), 
            new Wall(440,40),  new Wall(440,80), 
            new Wall(440,320),  new Wall(440,520), 
            new Wall(480,80),  new Wall(480,320), 
            new Wall(480,520),  
            new Wall(520,80),  new Wall(520,480), 
            new Wall(520,520),  
            new Wall(560,80),  new Wall(560,120), 
            new Wall(560,160),  new Wall(560,320), 
            new Wall(560,480),  
            new Wall(600,160),  new Wall(600,320), 
            new Wall(600,440),  new Wall(600,480), 
            new Wall(640,200),  new Wall(640,240), 
            new Wall(640,280),  new Wall(640,320), 
            new Wall(640,160),  new Wall(640,440), 

            new Wall(680,320),  new Wall(680,360), 
            new Wall(680,400),  new Wall(680,440), 

            new Checkpoint(120,80), new Checkpoint(120,120),
            new Checkpoint(120,160), 
            new Checkpoint(160,80), new Checkpoint(160,120),
            new Checkpoint(160,160), new Checkpoint(160,200),
            new Checkpoint(200,80), new Checkpoint(200,120),
            new Checkpoint(200,160), new Checkpoint(200,200),
            new Checkpoint(200,240), 
            new Checkpoint(240,160), new Checkpoint(240,200),
            new Checkpoint(240,240), 
            new Checkpoint(280,200), new Checkpoint(280,240),

            new Guy(290,405), 

            new Box(160,360),   new Box(200,400),
            new Box(320,440),
            new Box(360,360),   new Box(360,400),
            new Box(400,160),   new Box(400,440),
            new Box(440,120),   new Box(440,440),
            new Box(480,240),   new Box(480,360),
            new Box(520,160),   new Box(520,200),
            new Box(520,280),   new Box(520,440),
            new Box(560,240),   new Box(560,400)

            );

}
