 function camry(req, res, next){
    req.camry = Date.now()

    next()
}

module.export =  camry;