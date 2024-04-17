const { check, validationResult } = require("express-validator");
const { prisma } = require("../db");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

const router = require("express").Router();

router.post(
  "/singup",
  [
    check("email", "please enter the valid email").isEmail(),
    check(
      "password",
      "please enter the valid password at least 6 length"
    ).isLength({ min: 8 }),
    check("username", "please enter the valid username").isLength({ min: 6 }),
  ],
  async (req, res) => {
    const { email, password, username } = req.body;

    const errors = validationResult(req);
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        id: true,
        email: true,
        username: true,
      },
    });

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    if (user) {
      return res.status(400).json({
        errors: [{ msg: "This email is already exist!" }],
      });
    }

    const hashingPass = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashingPass,
        username,
      },
    });

    const token = await JWT.sign(newUser, process.env.TOKEN_J_PASS_SECRET, {
      expiresIn: 30000,
    });
    return res.json({
      user: newUser,
      token,
    });
  }
);

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) {
    return res.status(400).json({
      errors: [{ msg: "This email isn't existing!" }],
    });
  }

  const payLoadToken = {
    id: user.id,
    password: user.password,
    email: user.email,
  };

  const isMatch = await bcrypt.compare(password, payLoadToken.password);

  if (!isMatch) {
    return res.status(400).json({
      errors: [{ msg: "The password doesn't match!" }],
    });
  }

  const token = await JWT.sign(payLoadToken, process.env.TOKEN_J_PASS_SECRET, {
    expiresIn: 30000,
  });
  return res.json({
    user: payLoadToken,
    token,
  });
});

router.post("/me", async (req, res) => {
  const bearerToken = req.headers.authorization;
  if (!bearerToken) return res.send(null);

  const jwt = bearerToken.split("bearer ")[1];
  if (!jwt) return res.send(null);

  let payLoad;
  try {
    payLoad = await JWT.verify(jwt, process.env.TOKEN_J_PASS_SECRET);
  } catch (error) {
    return res.json("somethings wrong about verifying!");
  }
  const user = await prisma.user.findUnique({
    where: {
      email: payLoad.email,
    },
  });

  return res.json(user);
});

module.exports = router;


// laflksljlf23489A