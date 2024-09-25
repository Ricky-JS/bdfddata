module.exports = {
    log:true,
    rule:false,
    headers: [], //only put REQUIRED headers.
    body: ['name'], //only put REQUIRED body params.
    access: 'PUBLIC',
    endpoint: async (utils) => {
        if (2 !== 1) return utils.res.send({status: 424, error: utils.config.errors.unavailable, api: Object.assign(utils.config.info, {ping : `${(Date.now() - utils.time)}ms`})})

    if ((await utils.db.connection._readyState) !== 1) return utils.res.send({status: 424, error: utils.config.errors.unavailable, api: Object.assign(utils.config.info, {ping : `${(Date.now() - utils.time)}ms`})})
    let auth = utils.req.headers['apikey'] || null
    const {name} = utils.req.body;

        let value = await utils.db.get(`${await utils.encoder(auth)}.${(await utils.encoder(name.split('.'))).join('.')}`)


        let result;
        switch(typeof value) {
            case 'string':
            result = `"${await utils.decoder(value)}"`
            break;
            case 'object':
            result = await utils.decoder(JSON.stringify(value))
            break;
        }
   utils.res.send({status: 200, entries: await JSON.parse(JSON.stringify(`{"${name}":${result}}`)||{})||null, api: Object.assign(utils.config.info, {ping : `${(Date.now() - utils.time)}ms`})})
}
}