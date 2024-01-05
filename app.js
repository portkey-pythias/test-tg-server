const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const cors = require("koa2-cors");
const router = require("./server/index");

const app = new Koa();
app.use(cors());
app.use(router.routes());
app.use(bodyParser());

const port = process.env.PORT || 6666;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
