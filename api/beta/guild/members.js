module.exports = {
    log: true,
    rule:true,
    headers: ['guild-id', 'bot-token'], //only put REQUIRED headers.
    access: 'PUBLIC',
    endpoint: async (utils) => {
        let u = new URLSearchParams(utils.req.url);
        let simple = u.get('/release/guild/members?simple')
        let mid = utils.req.headers['member'] || null
        let result;
        let re;

        // dont you just love Discords 1k fetch limit? I sure fucking dont!

        
        if(!mid || mid === 'null') {
        let guildInfo = await utils.fetch(`https://discord.com/api/v10/guilds/${utils.req.headers['guild-id']}?with_counts=true`, {
            method: 'GET',
            headers: {
                Authorization: `Bot ${utils.req.headers['bot-token']}`
            }
        }).then(res => res.json())

        let memberCount = guildInfo?.approximate_member_count


        let lastId;

        re = [];




        for (let x = memberCount/1000; x > 0;x--) {
             ree = await utils.fetch(`https://discord.com/api/v10/guilds/${utils.req.headers['guild-id']}/members?limit=1000${lastId ? `&after=${lastId}` : ``}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bot ${utils.req.headers['bot-token']}`
                }    
            }).then(res=>res.json())
            if(!Array.isArray(ree)) console.log(ree)
            await ree?.forEach(r=> re.push(r))
            console.log(ree[ree.length-1].user.id)
            lastId = ree[ree.length-1].user.id
            console.log(lastId)
        }


} else {
re = await utils.fetch(`https://discord.com/api/v10/guilds/${utils.req.headers['guild-id']}/members/${mid}`, {
    method: 'GET',
    headers: {
        Authorization: `Bot ${utils.req.headers['bot-token']}`
    }
}).then(res => res.json())    
    }



        if(simple && simple === 'true') {
            if(!Array.isArray(re)) return utils.res.send({ status: 400, details: 'Parameter `simple` can only be used on member list.', api: Object.assign(utils.config.info, { ping: `${(Date.now() - utils.time)}ms` }) })
            result = await utils.resolver(re, 'simple');
        } else result = await utils.resolver(re, 'default');

        utils.res.send({ status: 200, details: result, api: Object.assign(utils.config.info, { ping: `${(Date.now() - utils.time)}ms` }) })   
    }
}