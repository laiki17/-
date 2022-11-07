$(function() {
    // 初始化右侧滚动条
    // 这个方法定义在scroll.js中
    resetui()


    //为发送按钮添加点击事件
    $('#input_sub').on('click', function() {
        var texts = $('#input_txt').val().trim();
        if (texts.length <= 0) {
            $('#input_txt').val('');
            return alert('输入不能为空');

        }
        //用户输入内容 追加到页面
        $('#talk_list').append(`
        <li class="right_word">
        <img src="img/person02.png" /> 
        <span>${texts}</span>
        </li>`)
            //发送后清空
        $('#input_txt').val('');
        //超过滑动
        resetui();
        getMsg(texts);
    })

    //获取聊天机器人发送回的消息
    function getMsg(texts) {
        $.ajax({
            method: 'GET',
            url: 'http://www.liulongbin.top:3006/api/robot',
            data: {
                spoken: texts
            },
            success: function(res) {
                console.log(res);
                //接受信息
                if (res.message === 'success') {
                    var msg = res.data.info.text;
                    $('#talk_list').append(` 
                    <li class="left_word">
                         <img src="img/person01.png" /> 
                         <span>${msg}</span>
                    </li>`)
                } else {
                    $('#talk_list').append(` 
                    <li class="left_word">
                         <img src="img/person01.png" /> 
                         <span>我坏了呜呜呜呜</span>
                    </li>`)
                        //重置滚动条
                    resetui();
                    console.log(msg);
                    getVoice(msg);
                }


            }
        })

    }

    //把文字转语音 (接口无用)
    // function getVoice(text) {
    //     $.ajax({
    //         method: 'GET',
    //         url: 'http://www.liulongbin.top:3006/api/synthesize',
    //         data: {
    //             text: text,
    //         },
    //         success: function(res) {

    //             console.log(res);
    //             //播放语音
    //             $('#voice').attr('src', res.voiceUrl);

    //         }
    //     })


    // }

    $('#input_txt').on('keyup', function(e) {
        // e.keyCode; //得到当前按键编码
        if (e.keyCode == 13) {
            $('#input_sub').click();
        }
    })


})