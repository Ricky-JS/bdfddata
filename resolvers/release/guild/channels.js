const Discord = require('discord.js')
module.exports = async (re, type = 'default') => {

    if(type === 'default') {
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


    if(type === 'simple') {
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
}