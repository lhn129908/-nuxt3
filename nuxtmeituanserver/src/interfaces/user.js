var express = require("express");
var router = express.Router();
const User = require("../dbs/models/user");

//处理注册请求
router.post("/signup", async (req, res) => {
  const { username, password, email } = req.body;

  // 根据用户名从数据查询有没有指定用户
  const user = await User.find({ username });
  if (user.length) {
    res.status(200).json({
      code: -1,
      msg: "用户名已被注册",
    });
    return;
  }

  const u = new User(req.body);
  u.save().then(function (user, err) {
    if (err) {
      res.status(200).json({
        code: -1,
        message: "注册失败",
      });
      return;
    }
    res.status(200).json({
      code: 0,
      message: "恭喜您注册成功",
    });
  });
});

//处理登录请求
router.post("/signin", async (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;
  User.findOne({ username, password }, (error, user) => {
    if (error) {
      res.status(200).json({
        code: -1,
        msg: error.message,
      });
      return;
    } else {
      if (!user) {
        res.status(200).json({
          code: 1,
          msg: "账号密码错误",
        });
        return;
      } else {
        req.session.user = user;
        res.status(200).json({
          code: 0,
          msg: "登录成功",
        });
      }
    }
  });
});

router.get("/userinfo", (req, res) => {
  if (req.session.user) {
    const { username, email } = req.session.user;
    res.status(200).json({
      name: username,
      email,
      login: true,
    });
  } else {
    res.status(200).json({
      name: "",
      email: "",
      login: false,
    });
  }
});

router.get("/userinfo2", (req, res) => {
  if (req.session.user) {
    const { username, email } = req.session.user;
    res.status(200).json({
      name: username,
      email,
      login: true,
    });
  } else {
    res.status(200).json({
      name: "",
      email: "",
      login: false,
    });
  }
});

router.get("/exit", (req, res) => {
  req.session.user = null;
  req.session.destroy();
  res.status(200).json({
    code: 0,
  });
});

module.exports = router;
