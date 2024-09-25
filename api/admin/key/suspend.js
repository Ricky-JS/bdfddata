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
const logger = new utils.Discord.WebhookClient({ url: utils.config.hooks.keys })

let dbe = await utils.db.get(`${await utils.encoder(`ApiTokens`)}`)
let cdb = await utils.db.get(`${await utils.encoder(`ApiTokens`)}.${await utils.encoder(opt)}`)

async function toBoolean (str) {return (str === "true")}
let re = await getUser(utils.req.headers['opt'])



if(!re?.id) {
    if(!cdb) {
     return await utils.res.send({status:404, error: 'That userId or Key was not found in the Database.'})
    } else {
        let user = await getUser(await utils.decoder(await cdb[await utils.encoder('userId')]))
        let checkSuspend = (await toBoolean(await utils.decoder(cdb[await utils.encoder('suspended')]||'false')))
        logger.send(`The key for \`@${user.username} (${user.id})\` has been ${!checkSuspend ? 'suspended' : 'reinstated'}!`)
        await utils.res.send({status:200, details: !checkSuspend ? 'suspended' : 'reinstated', id:user.id})
        return await utils.db.set(`${await utils.encoder('ApiTokens')}.${await utils.encoder(opt)}.${await utils.encoder('suspended')}`, await utils.encoder(`${!checkSuspend}`))
    }
 }
 else {
     for (const [key, value] of Object.entries(dbe)) {
         if(await utils.decoder(value[await utils.encoder('userId')]||'undefined') === opt) {
            let checkSuspend = (await toBoolean(await utils.decoder(value[await utils.encoder('suspended')]||'false')))
            await utils.res.send({status: 200, details: !checkSuspend ? 'suspended' : 'reinstated', id:re.id})
            logger.send(`The key for \`@${re.username} (${re.id})\` has been ${!checkSuspend ? 'suspended' : 'reinstated'}!`)
            return await utils.db.set(`${await utils.encoder('ApiTokens')}.${key}.${await utils.encoder('suspended')}`, await utils.encoder(`${!checkSuspend}`))
         }  else {
            if(Object.keys(dbe)[Object.keys(dbe).length-1] === key) /* if its last one*/ return await utils.res.send({status:404, error: 'That userId or Key was not found in the Database.', ephemeral:true})
        }

     }
 }


    }

}