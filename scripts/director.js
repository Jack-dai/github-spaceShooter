
function director(){
    this.gameStatus = false;
    this.gameCtx=null;//canvas的渲染上下文对象
    this.player=null;//玩家对象
    this.enemies=[];//敌机对象集合
    this.bullets=[];//子弹对象集合
    this.gameback=null;//游戏背景对象
    this.backAudio=null;//背景音乐对象
    this.fireAudio=null;//发射子弹音乐对象
    this.enemyExplodedAudio=null;//敌机爆炸音乐对象
    this.playerExplodedAudio=null;//玩家爆炸音乐对象
    this.animId=null;//刷频ID
    this.score=0;
    this.life=0;
    this.time=0;
    this.startBackground=null;
    this.winBackground=null;
    this.loseBackground=null;
    this.startGame = $('#startGame');
    this.pauseGame = $('#pauseGame');
    this.endGame = $('#endGame');
    this.loadGame = $("#loadGame");
    this.startBackMedia = $("#startMedia");
    this.pauseBackMedia = $("#pauseMedia");
}

director.prototype.start = function(){
    this.startBackground.draw();
};

director.prototype.play=function(){
    this.pause();
    var FPS=60;
    var temp=this;
    temp.backAudio.play();
    temp.animId = setInterval(function(){
        temp.gameLoop();
    },1000/FPS);
};

director.prototype.pause=function(){
   clearInterval(this.animId);
};

director.prototype.gameLoop=function(){
    //1.清屏
    this.gameCtx.clearRect(0,0,600,450);
    //2.画背景
    this.gameback.draw();
    //3.画玩家
    this.player.draw();
    //4.画敌人
    for(var i=0;i<this.enemies.length;i++){
        this.enemies[i].draw();
    }
    //5.画子弹
    for(var i=0;i<this.bullets.length;i++){
        this.bullets[i].draw();
    }
    //6.碰撞检测
    //检测石头与子弹
    for(var i=0;i<this.enemies.length;i++){
        for(var j=0;j<this.bullets.length;j++){
            if(!this.enemies[i].exploded){
                if(checkCollsion(this.enemies[i],this.bullets[j])){
                    this.enemies[i].exploded=true;
                    this.bullets[j].bulletExploded=true;
                    this.enemyExplodedAudio.play();
                    this.score-=100;
                }
            }
        }
    }
    //检测石头与飞机
    for(var n=0; n<this.enemies.length; n++){
        if(!this.enemies[n].exploded && !this.player.playerExploded){
            if(checkCollsion(this.player,this.enemies[n])){
                if(this.life>0){
                    this.life--;
                    this.enemies[n].exploded = true;
                    this.player.playerExploded = true;
                    this.player = new player(this.gameCtx, this.fireAudio, this.bullets,this.player);
                }
            }
        }
    }
    //7.画分数
     this.gameCtx.fillStyle="yellow";
     this.gameCtx.font="20px 宋体";
     this.gameCtx.fillText("Score: "+this.score,450,30);
    //8.画生命
    this.gameCtx.fillText("Life: "+this.life,460,60);
    //8.画时间
    var temp = this;
    temp.gameCtx.fillText("Time: "+ temp.time + " s",460,90);
    //9.画胜利
    if(this.score == 0 && this.time > 0){
        this.pause();
        this.gameStatus = false;
        this.gameCtx.clearRect(0,0,600,450);
        this.winBackground.draw();
    }
    //10.画失败
    if(this.life == 0 || this.time == 0){
        this.pause();
        this.gameCtx.clearRect(0,0,600,450);
        this.loseBackground.draw();
    }
};

//开始游戏
director.prototype.beginGames = function(){
    var temp = this;
    temp.startGame[0].addEventListener('click', function(){
        temp.gameStatus = true;
        temp.play();
        console.log(temp.gameStatus);
    });
};
//暂停游戏
director.prototype.pauseGames = function(){
    var temp = this;
    temp.pauseGame[0].addEventListener('click', function(){
        temp.pause();
        temp.gameStatus = false;
        console.log('暂停游戏');
    });
};
//结束游戏
director.prototype.endGames = function(){
    var temp = this;
    temp.endGame[0].addEventListener('click', function(){
        temp.life = 0;
        temp.gameStatus = false;
        temp.pause();
        temp.gameCtx.clearRect(0,0,600,450);
        temp.loseBackground.draw();
        console.log('结束游戏');
    });
};
// 开始音乐
director.prototype.startMedia = function(){
    var temp = this;
    temp.startBackMedia[0].addEventListener('click', function(){
        temp.backAudio.play();
    });
};
//暂停音乐
director.prototype.pauseMedia = function(){
    var temp = this;
    temp.pauseBackMedia[0].addEventListener('click', function(){
        temp.backAudio.pause();
    });
};
//重新开始
director.prototype.loadGames = function(){
    var temp = this;
    temp.loadGame[0].addEventListener('click', function(){
        document.location.reload();
    });
};
