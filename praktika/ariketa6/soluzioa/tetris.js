// ============== Point =======================

function Point (x, y) {
    this.x = x;
    this.y = y;    
}

// ============== Rectangle ====================
function Rectangle() {}

Rectangle.prototype.init = function(p1,p2) {
    this.px = p1.x;
    this.py = p1.y;
    this.width = p2.x - p1.x;
    this.height = p2.y - p1.y;
    this.lineWidth= 1;
    this.color = 'black';
}

Rectangle.prototype.draw = function() {
/*   ZURE KODEA HEMEN: margotu pantailan laukizuzen bat, uneko kolorearekin,
     px,py posizioan, uneko zabalera eta altuerarekin, eta lineWidth zabalerako
     ertzarekin. Kontuan izan adibide honetan ctx aldagai globala dela eta
     canvas-en margotzeko testuingurua (context-a) gordetzen duela
      */
    ctx.beginPath();
    ctx.rect(this.px, this.py, this.width, this.height);
    ctx.fillStyle = this.color;
    ctx.fill()
    ctx.lineWidth = this.lineWidth;
    ctx.strokeStyle = 'black';
    ctx.stroke();
}


Rectangle.prototype.setLineWidth = function(width) { this.lineWidth=width}
Rectangle.prototype.setFill = function(color) { this.color = color}

/** 4. ARIKETAN sartutako metodoa */
Rectangle.prototype.move = function(x,y){
    this.px += x;
    this.py += y;
    this.draw();
}

/** 4. ARIKETAN sartutako metodoa */
Rectangle.prototype.erase = function(){
    ctx.beginPath();
    ctx.lineWidth = this.lineWidth+2;
    ctx.strokeStyle = Tetris.BOARD_COLOR;
    ctx.rect(this.px, this.py, this.width, this.height);
    ctx.stroke();
    ctx.fillStyle = Tetris.BOARD_COLOR;
    ctx.fill()

}

// ============== Block ===============================

function Block (pos, color) {
/* ZURE KODEA HEMEN: Block klaseko eraikitzailea da hau. Bi parametro jasotzen ditu, pos eta color. Pos = gelaxkaren posizioa (9,19) adibidez.
  color = blokea margotzeko erabili behar den kolorea. 
   Barnean metodo honek bi puntu sortzen ditu (pixel koordenatuak erabiliz)
   eta Rectangle klaseko init metodoari deitzen dio, bi puntu hauek
   parametro gisa pasatuz.
   Interesgarria izango litzateke Block.BLOCK_SIZE eta Block.OUTLINE_WIDTH
   konstanteak erabiliko bazenitu, blokearen zabalera eta ertz-lerroaren zabalera ezartzeko, hurrenez hurren. */
    this.x = pos.x;
    this.y = pos.y;

    var p1 = new Point(pos.x*Block.BLOCK_SIZE + Block.OUTLINE_WIDTH,
                   pos.y*Block.BLOCK_SIZE + Block.OUTLINE_WIDTH);
    var p2 = new Point(p1.x + Block.BLOCK_SIZE, p1.y + Block.BLOCK_SIZE);

     this.init(p1, p2);
     this.setLineWidth(Block.OUTLINE_WIDTH);
     this.setFill(color);
}

Block.BLOCK_SIZE = 30;
Block.OUTLINE_WIDTH = 2;

// ZURE KODEA HEMEN: herentzia patroia erabili (Block Rectangle bat da)
Block.prototype = new Rectangle();
Block.prototype.constructor = Block;

/** 4. ARIKETAN sartutako metodoa */
Block.prototype.move = function(dx, dy) {
    this.x += dx;
    this.y += dy;

    Rectangle.prototype.move.call(this, dx * Block.BLOCK_SIZE, dy * Block.BLOCK_SIZE);
}

 /**************************************************
 *	 5. ARIKETArako ematen den kodea           *
 **************************************************/
Block.prototype.can_move = function(board, dx, dy) {
    var nx = this.x + dx;
    var ny = this.y + dy;
    return board.can_move(nx, ny);
}


// ************************************
// *      2. ARIKETA                  *
// ************************************

function Shape() {}


Shape.prototype.init = function(coords, color) {
	// ZURE KODEA HEMEN: Pieza baten hasieraketa metodoa
	// Hartzen dituen parametroak:  
	//     coords: pieza osatzen duten blokeen array bat
	//     color: string bat, blokeen kolorea adierazten duena
	// Post-baldintza: koordenatu bakoitzeko, kolore horretako bloke bat sortzen du eta bloke-array batean gordetzen du

    this.blocks =  [];
//    this.rotation_dir = 1;

    var self = this.blocks;
    coords.forEach ( function ( pos ) {
          self.push ( new Block(pos,color));
    });


};

Shape.prototype.draw = function() {
	// ZURE KODEA HEMEN: metodo honek pieza osatzen duten blokeak pantailan margotzen ditu. Gogoan izan Block klaseak baduela draw() funtzio bat...
        this.blocks.forEach ( function (block) {
            block.draw();
        });

};

 /**************************************************
 *	 5. ARIKETArako ematen den kodea           *
 **************************************************/
