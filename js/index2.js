$(function() {
    //先渲染一次
    load();
    //当输入框键盘按下 注意这里是keydown事件!
    $('#title').on('keydown',function(e) {
        //监测回车键
        if(e.keyCode === 13) {
            //回车键按下时,要存储数据,封装函数调用
            //1.定义一个变量容器来存先读取本地已存在的数据,调用读取函数
            var local = getData();

            //2.把回车键按下后的新数据追加给local数组
            local.push({title:$(this).val(),done:false})

            //3.把local数组存储到本地,调取存储函数;传参!!传参
            saveData(local);
            load();
            //要让输入框的在变为空的,val()里面一定要加引号
            $(this).val('');

        }
    })

    //删除功能,利用委托
    $('ol,ul').on('click','a',function() {
        //先获取数据
        var data = getData();
        //给每个小a设置属性id,用来记录自己的索引号
        //定义变量来记录索引,属性值以字符串的形式,要加引号
        var index = $(this).prop('id');
        //点击了a,就要把data数组里的这一项给删除,利用splice
        data.splice(index,1);
        //把删除操作后的新数据保存,并且重新渲染
        saveData(data);
        load()
    })

    //选择功能,和删除功能同理
    $('ol,ul').on('click','input',function(){
        //如果当前点击的input框被点击,用index记录当前,和其他的input区分,对象里的done属性和当前点击的属性相同
        //获取数据
        var data = getData();
        var index = $(this).siblings('a').prop('id');
        console.log(index);
        //修改数据
        data[index].done = $(this).prop('checked');
        //重新保存
        saveData(data);
        //重新渲染
        load();

    })


    function getData() {
        //定义一个变量来存 获取到的 本地存储的数据
        var data = localStorage.getItem('todoList');
        if(data == null) {
            return [];
        } else {
        //获取到的是字符串.要转换成对象格式
            return JSON.parse(data);
        }

    }

    //这里一定要传参!!!!!data
    function saveData(data) {
        //存取的数据一定要是字符串形式
        localStorage.setItem('todoList',JSON.stringify(data))
    }

    //要把本地存储的数据渲染到页面上去,我们先封装一个函数
    function load() {
        //先清空防止解决重复加载
        $('ol,ul').empty();
        //1.先拿数据!!!!
        var data = getData()
        //根据本地存储的数据创建小li,循环data

        $.each(data,function(i,ele) {
            //这里的i是索引,ele是dom对象
            if(ele.done == true) {
                //input ,如果done完成,这里的checked 属性一定要变
                $('ul').prepend(`<li>
                <input type="checkbox" checked> 
                <p>${ele.title}</p>
                <a href="javascript:;" id="${i}"></a>
            </li>`)
            } else {
                $('ol').prepend(`<li>
                <input type="checkbox">
                <p>${ele.title}</p>
                <a href="javascript:;" id="${i}"></a>
            </li>`)
            }
        })

        $('#todocount').text($('ol li').length)
        $('#donecount').text($('ul li').length)

    }
}
)