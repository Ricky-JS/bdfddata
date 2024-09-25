const Discord = require('discord.js')
module.exports = async (re, type = 'default') => {
    if (type === 'default') {
        if (Array.isArray(re)) {
            re?.forEach(r => {
                if (r?.type) r.type = Discord.EntitlementType[r.type]
                if (r?.starts_at) r.starts_at = (new Date(r.starts_at) / 1000)?.toFixed() || null
                if (r?.ends_at) r.ends_at = (new Date(r.ends_at) / 1000)?.toFixed() || null

            })
        } else {
            if (re?.type) re.type = Discord.EntitlementType[re.type]
            if (re?.starts_at) re.starts_at = (new Date(re.starts_at) / 1000)?.toFixed() || null
            if (re?.ends_at) re.ends_at = (new Date(re.ends_at) / 1000)?.toFixed() || null


        }
        return re;
    }
    if (type === 'simple') {
        let entitlements = {};
        let r = re.map((entitlement) => {
            return Object.assign(entitlements, JSON.parse(`{"${entitlement.user_id}":{ "starts_at": "${(new Date(entitlement.starts_at) / 1000)?.toFixed() || null}", "ends_at": "${(new Date(entitlement.ends_at) / 1000)?.toFixed() || null}", "type": "${Discord.EntitlementType[entitlement.type]}", "sku_id": "${entitlement.sku_id}"}}`))
        })

        await Promise.all(r)
        return entitlements;
    }
}