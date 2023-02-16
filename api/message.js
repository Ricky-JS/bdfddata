module.exports = async (req, res, Discord, fetch, config, t) => {
        let mid = req.headers['msg-id']
        let cid = req.headers['chan-id']
        if(!cid) return res.send({status:400, error: `${config.errors.headers.chanId}`, api: Object.assign(config.info, {ping : `${(Date.now() - t)}ms`})})
        if(!mid) return res.send({status:400, error: `${config.errors.headers.msgId}`, api: Object.assign(config.info, {ping : `${(Date.now() - t)}ms`})})

let re = await fetch(`https://discord.com/api/v10/channels/${cid}/messages/${mid}`, {
method: 'GET',
headers: {
Authorization: `Bot ${req.headers['bot-token']}`,
}
}).then(res=>res.json())
let flags = new Discord.UserFlagsBitField(re?.author?.public_flags)?.toArray()
if(re?.author?.avatar?.startsWith(`a_`) || re?.author?.avatar_decoration) flags.push('NitroSubscriber')


if(re?.author?.public_flags || re?.author?.public_flags ===0)      re.author.public_flags = flags ||null
if(re?.flags || re?.flags===0)                                     re.flags = new Discord.MessageFlagsBitField(re.flags).toArray()
if(re?.type || re?.type===0)                                       re.type = Discord.MessageType[re.type]
if(re?.author?.avatar)               re.author.avatar = re?.author.avatar ? 'https://cdn.discordapp.com/avatars/'+re.author.id+'/'+re?.author.avatar+(re?.author.avatar?.startsWith(`a_`) ? '.gif' : '.jpg') :null || null 
if(re?.author?.avatar_decoration)    re.author.avatar_decoration = re?.author.avatar_decoration ? 'https://cdn.discordapp.com/avatar-decorations/'+re.author.id+'/'+re.author.avatar_decoration : null|| null 
if(re?.timestamp)                    re.timestamp = Math.floor(new Date(re.timestamp).getTime() / 1000)
if(re?.edited_timestamp)                    re.edited_timestamp = Math.floor(new Date(re.edited_timestamp).getTime() / 1000)





    res.send({status:200, details: re, api: Object.assign(config.info, {ping : `${(Date.now() - t)}ms`})})
}