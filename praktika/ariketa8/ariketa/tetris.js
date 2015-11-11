// ************************************
// *     1. ARIKETA                   *
// ************************************

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
}

Block.BLOCK_SIZE = 30;
Block.OUTLINE_WIDTH = 2;

// ZURE KODEA HEMEN: herentzia patroia erabili (Block Rectangle bat da)

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

    /* 8. Ariketan sartutako atributua */
    this.rotation_dir = 1;

};

Shape.prototype.draw = function() {
	// ZURE KODEA HEMEN: metodo honek pieza osatzen duten blokeak pantailan margotzen ditu
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
/* 8. ARIKETAN sartutako metodoa */

Shape.prototype.can_rotate = function(board) {

	    var dir = this.rotation_dir;
        for (block of this.blocks){
            x = this.center_block.x - dir*this.center_block.y + dir*block.y;
            y = this.center_block.y + dir*this.center_block.x - dir*block.x;
            if (! board.can_move(x, y))
                return false;
        }
        return true;
};

/* 8. ARIKETAN sartutako metodoa */

Shape.prototype.rotate = function() {
   dir = this.rotation_dir;

   for (block of this.blocks) {
     block.erase();
   }

   for (block of this.blocks) {
         x = this.center_block.x - dir*this.center_block.y + dir*block.y;
         y = this.center_block.y + dir*this.center_block.x - dir*block.x;
         block.move(x-block.x, y-block.y)
   }
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

    /* 8. ariketan sartutako atributua */
     this.shift_rotation_dir = true;
     this.center_block = this.blocks[2];

}

// ZURE KODEA HEMEN: I_Shape klaseak Shape klasetik heredatzen du


// =============== J_Shape =============================
function J_Shape(center) {
 // ZURE KODEA HEMEN: J_Shape programatzeko hartu adibide gisa I_Shape klaseko kodea
    
	/* 8. ariketan sartutako atributua */
     this.center_block = this.blocks[1];
	
}
 // ZURE KODEA HEMEN: J_Shape klaseak Shape klasetik heredatzen du

// ============ L Shape ===========================
function L_Shape(center) {
 // ZURE KODEA HEMEN: L_Shape programatzeko hartu adibide gisa I_Shape klaseko kodea

	/* 8. ariketan sartutako atributua */
       this.center_block = this.blocks[1];
 
}
 // ZURE KODEA HEMEN: L_Shape klaseak Shape klasetik heredatzen du


// ============ O Shape ===========================
function O_Shape(center) {
 // ZURE KODEA HEMEN: L_Shape programatzeko hartu adibide gisa I_Shape klaseko kodea
	/* 8. ariketan sartutako atributua */
       this.center_block = this.blocks[0];

}
 // ZURE KODEA HEMEN: O_Shape klaseak Shape klasetik heredatzen du

/* 8. Ariketan sartutako kodea */
// O_Shape piezak ez du biratzen. Shape klasetik heredatu duen can_rotate metodoa gainidatziko dugu
O_Shape.prototype.can_rotate = function(board){
   return false;
};

// ============ S Shape ===========================
function S_Shape(center) {
 // ZURE KODEA HEMEN: S_Shape programatzeko hartu adibide gisa I_Shape klaseko kodea
	/* 8. ariketan sartutako atributua */
       this.shift_rotation_dir = true;
       this.center_block = this.blocks[0];


}
 // ZURE KODEA HEMEN: S_Shape klaseak Shape klasetik heredatzen du

// ============ T Shape ===========================
function T_Shape(center) {
 // ZURE KODEA HEMEN: T_Shape programatzeko hartu adibide gisa I_Shape klaseko kodea
	/* 8. ariketan sartutako atributua */
       this.center_block = this.blocks[1];


}
 // ZURE KODEA HEMEN: T_Shape klaseak Shape klasetik heredatzen du


// ============ Z Shape ===========================
function Z_Shape(center) {
 // ZURE KODEA HEMEN: Z_Shape programatzeko hartu adibide gisa I_Shape klaseko kodea
	/* 8. ariketan sartutako atributua */
       this.shift_rotation_dir = true;
       this.center_block = this.blocks[1];
}

 // ZURE KODEA HEMEN: Z_Shape klaseak Shape klasetik heredatzen du


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
}

 /*****************************
 *	 5. ARIKETA           *
 *****************************/

Board.prototype.can_move = function(x,y){
 // ZURE KODEA HEMEN: 
 // orain arte, metodo honek beti bueltatzen zuen true balioa. Orain 
 // parametro gisa pasatzen zaion posizioa taularen muga barruan geratzen 
 // dela egiaztatzen du eta horren arabera true edo false itzultzen du.

 /* 7. ARIKETA */
 // ZURE KODEA HEMEN: talkak antzemateko kodea. grid hiztegian x,y posizioa badago, false bueltatu. true beste edozein kasutan
 
    return true;
};

Board.prototype.is_row_complete = function(y){
        for (var x=0; x<this.width; x++)
                if (! ("".concat(x,",",y) in this.grid))
                        return false;
        return true;
};

Board.prototype.delete_row = function(y){
   for (var x=0; x<this.width; x++){
           this.grid["".concat(x,",",y)].erase();
           delete this.grid["".concat(x,",",y)];
   }
};

Board.prototype.move_down_rows = function(y_start){
   for (var y=y_start; y>=0; y--){
        for (var x=0; x < this.width; x++){
                if( "".concat(x,",",y) in this.grid){
                      var block = this.grid["".concat(x,',',y)];
                      delete this.grid["".concat(x,',',y)];
                      while (block.can_move(this,0,1)){
                        block.erase();
                        block.move(0,1);
                      }
                      this.grid["".concat(block.x,',',block.y)] = block;
                }
        }
   }
};

Board.prototype.remove_complete_rows = function(){
   for (var y=0; y<=this.height; y++){
        if (this.is_row_complete(y)){
                this.delete_row(y);
                this.move_down_rows(y-1);
        }
   }
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

}

Tetris.prototype.key_pressed = function(e) { 

 var key = e.keyCode ? e.keyCode : e.which;

        // ZURE KODEA HEMEN:

	// key aldagaian erabiltzaileak sakatu duen teklaren ASCII kodea
	// gordeko da. Zein da ezkerrera, eskubira, behera edo biratzeko 
	// dagokion key kodea ?

 /* 8. Ariketan biraketa egiteko kodea sartu. Alegia, gezi-gora sakatzerakoan, uneko pieza biratu */

}

Tetris.prototype.do_move = function(direction) {
	// ZURE KODEA HEMEN: erabiltzaileak Left, Right edo Down (ezkerrera, 
	// eskubira edo behera) tekla sakatu du. Tekla horri dagokion norabidean
	// mugitu behar dugu pieza. Gogorati Tetris.DIRECTION array-ak norabide 
	// bakoitzaren desplazamenduak gordetzen dituela orduan 
	// Tetris.DIRECTION[direction] atzituz gero, (dx, dy) desplazamendua 
	// lortuko duzu. Jarraian aztertu ea uneko pieza desplazamendu horrekin
	// mugitu ahal den. Baiezkoan, pieza mugitu.

	
	/* 6. Ariketan eskatzen den kodea */
	// else if(direction=='Down')
	// ZURE KODEA HEMEN: gehitu uneko pieza grid-era. Sortu pieza berri bat eta taulan margotu.
}

/***** 8. ARIKETA ******/
Tetris.prototype.do_rotate = function(){
	// ZURE KODEA HEMEN: uneko pieza biratu ahal bada, biratu ezazu. Gogoan izan Shape.can_rotate eta Shape.rotate jada programatuta daudela!
}



