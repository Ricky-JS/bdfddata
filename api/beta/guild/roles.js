module.exports = {
    log: true,
    rule:true,
    headers: ['guild-id', 'bot-token'], //only put REQUIRED headers.
    access: 'PUBLIC',
    endpoint: async (utils) => {
        let u = new URLSearchParams(utils.req.url);
        let simple = u.get('/beta/guild/roles?simple')
        let result;

        let rid = utils.req.headers['role'] || null
        let re = await utils.fetch(`https://discord.com/api/v10/guilds/${utils.req.headers['guild-id']}/roles`, {
            method: 'GET',
            headers: {
                Authorization: `Bot ${utils.req.headers['bot-token']}`
            }
        }).then(res => res.json())

        let ree = (!rid || rid === 'null' || rid === null) ? re : re?.filter(r => (rid ? (rid === r.id || rid === r.name) : r))[0];


        if(simple && simple === 'true') {
            if(!Array.isArray(ree)) return utils.res.send({ status: 400, details: 'Parameter `simple` can only be used on role list.', api: Object.assign(utils.config.info, { ping: `${(Date.now() - utils.time)}ms` }) })
            result = await utils.resolver(ree, 'simple');
        } else result = await utils.resolver(ree, 'default');


        utils.res.send({ status: 200, details: result, api: Object.assign(utils.config.info, { ping: `${(Date.now() - utils.time)}ms` }) })
    }
}