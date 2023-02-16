module.exports = async (req, res, Discord, fetch, config, t) => {
            let tkn = req.headers['bot-token'] || null
            let url = req.headers['url'] || null
            let method = req.headers['api-method'] || 'GET'
            var heds = JSON.parse(JSON.stringify(req.headers['cheaders'] || {}))
            var bods = JSON.parse(JSON.stringify(req.headers['cbody'] || {}))
            let hds = Object.assign(heds, {Authorization : `Bot ${tkn}`})
     

            /* DO NOT DELETE */
//            if(tkn !== config.token) return res.send({status:400, error: 'Due to a ongoing major bug, this endpoint is closed for testing.', api: { warning: "We will soon require API-Keys, Please join the Discord for more info!", ping: `${(Date.now() - t)}ms`, owner: `${config.info.owner}`, discord: `${config.info.discord}`}})
            /* DO NOT DELETE */


            if(!url) return res.send({status:400, error: `${config.errors.headers.custom.url}`, api: Object.assign(config.info, {ping : `${(Date.now() - t)}ms`})})
            if(!["GET", "POST", "PATCH", "PUT", "DELETE"].includes(method)) return res.send({status:400, error: `${config.errors.headers.custom.method}`, api: Object.assign(config.info, {ping : `${(Date.now() - t)}ms`})})
            if(!url.startsWith('https://discord.com/api/v10')) return res.send({status:400, error: `${config.errors.headers.custom.disu}`, api: Object.assign(config.info, {ping : `${(Date.now() - t)}ms`})})
let res2;
let re = await fetch(`${url}`, {
method: method,
headers: hds
}).then(async res=>{res2 = res.clone(); try {return await res.json()} catch {return await res2.text()}})
    res.send({status:200, details: re, api: Object.assign(config.info, {ping : `${(Date.now() - t)}ms`}) })
}