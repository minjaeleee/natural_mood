const jsonServer = require("json-server")
const auth = require("json-server-auth");
// const cors = require("cors");
const path = require('path');

const app = jsonServer.create();
const router = jsonServer.router(path.resolve('./db.json'));
const middlewares = jsonServer.defaults({
  static: path.resolve('./build')
});
app.db = router.db;

// app.use(
//   cors({
//     origin: "*",
//     credentials: true,
//   })
// );

app.use(
  jsonServer.rewriter({
    "/api/*": "/$1",
  })
);

app.use(middlewares)
app.use(auth);
app.use(router);

const port = process.env.PORT || 4001

app.listen(port, () => {
  console.log('sever is running')
});