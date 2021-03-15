$(function () {
    // 1.自定义验证规则
    var form = layui.form;
    form.verify({
        // 用户昵称的校验
        nickname: function (value) {
            if (value.length > 6) {
                return "昵称长度为1-6之间！"
            }
        }
    });

    // 2.用户渲染
    formUserInfo();
    // 到处layer
    var layer = layui.layer
    // 封装函数
    function formUserInfo() {
        $.ajax({
            url: '/my/userinfo',
            type: 'GET',
            data: {},
            dataType: 'json',
            success: (res) => {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                // 成功后渲染
                form.val('formUserInfo', res.data);
            }
        })
    }
    //3.表单重置
    $("#btnReset").on('click', function (e) {
        // console.log(e);
        // 阻止重置
        e.preventDefault();
        // 从新用户渲染
        formUserInfo();
    })
    // 4.修改用户信息
    $(".layui-form").on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            url: '/my/userinfo',
            type: 'POST',
            data: $(this).serialize(),
            dataType: 'json',
            success: (res) => {
                if (res.status !== 0) {
                    return layer.msg("用户信息修改失败");
                }
                // 
                layer.msg("恭喜您，用户信息修改成功");
                // 调用父页面中的更新用户信息和头像方法
                window.parent.getUserInfo();
            }
        })
    })
})