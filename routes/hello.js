const router = require('koa-router')();
const koaBody = require('koa-body');

//Primeiro teste com cascading com um método GET
router.get('/hello', function(ctx, next) {
   next()
   if (ctx.status != 200){
      ctx.body = "hey, your trial has failed"
      ctx.status = 404
   }
});

router.get('/hello', function(ctx, next) {
   ctx.body = "Hello, your message has reached the bottom of the cascade"
});
//Fim do Cascading com o GET no route /hello

//Primeiro teste com cascading com um método POST
router.post('/hello', koaBody(), function(ctx, next) {
   const param = ctx.request.body.name
   if (!param) {
      ctx.body = "Hey, you did't tell me your name"
      ctx.status = 404
      return
   }
   next()
});

router.post('/hello', function(ctx, next) {
   next()
   const status = ctx.status;
   if (status != 200){ 
      ctx.body = "hey, your trial has failed"
      ctx.status = 404
   }
});

router.post('/hello', function(ctx, next) {
   name = ctx.request.body.name
   ctx.body = "Hello, " + name + ", your message has reached the bottom of the cascade"
});
//Fim do Cascading com o POST no route /hello

//Resposta geral para o route "/"
router.all('/', function(ctx, next){
	ctx.body = "Hello from all method"
});

//Teste com parametros em URL
router.get('/:name/:id([0-9]{5})', function(ctx, next) {
   ctx.body = 'The id for the user ' + ctx.params.name + 
   				' is ' + ctx.params.id;
});

//Primeiro teste com retorno de JSON
router.get("/json_test", async ctx => {
   ctx.body = {
     data: "Sending some JSON",
     person: {
       name: "Ricardo",
       lastname: "Imagure",
       role: "Internship",
       age: 23
      }
   };
 });

//Página para mensagem de erro
router.get('/not_found', function(ctx, next) {
   if (!ctx.body){
      ctx.body = "Sorry, your request have failed..."
   }
});

//Error Handling function
router.use(function handle404Errors(ctx, next) {
   if (404 != ctx.status) return;
   ctx.redirect('/not_found');
});

module.exports = router;
