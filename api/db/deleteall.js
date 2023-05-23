module.exports = {
    log:true,
    headers: [], //only put REQUIRED headers.
    body: [], //only put REQUIRED body params.
    access: 'PUBLIC',
    endpoint: async (utils) => {
    if ((await utils.db.connection._readyState) !== 1) return utils.res.send({status: 424, error: utils.config.errors.unavailable, api: Object.assign(utils.config.info, {ping : `${(Date.now() - utils.time)}ms`})})
    let u = new URLSearchParams(utils.req.url);
    let query = u.get('/db/deleteall?query')
    let auth = utils.req.headers['apikey'] || null

    let result;
    let dbe = await utils.db.get(`${auth}`)
if(query) {
    result = [] // changes null to null array
    for await(const [key,value] of Object.entries(dbe)) {
        if(key.match(query)) result.push(JSON.parse(`{"${key}": "${await utils.db.delete(`${auth}.${key}`)}"}`))
    }
}
else result = await utils.db.delete(`${auth}`);

utils.res.send({status: 200, entries: result, api: Object.assign(utils.config.info, {ping : `${(Date.now() - utils.time)}ms`})})
}
}