function accordion(id,option) {
    //获取节点信息
    var p = document.getElementById(id);
    //默认配置信息
    var default_option = {
        active_width:380,
        active_height:350,
        small_width:100,
        small_height:40,
        time:300  //设置默认时间间隔
    }

    //合并目标对象，后面的会覆盖掉前面的。
    // {}目标对象，就是合并之后的大的对象
    var a_option = Object.assign({},default_option,user_option);

    //判断用户传入数据与节点信息数据是否一致，不一致提醒用户传参有误
   if(a_option.col *a_option.row != p.children.length)
       //throw抛出错误信息，提醒用户
       throw "option.col*option.row !="+p.children.length;
//动画效果判断
    var time1 = new Date().getTime();//获得函数执行时的时间戳，此时鼠标还未移入
    var timer = null;//计时器

//设置父元素宽度
    p.style.width = a_option.active_width + a_option.small_width*(a_option.col-1)+"px";
   //图片切换函数
   function active_pic(index) {
       clearTimeout(timer);
       var time2 = new Date().getTime();//获得鼠标移入时间
       if (time2-time1<a_option.time){
           timer = setTimeout(function () {
               active_pic(index);
           },a_option.time);
           return false;
       }
       time1 = time2;
       var cx = index % a_option.col;//x轴坐标 前面的
       var cy = Math.floor(index / a_option.col);//y轴坐标 后面的
      // console.log(cx,cy);
       //x为行 前面的
       for (var x = 0;x<a_option.col;x++){
           //y为列 后面的
           for (var y = 0;y<a_option.row;y++){
               //console.log(x,y);
             var cindex = x + y*a_option.col;
                //console.log(cindex);
               //console.log(p.children[cindex]);
               var item = p.children[cindex];
                 if (cx == x && cy ==y){ //current y = cy
                     item.className ="active";
                  item.style.width =a_option.active_width + "px";
                  item.style.height =a_option.active_height + "px";
               }else if(cx == x){
                     //同列  宽度变为一样
                     item.className ="";
                     item.style.width = a_option.active_width + "px";
                     item.style.height =a_option.small_height + "px";
               }else  if(cy == y){
                     //同行 高度要变为一样
                     item.className = "";
                     item.style.width =a_option.small_width + "px";
                   item.style.height =a_option.active_height + "px";
               }else {
                     item.className="";
                     item.style.width =a_option.small_width + "px";
                   item.style.height =a_option.small_height + "px";
               }
           }
       }

   }
    active_pic(0);
   //鼠标移入
   for (var i = 0;i<p.children.length;i++){
       //动画效果
       p.children[i].style.transform ="all "+ a_option.time/1000+"s";
       //p.children[i]对象下面加个属性
       /*var obj{};
       obj.index=1;
       */
       p.children[i].index = i;
       p.children[i].onmouseenter = function () {
           active_pic(this.index);
           console.log(this.index);
       }
   }


}


