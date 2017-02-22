//getElementById封装
function $(id){
	return typeof id === "string"?document.getElementById(id):id;
}
//利用cookie控制广告通知条
function advBanner(){
	//设置cookie
	function setCookie(name, value, expires) {
		  var exdate=new Date();
		  exdate.setDate(exdate.getDate()+expires);
		  document.cookie=name+ "=" +escape(value)+
		  ((expires==null) ? "" : ";expires="+exdate.toGMTString());
	}
	//获取cookie
	function getCookie(name) {
	  if (document.cookie.length>0){
	      startName=document.cookie.indexOf(name + "=");
	      if (startName!=-1){
	         startName = startName + name.length+1;
	         endName=document.cookie.indexOf(";",startName);
	         if (endName == -1) endName = document.cookie.length;
	         return unescape(document.cookie.substring(startName,endName));
	      }
	    }
	  return "";
	}
    //页面加载时检测cookie
	if(getCookie("topAd")==="true"){
		$("adv").style.display = "none";
	}else{
		$("adv").style.display = "block";
	}
	//关闭广告
	$("close").onclick=function(){
		$("adv").style.display="none";
		setCookie("topAd","true","365");
	};
}

function autoplay(){
	var ad=$('ad');
	var imgs=$('list').getElementsByTagName('img');
	var btns=$('btns').getElementsByTagName('span');
	var prev=$('prev');
	var next=$('next');
	var n=1;
	//想要显示的图片序号
	//3.修改代码：将第一步和第二步中代码相似的部分合并写为一个函数show()
	//功能：取消当前图片和按钮，显示目标图片和按钮
	function show(q){
		for(k=0;k<btns.length;k++){
			if(btns[k].className=="on"){
				fadeOut(imgs[k]);
				btns[k].className="";
				imgs[k].className="";
				break;  //找到了目标后就跳出循环
			}
		}
		imgs[q].className="selected";
		fadeIn(imgs[q]);
		btns[q].className="on";
	}
	//2.自动轮播函数：nextPic用于找到选中按钮和图片，将其下一张添加选中的相应类名
	//2.自动轮播计时器：setInterval
	function nextPic(){
		if(n==btns.length){
			n=0;
		}
		show(n);
		n++;
	}
	//5.给向左箭头写一个函数prevPic，用于显示上一张图片
	//初始n=1，表示自动播放目标显示的是imgs[1]，但点击向左箭头则应该显示最后一张，即imgs[4]
	//所以当n==1时，应设置n=4，但这样的话n的最小值就是1，则一直点击上一张按钮时，无法显示imgs[0]和imgs[1]
	//所以设置n==1时，n=btn.length+1;show(n-2);n--
	function prevPic(){
		if(n==1){
			n=btns.length+1;
		}
		show(n-2);
		n--;
	}
	var m=setInterval(nextPic, 5000);
	//4.将图片和左右箭头鼠标悬停时清除计时器，写成函数pause
	//4.将图片和左右箭头鼠标离开时重启计数器，写成函数restart
	function pause(){
		clearInterval(m);
	}
	function restart(){
		m=setInterval(nextPic,5000);
	}
	//1.手动轮播：把选中按钮和图片添加相应类名，把原来选中的按钮和图片取消相应类名
	for(i=0;i<btns.length;i++){
		btns[i].index=i;//给每个按钮添加一个序号
		btns[i].onmouseover=function(){
			clearInterval(m);
			if(this.className=="on"){return;}//选中当前已选中的，则不操作
			show(this.index);
		}
		btns[i].onmouseout=function(){
			n=this.index+1;
			m=setInterval(nextPic, 5000);
		}
		imgs[i].onmouseover=pause;
		imgs[i].onmouseout=restart;
	}
	//6.左右箭头
	next.onmouseover=pause;
	next.onmouseout=restart;
	next.onclick=nextPic;
	prev.onmouseover=pause;
	prev.onmouseout=restart;
	prev.onclick=prevPic;
	//透明度渐变
	function setOpacity(elem,level){
		if(elem.filters){ //IE9及以下有这个属性
			elem.style.filter="alpha(opacity="+level+")";
		}else{
			elem.style.opacity=level/100;
		}
	}
	function fadeIn(elem){
		setOpacity(elem,0); //初始透明
		for(var i=0;i<=20;i++){
			(function(){
				var level=i*5;
				setTimeout(function(){
					setOpacity(elem,level)
				}, i*30);
			})(i);  //传入参数i，函数立即执行
		}
	}
	function fadeOut(elem){
		for(var i=0;i<=20;i++){
			(function(){
				var level=100-i*5;
				setTimeout(function(){
					setOpacity(elem,level)
				}, i*30);
			})(i);
		}
	}
}

window.onload = function(){
	advBanner();
	autoplay();
}