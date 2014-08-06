##一个图片分块发散聚合的jquery插件

###使用方法
很简单
*一个div
> <div id="despersion"></div>

*一行代码
> $("#despersion").despersion(option);

*option选项（宽高值不需要加px）
> width:指定div的宽度（默认360）
> height:指定div的高度 (默认360)
> verNum:指定行数（默认9）
> horNum:指定列数（默认9）
> img:指定图片（默认"url('../static/image/test.jpg')"）
注：有默认属性的可以缺省

*默认值可以修改
> $("#despersion").def={option};
*样例代码
> $("#despersion").despersion({width:"360",height:"450",img:"url('../static/image/test.jpg')"});
*如果默认值全部指定好了就可以直接
> $("#despersion").despersion();