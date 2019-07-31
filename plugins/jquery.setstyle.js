// (function(){})()的作用是函数自调用，避免全局污染。是一种设计模式：沙箱模式
// 1.对象级别的插件开发，即给jQuery对象添加方法，封装对象方法的插件，如:parent()、appendTo()
// 2.一种是类级别的插件开发，即给jQuery添加新的全局函数，相当于给jQuery类本身添加方法，jQuery的全局函数就是属于jQuery命        名空间的函数，封装全局函数的插件
// 3.选择器插件

// jQuery为开发插件提拱了两个方法，分别是：

// jQuery.fn.extend(object); 给jQuery对象添加方法。
// jQuery.extend(object); 为扩展jQuery类本身.为类添加新的方法，可以理解为添加静态方法。

(function () {  
    // $.prototype.setStyle = function () {  
    //     this.css({
    //         width: 666,
    //         height: 666,
    //         backgroundColor: 'green'
    //     })
    //     return this
    // }
    $.fn.setStyl = function(){
        this.css({
            width: 400,
            'height':400,
            'background-color':"cyan"
        });
        return this;
    }

    // 这里的方法提供一个参数value,如果调用方法时传入value，那么就用这个值来设置字体颜色,否则就是获取匹配无此字体颜色的值
    // 给jQuery对象添加方法，封装对象方法的插件
    $.fn.extend({
        setColor: function (val) {  
            return this.css('color',val)
        },
        // setStyl: function (val) {  
        //     return this.css('width',val)
        // }
        // 可定义多个插件
    })

    // 封装全局函数的插件
    $.extend({
        leftTrim: function (text) {  
            return (text || '').replace(/^\s/g,"")
        },
        rightTrim: function (text) {  
            return (text || '').replace(/\s+$/g,"")
        }
    })
})()