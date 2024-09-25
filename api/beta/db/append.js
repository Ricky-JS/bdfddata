module.exports = {
    log:true,
    rule:false,
    headers: [], //only put REQUIRED headers.
    body: ['name', 'value'], //only put REQUIRED body params.
    access: 'PUBLIC',
    endpoint: async (utils) => {
        if (2 !== 1) return utils.res.send({status: 424, error: utils.config.errors.unavailable, api: Object.assign(utils.config.info, {ping : `${(Date.now() - utils.time)}ms`})})

    if ((await utils.db.connection._readyState) !== 1) return utils.res.send({status: 424, error: utils.config.errors.unavailable, api: Object.assign(utils.config.info, {ping : `${(Date.now() - utils.time)}ms`})})
    let auth = utils.req.headers['apikey'] || null
        const {name, value} = utils.req.body;

        

        let old = await utils.db.get(`${await utils.encoder(auth)}.${(await utils.encoder(name.split('.'))).join('.')}`)
        if(!old) return utils.res.send({status: 400, error: `Variable '${name}' could not be found.`, api: Object.assign(utils.config.info, {ping : `${(Date.now() - utils.time)}ms`})})
            if(typeof old !== 'string') return utils.res.send({status: 400, error: 'Origin value must be a string to be appended.', api: Object.assign(utils.config.info, {ping : `${(Date.now() - utils.time)}ms`})})


        
   let result = await utils.db.set(`${await utils.encoder(auth)}.${(await utils.encoder(name.split('.'))).join('.')}`, old+await utils.encoder(value))
   utils.res.send({status: 200, entries: await JSON.parse(await utils.decoder(JSON.stringify(result||{})))||{}||null, api: Object.assign(utils.config.info, {ping : `${(Date.now() - utils.time)}ms`})})
}
}