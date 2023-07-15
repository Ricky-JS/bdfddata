const Discord = require('discord.js')
module.exports = async (re, type = 'default') => {

    if(type === 'default') {
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


    if(type === 'simple') {
        let roles = {};
        for (const role of re) {
            Object.assign(roles, JSON.parse(`{"${role.name}": "${role.id}"}`))
        }
        
        let count = Object.keys(roles).length;
    
        return {roles, count};
    }
}