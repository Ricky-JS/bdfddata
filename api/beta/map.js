module.exports = {
    log:true,
    rules:false,
    headers: [],
    body: ['array'],
    endpoint: async (utils) => {
        const array = utils.req.body['array'];
        const identifier = utils.req.body['id'];
        if(!Array.isArray(array)) return utils.res.send({status:400, error: 'Parameter must be an array!', api: Object.assign(utils.config.info, {ping: `${(Date.now() - utils.time)}ms`})})
        let result = await array.map(g=>identifier ? (g[identifier] || null) : g)



            utils.res.send({status:200, details: result, api: Object.assign(utils.config.info, {ping: `${(Date.now() - utils.time)}ms`})})
    }
}