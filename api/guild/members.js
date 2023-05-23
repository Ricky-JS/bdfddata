module.exports = {
    log: true,
    headers: ['guild-id', 'bot-token'], //only put REQUIRED headers.
    access: 'PUBLIC',
    endpoint: async (utils) => {
        let u = new URLSearchParams(utils.req.url);
        let simple = u.get('/guild/members?simple')
        let mid = utils.req.headers['member'] || null
        let result;
        let re = await utils.fetch(((!mid || mid === 'null') ? `https://discord.com/api/v10/guilds/${utils.req.headers['guild-id']}/members?limit=1000` : `https://discord.com/api/v10/guilds/${utils.req.headers['guild-id']}/members/${mid}`), {
            method: 'GET',
            headers: {
                Authorization: `Bot ${utils.req.headers['bot-token']}`
            }
        }).then(res => res.json())

        if(simple && simple === 'true') {
            if(!Array.isArray(re)) return utils.res.send({ status: 400, error: 'Parameter `simple` can only be used on member list.', api: Object.assign(utils.config.info, { ping: `${(Date.now() - utils.time)}ms` }) })
            result = await utils.resolvers.guild_members_simple(re);
        } else result = await utils.resolvers.guild_members(re);

        utils.res.send({ status: 200, details: result, api: Object.assign(utils.config.info, { ping: `${(Date.now() - utils.time)}ms` }) })
       }
}