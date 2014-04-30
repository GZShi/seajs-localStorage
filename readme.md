# seajs-localStorage  

一个seajs插件，使seajs尽可能从localStorage中加载模块  

## 使用方法  
``` html  
<head>
	<script src='sea.js' id='seajsnode'></script>
	<script src='sea-localStorage.js'></script>
</head>
```  

加载过程对使用者透明  

## 工作原理  
在执行模块之前，即调用`seajs.Module.prototype.exec`之前，提取模块的`factory`工厂方法，将其转换为字符串，并使用`data-uri`重新构建一个与该模块源文件等效的一个`data-uri`“文件”。后面再涉及调用该模块时，即执行`seajs.require`操作时，将原有`uri`用本地`data-uri`进行替换，使模块源文件从本地加载，而不是原有地址。  
seajs加载模块的时候是通过在html的`head`中插入一个`script`标签进行第一次加载的，理论上将该标签的`src`属性替换成与原本`src`等效的地址是不会改变seajs对模块后续的处理的。  

## 浏览器支持  
* localStorage: [Can I use?](http://caniuse.com/#search=localstorage)  
* data URI: [Can I use?](http://caniuse.com/#search=datauri)  

## 版权  
MIT
