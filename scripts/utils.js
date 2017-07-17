
Array.prototype.remove=function(obj){
    for(var i=0;i<this.length;i++){
        if(this[i]==obj){
            this.splice(i,1);
        }
    }
    obj=null;
    return this;
}

function point(x,y){
    this.x=x;
    this.y=y;
}

function checkCollsion(obj1,obj2){
   if(obj1&&obj2&&obj1.getCenter&&obj2.getCenter){
       var cen1=obj1.getCenter();
       var cen2=obj2.getCenter();
       if(Math.abs(cen1.x-cen2.x)<(obj1.img.width+obj2.img.width)/2&&
          Math.abs(cen1.y-cen2.y)<(obj1.img.height+obj2.img.height)/2){
           return true;
       }
       return false;
   }
    return false;
}