let router = require('koa-router')()

let gettime = function () {
  Date.prototype.Format = function (fmt) { 
    var o = {
      "M+": this.getMonth() + 1,
      "d+": this.getDate(),
      "h+": this.getHours(),
      "m+": this.getMinutes(),
      "s+": this.getSeconds(), 
      "q+": Math.floor((this.getMonth() + 3) / 3), 
      "S": this.getMilliseconds() 
    }
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length))
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)))
    return fmt
  }
  return new Date().Format("yyyy-MM-dd hh:mm:ss")
}

router.get('/', async function (ctx, next) {
  ctx.state = {
    title: 'anr md',
    time: gettime()
  }
  await ctx.render('index', {
  })


})
module.exports = router
