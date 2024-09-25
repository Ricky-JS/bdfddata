module.exports = {
    log:true,
    rules:false,
    headers: [],
    body: ['code', 'times'],
    endpoint: async (utils) => {
            utils.res.send({status:200, details: utils.req.body['code'].repeat(utils.req.body['times']), api: Object.assign(utils.config.info, {ping: `${(Date.now() - utils.time)}ms`})})
    }
}