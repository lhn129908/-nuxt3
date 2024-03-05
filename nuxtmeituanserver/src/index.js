const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const dbConfig = require("./dbs/dbConfig");
const expressSession = require("express-session");

const user = require("./interfaces/user");
const geo = require("./interfaces/geo");
const search = require('./interfaces/search')
const category = require('./interfaces/category')
const cart = require('./interfaces/cart')
const order = require('./interfaces/order')

app.use(
  expressSession({
    secret: "password",
    resave: false,
    saveUninitialized: false,
  })
);

mongoose.connect(dbConfig.dbs, {
  useNewUrlParser: true,
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/users", user);
app.use("/api/geo", geo);
app.use("/api/search",search)
app.use("/api/category",category)
app.use("/api/cart",cart)
app.use("/api/order",order)

app.listen("9998", () => {
  console.log("服务器已启动");
});
