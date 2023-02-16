module.exports = async (req, res, Discord, fetch, config, t) => {
let uid = req.headers['user-id']
if(!uid) return res.send({status:400, error: `${config.errors.headers.userId}`, api: Object.assign(config.info, {ping : `${(Date.now() - t)}ms`})})

         let re = await fetch(`https://discord.com/api/v10/users/${uid}`, {
        method: 'GET',
        headers: {
            Authorization: `Bot ${config.token}`
        }
}).then(res=>res.json())
         if(!re?.id) return res.send({status:404, error: 'User cannot be found', api: Object.assign(config.info, {ping : `${(Date.now() - t)}ms`})})
            let flags = new Discord.UserFlagsBitField(re?.public_flags)?.toArray()  ?? []
            if(re?.banner || re?.avatar?.startsWith(`a_`) || re?.avatar_decoration) flags.push('NitroSubscriber')
            
            
/*custom obj*/               re.tag = re?.username+'#'+re?.discriminator ||null
if(re?.public_flags || re.public_flags === 0)         re.public_flags = flags ||null
if(re?.banner)               re.banner = re?.banner ? 'https://cdn.discordapp.com/banners/'+uid+'/'+re?.banner+(re?.banner?.startsWith(`a_`) ? '.gif' : '.jpg') : null || null
if(re?.avatar)               re.avatar = re?.avatar ? 'https://cdn.discordapp.com/avatars/'+uid+'/'+re?.avatar+(re?.avatar?.startsWith(`a_`) ? '.gif' : '.jpg') :null || null 
if(re?.avatar_decoration)    re.avatar_decoration = re?.avatar_decoration ? 'https://cdn.discordapp.com/avatar-decorations/'+uid+'/'+re.avatar_decoration : null|| null 
if(re?.banner_color)         re.banner_color = re?.banner_color?.replace('#','') || null
        
        
        
      res.send({status:200, details: re, api: Object.assign(config.info, {ping : `${(Date.now() - t)}ms`}) })
}