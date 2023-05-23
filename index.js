const app = require('express')()
const Discord = require('discord.js')
const fetch = require('node-fetch')
const config = require("./config/info.json");
const fs = require('fs')
const { Database } = require('quickmongo')
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('body-parser').json());
const resolvers = new (require('./resolvers.js'))()
const db = new Database(config.db)
db.connect();
(async () => {
    await db.on("ready", () => {
        console.log('Connected to Database')
    });
})()
const publichook = new Discord.WebhookClient({ url: config.publichook })
const privatehook = new Discord.WebhookClient({ url: config.privatehook })
app.use(async (req, res) => {
    try {
        if (req.path === '/') return res.redirect(config.info.discord)
        else {
            var time = Date.now()

            let path = __dirname + '/api' + req.path.toLowerCase() + '.js';
            let auth = req.headers['apikey'] || null
            let key = await db.get(`ApiTokens.${auth}`) || null

            await fs.lstat(path, async (err, stats) => {
                if (err) return res.send({ status: 404, error: `${config.errors.invalidpath}`, api: Object.assign(config.info, { ping: `${(Date.now() - time)}ms` }) })
                else {
                    if (!auth) return res.send({ status: 403, error: config.errors.authkey.missing, api: Object.assign(config.info, { ping: `${(Date.now() - time)}ms` }) })
                    if (!key) return res.send({ status: 403, error: config.errors.authkey.invalid, api: Object.assign(config.info, { ping: `${(Date.now() - time)}ms` }) })
                    if (key.suspended) return res.send({ status: 403, error: config.errors.authkey.suspended, api: Object.assign(config.info, { ping: `${(Date.now() - time)}ms` }) })
                    let file = await require(path);
                    if (file.headers && file.headers !== []) {
                        for (const header of file.headers) {
                            if (!req.headers[header]) return res.send({ status: 400, error: `${config.errors.headers} - \`${header}\``, api: Object.assign(config.info, { ping: `${(Date.now() - time)}ms` }) })
                        }    
                    }
                    if (file?.body && file?.body !== []) {
                        for (const param of file.body) {
                            if (!req.body[param]) return res.send({ status: 400, error: `${config.errors.body} - \`${param}\``, api: Object.assign(config.info, { ping: `${(Date.now() - time)}ms` }) })
                        }
                }
                    if (file.access === 'ADMIN' && !key.admin) return res.send({ status: 403, error: config.errors.authkey.admin, api: Object.assign(config.info, { ping: `${(Date.now() - time)}ms` }) })
                    await file.endpoint({req, res, Discord, fetch, config, time, resolvers, db})
                    if (file.log) publichook.send(`Endpoint \`${req.path}\` has been used!`)
                }
            })
        }
    } catch (e) {
        res.send({ status: 400, error: `${config.errors.fatal}`, api: Object.assign(config.info, { ping: `${(Date.now() - time)}ms` }) })
        privatehook.send({
            embeds: [
                new Discord.EmbedBuilder()
                    .setTitle('Internal error occurred')
                    .addFields(
                        { name: "Error", value: `\`\`\`js\n${e.stack}\`\`\`` }
                    )
                    .setTimestamp()
                    .setColor('Red')
            ]
        })
    }
})

app.listen(6969, () => {
    console.log('[BDFDISCORD-DATA-API] Loaded API!  | Port ' + 6969)
});