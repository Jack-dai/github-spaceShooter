
function enemy(ctx,explodedAudio,enems){
    this.ctx=ctx;
    this.img=new Image();
    this.img.src="images/Rock.png";
//    this.img.src="images/dj10.png";
//    this.x=200;
//    this.y=100;
    this.w=66;
    this.h=70;
    this.x = randomBetween(0, 534);
    this.y = -70;
    this.exploded=false;
    this.explodedIndex=0;
    this.explodedImg=new Image();
    this.explodedImg.src="images/explosionEnemy.png";
    this.explodedAudio=explodedAudio;
    this.enems=enems;
    this.index=0;
}
enemy.prototype.draw=function(){
   if(!this.exploded){

           this.rotateEnemy();

           if(this.y > 450){
               this.enems.remove(this);
           }
   }
   else{
       this.explodedAudio.play();
       this.ctx.drawImage(this.explodedImg,
               44*this.explodedIndex,0,44,49,
               this.x,this.y,
               44,49);
       this.explodedIndex++;
       if(this.explodedIndex>=7){
           this.enems.remove(this);
       }
   }
   this.y+=1;
}

enemy.prototype.getCenter=function(){
    return new point(this.x+this.img.width/2,this.y+this.img.height/2);
}

function randomBetween(min, max){
    var range = max - min;
    var rand = Math.random();
    var num = min + Math.round(range*rand);
    return num;
}

enemy.prototype.rotateEnemy = function(){
    this.ctx.save();
    this.ctx.translate(this.x+this.w/2, this.y+this.h/2);
//    console.log((this.x+this.w/2)+":"+(this.y+this.h/2));
    this.ctx.rotate(this.index*3*Math.PI/180);
    this.ctx.drawImage(this.img, -this.w/2, -this.h/2);
    if(this.index > 120){
        this.index = 0;
    }else{
        this.index++;
    }
//    console.log("index="+this.index);
    this.ctx.restore();
}