Shape.prototype.can_move = function(board, dx, dy) {
    for (block of this.blocks)
        if (! block.can_move(board, dx, dy) )
            return false;

    return true;
};

/* 4. ARIKETAN sartutako metodoa */
Shape.prototype.move = function(dx, dy) {
   
    for (block of this.blocks) {
        block.erase();
    }

    for (block of this.blocks) {
        block.move(dx,dy);
    }
};


// ============= I_Shape ================================
function I_Shape(center) {
     var coords = [new Point(center.x - 2, center.y),
               new Point(center.x - 1, center.y),
               new Point(center.x , center.y),
               new Point(center.x + 1, center.y)];
    
     Shape.prototype.init.call(this, coords, "blue");   

}

// ZURE KODEA HEMEN: I_Shape klaseak Shape klasetik heredatzen du

// TU CÓDIGO: I_Shape hereda de Shape
I_Shape.prototype = new Shape();
I_Shape.prototype.constructor = I_Shape;


// =============== J_Shape =============================
function J_Shape(center) {
 // ZURE KODEA HEMEN: J_Shape programatzeko hartu adibide gisa I_Shape klaseko kodea
     var coords = [new Point(center.x - 1, center.y),
                  new Point(center.x    , center.y),
                  new Point(center.x + 1, center.y),
                  new Point(center.x + 1, center.y + 1)];

     Shape.prototype.init.call(this, coords, "orange");

     this.center_block = this.blocks[1];

}
 // ZURE KODEA HEMEN: J_Shape klaseak Shape klasetik heredatzen du
J_Shape.prototype = new Shape();
J_Shape.prototype.constructor = J_Shape;


// ============ L Shape ===========================
function L_Shape(center) {
 // ZURE KODEA HEMEN: L_Shape programatzeko hartu adibide gisa I_Shape klaseko kodea
       var coords = [new Point(center.x - 1, center.y),
                  new Point(center.x    , center.y),
                  new Point(center.x + 1, center.y),
                  new Point(center.x - 1, center.y + 1)];

       Shape.prototype.init.call(this, coords, "cyan");

       this.center_block = this.blocks[1];
}
 // ZURE KODEA HEMEN: L_Shape klaseak Shape klasetik heredatzen du
L_Shape.prototype = new Shape();
L_Shape.prototype.constructor = L_Shape;



// ============ O Shape ===========================
function O_Shape(center) {
 // ZURE KODEA HEMEN: L_Shape programatzeko hartu adibide gisa I_Shape klaseko kodea
       var coords = [new Point(center.x, center.y),
                  new Point(center.x -1    , center.y),
                  new Point(center.x , center.y+1),
                  new Point(center.x - 1, center.y + 1)];

       Shape.prototype.init.call(this, coords, "red");

       this.center_block = this.blocks[0];

}
 // ZURE KODEA HEMEN: O_Shape klaseak Shape klasetik heredatzen du
O_Shape.prototype = new Shape();
O_Shape.prototype.constructor = O_Shape;

        
// ============ S Shape ===========================
function S_Shape(center) {
 // ZURE KODEA HEMEN: S_Shape programatzeko hartu adibide gisa I_Shape klaseko kodea
   var coords = [new Point(center.x,     center.y),
                  new Point(center.x,     center.y + 1),
                  new Point(center.x + 1, center.y),
                  new Point(center.x - 1, center.y + 1)];

       Shape.prototype.init.call(this, coords, 'green');
       this.shift_rotation_dir = true;
       this.center_block = this.blocks[0];

}
 // ZURE KODEA HEMEN: S_Shape klaseak Shape klasetik heredatzen du
S_Shape.prototype = new Shape();
S_Shape.prototype.constructor = S_Shape;


// ============ T Shape ===========================
function T_Shape(center) {
 // ZURE KODEA HEMEN: T_Shape programatzeko hartu adibide gisa I_Shape klaseko kodea
   var coords = [new Point(center.x-1,     center.y),
                  new Point(center.x,     center.y),
                  new Point(center.x + 1, center.y),
                  new Point(center.x, center.y + 1)];

       Shape.prototype.init.call(this, coords, 'yellow');
       this.center_block = this.blocks[1];

}
 // ZURE KODEA HEMEN: T_Shape klaseak Shape klasetik heredatzen du
T_Shape.prototype = new Shape();
T_Shape.prototype.constructor = T_Shape;


// ============ Z Shape ===========================
function Z_Shape(center) {
 // ZURE KODEA HEMEN: Z_Shape programatzeko hartu adibide gisa I_Shape klaseko kodea
   var coords = [new Point(center.x-1,     center.y),
                  new Point(center.x,     center.y),
                  new Point(center.x, center.y+1),
                  new Point(center.x+1, center.y + 1)];

       Shape.prototype.init.call(this, coords, 'magenta');
       this.shift_rotation_dir = true;
       this.center_block = this.blocks[1];
}

 // ZURE KODEA HEMEN: Z_Shape klaseak Shape klasetik heredatzen du

