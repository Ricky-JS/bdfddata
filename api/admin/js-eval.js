const fs = require('fs')
const path = require('path');

module.exports = {
    log:false,
    rule: false,
    headers: ['code'], //only put REQUIRED headers.
    access: 'ADMIN',
    endpoint: async (utils) => {
        let code = utils.req.headers['code']
        const clean = text => {
          if (typeof (text) === "string")
            return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
          else
            return text;
        }
        try {
          let evaled = await eval(code);
    
          if (typeof evaled !== "string")
            evaled = require("util").inspect(evaled, { depth: 100 });
    
            utils.res.send({status:200, details : {input:code,output:evaled}})
        } catch (error) {
            utils.res.send({status:400, error:{input:code,output:error.stack}})
        }

    }
}