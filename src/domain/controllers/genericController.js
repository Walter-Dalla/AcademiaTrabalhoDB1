htmlFactory = require('../htmlTableFactory')
genericService = require('../service/genericService')
var pages = require('../pages')

function routeGeneric(app){
    pages.forEach(page => {
        app.get('/'+page.tabela, async (req, res) => {
            var objs = await genericService.selectAll(page.tabela);
            var fields = await genericService.describeTable(page.tabela);
            
            var html = htmlFactory(page.titulo, fields, objs, page.tabela, req.query.msg)
           
            res.send(html)
        })

        app.post('/'+page.tabela, async (req, res) => {
            var msg = await genericService.insert(page.tabela, req.body);
            if(!msg){
                msg = 'Registro inserido com sucesso'
            }
            res.redirect('/'+page.tabela+'?msg='+msg)
        })

        app.post('/'+page.tabela+'/delete', async (req, res) => {
            console.log(req.body)
            var msg = await genericService.deleteTupla(page.tabela, req.body);
      
            res.redirect('/'+page.tabela+'?msg='+'Registro deletado com sucesso')
        })
    })
}



module.exports = routeGeneric
