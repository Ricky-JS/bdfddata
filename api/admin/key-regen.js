module.exports = {
    log:false,
    rule: false,
    headers: ['user-id', 'oldapikey'], //only put REQUIRED headers.
    access: 'ADMIN',
    endpoint: async (utils) => {
    if ((await utils.db.connection._readyState) !== 1) return utils.res.send({status: 424, error: utils.config.errors.unavailable, api: Object.assign(utils.config.infold, {ping : `${(Date.now() - utils.time)}ms`})})
let re = await utils.fetch(`https://discord.com/api/v10/users/${utils.req.headers['user-id']}`, {
    method: 'GET',
    headers: {
        Authorization: `Bot ${utils.config.token}`
    }
}).then(res=>res.json())
     if(!re?.id) return utils.res.send({status:404, error: 'User cannot be found', api: Object.assign(utils.config.infold, {ping : `${(Date.now() - utils.time)}ms`})})



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
            let r = await utils.db.get(`ApiTokens.${result}`)
           if(r) /* regen, key already used */ return makekey(50);
           else {
            daresult = await utils.db.set(`ApiTokens.${result}`, {
            userId: re.id,
            admin: false,
            suspended: value.suspended,
            suspendedUntil: value.suspendedUntil
           })
           await utils.db.delete(`ApiTokens.${key}`)
           let cdb = await utils.db.get(key);
           if(cdb) {
            await utils.db.set(result, cdb)
            await utils.db.delete(key)
           }
           return utils.res.send({status:200, details: Object.assign(daresult[result], {token: result}), api: Object.assign(utils.config.infold, {ping : `${(Date.now() - utils.time)}ms`})})
        }
        }

        
        let dbe = await utils.db.get(`ApiTokens`)

        for(const [key,value] of Object.entries(dbe)) {
            if(value?.userId === re.id) {
                if(value?.suspended) {
                    return utils.res.send({status: 403, error: utils.config.errors.headers.authkey.suspended, api: Object.assign(utils.config.infold, {ping : `${(Date.now() - utils.time)}ms`})})
                }
                else return makekey(50, key, value) /* this is regen */
            }
            else {
                if(Object.keys(dbe)[Object.keys(dbe).length-1] === key) /* if its last one*/ return;
            }
        }
}
}