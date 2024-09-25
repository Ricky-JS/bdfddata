const Discord = require('discord.js')
module.exports = async (re) => {
    if (Array.isArray(re)) {
        re?.forEach(r => {
            let flags = new Discord.UserFlagsBitField(r?.creator?.public_flags)?.toArray() ?? []
            if (r?.creator?.banner || r?.creator?.avatar?.startsWith(`a_`) || r?.creator?.avatar_decoration) flags.push('NitroSubscriber')

            if (r?.scheduled_start_time) r.scheduled_start_time = Math.floor(new Date(r.scheduled_start_time).getTime() / 1000)
            if (r?.scheduled_end_time) r.scheduled_end_time = Math.floor(new Date(r.scheduled_end_time).getTime() / 1000)
            if (r?.privacy_level) r.privacy_level = Discord.GuildScheduledEventPrivacyLevel[r.privacy_level]
            if (r?.status) r.status = Discord.GuildScheduledEventStatus[r.status]
            if (r?.entity_type) r.entity_type = Discord.GuildScheduledEventEntityType[r.entity_type]
            if (r?.image) r.image = r?.image ? 'https://cdn.discordapp.com/guild-events/' + r?.id + '/' + r?.image : null || null

            if (r?.creator?.public_flags || r?.creator?.public_flags === 0) r.creator.public_flags = flags || null
            if (r?.creator?.avatar) r.creator.avatar = r?.creator?.avatar ? 'https://cdn.discordapp.com/avatars/' + r?.creator?.id + '/' + r?.creator?.avatar + (r?.creator?.avatar?.startsWith(`a_`) ? '.gif' : '.png') : null || null
            if (r?.creator?.avatar_decoration) r.creator.avatar_decoration = r?.creator?.avatar_decoration ? 'https://cdn.discordapp.com/avatar-decorations/' + r?.creator?.id + '/' + r?.creator?.avatar_decoration : null || null
            })
    } else {
        let flags = new Discord.UserFlagsBitField(re?.creator?.public_flags)?.toArray() ?? []
        if (re?.creator?.banner || re?.creator?.avatar?.startsWith(`a_`) || re?.creator?.avatar_decoration) flags.push('NitroSubscriber')
        if (re?.scheduled_start_time) re.scheduled_start_time = Math.floor(new Date(re.scheduled_start_time).getTime() / 1000)
        if (re?.scheduled_end_time) re.scheduled_end_time = Math.floor(new Date(re.scheduled_end_time).getTime() / 1000)
        if (re?.privacy_level) re.privacy_level = Discord.GuildScheduledEventPrivacyLevel[re.privacy_level]
        if (re?.status) re.status = Discord.GuildScheduledEventStatus[re.status]
        if (re?.entity_type) re.entity_type = Discord.GuildScheduledEventEntityType[re.entity_type]
        if (re?.image) re.image = re?.image ? 'https://cdn.discordapp.com/guild-events/' + re?.id + '/' + re?.image : null || null

        if (re?.creator?.public_flags || re?.creator?.public_flags === 0) re.creator.public_flags = flags || null
        if (re?.creator?.avatar) re.creator.avatar = re?.creator?.avatar ? 'https://cdn.discordapp.com/avatars/' + re?.creator?.id + '/' + re?.creator?.avatar + (re?.creator?.avatar?.startsWith(`a_`) ? '.gif' : '.png') : null || null
        if (re?.creator?.avatar_decoration) re.creator.avatar_decoration = re?.creator?.avatar_decoration ? 'https://cdn.discordapp.com/avatar-decorations/' + re?.creator?.id + '/' + re?.creator?.avatar_decoration : null || null
    }
    return re;
}