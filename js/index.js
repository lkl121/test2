$(function() {
    
    load();
    //给输入框创建点击键盘按下事件,识别键盘码
    $('#title').on('keydown',function(e){
        //回车键按下,调用函数
        if(e.keyCode === 13) {
            //先读取本地存储原来的数据
            var local = getData();
            // console.log(local);
            //把local数组进行更新数据,把最新的数据追加给local数组
            local.push({title:$(this).val(),done:false});

            //把这个数组local 存储给本地
            saveData(local);
            load();
            $(this).val('');
            
        }
    })

    //删除操作
    $('ol,ul').on('click','a',function() {
        var data = getData();
        var index = $(this).prop('id');
        // console.log(index);
        data.splice(index,1);
        saveData(data);
        load();
        
    })

    $('ol,ul').on('click','input',function() {
        var data = getData();
        var index = $(this).siblings('a').prop('id');
        data[index].done = $(this).prop('checked');
        // var el = data[index]
        // data.splice(index,1);
        // data.push(el)
        saveData(data)
        load()
        
    })

    //创建函数.用来读取本地存储的数据
    function getData() {
        //定义一个变量来存储所取 本地存储的数据
        var data = localStorage.getItem('todoList');

        if(data == null) {
            return [];
        } else {
            //拿到的数据是字符串格式的,所以要转换
            return JSON.parse(data);
        }
    }

    //封装一个函数,用来存储数据
    function saveData(data) {
        localStorage.setItem('todoList',JSON.stringify(data))
    }

    //渲染加载数据
    function load() {
        //每次加载先清空,解决重复问题
        $('ol,ul').empty()
        //先拿数据
        var data = getData();
        //遍历数据

        //复杂数据类型遍历方法 $.each(arr, function (index, item) {})
        $.each(data,function(i,el){
            //根据遍历数据的个数创建li追加到ol中
            if(el.done == true) {
                $('ul').prepend(`<li>
                <input type="checkbox" checked>
                <p>${el.title}</p>
                <a href="javascript:;" id="${i}"></a>
                </li>`)
            } else {
                $('ol').prepend(`<li>
                <input type="checkbox">
                <p>${el.title}</p>
                <a href="javascript:;" id="${i}"></a>
                </li>`)
            }
        })
          $('#todocount').text($('ol li').length);
    $('#donecount').text($('ul li').length);
    }
    
})