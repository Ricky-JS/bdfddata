module.exports = {
    log: true,
    headers: ['guild-id', 'bot-token'], //only put REQUIRED headers.
    access: 'PUBLIC',
    endpoint: async (req, res, Discord, fetch, config, t, resolvers) => {
        let u = new URLSearchParams(req.url);
        let simple = u.get('/guild/channels?simple')
        let cid = req.headers['channel'] || null
        let result;
        let re = await fetch(((!cid || cid === 'null') ? `https://discord.com/api/v10/guilds/${req.headers['guild-id']}/channels` : `https://discord.com/api/v10/channels/${cid}`), {
            method: 'GET',
            headers: {
                Authorization: `Bot ${req.headers['bot-token']}`
            }
        }).then(res => res.json())

      
        if(simple && simple === 'true') {
            if(!Array.isArray(re)) return res.send({ status: 400, details: 'Parameter `simple` can only be used on member list.', api: Object.assign(config.info, { ping: `${(Date.now() - t)}ms` }) })
            result = await resolvers.guild_channels_simple(re);
        } else result = await resolvers.guild_channels(re);

         res.send({ status: 200, details: result, api: Object.assign(config.info, { ping: `${(Date.now() - t)}ms` }) })
       }
}