//getElementById封装
function $(id){
	return typeof id === "string"?document.getElementById(id):id;
}
//广告通知条
function advBanner(){
	//设置cookie
	function setCookie(name, value, expires) {
		  var timer=new Date();
		  timer.setDate(timer.getDate()+expires);
		  document.cookie=name+ "=" +escape(value)+
		  ((expires==null) ? "" : ";expires="+timer.toGMTString());
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
//轮播图
function autoplay(){
	var oAd=$('ad');
	var aControl=oAd.getElementsByClassName('arrow');
	var oList=$('list');
	var aImgs=oList.getElementsByTagName('img');
	var oBtn=$('btns');
	var aBtns=oBtn.getElementsByTagName('span');

	var index=0;
	var timer=null;

	function showPic(q){
		for (var i = 0; i < aBtns.length; i++) {
			aBtns[i].className='';
			aImgs[i].className='';
		};
		aImgs[q].className='list-selected';
		fadeIn(aImgs[q]);
		aBtns[q].className='btns-selected';
	}
	function autoShow(){
		showPic(index);
		index++;
		index%=aBtns.length;
	}
	timer=setInterval(autoShow,5000);

	function pause(){
		clearInterval(timer);
	}
	function restart(){
		clearInterval(timer);
		timer=setInterval(autoShow,5000);
	}
	for (var i = 0; i < aImgs.length; i++) {
		var num;
		aBtns[i].num=i;
		// var num1=i;
		aImgs[i].onmouseover=pause;
		aImgs[i].onmouseout=restart;
		aBtns[i].onmouseover=function(){
			pause();
			showPic(this.num);
		};
	}

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
				}, i*25);
			})(i);  //传入参数i，函数立即执行
		}
	}
	function fadeOut(elem){
		for(var i=0;i<=20;i++){
			(function(){
				var level=100-i*5;
				setTimeout(function(){
					setOpacity(elem,level)
				}, i*25);
			})(i);
		}
	}
}	
//工作环境	
function worksplay(){
	var oWork = document.getElementById("work");
	var oUl = oWork.getElementsByTagName("ul")[0];
	var oLi = oUl.getElementsByTagName("li");
	var oimg = document.getElementsByClassName("aImg");
	var timer = null;

	oUl.innerHTML += oUl.innerHTML; //放置重复的两套
	oUl.style.width = oLi[0].offsetWidth*oLi.length+"px";//让ul的宽度足够的宽.
	var a = true;
	for (var i = 0; i < oimg.length; i++) {

	oimg[i].onmouseover = function(){
	   a = false;
	}
	oimg[i].onmouseout = function(){
	   a = true;
	}
	function doit(){

		if(a){
			oUl.style.left = oUl.offsetLeft -2 +"px";

			if(oUl.offsetLeft< -oUl.offsetWidth/2){
				oUl.style.left = 0;
			}
		}
		};
	}
	timer = setInterval(doit,50);
}
window.onload = function(){
	advBanner();
	autoplay();
	worksplay();
}