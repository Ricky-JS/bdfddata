module.exports = {
    log:true,
    rule:false,
    headers: [],
    body: ['emoji'],
    access: 'PUBLIC',
    endpoint: async (utils) => {
        let emoji = await utils.fetch(`https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/${[...utils.req.body['emoji']].map(e => e.codePointAt(0).toString(16)).join(`-`)}.png`).then(res=>res)
        if(emoji.status !== 200) return utils.res.send({status:400, error: 'Emoji couldn\'t be resolved to an image. Try another one!', api: Object.assign(utils.config.info, {ping: `${(Date.now() - utils.time)}ms`})})
        utils.res.send({status:200, details: {
            input: utils.req.body['emoji'],
            unicodeHex: [...utils.req.body['emoji']].map(e => e.codePointAt(0).toString(16)).join(`-`),
            twemoji: `https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/${[...utils.req.body['emoji']].map(e => e.codePointAt(0).toString(16)).join(`-`)}.png`
        }, api: Object.assign(utils.config.info, {ping: `${(Date.now() - utils.time)}ms`})
    })
    }
}