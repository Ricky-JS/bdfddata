const app = require('express')()
const Discord = require('discord.js')
const fetch = require('node-fetch')
const config = require("./config/info.json");
const fs = require('fs')
const {Database} = require('quickmongo')
const db = new Database(config.db)
db.connect();
(async () => {
await db.on("ready", () => {
   console.log('Connected to Database')
      });
    })()
const publichook = new Discord.WebhookClient({url: 'forgot to remove this lmao'})
const privatehook = new Discord.WebhookClient({url: 'forgot to remove this lmao'})

        app.get('/', async(req, res) => {
   res.redirect('https://discord.gg/9s65BZDrbV') 
        })


        app.use(async(req, res) => {
            try {
            var t = Date.now()

                let path = __dirname + '/api' + req.path + '.js';

                await fs.lstat(path, async (err, stats) => {
                    if(err) return res.send({status:404, error: `${config.errors.invalidpath}` , api: Object.assign(config.info, {ping : `${(Date.now() - t)}ms`})})
                    else await require(path)(req, res, Discord, fetch, config, t)
                    publichook.send(`Endpoint \`${req.path}\` has been used!`)
                })
            } catch (e){
                res.send({status:400, error: `${config.errors.fatal}`, api: Object.assign(config.info, {ping : `${(Date.now() - t)}ms`})})
                privatehook.send({embeds: [
                    new Discord.EmbedBuilder()
                    .setTitle('Internal error occurred')
                    .addFields(
                    {name: "User", value: `(once released, this will provide \`User#1234 : (id) : [authkey]\`)`},
                    {name: "Error", value: `\`\`\`js\n${e.stack}\`\`\``}
                    )
                    .setTimestamp()
                    .setColor('Red')
         ]})
    }
})

        app.listen(6969, () => {
            console.log('[BDFDISCORD-DATA-API] Loaded API!  | Port ' + 6969)
    });
