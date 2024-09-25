module.exports = {
    log: false,
    rule: false,
    headers: [], //only put REQUIRED headers.
    body: ['requests'],
    access: 'PUBLIC',
    endpoint: async (utils) => {

        const requests = utils.req.body['requests']

            if(!Array.isArray(requests)) return utils.res.send({status: 400, error:'Request parameter must be an array'})

let results = [];
const axios = require('axios');
            for await(let req of requests) {

           //    if(typeof req !== 'object') return utils.res.send({status: 400, error:'Each parameter in array must be an object'});
            //   if(!req.endpoint) return utils.res.send({status: 400, error:'Parameter `endpoint` not supplied'});
           //    if(typeof req['headers'] !== 'object') return utils.res.send({status: 400, error:'Parameter `headers` must be an object'});
            //   if(typeof req['body'] !== 'object' && req.body) return utils.res.send({status: 400, error:'Parameter `body` must be an object'});


                let res;
               ((req['method']?.toUpperCase() ||"GET") === 'GET' ? res = await axios[req['method']||'GET'](`https://bdfddata.rickyjs.xyz${req['endpoint']}`,{
                    headers: req['headers']||{}
                    }).then(async res=>await res.data) : res = await axios[req['method']||'GET'](`https://bdfddata.rickyjs.xyz${req['endpoint']}`,req['body'], {
                        headers: req['headers']||{},
                    }).then(async res=>await res.data))


                results.push({request: req, response: res['details'] || res['error']})
            }

        utils.res.send({ status: 200, details: results, api: Object.assign(utils.config.info, { ping: `${(Date.now() - utils.time)}ms` }) })
    }
}