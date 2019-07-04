const koa = require('koa');
hello_routes = require('./routes/hello')
movies_routes = require('./routes/movies')

const app = new koa();

app.use(hello_routes.routes());
app.use(movies_routes.routes());

const server = app.listen(3000, function(){
	console.log("Server running")
});

module.exports = server;
