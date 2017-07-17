
$(function(){
    var dir = new director();
    dir.gameCtx = $("#mycanvas")[0].getContext("2d");
    dir.gameback = new backGround(dir.gameCtx);

    dir.backAudio = $("#backAudio")[0];
    dir.fireAudio = $("#fireAudio")[0];
    dir.enemyExplodedAudio=$("#enemyExplodeAudio")[0];

    dir.startBackgroundImgSrc = "images/Start.png";
    dir.winBackgroundImgSrc = "images/SpaceShooter_Win.png";
    dir.loseBackgroundImgSrc = "images/SpaceShooter_Lose.png";

    dir.startBackground = new backgroundSpirit(dir.gameCtx, dir.startBackgroundImgSrc);
    dir.winBackground = new backgroundSpirit(dir.gameCtx, dir.winBackgroundImgSrc);
    dir.loseBackground = new backgroundSpirit(dir.gameCtx, dir.loseBackgroundImgSrc);
    //设置玩家
    dir.player = new player(dir.gameCtx, dir.fireAudio, dir.bullets, dir.player);
//  设置分数、生命值、时间
    $('#submit').click(function(){
        $('#gameDataSet').css('display','none');
        var $gameTime = $("input[name='gameTime']:checked").val();
        var $gameLife = $("input[name='gameLife']:checked").val();
        var $gameScore = $("input[name='gameScore']:checked").val();
        dir.score = $gameScore;
        dir.life = $gameLife;
        dir.time = $gameTime;
        dir.start();
        //开始游戏
        dir.beginGames();
        //暂停游戏
        dir.pauseGames();
        //结束游戏
        dir.endGames();
        //开始音乐
        dir.startMedia();
        //暂停音乐
        dir.pauseMedia();
        //重新开始游戏
        dir.loadGames();
        //生成石头
        var makeEnemy;
        makeEnemy = setInterval(function(){
            console.log("石头数:"+dir.enemies.length);
            var enem = new enemy(dir.gameCtx,dir.enemyExplodedAudio,dir.enemies);
            if(dir.gameStatus && dir.life > 0 && dir.score > 0){
                dir.enemies.push(enem);
                console.log('装石头:'+'游戏状态：'+dir.gameStatus+'游戏生命值：'+dir.life);
            }else{
                console.log('不装石头'+'游戏状态：'+dir.gameStatus+'游戏生命值：'+dir.life);
            }
            if(dir.score == 0 || dir.life == 0 || dir.time == 0){
            clearInterval(makeEnemy);
                console.log('clearInterval(makeEnemy)');
            }
        },800);

        var makeTime = setInterval(function(){
            if(dir.gameStatus && dir.life != 0 && dir.time > 0 && dir.score > 0){
                dir.time--;
            }
            console.log('gameTime:'+dir.time);
            if(dir.score == 0 || dir.life == 0 || dir.time == 0){
            clearInterval(makeTime);
            }
        },1000);
    });

	$(document).keydown(function(e) {
		switch(e.which) {
			case keyCode.up:
				keyStatus.keyup = true;
				break;
			case keyCode.down:
				keyStatus.keydown = true;
				break;
			case keyCode.left:
				keyStatus.keyleft = true;
				break;
			case keyCode.right:
				keyStatus.keyright = true;
				break;
			case keyCode.space:
				keyStatus.keyspace = true;
				break;
		}
	}).keyup(function(e) {
		switch(e.which) {
			case keyCode.up:
				keyStatus.keyup = false;
				break;
			case keyCode.down:
				keyStatus.keydown = false;
				break;
			case keyCode.left:
				keyStatus.keyleft = false;
				break;
			case keyCode.right:
				keyStatus.keyright = false;
				break;
			case keyCode.space:
				keyStatus.keyspace = false;
				break;
		}
	});
});
