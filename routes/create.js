let router = require('koa-router')();

router.post('/', async function (ctx, next) {
 let title =ctx.request.body.title || 0;
 let time =ctx.request.body.time || 0;
 ctx.body = "you post data:"+JSON.stringify({title:title});
 ctx.state = {
    title: title,
    time:time
  };

 await ctx.render('create', {});
});

module.exports = router;
