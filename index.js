const app = require('express')()
const Discord = require('discord.js')
const fetch = require('node-fetch')
const config = require("./config/info.json");
const fs = require('fs')
const { Database } = require('quickmongo')
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('body-parser').json());
const db = new Database(config.db)
db.connect();
(async () => {
    await db.on("ready", () => {
        console.log('Connected to Database')
    });
})()
const publichook = new Discord.WebhookClient({ url: config.publichook }) //usage logs
const privatehook = new Discord.WebhookClient({ url: config.privatehook }) //error logs
app.use(async (req, res) => {
    try {
        if (req.path === '/') return res.redirect(config.info.discord) //if no endpoint is provided. redirects to discord server
        else {
            var time = Date.now() //gets the current date of the starting execution, this is used later for ping
            let path = __dirname + '/api' + req.path.toLowerCase() + '.js'; // path to endpoint file
            let resolverPath = __dirname + '/resolvers' + req.path.toLowerCase() + '.js'; //path to resolver file
            let auth = req.headers['apikey'] || null // the inputted api key
            let key = await db.get(`ApiTokens.${auth}`) || null // searches database for api key
            await fs.lstat(path, async (err, stats) => { // lstat searches for the endpoint file
                if (err) return res.send({ status: 404, error: `${config.errors.invalidpath}`, api: Object.assign(config.info, { ping: `${(Date.now() - time)}ms` }) }) // sends 404 error if endpoint path doesnt exist
                else {
                    if(!key?.admin)  return res.send({status: 423, error: "Api is under maintenance.", discord: config.info.discord})
                    delete require.cache[require.resolve(path)] // refreshes endpoint
                    if (!auth) return res.send({ status: 403, error: config.errors.authkey.missing, api: Object.assign(config.info, { ping: `${(Date.now() - time)}ms` }) }) //errors if no api key was provided
                    if (!key) return res.send({ status: 403, error: config.errors.authkey.invalid, api: Object.assign(config.info, { ping: `${(Date.now() - time)}ms` }) }) //errors if api key is invalid
                    if (key.suspended) return res.send({ status: 403, error: config.errors.authkey.suspended, api: Object.assign(config.info, { ping: `${(Date.now() - time)}ms` }) }) //errors if api key if suspended
                    if(req.path.split('/')[0] === 'beta' && !key.beta) return res.send({ status: 403, error: config.errors.authkey.beta, api: Object.assign(config.info, { ping: `${(Date.now() - time)}ms` }) }) //errors if BETA endpoint is used AND user is not authorized for beta access
                
                    let file = await require(path); //requires the endpoint file
                    let resolver;
                    if(file.rule) { //checks if endpoint requires a resolver
                        delete require.cache[require.resolve(resolverPath)] // refreshes resolvers
                        resolver = await require(resolverPath) // re-requires resolvers
                    }
                    if (file.headers && file.headers !== []) { //checks for endpoint headers
                        for (const header of file.headers) {
                            if (!req.headers[header]) return res.send({ status: 400, error: `${config.errors.headers} - \`${header}\``, api: Object.assign(config.info, { ping: `${(Date.now() - time)}ms` }) }) //errors if a required header is not present
                        }    
                    }
                    if (file?.body && file?.body !== []) { //same as headers, but for body
                        for (const param of file.body) { //same as headers, but for body
                            if (!req.body[param]) return res.send({ status: 400, error: `${config.errors.body} - \`${param}\``, api: Object.assign(config.info, { ping: `${(Date.now() - time)}ms` }) }) //same as headers, but for body
                        }
                }
                    if (file.access === 'ADMIN' && !key.admin) return res.send({ status: 403, error: config.errors.authkey.admin, api: Object.assign(config.info, { ping: `${(Date.now() - time)}ms` }) }) //errors if ADMIN endpoint is used AND user is not authorized for admin access
                    await file.endpoint({req, res, Discord, fetch, config, time, resolver, db}) //awaits the endpoint function (runs the code in file)
                    if (file.log) publichook.send(`Endpoint \`${req.path}\` has been used!`) // if log is true, send to usage logs
                }
            })
        }
    } catch (e) {
        res.send({ status: 400, error: `${config.errors.fatal}`, api: Object.assign(config.info, { ping: `${(Date.now() - time)}ms` }) }) //try-catch caught a fatal error
        privatehook.send({ //that fatal error is then sent to error logs
            embeds: [
                new Discord.EmbedBuilder()
                    .setTitle('Internal error occurred')
                    .addFields(
                        { name: "Error", value: `\`\`\`js\n${e.stack}\`\`\`` } //e.stack is preferred as it will also give the file that caused the error
                    )
                    .setTimestamp()
                    .setColor('Red')
            ]
        })
    }
})
app.listen(6969, () => {
    console.log('[BDFDISCORD-DATA-API] Loaded API!  | Port ' + 6969) //starts the api by listening on port 6969 (http://IP:PORT). which my proxy then resolves to https://bdfddata.rickyjs.xyz
});