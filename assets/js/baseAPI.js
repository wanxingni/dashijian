$.ajaxPrefilter(function(options) {
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url
    if (options.url.indexOf('/my/') !== -1) {
        options.header = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
})