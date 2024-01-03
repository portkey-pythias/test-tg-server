const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const router = require("./server/index");

const app = new Koa();

app.use(router.routes());
app.use(bodyParser());

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
