module.exports = async (req, res, Discord, fetch, config, t) => {
        let tid = req.headers['timestamp']
        if(!tid) return res.send({status:400, error: `${config.errors.headers.timestamp}`, api: Object.assign(config.info, {ping : `${(Date.now() - t)}ms`})})

            let tids = tid.replaceAll('[', '').replaceAll(']', '').replaceAll(' ', '').split(',')

        res.send({status:200, details: (tids.map(t=>(new Date(t) / 1000).toFixed())), api: Object.assign(config.info, {ping : `${(Date.now() - t)}ms`})})
}