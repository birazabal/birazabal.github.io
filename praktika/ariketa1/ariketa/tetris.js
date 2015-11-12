// ============== Point =======================

function Point(x, y) {
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
      ctx.rect(this.px,this.py, this.width, this.height);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.lineWidth = this.lineWidth;
      ctx.strokeStyle = this.color;
      ctx.stroke();
}


Rectangle.prototype.setLineWidth = function(width) { this.lineWidth=width}
Rectangle.prototype.setFill = function(color) { this.color = color}

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

    var p1 = new Point(this.x*Block.BLOCK_SIZE + Block.OUTLINE_WIDTH,
                   this.y*Block.BLOCK_SIZE + Block.OUTLINE_WIDTH);
    
    //bigarren puntua lehenaren arabera, noxki ;) [akatsa nuen]
    
    var p2 = new Point(p1.x + Block.BLOCK_SIZE, p1.y + Block.BLOCK_SIZE);

     this.init(p1, p2);
     this.setLineWidth(Block.OUTLINE_WIDTH);
     this.setFill(color);
}

Block.BLOCK_SIZE = 30;
Block.OUTLINE_WIDTH = 2;

// ZURE KODEA HEMEN: herentzia patroia erabili (Block Rectangle bat da)

Block.prototype = new Rectangle();
// 
Block.prototype.constructor = Block;

// TETROMINOAK HASIERA


Function Shape = 
    
function I_Shape(center){

    var coords= [new Point(center.x - 2,center.y), new Point(center.x,center.y), new Point(center.x+1,center.y)];
    Shape.prototype.init.call(this,coords,"blue");
        
}