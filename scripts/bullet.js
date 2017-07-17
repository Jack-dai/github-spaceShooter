function bullet(ctx,x,y,buls){
   this.ctx=ctx;
   this.img=new Image();
   this.img.src="images/projectile.png";
   this.x=x+42;
   this.y=y-22;
   this.buls=buls;
   this.bulletExploded=false;
}

bullet.prototype.draw=function(){
   if(!this.bulletExploded){
       this.ctx.drawImage(this.img,this.x,this.y);
       this.y-=4;
       if(this.y<-10){
           this.buls.remove(this);
       }
   }
   else{
       this.buls.remove(this);
   }
};

bullet.prototype.fire=function(){
    var bull=new bullet(this.ctx,this.x,this.y,this.buls);
    this.buls.push(bull);
    keyStatus.keyspace=false;
};

bullet.prototype.getCenter=function(){
    return new point(this.x+this.img.width/2,this.y+this.img.height/2);
};