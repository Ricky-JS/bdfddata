module.exports = {
    log:false,
    rules:false,
    headers: [],
    body: ['json', 'param'],
    access: 'PUBLIC',
    endpoint: async (utils) => {
        let json = utils.req.body['json'];
        let param = utils.req.body['param'];
        let n = param.split('.')
        let result;

        try {
if(n.length > 1) {
  for (let i = 0; i < n.length; i++) {
    json = json[n[i]]
  }
  result = Object.keys(json)
} else {
  result = Object.keys(json[param])
}
        } catch {
          return utils.res.send({status:400, error: 'Error: Malformed JSON Object', api: Object.assign(utils.config.info, {ping: `${(Date.now() - utils.time)}ms`})})
        }




            utils.res.send({status:200, details: result, api: Object.assign(utils.config.info, {ping: `${(Date.now() - utils.time)}ms`})})
    }
}