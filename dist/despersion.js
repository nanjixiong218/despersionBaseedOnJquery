(function($){
	$.fn.despersion = function(option){

		$eles = null;//保存所有小方格元素


        /**
         *设置默认配置选项
         * width:配置宽度
         * height:配置高度
         * verNum:配置行数
         * horNum：配置列数
         * url:配置背景图片
         */
		var def = $.fn.despersion.def||{width:360,height:360,verNum:9,horNum:9,img:"url('../static/image/test.jpg')"};
		//获得配置选择，获取顺序，先从默认配置中获取，然后从传递参数中获取
        var options = $.extend({},def,option);
		var w = options.width;
		var h = options.height;
		var verticleNum = options.verNum;
		var horNum=options.horNum;
		var imgUrl = options.img;
        //计算每个方格的宽高
		var everyW = w/verticleNum;
		var everyH = h/horNum;
        //总方格数
		var eleNum = verticleNum*horNum;
		var container = $("<div>Ctrl+b</div>").css({
				"position":"relative",
				"width":w,
				"height":h,
                "margin":"0 auto",
                "text-align":'center',
				"opacity":1
			});
        //创建所有方格，绝对定位到对应位置并制定背景图片的正确position
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
        //聚集函数
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
		};

		var _desper = function(){
			for(var i=0;i<verticleNum;i++){
				for(var j=0;j<horNum;j++){
                    //查询表
                    var action = [];
                    //左上角
                    action.push({"top":-(Math.random()*1000|0)+"px",left:-(Math.random()*1000|0)+"px"});
                    //左下角
                    action.push({"top":(Math.random()*1000|0)+"px",left:-(Math.random()*1000|0)+"px"});
                    //右上角
                    action.push({"top":-(Math.random()*1000|0)+"px",left:(Math.random()*1000|0)+"px"});
                    //右下角
                    action.push({"top":(Math.random()*1000|0)+"px",left:(Math.random()*1000|0)+"px"});
                    //分散函数
					$($eles[i*horNum+j]).animate({
						"top":action[(i*horNum+j)%4].top,
						"left":action[(i*horNum+j)%4].left,
						"opacity":0
					},(i*horNum+j)*50);
				}	
			}	
		};
        //用的replaceWith导致如果jquery选取的是多个div,所有的元素全部会消失掉，变成这一个container
		$this.replaceWith(container);
		$(document).on("keypress",function(event){
			if(event.which==2&&event.ctrlKey){//esc等功能键获取不到,直接按b,which等于98，同时按ctrl,which就变成了2
				_gather();	
			}		
		});
	});	
   };
})(jQuery);//这里直接写jquery居然不行！哦，原来是大写的Q
