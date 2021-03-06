$(function() {
    getUserInfo()

    function getUserInfo() {
        $.ajax({
            method: 'get',
            url: '/my/userinfo',
            success: function(res) {
                console.log(res)
                if (res.status !== 0) {
                    return layui.layer.msg('获取信息失败')
                }
                renderAvatar(res.data)
            },



        })
    }


    // 渲染用户头像
    function renderAvatar(user) {
        var name = user.nickname || user.username
        $('#welcome').html('欢迎' + name)
        if (user.user_pic !== null) {
            $('.layui-nav-img').attr('src', user.user_pic).show()
            $('.text-avatar').hide()
        } else {
            var first = name[0].toUpperCase()
            $('.text-avatar').html(first).show()
            $('.layui-nav-img').hide()
        }
    }


    var layer = layui.layer
    $('#logout').on('click', function() {
        layer.confirm('您确定退出吗', { icon: 3, title: '提示' }, function(index) {
            localStorage.removeItem('token')
            location.href = 'login.html'
            layer.close(index);
        })
    })











})