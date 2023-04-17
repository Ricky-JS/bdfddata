module.exports = {
    log:true,
    headers: [], //only put REQUIRED headers.
    body: ['name'], //only put REQUIRED body params.
    access: 'PUBLIC',
    endpoint: async (req, res, Discord, fetch, config, t, resolvers, db) => {
    if ((await db.connection._readyState) !== 1) return res.send({status: 424, error: config.errors.unavailable, api: Object.assign(config.info, {ping : `${(Date.now() - t)}ms`})})
    let auth = req.headers['apikey'] || null
    const {name} = req.body;
   let result = await db.get(`${auth}.${name}`)
   res.send({status: 200, entries: result, api: Object.assign(config.info, {ping : `${(Date.now() - t)}ms`})})
}
}