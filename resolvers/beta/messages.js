const Discord = require('discord.js')
module.exports = async (re) => {
    if (Array.isArray(re)) {
        re?.forEach(ree => {
    let flags = new Discord.UserFlagsBitField(ree?.author?.public_flags)?.toArray()
    if (ree?.author?.avatar?.startsWith(`a_`) || ree?.author?.avatar_decoration) flags.push('NitroSubscriber')
    if (ree?.author?.public_flags || ree?.author?.public_flags === 0) ree.author.public_flags = flags || null
    if (ree?.flags || ree?.flags === 0) ree.flags = new Discord.MessageFlagsBitField(ree.flags).toArray()
    if (ree?.type || ree?.type === 0) ree.type = Discord.MessageType[ree.type]
    if (ree?.author?.avatar) ree.author.avatar = ree?.author.avatar ? 'https://cdn.discordapp.com/avatars/' + ree.author.id + '/' + ree?.author.avatar + (ree?.author.avatar?.startsWith(`a_`) ? '.gif' : '.png') : null || null
    if (ree?.author?.avatar_decoration) ree.author.avatar_decoration = ree?.author.avatar_decoration ? 'https://cdn.discordapp.com/avatar-decorations/' + ree.author.id + '/' + ree.author.avatar_decoration : null || null
    if (ree?.timestamp) ree.timestamp = Math.floor(new Date(ree.timestamp).getTime() / 1000)
    if (ree?.edited_timestamp) ree.edited_timestamp = Math.floor(new Date(ree.edited_timestamp).getTime() / 1000)
   
})

} else {
    let flags = new Discord.UserFlagsBitField(re?.author?.public_flags)?.toArray()
    if (re?.author?.avatar?.startsWith(`a_`) || re?.author?.avatar_decoration) flags.push('NitroSubscriber')
    if (re?.author?.public_flags || re?.author?.public_flags === 0) re.author.public_flags = flags || null
    if (re?.flags || re?.flags === 0) re.flags = new Discord.MessageFlagsBitField(re.flags).toArray()
    if (re?.type || re?.type === 0) re.type = Discord.MessageType[re.type]
    if (re?.author?.avatar) re.author.avatar = re?.author.avatar ? 'https://cdn.discordapp.com/avatars/' + re.author.id + '/' + re?.author.avatar + (re?.author.avatar?.startsWith(`a_`) ? '.gif' : '.png') : null || null
    if (re?.author?.avatar_decoration) re.author.avatar_decoration = re?.author.avatar_decoration ? 'https://cdn.discordapp.com/avatar-decorations/' + re.author.id + '/' + re.author.avatar_decoration : null || null
    if (re?.timestamp) re.timestamp = Math.floor(new Date(re.timestamp).getTime() / 1000)
    if (re?.edited_timestamp) re.edited_timestamp = Math.floor(new Date(re.edited_timestamp).getTime() / 1000)
}
          return re;
}