module.exports = async (req, res, Discord, config, db) => {
        var t = Date.now()
let uid = req.headers['user-id']

let re = await fetch(`https://discord.com/api/v10/users/${uid}`, {
        method: 'GET',
        headers: {
            Authorization: `Bot ${config.token}`
        }
}).then(res=>res.json())
         if(!re?.id) return res.send({status:404, error: 'User cannot be found', api: Object.assign(config.info, {ping : `${(Date.now() - t)}ms`})})

/*

// notes
- require user-id header
- generate token
- if token already exists for user, regenerate.
- if token already exists AND is suspended, end execution



// limiter code
if(!auth) return res.send({status:401, error: 'You are not authorized to preform this action as you are missing your API Auth Key. Join our Discord to get a free key!', api: Object.assign(config.info, {ping : `${(Date.now() - t)}ms`})})
if(!(await db.get(`ApiTokens.${auth}`))) return res.send({status:401, error: 'You are not authorized to preform this action as your API Auth Key is invalid. Join our Discord for help!', api: Object.assign(config.info, {ping : `${(Date.now() - t)}ms`})})
if((await db.get(`ApiTokens.${auth}`)).suspended) return res.send({status:401, error: 'You are not authorized to preform this action as your API Auth Key is suspended. Join our Discord for help!', api: Object.assign(config.info, {ping : `${(Date.now() - t)}ms`})})
*/


  


      res.send({status:200, details: re, api: Object.assign(config.info, {ping : `${(Date.now() - t)}ms`}) })
}