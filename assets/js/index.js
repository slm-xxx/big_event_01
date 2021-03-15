$(function () {
    // 1.获取基本信息
    getUserInfo()
    var layer = layui.layer
    $("#btnLogout").on('click', function () {
        layer.confirm("是否确认退出？", {
            icon: 3,
            title: "提示"
        }, function (index) {
            localStorage.removeItem("token")
            location.href = "/login.html"
            layer.close(index)
        })
    })
})
// 后面其他的页面还要调用
function getUserInfo() {
    $.ajax({
        type: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     // 重新登录，因为token过期事件 12小时
        //     Authorization: localStorage.getItem("token") || ""
        // },
        success: (res) => {
            // console.log(res);
            if (res.status != 0) {
                return layui.layer.msg(res.message)
            }
            renderAvatar(res.data)
        }
    })
}
// 头像和用户名渲染封装
function renderAvatar(user) {
    var name = user.nickname || user.username
    $("#welcome").html("欢迎&nbsp;&nbsp;" + name)
    if (user.user_pic !== null) {
        $(".layui-nav-img").show().attr("src", use.user_pic).show()
        $(".tetx-avatar").hide()
    } else {
        $(".layui-nav-img").hide()
        var text = name[0].toUpperCase()
        $(".tetx-avatar").show().html(text)
    }
}