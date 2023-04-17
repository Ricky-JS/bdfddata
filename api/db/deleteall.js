module.exports = {
    log:true,
    headers: [], //only put REQUIRED headers.
    body: [], //only put REQUIRED body params.
    access: 'PUBLIC',
    endpoint: async (req, res, Discord, fetch, config, t, resolvers, db) => {
    if ((await db.connection._readyState) !== 1) return res.send({status: 424, error: config.errors.unavailable, api: Object.assign(config.info, {ping : `${(Date.now() - t)}ms`})})
    let u = new URLSearchParams(req.url);
    let query = u.get('/db/deleteall?query')
    let auth = req.headers['apikey'] || null

    let result;
    let dbe = await db.get(`${auth}`)
if(query) {
    result = [] // changes null to null array
    for await(const [key,value] of Object.entries(dbe)) {
        if(key.match(query)) result.push(JSON.parse(`{"${key}": "${await db.delete(`${auth}.${key}`)}"}`))
    }
}
else result = await db.delete(`${auth}`);

   res.send({status: 200, entries: result, api: Object.assign(config.info, {ping : `${(Date.now() - t)}ms`})})
}
}