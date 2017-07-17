
function player(ctx,fireAudio,bullets,player){
    this.player=player;
    this.img=new Image();
    this.img.src="images/Player.png";
    this.loseImg = new Image();
    this.loseImg.src = "images/SpaceShooter_Lose.png";
    this.playerExplodedImg = new Image();
    this.playerExplodedImg.src = "images/explosionPlayer.png";
    this.fireAudio = fireAudio;
    this.bullets = bullets;
    this.playerExploded = false;
    this.explodedIndex = 0;
    this.ctx = ctx;
    this.x = 250;
    this.y = 350;
}

player.prototype.draw=function(){
    if(!this.playerExploded){
        if(keyStatus.keyup){
            if(this.y>=0){
                this.y-=5;
            }
        }
        if(keyStatus.keydown){
            if(this.y<=350){
                this.y+=5;
            }
        }
        if(keyStatus.keyleft){
            if(this.x>=0){
                this.x-=5;
            }
        }
        if(keyStatus.keyright){
            if(this.x<=500){
                this.x+=5;
            }
        }
        if(keyStatus.keyspace){
//            this.fire();
            var buls = new bullet(this.ctx, this.x-42, this.y+22, this.bullets);
            this.fireAudio.play();
            buls.fire();
        }
        this.ctx.drawImage(this.img,this.x,this.y);
    }
    else{
        this.ctx.drawImage(this.playerExplodedImg,
        42*this.explodedIndex,0,
        42,43,
        this.x,this.y,
        42,43);
        this.explodedIndex++;
        if(this.explodedIndex>5){
            this.player=null;
        }
    }
}

//player.prototype.fire=function(){
//    this.fireAudio.play();
//    var bull=new bullet(this.ctx,this.x,this.y,this.bullets);
//    this.bullets.push(bull);
//    keyStatus.keyspace=false;
//}

player.prototype.getCenter=function(){
    return new point(this.x+this.img.width/2,this.y+this.img.height/2);
}
