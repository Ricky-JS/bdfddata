module.exports = {
    log:true,
    rules:false,
    headers: [],
    body: ['text'],
    endpoint: async (utils) => {
        let result; 
        if(Array.isArray(utils.req.body['text'])) {
            result =[]
                for(const text of utils.req.body['text']) {
                    result.push(text.split('').map(t=>utils.coder[t] ||t).join(''))
                }
        } else {
            result = utils.req.body['text'].split('').map(t=>utils.coder[t] || t).join('')
        }
            utils.res.send({status:200, details: result, api: Object.assign(utils.config.info, {ping: `${(Date.now() - utils.time)}ms`})})
    }
}