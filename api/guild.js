module.exports = async (req, res, Discord, fetch, config, t) => {
    try {
        let gid = req.headers['guild-id']
        //if(!gid) return res.send({status:400, error: 'A guild-id is required in request headers', api: Object.assign(config.info, {ping : `${(Date.now() - t)}ms`})})
let re = await fetch(`${(gid && gid !== 'null' && gid !== null) ? `https://discord.com/api/v10/guilds/${gid}?with_counts=true` : `https://discord.com/api/v10/users/@me/guilds`}`, {
method: 'GET',
headers: {
Authorization: `Bot ${req.headers['bot-token']}`,
}
}).then(res=>res.json())

if(gid && gid !== null && gid !== 'null') {
if(!re?.id) return res.send({status:404, error: 'Guild cannot be found', api: Object.assign(config.info, {ping : `${(Date.now() - t)}ms`})})


if(re?.icon)                    re.icon = re?.icon ? 'https://cdn.discordapp.com/icons/'+gid+'/'+re?.icon+(re?.icon?.startsWith(`a_`) ? '.gif' : '.jpg') :null || null;
if(re?.banner)                  re.banner = re?.banner ? 'https://cdn.discordapp.com/banners/'+gid+'/'+re?.banner+(re?.banner?.startsWith(`a_`) ? '.gif' : '.jpg') : null || null;
if(re?.system_channel_flags)    re.system_channel_flags =new Discord.SystemChannelFlagsBitField(re?.system_channel_flags).toArray() ||null;
if(re?.splash)                  re.splash = re?.splash ? 'https://cdn.discordapp.com/splashes/'+gid+'/'+re?.splash+(re?.splash?.startsWith(`a_`) ? '.gif' : '.jpg') :null || null;
if(re?.discovery_splash)        re.discovery_splash = re?.discovery_splash ? 'https://cdn.discordapp.com/discovery_splashes/'+gid+'/'+re?.discovery_splash+(re?.discovery_splash?.startsWith(`a_`) ? '.gif' : '.jpg') :null || null;



if(!re?.vanity_url_code)        delete re.vanity_url_code;
delete re.roles;
delete re.emojis;
delete re.stickers;

res.send({status:200, details:  re, api: Object.assign(config.info, {ping : `${(Date.now() - t)}ms`}) })

}
else {
let bar = []
    for (const guild of re) {
        let ree = await fetch(`https://discord.com/api/v10/guilds/${guild.id}?with_counts=true`, {
            method: 'GET',
            headers: {
            Authorization: `Bot ${req.headers['bot-token']}`,
            }
            }).then((resp)=>resp.json())
            if(ree?.icon)                    ree.icon = ree?.icon ? 'https://cdn.discordapp.com/icons/'+ree.id+'/'+ree?.icon+(ree?.icon?.startsWith(`a_`) ? '.gif' : '.jpg') :null || null;
            if(ree?.banner)                  ree.banner = ree?.banner ? 'https://cdn.discordapp.com/banners/'+ree.id+'/'+ree?.banner+(ree?.banner?.startsWith(`a_`) ? '.gif' : '.jpg') : null || null;
            if(ree?.system_channel_flags)    ree.system_channel_flags =new Discord.SystemChannelFlagsBitField(re?.system_channel_flags).toArray() ||null;
            if(ree?.splash)                  ree.splash = ree?.splash ? 'https://cdn.discordapp.com/splashes/'+ree.id+'/'+ree?.splash+(ree?.splash?.startsWith(`a_`) ? '.gif' : '.jpg') :null || null;
            if(ree?.discovery_splash)        ree.discovery_splash = ree?.discovery_splash ? 'https://cdn.discordapp.com/discovery_splashes/'+ree.id+'/'+ree?.discovery_splash+(ree?.discovery_splash?.startsWith(`a_`) ? '.gif' : '.jpg') :null || null;
            
            
            
            if(!ree?.vanity_url_code)        delete ree.vanity_url_code;
            delete ree.roles;
            delete ree.emojis;
            delete ree.stickers;
        
        bar.push(ree)
    }
            res.send({status:200, details: bar, api: Object.assign(config.info, {ping : `${(Date.now() - t)}ms`}) })    
}


} catch (e) {
res.send({status:400, error: `${config.errors.fatal}`, api: Object.assign(config.info, {ping : `${(Date.now() - t)}ms`})})
}
}