const express = require('express')
const app = express();
const Discord = require('discord.js')
const fetch = require('node-fetch')
const config = require("./config/info.json");
const fs = require('fs')
const { Database } = require('quickmongo')
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
/*
const db = new Database(config.db)
db.connect();
(async () => {
    await db.on("ready", () => {
        console.log('Connected to Database')
    });
})();
*/
const coder = require('./config/coder.json');
const handleCustomExclusions = require('./utils/handleCustomExclusions.js');
const encoder = require('./utils/encoder.js');
const decoder = require('./utils/decoder.js');
const usageLogs = new Discord.WebhookClient({ url: config.hooks.usage }) 
const errorLogs = new Discord.WebhookClient({ url: config.hooks.errors })
const advLogs = new Discord.WebhookClient({ url: config.hooks.advanced })

app.use(async (req, res) => {
    try {
        if (req.path === '/') return res.redirect(config.info.discord) //if no endpoint is provided. redirects to discord server
        else {
            var time = Date.now() //gets the current date of the starting execution, this is used later for ping
            let path = __dirname + '/api' + req.path.toLowerCase() + '.js'; // path to endpoint file
            let resolverPath = __dirname + '/resolvers' + req.path.toLowerCase() + '.js'; //path to resolver file
            //let auth = req.headers['apikey'] || null // the inputted api key
            //if ((await db.connection._readyState) !== 1) return res.send({status: 424, error: config.errors.unavailable, api: Object.assign(config.info, {ping : `${(Date.now() - time)}ms`})}) && db.connect()
            //let key = await db.get(`${await encoder('ApiTokens')}.${await encoder(auth || 'null')}`) || null // searches database for api key
            await fs.lstat(path, async (err, stats) => { // lstat searches for the endpoint file
                if (err) return res.send({ status: 404, error: `${config.errors.invalidpath}`, api: Object.assign(config.info, { ping: `${(Date.now() - time)}ms` }) }) // sends 404 error if endpoint path doesnt exist
                else {
                    delete require.cache[require.resolve(path)] // refreshes endpoint
                    //if (!auth) return res.send({ status: 403, error: config.errors.authkey.missing, api: Object.assign(config.info, { ping: `${(Date.now() - time)}ms` }) }) //errors if no api key was provided
                    //if (!key) return res.send({ status: 403, error: config.errors.authkey.invalid, api: Object.assign(config.info, { ping: `${(Date.now() - time)}ms` }) }) //errors if api key is invalid
                   /*
                    let du = await fetch(`https://discord.com/api/v10/users/${await decoder(key[await encoder('userId')])}`, {
                        method: 'GET',
                        headers: {
                            Authorization: `Bot ${config.token}`
                        }
                    }).then(res => res.json())
                   
                    advLogs.send({embeds: [
                        new Discord.EmbedBuilder()
                        .addFields({
                            name: 'Endpoint',
                            value: req.path
                        },
                        {
                            name: 'User',
                            value: `@${du.username} (${await decoder(key[await encoder('userId')])})`
                        },
                        {
                            name: 'Admin?',
                            value: await decoder(key[await encoder('admin')])
                        },
                        {
                            name: 'Suspended?',
                            value: await decoder(key[await encoder('suspended')])
                        },
                        {
                            name: 'Used at',
                            value: `<t:${Math.round(time/1000)}:R> on <t:${Math.round(time/1000)}:F>`

                        })
                    ]})
*/

                   
                   // if (key[await encoder('suspended')] === await encoder('true')) return res.send({ status: 403, error: config.errors.authkey.suspended, api: Object.assign(config.info, { ping: `${(Date.now() - time)}ms` }) }) //errors if api key if suspended
                
                    let file = await require(path); //requires the endpoint file
                    let resolver;
                    if(file.rule) { //checks if endpoint requires a resolver
                        if(!fs.existsSync(resolverPath)) return res.send({ status: 400, error: `${config.errors.noresolver}`, api: Object.assign(config.info, { ping: `${(Date.now() - time)}ms` }) }) // sends 400 error if resolver path doesnt exist
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
                    if (file.access === 'ADMIN'/* && key[await encoder('admin')] !== await encoder('true')*/) return res.send({ status: 403, error: config.errors.authkey.admin, api: Object.assign(config.info, { ping: `${(Date.now() - time)}ms` }) }) //errors if ADMIN endpoint is used AND user is not authorized for admin access
                 //   if (file.access === 'ALPHA' && key[await encoder('admin')] !== await encoder('true')) return res.send({ status: 403, error: config.errors.authkey.alpha, api: Object.assign(config.info, { ping: `${(Date.now() - time)}ms` }) }) //errors if ADMIN endpoint is used AND user is not authorized for admin access
                    await file.endpoint({req, res, Discord, fetch, config, time, resolver, /*db,*/ coder, encoder, decoder, handleCustomExclusions}) //awaits the endpoint function (runs the code in file)
                    if (file.log) usageLogs.send(`Endpoint \`${req.path}\` has been used!`) // if log is true, send to usage logs
                }
            })
        }
    } catch (e) {
        res.send({ status: 400, error: `${config.errors.fatal}`, api: Object.assign(config.info, { ping: `${(Date.now() - time)}ms` }) }) //try-catch caught a fatal error
        errorLogs.send({ //that fatal error is then sent to error logs
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

process.on("unhandledRejection", (e) => {
    errorLogs.send({ //that fatal error is then sent to error logs
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
})

process.on("uncaughtException", (e) => {
    errorLogs.send({ //that fatal error is then sent to error logs
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
})



app.listen(6969, () => {
    console.log('[BDFDISCORD-DATA-API] Loaded API!  | Port ' + 6969) //starts the api by listening on port 6969 (http://IP:PORT). which my proxy then resolves to https://bdfddata.rickyjs.xyz
});