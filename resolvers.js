const Discord = require('discord.js')
module.exports = class resolvers {

    async guild_bans(re) {
        if (Array.isArray(re)) {
            re?.forEach(r => {
                let flags = new Discord.UserFlagsBitField(r?.user?.public_flags)?.toArray() ?? []
                if (r?.avatar) re.avatar = r?.avatar ? 'https://cdn.discordapp.com/avatars/' + r?.user?.id + '/' + r?.avatar + (r?.avatar?.startsWith(`a_`) ? '.gif' : '.jpg') : null || null
                if (r?.user?.avatar?.startsWith(`a_`) || r?.user?.avatar_decoration || r?.avatar) flags.push('NitroSubscriber')

                if (r?.user?.public_flags || r?.user?.public_flags === 0) r.user.public_flags = flags || null
                if (r?.user?.avatar) r.user.avatar = r?.user?.avatar ? 'https://cdn.discordapp.com/avatars/' + r?.user?.id + '/' + r?.user?.avatar + (r?.user?.avatar?.startsWith(`a_`) ? '.gif' : '.jpg') : null || null
                if (r?.user?.avatar_decoration) r.user.avatar_decoration = r?.user?.avatar_decoration ? 'https://cdn.discordapp.com/avatar-decorations/' + r?.user?.id + '/' + r?.user?.avatar_decoration : null || null
            })
        } else {
            let flags = new Discord.UserFlagsBitField(re?.user?.public_flags)?.toArray() ?? []
            if (re?.avatar) re.avatar = re?.avatar ? 'https://cdn.discordapp.com/avatars/' + re?.user?.id + '/' + re?.avatar + (re?.avatar?.startsWith(`a_`) ? '.gif' : '.jpg') : null || null
            if (re?.user?.avatar?.startsWith(`a_`) || re?.user?.avatar_decoration || re?.avatar) flags.push('NitroSubscriber')

            if (re?.user?.public_flags || re?.user?.public_flags === 0) re.user.public_flags = flags || null
            if (re?.user?.avatar) re.user.avatar = re?.user?.avatar ? 'https://cdn.discordapp.com/avatars/' + re?.user?.id + '/' + re?.user?.avatar + (re?.user?.avatar?.startsWith(`a_`) ? '.gif' : '.jpg') : null || null
            if (re?.user?.avatar_decoration) re.user.avatar_decoration = re?.user?.avatar_decoration ? 'https://cdn.discordapp.com/avatar-decorations/' + re?.user?.id + '/' + re?.user?.avatar_decoration : null || null
        }
        return re;
    }



    async guild_members(re) {
        if (Array.isArray(re)) {
            re?.forEach(r => {
                if (r?.joined_at) r.joined_at = (new Date(r.joined_at) / 1000)?.toFixed() || null
                if (r?.premium_since) r.premium_since = (new Date(r.premium_since) / 1000)?.toFixed() || null
                if (r?.communication_disabled_until) r.communication_disabled_until = (new Date(r.communication_disabled_until) / 1000)?.toFixed() || null

                let flags = new Discord.UserFlagsBitField(r?.user?.public_flags)?.toArray() ?? []
                if (r?.avatar) re.avatar = r?.avatar ? 'https://cdn.discordapp.com/avatars/' + r?.user?.id + '/' + r?.avatar + (r?.avatar?.startsWith(`a_`) ? '.gif' : '.jpg') : null || null
                if (r?.user?.avatar?.startsWith(`a_`) || r?.user?.avatar_decoration || r?.avatar) flags.push('NitroSubscriber')

                if (r?.user?.public_flags || r?.user?.public_flags === 0) r.user.public_flags = flags || null
                if (r?.user?.avatar) r.user.avatar = r?.user?.avatar ? 'https://cdn.discordapp.com/avatars/' + r?.user?.id + '/' + r?.user?.avatar + (r?.user?.avatar?.startsWith(`a_`) ? '.gif' : '.jpg') : null || null
                if (r?.user?.avatar_decoration) r.user.avatar_decoration = r?.user?.avatar_decoration ? 'https://cdn.discordapp.com/avatar-decorations/' + r?.user?.id + '/' + r?.user?.avatar_decoration : null || null
            })
        } else {
            if (re?.joined_at) re.joined_at = (new Date(re.joined_at) / 1000)?.toFixed() || null
            if (re?.premium_since) re.premium_since = (new Date(re.premium_since) / 1000)?.toFixed() || null
            if (re?.communication_disabled_until) re.communication_disabled_until = (new Date(re.communication_disabled_until) / 1000)?.toFixed() || null
            let flags = new Discord.UserFlagsBitField(re?.user?.public_flags)?.toArray() ?? []
            if (re?.avatar) re.avatar = re?.avatar ? 'https://cdn.discordapp.com/avatars/' + re?.user?.id + '/' + re?.avatar + (re?.avatar?.startsWith(`a_`) ? '.gif' : '.jpg') : null || null
            if (re?.user?.avatar?.startsWith(`a_`) || re?.user?.avatar_decoration || re?.avatar) flags.push('NitroSubscriber')

            if (re?.user?.public_flags || re?.user?.public_flags === 0) re.user.public_flags = flags || null
            if (re?.user?.avatar) re.user.avatar = re?.user?.avatar ? 'https://cdn.discordapp.com/avatars/' + re?.user?.id + '/' + re?.user?.avatar + (re?.user?.avatar?.startsWith(`a_`) ? '.gif' : '.jpg') : null || null
            if (re?.user?.avatar_decoration) re.user.avatar_decoration = re?.user?.avatar_decoration ? 'https://cdn.discordapp.com/avatar-decorations/' + re?.user?.id + '/' + re?.user?.avatar_decoration : null || null
        }
        return re;
    }



    async guild_channels(re) {
        if (Array.isArray(re)) {
            re?.forEach(r => {
                if (r?.type) r.type = Discord.ChannelType[r.type] || null
                if (r?.flags) r.flags = Discord.ChannelFlags[r.flags] | null

                if (re[re.indexOf(r)]?.permission_overwrites) re[re.indexOf(r)]?.permission_overwrites.forEach(po => {
                    re[re.indexOf(r)].permission_overwrites[re[re.indexOf(r)].permission_overwrites.indexOf(po)].type = Discord.OverwriteType[re[re.indexOf(r)].permission_overwrites[re[re.indexOf(r)].permission_overwrites.indexOf(po)].type] || null
                    re[re.indexOf(r)].permission_overwrites[re[re.indexOf(r)].permission_overwrites.indexOf(po)].allow = new Discord.PermissionsBitField(re[re.indexOf(r)].permission_overwrites[re[re.indexOf(r)].permission_overwrites.indexOf(po)].allow)?.toArray() || null
                    re[re.indexOf(r)].permission_overwrites[re[re.indexOf(r)].permission_overwrites.indexOf(po)].deny = new Discord.PermissionsBitField(re[re.indexOf(r)].permission_overwrites[re[re.indexOf(r)].permission_overwrites.indexOf(po)].deny)?.toArray() || null

                })
            })
        } else {
            if (re?.type) re.type = Discord.ChannelType[re.type] || null
            if (re?.flags) re.flags = Discord.ChannelFlags[re.flags] | null

            if (re?.permission_overwrites) re?.permission_overwrites?.forEach(po => {
                re.permission_overwrites[re?.permission_overwrites?.indexOf(po)].type = Discord.OverwriteType[re.permission_overwrites[re?.permission_overwrites?.indexOf(po)].type] || null
                re.permission_overwrites[re?.permission_overwrites?.indexOf(po)].allow = new Discord.PermissionsBitField(re.permission_overwrites[re?.permission_overwrites?.indexOf(po)].allow)?.toArray() || null
                re.permission_overwrites[re?.permission_overwrites?.indexOf(po)].deny = new Discord.PermissionsBitField(re.permission_overwrites[re?.permission_overwrites?.indexOf(po)].deny)?.toArray() || null
            })
        }
        return re;
    }


    async guild_channels_simple(re){
        let channels= {};
for (var [key, value] of Object.entries(Discord.ChannelType)) {
    if(isNaN(key) && !['DM', 'GroupDM'].includes(key)) Object.assign(channels, JSON.parse(`{"${key}" : []}`))
}

for (const channel of re) {
    channels[Discord.ChannelType[channel.type]].push(channel.id)
}

let count = {}

for (const [key,value] of Object.entries(channels)) {
Object.assign(count, JSON.parse(`{"${key}": "${value.length}"}`))
}
        return {channels, count};
    }



    async guild_members_simple(re){
        let bots = [];
        let users = [];
        for await (const member of re) {
            if(member?.user?.bot) bots.push(member.user.id)
            else users.push(member.user.id)
        }
        let count = {
            users: users.length,
            bots: bots.length,
            total: users.length + bots.length
        }
        return {bots, count, users};
    }



    async guild_emojis(re) {
        if (Array.isArray(re)) {
            re?.forEach(r => {
                if (re[re.indexOf(r)]?.user?.public_flags || re[re.indexOf(r)]?.user?.public_flags === 0) re[re.indexOf(r)].user.public_flags = new Discord.UserFlagsBitField(re[re.indexOf(r)].user.public_flags)?.toArray()
                if (re[re.indexOf(r)]?.user?.banner) re[re.indexOf(r)].user.banner = re[re.indexOf(r)].user.banner ? 'https://cdn.discordapp.com/banners/' + re[re.indexOf(r)].user.id + '/' + re[re.indexOf(r)].user.banner + (re[re.indexOf(r)].user.banner.startsWith(`a_`) ? '.gif' : '.jpg') : null || null
                if (re[re.indexOf(r)]?.user?.avatar) re[re.indexOf(r)].user.avatar = re[re.indexOf(r)].user.avatar ? 'https://cdn.discordapp.com/avatars/' + re[re.indexOf(r)].user.id + '/' + re[re.indexOf(r)].user.avatar + (re[re.indexOf(r)].user.avatar.startsWith(`a_`) ? '.gif' : '.jpg') : null || null
                if (re[re.indexOf(r)]?.user?.avatar_decoration) re[re.indexOf(r)].user.avatar_decoration = re[re.indexOf(r)].user.avatar_decoration ? 'https://cdn.discordapp.com/avatar-decorations/' + re[re.indexOf(r)].user.id + '/' + re[re.indexOf(r)].user.avatar_decoration : null || null
            })
        } else {
            if (re?.user?.public_flags || re[re.indexOf(r)]?.user?.public_flags === 0) re.user.public_flags = new Discord.UserFlagsBitField(re.user.public_flags)?.toArray()
            if (re?.user?.banner) re.user.banner = re.user.banner ? 'https://cdn.discordapp.com/banners/' + re.user.id + '/' + re.user.banner + (re.user.banner.startsWith(`a_`) ? '.gif' : '.jpg') : null || null
            if (re?.user?.avatar) re.user.avatar = re.user.avatar ? 'https://cdn.discordapp.com/avatars/' + re.user.id + '/' + re.user.avatar + (re.user.avatar.startsWith(`a_`) ? '.gif' : '.jpg') : null || null
            if (re?.user?.avatar_decoration) re.user.avatar_decoration = re.user.avatar_decoration ? 'https://cdn.discordapp.com/avatar-decorations/' + re.user.id + '/' + re.user.avatar_decoration : null || null
        }
        return re;
    }



    async guild_roles(re) {
        if (Array.isArray(re)) {
            re?.forEach(r => {
                if (re[re.indexOf(r)]?.permissions) re[re.indexOf(r)].permissions = new Discord.PermissionsBitField(re[re.indexOf(r)].permissions)?.toArray()
                if (re[re.indexOf(r)]?.icon) re[re.indexOf(r)].icon = re[re.indexOf(r)].icon ? 'https://cdn.discordapp.com/role-icons/' + re[re.indexOf(r)].id + '/' + re[re.indexOf(r)].icon + '.jpg' : null || null
            })
        } else {
            if (re?.permissions) re.permissions = new Discord.PermissionsBitField(re.permissions)?.toArray()
            if (re?.icon) re.icon = re.icon ? 'https://cdn.discordapp.com/role-icons/' + re.id + '/' + re.icon + '.jpg' : null || null
        }
        return re;
    }




    async guild_slash(re) {
        if (Array.isArray(re)) {
            re?.forEach(r => {
                if (r?.type) r.type = Discord.ApplicationCommandType[r.type]
                if (re[re.indexOf(r)]?.options) re[re.indexOf(r)]?.options.forEach(ree => {
                    ree.type = Discord.ApplicationCommandOptionType[ree.type]
                })
            })
        } else {
            if (re?.type) re.type = Discord.ApplicationCommandType[re.type]
            if (re?.options) re?.options.forEach(ree => {
                ree.type = Discord.ApplicationCommandOptionType[ree.type]
            })
        }
        return re;
    }




    async guild_stickers(re) {
        if (Array.isArray(re)) {
            re?.forEach(r => {
                if (re[re.indexOf(r)]?.user?.public_flags || re[re.indexOf(r)]?.user?.public_flags === 0) re[re.indexOf(r)].user.public_flags = new Discord.UserFlagsBitField(re[re.indexOf(r)].user.public_flags)?.toArray()
                if (re[re.indexOf(r)]?.user?.banner) re[re.indexOf(r)].user.banner = re[re.indexOf(r)].user.banner ? 'https://cdn.discordapp.com/banners/' + re[re.indexOf(r)].user.id + '/' + re[re.indexOf(r)].user.banner + (re[re.indexOf(r)].user.banner.startsWith(`a_`) ? '.gif' : '.jpg') : null || null
                if (re[re.indexOf(r)]?.user?.avatar) re[re.indexOf(r)].user.avatar = re[re.indexOf(r)].user.avatar ? 'https://cdn.discordapp.com/avatars/' + re[re.indexOf(r)].user.id + '/' + re[re.indexOf(r)].user.avatar + (re[re.indexOf(r)].user.avatar.startsWith(`a_`) ? '.gif' : '.jpg') : null || null
                if (re[re.indexOf(r)]?.user?.avatar_decoration) re[re.indexOf(r)].user.avatar_decoration = re[re.indexOf(r)].user.avatar_decoration ? 'https://cdn.discordapp.com/avatar-decorations/' + re[re.indexOf(r)].user.id + '/' + re[re.indexOf(r)].user.avatar_decoration : null || null


                if (re[re.indexOf(r)]?.type) re[re.indexOf(r)].type = ((re[re.indexOf(r)].type === 1) ? 'Standard' : 'Guild') || null;
                if (re[re.indexOf(r)]?.format_type) re[re.indexOf(r)].format_type = Discord.StickerFormatType[re[re.indexOf(r)].format_type] || null;
                if (re[re.indexOf(r)]) re[re.indexOf(r)].url = 'https://cdn.discordapp.com/stickers/' + re[re.indexOf(r)].id + '.' + (re[re.indexOf(r)].format_type) || null;
                delete re[re.indexOf(r)].asset
            })
        } else {
            if (re?.user?.public_flags || re?.user?.public_flags === 0) re.user.public_flags = new Discord.UserFlagsBitField(re.user.public_flags)?.toArray()
            if (re?.user?.banner) re.user.banner = re.user.banner ? 'https://cdn.discordapp.com/banners/' + re.user.id + '/' + re.user.banner + (re.user.banner.startsWith(`a_`) ? '.gif' : '.jpg') : null || null
            if (re?.user?.avatar) re.user.avatar = re.user.avatar ? 'https://cdn.discordapp.com/avatars/' + re.user.id + '/' + re.user.avatar + (re.user.avatar.startsWith(`a_`) ? '.gif' : '.jpg') : null || null
            if (re?.user?.avatar_decoration) re.user.avatar_decoration = re.user.avatar_decoration ? 'https://cdn.discordapp.com/avatar-decorations/' + re.user.id + '/' + re.user.avatar_decoration : null || null
            if (re?.type) re.type = ((re.type === 1) ? 'Standard' : 'Guild') || null;
            if (re?.format_type) re.format_type = Discord.StickerFormatType[re.format_type] || null;
            if (re?.format_type) re.url = 'https://cdn.discordapp.com/stickers/' + re.id + '.' + (re.format_type) || null;
            delete re?.asset
        }
        return re;
    }




    async guild_events(re) {
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
                if (r?.creator?.avatar) r.creator.avatar = r?.creator?.avatar ? 'https://cdn.discordapp.com/avatars/' + r?.creator?.id + '/' + r?.creator?.avatar + (r?.creator?.avatar?.startsWith(`a_`) ? '.gif' : '.jpg') : null || null
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
            if (re?.creator?.avatar) re.creator.avatar = re?.creator?.avatar ? 'https://cdn.discordapp.com/avatars/' + re?.creator?.id + '/' + re?.creator?.avatar + (re?.creator?.avatar?.startsWith(`a_`) ? '.gif' : '.jpg') : null || null
            if (re?.creator?.avatar_decoration) re.creator.avatar_decoration = re?.creator?.avatar_decoration ? 'https://cdn.discordapp.com/avatar-decorations/' + re?.creator?.id + '/' + re?.creator?.avatar_decoration : null || null
        }
        return re;
    }




    async guild_event_users(re) {
        if (Array.isArray(re)) {
            re?.forEach(r => {
                if (r?.member?.joined_at) r.member.joined_at = (new Date(r.member.joined_at) / 1000)?.toFixed() || null
                if (r?.member?.premium_since) r.member.premium_since = (new Date(r.member.premium_since) / 1000)?.toFixed() || null
                if (r?.member?.communication_disabled_until) r.member.communication_disabled_until = (new Date(r.member.communication_disabled_until) / 1000)?.toFixed() || null
              
                let flags = new Discord.UserFlagsBitField(r?.user?.public_flags)?.toArray() ?? []
                if (r?.user?.banner || r?.user?.avatar?.startsWith(`a_`) || r?.user?.avatar_decoration) flags.push('NitroSubscriber')
                if (r?.user?.username) r.user.tag = r?.user?.username + '#' + r?.user?.discriminator || null
                if (r?.user?.public_flags || r?.user?.public_flags === 0) r.user.public_flags = flags || null
                if (r?.user?.banner) r.user.banner = r?.user?.banner ? 'https://cdn.discordapp.com/banners/' + r?.user?.id + '/' + r?.user?.banner + (r?.user?.banner?.startsWith(`a_`) ? '.gif' : '.jpg') : null || null
                if (r?.user?.avatar) r.user.avatar = r.user?.avatar ? 'https://cdn.discordapp.com/avatars/' + r?.user?.id + '/' + r?.user?.avatar + (r?.user?.avatar?.startsWith(`a_`) ? '.gif' : '.jpg') : null || null
                if (r?.user?.avatar_decoration) r.user.avatar_decoration = r?.user?.avatar_decoration ? 'https://cdn.discordapp.com/avatar-decorations/' + r?.user?.id + '/' + r.user?.avatar_decoration : null || null
                if (r?.user?.banner_color) r.user.banner_color = r?.user?.banner_color?.replace('#', '') || null
            })
        } else {}
        return re;
    }




    async guild_invite(re) {
        if(Array.isArray(re)) {
            re?.forEach(r => {
                if (r?.expires_at) r.expires_at = Math.floor(new Date(r.expires_at).getTime() / 1000)
                if (r?.created_at) r.created_at = Math.floor(new Date(r.created_at).getTime() / 1000)
                if (r?.guild?.icon) r.guild.icon = r.guild.icon ? 'https://cdn.discordapp.com/icons/' + r.guild.id + '/' + r.guild.icon + (r.guild?.icon?.startsWith(`a_`) ? '.gif' : '.jpg') : null || null;
                if (r?.guild?.banner) r.guild.banner = r.guild?.banner ? 'https://cdn.discordapp.com/banners/' + r.guild.id + '/' + r.guild?.banner + (r.guild?.banner?.startsWith(`a_`) ? '.gif' : '.jpg') : null || null;
                if (r?.guild?.system_channel_flags) r.guild.system_channel_flags = new Discord.SystemChannelFlagsBitField(r.guild?.system_channel_flags).toArray() || null;
                if (r?.guild?.splash) r.guild.splash = r?.splash ? 'https://cdn.discordapp.com/splashes/' + r.guild.id + '/' + r.guild?.splash + (r.guild?.splash?.startsWith(`a_`) ? '.gif' : '.jpg') : null || null;
                if (r?.guild?.discovery_splash) r.guild.discovery_splash = r?.discovery_splash ? 'https://cdn.discordapp.com/discovery_splashes/' + r.guild.id + '/' + r.guild?.discovery_splash + (r.guild?.discovery_splash?.startsWith(`a_`) ? '.gif' : '.jpg') : null || null;
                let flags = new Discord.UserFlagsBitField(r?.public_flags)?.toArray() ?? []
                if (r?.inviter?.avatar?.startsWith(`a_`) || r?.inviter?.avatar_decoration) flags.push('NitroSubscriber')
                if (r?.inviter?.public_flags || r?.inviter?.public_flags === 0) r.inviter.public_flags = flags || null
                if (r?.inviter?.avatar) r.inviter.avatar = r?.inviter?.avatar ? 'https://cdn.discordapp.com/avatars/' + r?.inviter?.id + '/' + r?.inviter?.avatar + (r?.inviter?.avatar?.startsWith(`a_`) ? '.gif' : '.jpg') : null || null
                if (r?.inviter?.avatar_decoration) r.inviter.avatar_decoration = r?.inviter?.avatar_decoration ? 'https://cdn.discordapp.com/avatar-decorations/' + r?.inviter?.id + '/' + r.inviter?.avatar_decoration : null || null
            })
        } else {
            if (re?.expires_at) re.expires_at = Math.floor(new Date(re.expires_at).getTime() / 1000)
            if (re?.created_at) re.created_at = Math.floor(new Date(re.created_at).getTime() / 1000)
            if (re?.guild?.icon) re.guild.icon = re.guild?.icon ? 'https://cdn.discordapp.com/icons/' + re.guild.id + '/' + re?.guild.icon + (re.guild?.icon?.startsWith(`a_`) ? '.gif' : '.jpg') : null || null;
            if (re?.guild?.banner) re.guild.banner = re.guild?.banner ? 'https://cdn.discordapp.com/banners/' + re.guild.id + '/' + re.guild?.banner + (re.guild?.banner?.startsWith(`a_`) ? '.gif' : '.jpg') : null || null;
            if (re?.guild?.system_channel_flags) re.guild.system_channel_flags = new Discord.SystemChannelFlagsBitField(re.guild?.system_channel_flags).toArray() || null;
            if (re?.guild?.splash) re.guild.splash = re?.splash ? 'https://cdn.discordapp.com/splashes/' + re.guild.id + '/' + re.guild?.splash + (re.guild?.splash?.startsWith(`a_`) ? '.gif' : '.jpg') : null || null;
            if (re?.guild?.discovery_splash) re.guild.discovery_splash = re?.discovery_splash ? 'https://cdn.discordapp.com/discovery_splashes/' + re.guild.id + '/' + re.guild?.discovery_splash + (re.guild?.discovery_splash?.startsWith(`a_`) ? '.gif' : '.jpg') : null || null;
            let flags = new Discord.UserFlagsBitField(re?.public_flags)?.toArray() ?? []
            if (re?.inviter?.avatar?.startsWith(`a_`) || re?.inviter?.avatar_decoration) flags.push('NitroSubscriber')
            if (re?.inviter?.public_flags || re?.inviter?.public_flags === 0) re.inviter.public_flags = flags || null
            if (re?.inviter?.avatar) re.inviter.avatar = re?.inviter?.avatar ? 'https://cdn.discordapp.com/avatars/' + re?.inviter?.id + '/' + re?.inviter?.avatar + (re?.inviter?.avatar?.startsWith(`a_`) ? '.gif' : '.jpg') : null || null
            if (re?.inviter?.avatar_decoration) re.inviter.avatar_decoration = re?.inviter?.avatar_decoration ? 'https://cdn.discordapp.com/avatar-decorations/' + re?.inviter?.id + '/' + re.inviter?.avatar_decoration : null || null
        }
        return re;
    }



    async guild(re) {
        if (Array.isArray(re)) {
            re?.forEach(ree => {
                if (ree?.icon) ree.icon = ree?.icon ? 'https://cdn.discordapp.com/icons/' + ree.id + '/' + ree?.icon + (ree?.icon?.startsWith(`a_`) ? '.gif' : '.jpg') : null || null;
                if (ree?.banner) ree.banner = ree?.banner ? 'https://cdn.discordapp.com/banners/' + ree.id + '/' + ree?.banner + (ree?.banner?.startsWith(`a_`) ? '.gif' : '.jpg') : null || null;
                if (ree?.system_channel_flags) ree.system_channel_flags = new Discord.SystemChannelFlagsBitField(re?.system_channel_flags).toArray() || null;
                if (ree?.splash) ree.splash = ree?.splash ? 'https://cdn.discordapp.com/splashes/' + ree.id + '/' + ree?.splash + (ree?.splash?.startsWith(`a_`) ? '.gif' : '.jpg') : null || null;
                if (ree?.discovery_splash) ree.discovery_splash = ree?.discovery_splash ? 'https://cdn.discordapp.com/discovery_splashes/' + ree.id + '/' + ree?.discovery_splash + (ree?.discovery_splash?.startsWith(`a_`) ? '.gif' : '.jpg') : null || null;



                if (!ree?.vanity_url_code) delete ree.vanity_url_code;
                delete ree.roles;
                delete ree.emojis;
                delete ree.stickers;
            })
        } else {
            if (re?.icon) re.icon = re?.icon ? 'https://cdn.discordapp.com/icons/' + re.id + '/' + re?.icon + (re?.icon?.startsWith(`a_`) ? '.gif' : '.jpg') : null || null;
            if (re?.banner) re.banner = re?.banner ? 'https://cdn.discordapp.com/banners/' + re.id + '/' + re?.banner + (re?.banner?.startsWith(`a_`) ? '.gif' : '.jpg') : null || null;
            if (re?.system_channel_flags) re.system_channel_flags = new Discord.SystemChannelFlagsBitField(re?.system_channel_flags).toArray() || null;
            if (re?.splash) re.splash = re?.splash ? 'https://cdn.discordapp.com/splashes/' + re.id + '/' + re?.splash + (re?.splash?.startsWith(`a_`) ? '.gif' : '.jpg') : null || null;
            if (re?.discovery_splash) re.discovery_splash = re?.discovery_splash ? 'https://cdn.discordapp.com/discovery_splashes/' + re.id + '/' + re?.discovery_splash + (re?.discovery_splash?.startsWith(`a_`) ? '.gif' : '.jpg') : null || null;



            if (!re?.vanity_url_code) delete re.vanity_url_code;
            delete re.roles;
            delete re.emojis;
            delete re.stickers;
        }
        return re;
    }


    async client(re) {
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
        delete re?.verify_key;
        return re;
    }

    async slash(re) {
        if (Array.isArray(re)) {
            re?.forEach(r => {
                if (r?.type) r.type = Discord.ApplicationCommandType[r.type]
                if (re[re.indexOf(r)]?.options) re[re.indexOf(r)]?.options.forEach(ree => {
                    ree.type = Discord.ApplicationCommandOptionType[ree.type]
                })
            })
        } else {
            if (re?.type) re.type = Discord.ApplicationCommandType[re.type]
            if (re?.options) re?.options.forEach(ree => {
                ree.type = Discord.ApplicationCommandOptionType[ree.type]
            })
        }
        return re;
    }

    async user(re) {
        let flags = new Discord.UserFlagsBitField(re?.public_flags)?.toArray() ?? []
        if (re?.banner || re?.avatar?.startsWith(`a_`) || re?.avatar_decoration) flags.push('NitroSubscriber')
        if (re?.username) re.tag = re?.username + '#' + re?.discriminator || null
        if (re?.public_flags || re?.public_flags === 0) re.public_flags = flags || null
        if (re?.banner) re.banner = re?.banner ? 'https://cdn.discordapp.com/banners/' + re?.id + '/' + re?.banner + (re?.banner?.startsWith(`a_`) ? '.gif' : '.jpg') : null || null
        if (re?.avatar) re.avatar = re?.avatar ? 'https://cdn.discordapp.com/avatars/' + re?.id + '/' + re?.avatar + (re?.avatar?.startsWith(`a_`) ? '.gif' : '.jpg') : null || null
        if (re?.avatar_decoration) re.avatar_decoration = re?.avatar_decoration ? 'https://cdn.discordapp.com/avatar-decorations/' + re?.id + '/' + re.avatar_decoration : null || null
        if (re?.banner_color) re.banner_color = re?.banner_color?.replace('#', '') || null
        return re;
    }

    async message(re) {
        let flags = new Discord.UserFlagsBitField(re?.author?.public_flags)?.toArray()
        if (re?.author?.avatar?.startsWith(`a_`) || re?.author?.avatar_decoration) flags.push('NitroSubscriber')
        if (re?.author?.public_flags || re?.author?.public_flags === 0) re.author.public_flags = flags || null
        if (re?.flags || re?.flags === 0) re.flags = new Discord.MessageFlagsBitField(re.flags).toArray()
        if (re?.type || re?.type === 0) re.type = Discord.MessageType[re.type]
        if (re?.author?.avatar) re.author.avatar = re?.author.avatar ? 'https://cdn.discordapp.com/avatars/' + re.author.id + '/' + re?.author.avatar + (re?.author.avatar?.startsWith(`a_`) ? '.gif' : '.jpg') : null || null
        if (re?.author?.avatar_decoration) re.author.avatar_decoration = re?.author.avatar_decoration ? 'https://cdn.discordapp.com/avatar-decorations/' + re.author.id + '/' + re.author.avatar_decoration : null || null
        if (re?.timestamp) re.timestamp = Math.floor(new Date(re.timestamp).getTime() / 1000)
        if (re?.edited_timestamp) re.edited_timestamp = Math.floor(new Date(re.edited_timestamp).getTime() / 1000)
        return re;
    }









            // reactions are built different. thanks discord -_-
            async reaction(re) {
                re?.forEach(r => {
                let flags = new Discord.UserFlagsBitField(r?.public_flags)?.toArray() ?? []
                if (r?.public_flags || r?.public_flags === 0) r.public_flags = flags || null
                if (r?.avatar) r.avatar = r?.avatar ? 'https://cdn.discordapp.com/avatars/' + r?.id + '/' + r?.avatar + (r?.avatar?.startsWith(`a_`) ? '.gif' : '.jpg') : null || null
                if (r?.avatar_decoration) r.avatar_decoration = r?.avatar_decoration ? 'https://cdn.discordapp.com/avatar-decorations/' + r?.id + '/' + r.avatar_decoration : null || null
                })
                return re;
            }







}