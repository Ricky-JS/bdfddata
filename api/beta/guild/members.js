module.exports = {
    log: true,
    rule: true,
    headers: ['guild-id', 'bot-token'], //only put REQUIRED headers.
    access: 'PUBLIC',
    endpoint: async (utils) => {
        let u = new URLSearchParams(utils.req.url);
        let simple = u.get(utils.req.url.split('=')[0])
        let mid = utils.req.headers['member'] || null
        let result;
        let re;

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

        for (let x = Math.ceil(memberCount / 1000); x > 0; x--) {
            let response = await utils.fetch(`https://discord.com/api/v10/guilds/${utils.req.headers['guild-id']}/members?limit=1000${lastId ? `&after=${lastId}` : ``}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bot ${utils.req.headers['bot-token']}`
                }
            });
        
            const remaining = response.headers.get('X-RateLimit-Remaining');
            const resetTime = response.headers.get('X-RateLimit-Reset') * 1000;
        
            if (remaining === '0') {
                const now = Date.now();
                const waitTime = resetTime - now;
        
                if (waitTime > 0) {
                    await new Promise(resolve => setTimeout(resolve, waitTime));
                }
                    response = await utils.fetch(`https://discord.com/api/v10/guilds/${utils.req.headers['guild-id']}/members?limit=1000${lastId ? `&after=${lastId}` : ``}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bot ${utils.req.headers['bot-token']}`
                    }
                });
            }
        
            const ree = await response.json();
            if (!Array.isArray(ree)) return utils.res.send({ status: 400, details: 'Invalid Array Assessment', api: Object.assign(utils.config.info, { ping: `${(Date.now() - utils.time)}ms` }) });
        
            ree?.forEach(r => re.push(r));
            lastId = ree[ree.length - 1].user.id;
        }
} else {
re = await utils.fetch(`https://discord.com/api/v10/guilds/${utils.req.headers['guild-id']}/members/${mid}`, {
    method: 'GET',
    headers: {
        Authorization: `Bot ${utils.req.headers['bot-token']}`
    }
}).then(res => res.json())    
    }

    if (utils.req.headers['exclude'] || null) {
        if (Array.isArray(re)) {
        re.forEach(item => utils.handleCustomExclusions(item, utils.req.headers['exclude'] || null));
    } else {
        utils.handleCustomExclusions(re, utils.req.headers['exclude'] || null);
    }
}
        if(simple && simple === 'true') {
            if(!Array.isArray(re)) return utils.res.send({ status: 400, details: 'Parameter `simple` can only be used on member list.', api: Object.assign(utils.config.info, { ping: `${(Date.now() - utils.time)}ms` }) })
            result = await utils.resolver(re, 'simple');
        } else result = await utils.resolver(re, 'default');

        utils.res.send({ status: 200, details: result, api: Object.assign(utils.config.info, { ping: `${(Date.now() - utils.time)}ms` }) })   
    }
}