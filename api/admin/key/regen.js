module.exports = {
    log:false,
    rule: false,
    headers: ['user-id', 'oldapikey'], //only put REQUIRED headers.
    access: 'ADMIN',
    endpoint: async (utils) => {
    if ((await utils.db.connection._readyState) !== 1) return utils.res.send({status: 424, error: utils.config.errors.unavailable, api: Object.assign(utils.config.info, {ping : `${(Date.now() - utils.time)}ms`})})
let re = await utils.fetch(`https://discord.com/api/v10/users/${utils.req.headers['user-id']}`, {
    method: 'GET',
    headers: {
        Authorization: `Bot ${utils.config.token}`
    }
}).then(res=>res.json())
     if(!re?.id) return utils.res.send({status:404, error: 'User cannot be found', api: Object.assign(utils.config.info, {ping : `${(Date.now() - utils.time)}ms`})})

        const logger = new utils.Discord.WebhookClient({ url: utils.config.hooks.keys })

     function makekey(length, key, value) {
            let result = '';
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            const charactersLength = characters.length;
            let counter = 0;
            while (counter < length) {
              result += characters.charAt(Math.floor(Math.random() * charactersLength));
              counter += 1;
            }
            checkdb(result, key, value);
        }
        
        async function checkdb(result, key, value) {
            let daresult;
            let r = await utils.db.get(`${await utils.encoder('ApiTokens')}.${await utils.encoder(result)}`)
           if(r) /* regen, key already used */ return makekey(50);
           else {
            daresult = await utils.db.set(`${await utils.encoder('ApiTokens')}.${await utils.encoder(result)}`, {
            'l%0a21o21I%ll%0a19o19I%ll%0a5o5I%ll%0a18o18U%lc%0p9u9A%ll%0a4o4U%l': await utils.encoder(re.id),
            'l%0a1o1I%ll%0a4o4U%ll%0a13o13I%ll%0a9o9I%ll%0a14o14U%l': 'l%0a6o6U%ll%0a1o1I%ll%0a12o12U%ll%0a19o19I%ll%0a5o5I%l',
            'l%0a19o19I%ll%0a21o21I%ll%0a19o19I%ll%0a16o16U%ll%0a5o5I%ll%0a14o14U%ll%0a4o4U%ll%0a5o5I%ll%0a4o4U%l': value[await utils.encoder('suspended')],
            'l%0a19o19I%ll%0a21o21I%ll%0a19o19I%ll%0a16o16U%ll%0a5o5I%ll%0a14o14U%ll%0a4o4U%ll%0a5o5I%ll%0a4o4U%lc%0p21u21A%ll%0a14o14U%ll%0a20o20U%ll%0a9o9I%ll%0a12o12U%l': value[await utils.encoder('suspendedUntil')],
           })
           await utils.db.delete(`${await utils.encoder('ApiTokens')}.${key}`)
           let cdb = await utils.db.get(key);
           if(cdb) {
            await utils.db.set(await utils.encoder(result), cdb)
            await utils.db.delete(key)
           }
           logger.send(`The key for \`@${re.username} (${re.id})\` has been regenerated!`)
           return utils.res.send({status:200, details: Object.assign(JSON.parse(await utils.decoder(JSON.stringify(daresult[await utils.encoder(result)]||{}))||{})||null, {token: result}), api: Object.assign(utils.config.info, {ping : `${(Date.now() - utils.time)}ms`})})
        }
        }

        
        let dbe = await utils.db.get(`${await utils.encoder('ApiTokens')}`)
        if(!dbe?.[await utils.encoder(utils.req.headers['oldapikey'])]) return utils.res.send({status: 403, error: utils.config.errors.authkey.invalid, api: Object.assign(utils.config.info, {ping : `${(Date.now() - utils.time)}ms`})})

        for(const [key,value] of Object.entries(dbe)) {
            if(await utils.decoder(value?.[await utils.encoder('userId')]) === re.id) {
                if(await utils.decoder(key) !== utils.req.headers['oldapikey']) {
                    return utils.res.send({status:403, error: utils.config.errors.authkey.nomatch, api: Object.assign(utils.config.info, {ping : `${(Date.now() - utils.time)}ms`})})
                }
                if(await utils.decoder(value?.[await utils.encoder('suspended')]) === "true") {
                    return utils.res.send({status: 403, error: utils.config.errors.authkey.suspended, api: Object.assign(utils.config.info, {ping : `${(Date.now() - utils.time)}ms`})})
                }

                else {
                    return makekey(50, key, value) /* this is regen */
                }
            }
            else {
                if(Object.keys(dbe)[Object.keys(dbe).length-1] === key) /* if its last one*/ return;
            }
        }
}
}