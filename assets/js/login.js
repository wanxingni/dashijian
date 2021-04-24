$(function() {
    // alert('ok')
    // 1.登录表单和注册表单切换
    $('#link_reg').on('click', function() {
        // 注册表单显示
        $('.reg-box').show()
            // 登录表单隐藏
        $('.login-box').hide()
    })

    // 单击去登录
    $('#link_login').on('click', function() {
        $('.reg-box').hide()
        $('.login-box').show()
    })

    // 2.自定义表单校验规则
    layui.form.verify({
        // 密码规则
        pwd: [/^[\S]{6,12}$/,
            '密码必须6-12位非空字符'
        ],
        repwd: function(value, item) {
            var pwd = $('#form_reg [name=password]').val()
            if (pwd !== value) {
                return '两次密码必须一致'
            }
        }

    })

    // 3.注册功能
    // 3.1给注册表单监听submit事件
    $('#form_reg').on('submit', function(e) {
        e.preventDefault()
        var data = {
            username: $('#form_reg [name=username]').val().trim(),
            password: $('#form_reg [name=password]').val().trim(),

        }
        console.log(data)

        // 3.4发送ajax请求
        $.ajax({
            method: 'post',
            url: '/api/reguser',
            data: data,
            success: function(res) {
                console.log(res)
                if (res.status !== 0) {
                    return layui.layer.msg(res.massage, { icon: 5 })
                }
                layui.layer.msg('注册用户成功', { icon: 6 }, function() {
                    $('#link_login').click()
                })
            }
        })

    })


    // 4.登录功能
    $('#form_login').on('submit', function(e) {
        e.preventDefault()

        var data = $(this).serialize()
        $.ajax({
            method: 'post',
            url: '/api/login'
            data: data,
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message, { icon: 5 })
                }
                layui.layer.msg(res.message, { icon: 6 }, function() {
                    localStorage.setItem('token', res.token)
                    location.href = '/index.html'
                })
            }
        })
    })






})