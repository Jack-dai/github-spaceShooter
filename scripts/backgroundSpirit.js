

function backgroundSpirit(ctx,imageSrc){
    this.ctx = ctx;
    this.img = new Image();
    this.img.src = imageSrc;
    this.x = 0;
    this.y = 0;
}

backgroundSpirit.prototype.draw = function(){
    this.ctx.drawImage(this.img,this.x,this.y)
}