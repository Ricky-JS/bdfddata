module.exports = {
    log:false,
    rule:false,
    headers: [],
    body: ['emoji'],
    access: 'ADMIN',
    endpoint: async (utils) => {
        utils.res.send({status:200, details: {
            input: utils.req.body['emoji'],
            unicodeHex: [...utils.req.body['emoji']].map(e => e.codePointAt(0).toString(16)).join(`-`),
            twemoji: (utils, `https://twemoji.maxcdn.com/v/latest/72x72/${[...utils.req.body['emoji']].map(e => e.codePointAt(0).toString(16)).join(`-`)}.png`)
        }, api: Object.assign(utils.config.info, {ping: `${(Date.now() - utils.time)}ms`})
    })
    }
}