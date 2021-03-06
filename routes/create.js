let router = require('koa-router')()
let fs = require('fs')


let getDateTime = function () {
  let date = new Date()
  return date.getFullYear() + '' + date.getMonth() + date.getDate() + date.getHours() + date.getMinutes()

}

let createMD = function (title, time, tags, categories, cover, article) {
  let tagstring = ''
  if (tags.indexOf(',') > -1) {
    let tagsplit = tags.split(',')
    for (let i of tagsplit) {
      if (i.trim()) {
        let tstring = '- ' + i.trim() + '\r\n'
        tagstring += tstring
      }
    }
  } else {
    tagstring = '- ' + tags + '\r\n'
  }

  let data = 'title: "' + title + '"\r\n' +
    'date: ' + time + '\r\n' +
    'tags:\r\n' + tagstring + 'categories:\r\n' +
    '- ' + categories + '\r\n' + 'cover: ' + cover + '\r\n' +
    '---' + '\r\n' + article

  let writerStream = fs.createWriteStream('/pathto/source/_posts/' + getDateTime() + '.md')
  writerStream.write(data, 'UTF8')
  writerStream.end()

  writerStream.on('finish', function () {
    console.log(title + ': .md file created.')
  })

  writerStream.on('error', function (err) {
    console.log(err)
  })
}

router.post('/', async function (ctx, next) {
  let title = ctx.request.body.title || ''
  let time = ctx.request.body.time || ''
  let tags = ctx.request.body.tags || ''
  let categories = ctx.request.body.categories || ''
  let cover = ctx.request.body.cover || ''
  let verify = ctx.request.body.verify || ''
  let article = ctx.request.body.article || ''

  if (verify != 'chn') {
    ctx.body = "you post data:" + JSON.stringify({
      title: title,
    })
    ctx.state = {
      title: title + ': Are you kidding me?'
    }
  } else {
    ctx.body = "you post data:" + JSON.stringify({
      title: title,
      time: time,
      tags: tags,
      categories: categories,
      cover: cover,
      article: article
    })
    ctx.state = {
      title: title,
      time: time,
      tags: tags,
      categories: categories,
      cover: cover,
      article: article
    }
    createMD(title, time, tags, categories, cover, article)
  }
  await ctx.render('create', {})
})

module.exports = router