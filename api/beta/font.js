module.exports = {
    log:false,
    rule:false,
    headers: [],
    body: ['text', 'font'],
    endpoint: async (utils) => {
            let fontJson;
            let path = `../../config/fonts/${utils.req.body['font']}.json`
                    try {
                        delete require.cache[require.resolve(path)]
                        fontJson = await require(path);
                    } catch (e){
                        console.log(e.stack)
                    }
                    if(!fontJson) return utils.res.send({status:404, error: `Font: '${utils.req.body['font']}' doesn't seem to exist on this api.`, api: Object.assign(utils.config.info, {ping: `${(Date.now() - utils.time)}ms`})})
            
                    let words = utils.req.body['text'].split(' ')
                    let result = words.map(word=>(word.split('')).map(char=>(fontJson)[char] || (fontJson)[char.toUpperCase()] || (fontJson)[char.toLowerCase()] || 'null').join('')).join(' ')
                  if(!result) return utils.res.send({status: 400, error: 'We had some trouble parsing that request. If this is a mistake, please contact my developer.',  api: Object.assign(utils.config.info, {ping: `${(Date.now() - utils.time)}ms`})})
        
        utils.res.send({status:200, details: result, api: Object.assign(utils.config.info, {ping: `${(Date.now() - utils.time)}ms`})})

    }
}