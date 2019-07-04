const router = require('koa-router')();
const koaBody = require('koa-body');
const queries = require('../db/queries/movies')

router.get('/movies/all', async function(ctx, next) {
  try {
    const movies = await queries.getAllMovies();
    ctx.body = {
      status: 'success',
      data: movies
    };
  } catch (err) {
    console.log(err)
  }
})

module.exports = router;
