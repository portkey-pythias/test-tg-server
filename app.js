const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const cors = require("koa2-cors");
const router = require("./routes/index");

const app = new Koa();
app.use(cors());
app.use(bodyParser());
app.use(router.routes());

const port = process.env.PORT || 8888;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
