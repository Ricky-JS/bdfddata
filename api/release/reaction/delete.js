module.exports = {
    log: true,
    rule: false,
    headers: ['msg-id', 'chan-id', 'bot-token'], //only put REQUIRED headers.
    access: 'PUBLIC',
    endpoint: async (utils) => {
        let re;
        let res2;
     if(utils.req.body['user-id']) {
        if(utils.req.body['emoji']) {
        // yes emoji, yes user     --- DELETE SPECIFIED REACTION
        re = await utils.fetch(`https://discord.com/api/v10/channels/${utils.req.headers['chan-id']}/messages/${utils.req.headers['msg-id']}/reactions/${utils.req.body['emoji']}/${utils.req.body['user-id']}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bot ${utils.req.headers['bot-token']}`,
            }
        }).then(async res => {
            res2 = await res.clone(); 
            try {
            return await res?.json()
            } catch {
                return await res2.text
            }
    })
        } else {
            // no emoji, yes user --- ERROR!
            return utils.res.send({status: 406, error: 'Invalid formation of body paramaters.', api: Object.assign(utils.config.info, { ping: `${(Date.now() - utils.time)}ms` }) })
        }
     } else {
        if(utils.req.body['emoji']) {
            // yes emoji, no user --- DELETE ALL OF 1 EMOJI
           re = await utils.fetch(`https://discord.com/api/v10/channels/${utils.req.headers['chan-id']}/messages/${utils.req.headers['msg-id']}/reactions/${utils.req.body['emoji']}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bot ${utils.req.headers['bot-token']}`,
                }
            }).then(async res => {
            res2 = await res.clone(); 
            try {
            return await res?.json()
            } catch {
                return await res2.text
            }
    })
            } else {
                //no emoji, no user     --- DELETE ALL
                re = await utils.fetch(`https://discord.com/api/v10/channels/${utils.req.headers['chan-id']}/messages/${utils.req.headers['msg-id']}/reactions`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bot ${utils.req.headers['bot-token']}`,
                }
            }).then(async res => {
            res2 = await res.clone(); 
            try {
            return await res?.json()
            } catch {
                return await res2.text
            }
    })
            }
     }
     utils.res.send({ status: 200, details: re, api: Object.assign(utils.config.info, { ping: `${(Date.now() - utils.time)}ms` }) })
    }
}