window.onload=function(){
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
		$("ad").style.display = "none";
	}else{
		$("ad").style.display = "block";
	}
	//关闭广告
	$("close").onclick=function(){
		$("ad").style.display="none";
		setCookie("topAd","true","365");
	};
	
};