module.exports = {
    log:false,
    rules:false,
    headers: [],
    body: ['json', 'opt'],
    endpoint: async (utils) => {
        let result = [];
        for await (const [key, value] of Object.entries(utils.req.body['json'])) {
    result.push(value[utils.req.body['opt']])
}
            utils.res.send({status:200, details: result, api: Object.assign(utils.config.info, {ping: `${(Date.now() - utils.time)}ms`})})
    }
}