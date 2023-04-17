module.exports = {
    log: true,
    headers: ['msg-id', 'chan-id', 'bot-token'], //only put REQUIRED headers.
    access: 'PUBLIC',
    endpoint: async (req, res, Discord, fetch, config, t, resolvers) => {
        let re;
        let res2;
     if(req.body['user-id']) {
        if(req.body['emoji']) {
        // yes emoji, yes user     --- DELETE SPECIFIED REACTION
        re = await fetch(`https://discord.com/api/v10/channels/${req.headers['chan-id']}/messages/${req.headers['msg-id']}/reactions/${req.body['emoji']}/${req.body['user-id']}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bot ${req.headers['bot-token']}`,
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
            return res.send({status: 406, error: 'Invalid formation of body paramaters.', api: Object.assign(config.info, { ping: `${(Date.now() - t)}ms` }) })
        }
     } else {
        if(req.body['emoji']) {
            // yes emoji, no user --- DELETE ALL OF 1 EMOJI
           re = await fetch(`https://discord.com/api/v10/channels/${req.headers['chan-id']}/messages/${req.headers['msg-id']}/reactions/${req.body['emoji']}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bot ${req.headers['bot-token']}`,
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
                re = await fetch(`https://discord.com/api/v10/channels/${req.headers['chan-id']}/messages/${req.headers['msg-id']}/reactions`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bot ${req.headers['bot-token']}`,
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
        res.send({ status: 200, details: re, api: Object.assign(config.info, { ping: `${(Date.now() - t)}ms` }) })
    }
}