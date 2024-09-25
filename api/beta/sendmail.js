let nodemailer = require('nodemailer')
module.exports = {
    log: false,
    rules: false,
    headers: [],
    body: ["sender", "receiver", "title", "content"],
    access: 'ADMIN',
    endpoint: async (utils) => {
        let transporter = nodemailer.createTransport({
            host: "smtp.improvmx.com",
            port: 587,
            secure: false,
            auth: {
                user: utils.config.email.user,
                pass: utils.config.email.pass,
            },
            tls: {
                rejectUnauthorized: false,
              }
        })
        transporter.verify(async function (error, success) {
            if (error) {
                utils.res.send({ status: 400, error: "Error verifying proxy connection. Report immediately.", api: Object.assign(utils.config.info, { ping: `${(Date.now() - utils.time)}ms` }) })
            } else {
                var body = utils.req.body;

                var msg = {
                    from: `"${body.sender.toUpperCase()}" via RJS Email Proxy <noreplyemailproxy@rickyjs.xyz>`,
                    to: body.receiver,
                    subject: body.title,
                    html: `<div style="background:darkgrey; border-radius:30px"><center><h3>This email was sent using <a href="https://dadocs.rickyjs.xyz/endpoints/sendmail">RickyJS Email Proxy</a>. To report spam or phishing emails, please forward this email to <a href="mailto:phishing@rickyjs.xyz">phishing@rickyjs.xyz</a> ASAP!</h3><h4>Message from<b>${body.sender}</b></h4><div style="background:white; border-radius:30px; overflow:auto;"><span style="color:black;">${body.content}</span></div></center><br><br></div>`
                }
        
                 await transporter.sendMail(msg, function(error) {
                    if(error) {
                     utils.res.send({ status: 400, error: "Failed with error  " + error, api: Object.assign(utils.config.info, { ping: `${(Date.now() - utils.time)}ms` }) })
                    }
                })
                utils.res.send({ status: 200, details: "Message has been queued and will be sent shortly.", api: Object.assign(utils.config.info, { ping: `${(Date.now() - utils.time)}ms` }) })
            }
        })
    }
}