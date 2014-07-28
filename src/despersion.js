(function($){
	$.fn.despersion = function(option){

		$eles = null;
		var def = $.fn.despersion.def||{width:360,height:360,verNum:9,horNum:9,img:"url('../static/image/test.jpg')"};
		var options = $.extend({},def,option);
		var w = options.width;
		var h = options.height;
		var verticleNum = options.verNum;
		var horNum=options.horNum;
		var imgUrl = options.img;
		var everyW = w/verticleNum;
		var everyH = h/horNum;

		var eleNum = verticleNum*horNum;
		var container = $("<div>Ctrl+b</div>").css({
				"position":"relative",
				"width":w,
				"height":h,
				"opacity":1
			});
		for(var i=0;i<verticleNum;i++){
			for(var j=0;j<horNum;j++){
				$("<div></div>")
				.css({
					"position":"absolute",
					"width":everyW,
					"height":everyH,
					"backgroundImage":imgUrl,
					"backgroundSize":w+"px "+h+"px",
					"backgroundPosition":-everyW*j+"px "+(-everyH*i)+"px",
					"top":i*everyH+"px",	
					"left":j*everyW+"px",
					"opacity":1
				}).appendTo(container);		
			}
		}	
		$eles=container.children();
	 return this.each(function(){

		container.on("click",function(){
			_desper();			
		});
		var $this = $(this);

		var _gather = function(){
			for(var i=0;i<verticleNum;i++){
				for(var j=0;j<horNum;j++){
					$($eles[i*horNum+j]).animate({
						"top":i*everyH+"px",	
						"left":j*everyW+"px",
						"opacity":1
					},1000);
				}	
			}	
		}
		var _desper = function(){
			for(var i=0;i<verticleNum;i++){
				for(var j=0;j<horNum;j++){
					$($eles[i*horNum+j]).animate({

						"top":(Math.random()*1000|0)+"px",	
						"left":(Math.random()*100|0)+"px",
						"opacity":0
					},1000);	
				}	
			}	
		}
		$this.replaceWith(container);
		$(document).on("keypress",function(event){
			if(event.which==2&&event.ctrlKey){//esc等功能键获取不到,直接按b,which等于98，同时按ctrl,which就变成了2
				_gather();	
			}		
		});
	});	
   };
})(jQuery);//这里直接写jquery居然不行！哦，原来是大写的Q
