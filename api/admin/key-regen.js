module.exports = {
    log:false,
    headers: ['user-id', 'oldapikey'], //only put REQUIRED headers.
    access: 'ADMIN',
    endpoint: async (req, res, Discord, fetch, config, t, resolvers, db) => {
    if ((await db.connection._readyState) !== 1) return res.send({status: 424, error: config.errors.unavailable, api: Object.assign(config.info, {ping : `${(Date.now() - t)}ms`})})
let re = await fetch(`https://discord.com/api/v10/users/${req.headers['user-id']}`, {
    method: 'GET',
    headers: {
        Authorization: `Bot ${config.token}`
    }
}).then(res=>res.json())
     if(!re?.id) return res.send({status:404, error: 'User cannot be found', api: Object.assign(config.info, {ping : `${(Date.now() - t)}ms`})})



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
            let r = await db.get(`ApiTokens.${result}`)
           if(r) /* regen, key already used */ return makekey(20);
           else {
            daresult = await db.set(`ApiTokens.${result}`, {
            userId: re.id,
            admin: false,
            suspended: value.suspended,
            suspendedUntil: value.suspendedUntil
           })
           await db.delete(`ApiTokens.${key}`)
           let cdb = await db.get(key);
           if(cdb) {
            await db.set(result, cdb)
            await db.delete(key)
           }
           return res.send({status:200, details: Object.assign(daresult[result], {token: result}), api: Object.assign(config.info, {ping : `${(Date.now() - t)}ms`})})
        }
        }

        
        let dbe = await db.get(`ApiTokens`)

        for(const [key,value] of Object.entries(dbe)) {
            if(value?.userId === re.id) {
                if(value?.suspended) {
                    return res.send({status: 403, error: config.errors.headers.authkey.suspended, api: Object.assign(config.info, {ping : `${(Date.now() - t)}ms`})})
                }
                else return makekey(20, key, value) /* this is regen */
            }
            else {
                if(Object.keys(dbe)[Object.keys(dbe).length-1] === key) /* if its last one*/ return;
            }
        }
}
}