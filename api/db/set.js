module.exports = {
    log:true,
    headers: [], //only put REQUIRED headers.
    body: ['name', 'value'], //only put REQUIRED body params.
    access: 'PUBLIC',
    endpoint: async (utils) => {
    if ((await utils.db.connection._readyState) !== 1) return utils.res.send({status: 424, error: utils.config.errors.unavailable, api: Object.assign(utils.config.info, {ping : `${(Date.now() - utils.time)}ms`})})
    let auth = utils.req.headers['apikey'] || null
    const {name, value} = utils.req.body;
   let result = await utils.db.set(`${auth}.${name}`, value)
   utils.res.send({status: 200, entries: result, api: Object.assign(utils.config.info, {ping : `${(Date.now() - utils.time)}ms`})})
}
}