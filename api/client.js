module.exports = async (req, res, Discord, fetch, config, t) => {
        let re = await fetch(`https://discord.com/api/v10/oauth2/applications/@me`, {
            method: 'GET',
            headers: {
                Authorization: `Bot ${req.headers['bot-token']}`
            }
        }).then(res => res.json())

        if (re?.icon) re.icon = 'https://cdn.discordapp.com/app-icons/' + re.owner.id + '/' + re.icon + (re.icon.startsWith(`a_`) ? '.gif' : '.jpg') || null
        if (re?.install_params?.permissions) re.install_params.permissions = new Discord.PermissionsBitField(re.install_params.permissions).toArray() || null
        if (re?.owner?.avatar) re.owner.avatar = 'https://cdn.discordapp.com/avatars/' + re.owner.id + '/' + re.owner.avatar + (re.owner.avatar.startsWith(`a_`) ? '.gif' : '.jpg') || null
        if (re?.owner?.avatar_decoration) re.owner.avatar_decoration = 'https://cdn.discordapp.com/avatar-decorations/' + re.owner.id + '/' + re.owner.avatar_decoration || null
        if (re?.owner?.public_flags) re.owner.public_flags = new Discord.UserFlagsBitField(re.owner.public_flags).toArray()
        if (re?.owner?.flags) re.owner.flags = new Discord.UserFlagsBitField(re.owner.flags)?.toArray()
        if (re?.flags) re.flags = new Discord.ApplicationFlagsBitField(re.flags)?.toArray() || null
        if (re?.team?.icon) re.team.icon = 'https://cdn.discordapp.com/team-icons/' + re.team.id + '/' + re.team.icon + (re.team.icon.startsWith(`a_`) ? '.gif' : '.jpg') || null

        if (re?.team?.members) re.team.members.forEach(m => {
            if (re.team.members[re.team.members.indexOf(m)]?.user?.avatar) re.team.members[re.team.members.indexOf(m)].user.avatar = 'https://cdn.discordapp.com/avatars/' + re.team.members[re.team.members.indexOf(m)].user.id + '/' + re.team.members[re.team.members.indexOf(m)].user.avatar + (re.team.members[re.team.members.indexOf(m)].user.avatar.startsWith(`a_`) ? '.gif' : '.jpg') || null
            if (re.team.members[re.team.members.indexOf(m)]?.user?.avatar_decoration) re.team.members[re.team.members.indexOf(m)].user.avatar_decoration = 'https://cdn.discordapp.com/avatar-decorations/' + re.team.members[re.team.members.indexOf(m)].user.id + '/' + re.team.members[re.team.members.indexOf(m)].user.avatar_decoration + (re.team.members[re.team.members.indexOf(m)].user.avatar_decoration.startsWith(`a_`) ? '.gif' : '.jpg') || null
            if (re.team.members[re.team.members.indexOf(m)]?.user?.public_flags) re.team.members[re.team.members.indexOf(m)].user.public_flags = re.team.members[re.team.members.indexOf(m)].user.public_flags = new Discord.UserFlagsBitField(re.team.members[re.team.members.indexOf(m)].user.public_flags).toArray()
        })
        delete re.verify_key;

        res.send({ status: 200, details: re, api: Object.assign(config.info, {ping : `${(Date.now() - t)}ms`}) })
}