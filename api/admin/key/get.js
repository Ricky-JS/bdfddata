module.exports = {
    log:false,
    rule: false,
    headers: ['opt'], //only put REQUIRED headers.
    access: 'ADMIN',
    endpoint: async (utils) => {
        if ((await utils.db.connection._readyState) !== 1) return utils.res.send({status: 424, error: utils.config.errors.unavailable, api: Object.assign(utils.config.info, {ping : `${(Date.now() - utils.time)}ms`})})
            let opt = utils.req.headers['opt']
        async function getUser(id) {
            return await utils.fetch(`https://discord.com/api/v10/users/${id}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bot ${utils.config.token}`
                }
            }).then(res=>res.json())
        }

async function JSONdecode (obj) {
    let result = {};
    for(const [key,value] of Object.entries(obj)) {
        Object.assign(result, JSON.parse(`{"${await utils.decoder(key)}": "${await utils.decoder(value)}"}`))
    }
    return result;
}


let dbe = await utils.db.get(`${await utils.encoder(`ApiTokens`)}`)
let cdb = await utils.db.get(`${await utils.encoder(`ApiTokens`)}.${await utils.encoder(opt)}`)
let re = await getUser(utils.req.headers['opt'])

if(!re?.id) {
    if(!cdb) {
     return await utils.res.send({status:404, error: 'That userId or Key was not found in the Database.'})
    } else {
     return await utils.res.send({status:200, details: JSON.stringify(Object.assign(await JSONdecode(cdb), {"authkey": opt}),null,2)})
    }
 }
 else {
     for (const [key, value] of Object.entries(dbe)) {
         if(await utils.decoder(value[await utils.encoder('userId')]||'undefined') === opt) {
            return await utils.res.send({status:200, details: JSON.stringify(Object.assign(await JSONdecode(value), {"authkey": await utils.decoder(key)}),null,2)})
         }
         else {
          if(Object.keys(dbe)[Object.keys(dbe).length-1] === key) return await utils.res.send({status:404,error: 'That userId or Key was not found in the Database.'})
      }
     }
 }



    }

}