Z_Shape.prototype = new Shape();
Z_Shape.prototype.constructor = Z_Shape;


// ************************************
// *     3. ARIKETA                   *
// ************************************

// ====================== BOARD ================

function Board(width, height) {
    this.width = width;
    this.height = height;
    this.grid = {}; /* 6. Ariketan sartutako datu-egitura */
}


// Pieza berria taulan sartu ahal bada, margotu eta true itzuli
// Bestela, false itzuli
Board.prototype.draw_shape = function(shape){
    if (shape.can_move(this,0,0)){
        shape.draw();
        return true;
    }
    return false;
}

 /*****************************
 *	 6. ARIKETA           *
 *****************************/
Board.prototype.add_shape = function(shape){
// ZURE KODEA HEMEN: parametro gisa jaso dugun piezaren bloke guztiak grid datu-egituran sartu
   var blocks = shape.blocks;
   for (block of blocks)
       this.grid["".concat(block.x,',',block.y)] = block;
}

 /*****************************
 *	 5. ARIKETA           *
 *****************************/

Board.prototype.can_move = function(x,y){
 // ZURE KODEA HEMEN: 
 // orain arte, metodo honek beti bueltatzen zuen true balioa. Orain 
 // parametro gisa pasatzen zaion posizioa taularen muga barruan geratzen 
 // dela egiaztatzen du eta horren arabera true edo false itzultzen du.
    if (!(0<=x && x < this.width && 0<=y && y<this.height))
        return false;
    return true;
};


// ==================== Tetris ==========================

function Tetris() {
    this.board = new Board(Tetris.BOARD_WIDTH, Tetris.BOARD_HEIGHT);
}

Tetris.SHAPES = [I_Shape, J_Shape, L_Shape, O_Shape, S_Shape, T_Shape, Z_Shape];
Tetris.DIRECTION = {'Left':[-1, 0], 'Right':[1, 0], 'Down':[0, 1]};
Tetris.BOARD_WIDTH = 10;
Tetris.BOARD_HEIGHT = 20;
Tetris.BOARD_COLOR='white';

Tetris.prototype.create_new_shape = function(){
	// ZURE KODEA HEMEN: 
	// Tetris.SHAPES array-tik pieza izen bat ausaz aukearatu
	// Pieza mota horren instantzia bat sortu (x = taularen erdia, y = 0)
	// Itzuli pieza berri horren erreferentzia
    var ns = Tetris.SHAPES[Math.floor(Math.random()*Tetris.SHAPES.length)];
    var p = new Point (Math.floor (Tetris.BOARD_WIDTH/2), 0);
    var new_shape = new ns(p);
    return new_shape; // allow chaining
}

Tetris.prototype.init = function(){

    /**************
       4. ARIKETA
    ***************/

	// teklatu kudeatzailea
	document.addEventListener('keydown', this.key_pressed.bind(this), false);

    // Ausaz aukeratu pieza bat --> uneko pieza 
    this.current_shape = this.create_new_shape()

    // ZURE KODEA HEMEN:
    // Taulan uneko pieza margotu
    // Argibidea: (Board badu margotzeko metodo bat)
    this.board.draw_shape(this.current_shape);

}

Tetris.prototype.key_pressed = function(e) { 

 var key = e.keyCode ? e.keyCode : e.which;

        // ZURE KODEA HEMEN:

	// key aldagaian erabiltzaileak sakatu duen teklaren ASCII kodea
	// gordeko da. Zein da ezkerrera, eskubira, behera (do_move) edo biratzeko (do_rotate)
	// dagokion key kodea ? (biraketari dagokion kodea ez inplementatu oraindik)

    if (key == 37) {
           this.do_move("Left");
    }else if (key == 39){
           this.do_move("Right");
    }else if (key == 40){
        this.do_move("Down");
    }else if (key == 38){
	// this.do_rotate();
    }
}

Tetris.prototype.do_move = function(direction) {
	// ZURE KODEA HEMEN: erabiltzaileak Left, Right edo Down (ezkerrera, eskubira edo behera) tekla sakatu du. Tekla horri dagokion norabidean
	// mugitu behar dugu pieza. Gogorati Tetris.DIRECTION array-ak norabide bakoitzaren desplazamenduak gordetzen dituela
	// orduan Tetris.DIRECTION[direction] atzituz gero, (dx, dy) desplazamendua lortuko duzu. Jarraian aztertu ea uneko pieza desplazamendu horrekin
	// mugitu ahal den. Baiezkoan, pieza mugitu.
    var dx = Tetris.DIRECTION[direction][0];
    var dy = Tetris.DIRECTION[direction][1];
    if (this.current_shape.can_move(this.board, dx, dy)) {
       // this.clearBoard();
        this.current_shape.move(dx,dy);
    } /* 6. Ariketan eskatzen den kodea */
	else if(direction=='Down'){
	    // ZURE KODEA HEMEN: gehitu uneko pieza grid-era. Sortu pieza berri bat eta taulan margotu.
            this.board.add_shape(this.current_shape);
            this.current_shape = this.create_new_shape();
            this.board.draw_shape(this.current_shape);
   }
}
