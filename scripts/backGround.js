
function backGround(ctx){
    this.img=new Image();
    this.img.src="images/Stars.png";
    this.ctx=ctx;
    this.y=0;
}


backGround.prototype.draw=function(){
   this.ctx.drawImage(this.img,0,this.y);
   this.ctx.drawImage(this.img,0,this.y-450);
   this.y+=5;
   if(this.y>=450){
       this.y=0;
   }
}