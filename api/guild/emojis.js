module.exports = async (req, res, Discord, fetch, config, t) => {
            let gid = req.headers['guild-id']
            let eid = req.headers['emoji'] || null
            if(!gid) return res.send({status:400, error: `${config.header_errors.guildId}`, api: Object.assign(config.info, {ping : `${(Date.now() - t)}ms`})})
            let re = await fetch(`https://discord.com/api/v10/guilds/${gid}/emojis`, {
method: 'GET',
headers: {
Authorization: `Bot ${req.headers['bot-token']}`
}
}).then(res=>res.json())

re?.forEach(r => {
    if(re[re.indexOf(r)]?.user?.public_flags || re[re.indexOf(r)]?.user?.public_flags===0)         re[re.indexOf(r)].user.public_flags = new Discord.UserFlagsBitField(re[re.indexOf(r)].user.public_flags)?.toArray()
    if(re[re.indexOf(r)]?.user?.banner)               re[re.indexOf(r)].user.banner = re[re.indexOf(r)].user.banner ? 'https://cdn.discordapp.com/banners/'+re[re.indexOf(r)].user.id+'/'+re[re.indexOf(r)].user.banner+(re[re.indexOf(r)].user.banner.startsWith(`a_`) ? '.gif' : '.jpg') : null || null
    if(re[re.indexOf(r)]?.user?.avatar)               re[re.indexOf(r)].user.avatar = re[re.indexOf(r)].user.avatar ? 'https://cdn.discordapp.com/avatars/'+re[re.indexOf(r)].user.id+'/'+re[re.indexOf(r)].user.avatar+(re[re.indexOf(r)].user.avatar.startsWith(`a_`) ? '.gif' : '.jpg') :null || null 
    if(re[re.indexOf(r)]?.user?.avatar_decoration)    re[re.indexOf(r)].user.avatar_decoration = re[re.indexOf(r)].user.avatar_decoration ? 'https://cdn.discordapp.com/avatar-decorations/'+re[re.indexOf(r)].user.id+'/'+re[re.indexOf(r)].user.avatar_decoration : null|| null 
    })


if(!eid || eid === 'null') {
    res.send({status:200, details: re, api: Object.assign(config.info, {ping : `${(Date.now() - t)}ms`}) })
}
else {
    res.send({status:200, details: re?.filter(e => (eid ? (eid === e.id || eid.replaceAll(':','') === e.name) : e)), api: Object.assign(config.info, {ping : `${(Date.now() - t)}ms`}) })
}


}