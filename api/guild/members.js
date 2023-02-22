module.exports = async (req, res, Discord, fetch, config, t) => {
    let gid = req.headers['guild-id']
    let mid = req.headers['member'] || null
    if (!gid) return res.send({ status: 400, error: `${config.errors.headers.guildId}`, api: Object.assign(config.info, {ping : `${(Date.now() - t)}ms`}) })
    let re = await fetch(`https://discord.com/api/v10/guilds/${gid}/members?limit=300`, {
        method: 'GET',
        headers: {
            Authorization: `Bot ${req.headers['bot-token']}`
        }
    }).then(res => res.json())
    
    re?.forEach(r => {
        if(r.joined_at) r.joined_at = (new Date(r.joined_at) / 1000)?.toFixed() || null
        if(r.premium_since) r.premium_since = (new Date(r.premium_since) / 1000)?.toFixed() || null

let flags = new Discord.UserFlagsBitField(r?.user?.public_flags)?.toArray()  ?? []
if(r?.avatar)               re.avatar = r?.avatar ? 'https://cdn.discordapp.com/avatars/'+r?.user?.id+'/'+r?.avatar+(r?.avatar?.startsWith(`a_`) ? '.gif' : '.jpg') :null || null 
if(r?.user?.avatar?.startsWith(`a_`) || r?.user?.avatar_decoration || r?.avatar) flags.push('NitroSubscriber')
            
if(r?.user?.public_flags || r.user.public_flags === 0)         r.user.public_flags = flags ||null
if(r?.user?.avatar)               r.user.avatar = r?.user?.avatar ? 'https://cdn.discordapp.com/avatars/'+r?.user?.id+'/'+r?.user?.avatar+(r?.user?.avatar?.startsWith(`a_`) ? '.gif' : '.jpg') :null || null 
if(r?.user?.avatar_decoration)    r.user.avatar_decoration = r?.user?.avatar_decoration ? 'https://cdn.discordapp.com/avatar-decorations/'+r?.user?.id+'/'+r?.user?.avatar_decoration : null|| null 
        
            })

   if (!mid || mid === 'null') {
        res.send({ status: 200, details: re, api: Object.assign(config.info, {ping : `${(Date.now() - t)}ms`}) })
    }
    else {
        res.send({ status: 200, details: re?.filter(m => (mid ? (mid === m?.user?.id || mid === m?.user?.username) : m)), api: Object.assign(config.info, {ping : `${(Date.now() - t)}ms`}) })
    }
}
