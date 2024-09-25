module.exports = {
    log:true,
    rule:false,
    headers: [], //only put REQUIRED headers.
    body: [], //only put REQUIRED body params.
    access: 'PUBLIC',
    endpoint: async (utils) => {
        if (2 !== 1) return utils.res.send({status: 424, error: utils.config.errors.unavailable, api: Object.assign(utils.config.info, {ping : `${(Date.now() - utils.time)}ms`})})

    if ((await utils.db.connection._readyState) !== 1) return utils.res.send({status: 424, error: utils.config.errors.unavailable, api: Object.assign(utils.config.info, {ping : `${(Date.now() - utils.time)}ms`})})
    let u = new URLSearchParams(utils.req.url);
    let query = u.get(utils.req.url.split('=')[0])
    let auth = utils.req.headers['apikey'] || null
    let result;
        let dbe = await utils.db.get(`${await utils.encoder(auth)}`)
    if(query) {
        result = [] // changes null to null array
        for await(const [key,value] of Object.entries(dbe)) {
            if(await utils.decoder(key).match(query)) result.push(JSON.parse(`{"${await client.decoder(key)}": "${await client.decoder(dbe[key])}"}`))
        }
    }
    else result = dbe;


    utils.res.send({status: 200, entries: await utils.decoder(JSON.stringify(result||{}))||{}||null, api: Object.assign(utils.config.info, {ping : `${(Date.now() - utils.time)}ms`})})
}
}