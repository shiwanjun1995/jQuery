(function(){
    // jQuery封装一个瀑布流插件
    $.fn.waterfull = function(){
        // 1-确定要排多少列
        var columns = 5;

        // 2-获取每一个元素的宽度
        // this指的是当前调用的对象items 要获取的是item的宽度
        var width = this.children().width();

        // 3-计算间隔 gap：左右间隔 gap_t：上下间隔
        var gap = (this.width() - width * columns) / (columns - 1);
        var gap_t = 10;
        // 4-声明一个数组，用来存放所有item的高度值
        var heightArr = [];
        
        // 5-遍历所有item
        this.children().each(function(index,ele){
            // 5-1 排列第一行
            // 判断当前遍历的item索引小于列数的时候，说明是第一行
            if(index < columns){
                // 将ele对象转化成DOM对象，再设置它的top 和 left
                $(ele).css({
                    top:0,
                    left:index * (width +gap)
                });
                // 5-2 将第一行每一个item的高度存到数组中
                heightArr.push($(ele).height());
            }else{
                // 5-3 计算heightArr数组里面的最小值,并记录下最小值的列数即索引
                var minHeight = heightArr[0];
                var minIndex = 0;
                $.each(heightArr,function(index,value){
                    if(minHeight > value){
                        minHeight = value;
                        minIndex = index;
                    }
                });

                // 5-4 当剩下的item排在最小列下面的时候，要在数组中，跟新这个最小列的高度
                heightArr[minIndex] += $(ele).height() + gap_t;
 
                // 5-5 排列剩下的行数，下面的item放到上一行最小高度的下面，依次列推
                // 设定定位的top值， 10 是上下的间距
                var top = minHeight + gap_t;
                // 设定定位的left值，即高度最小列的索引乘以item的宽度加上间隙
                var left = minIndex * (width + gap);
                $(ele).css({
                    top: top,
                    left: left
                });
            }
            
            // 6-设置加载按钮的位置，只需要将items设置一个高度即可
            // 加载按钮的位置应该在heightArr数组里最大高度值的哪一个item的下面
            var maxHeight = heightArr[0];
            $.each(heightArr,function(index,value){
                maxHeight = maxHeight > value ? maxHeight : value;
            });
            // 设置items的高度 this指的是每一个item
            $(this).parent().height(maxHeight);
        })
    }
})()