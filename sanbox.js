const bcrypt = require("bcryptjs");

// uzkodavimas
const plainPass = "123456";
// const salt = bcrypt.genSaltSync(10);
const passwordHash = bcrypt.hashSync(plainPass, 10);

console.log(salt);

// patikrinti slaptazodi - gauna true arba false

const arSutampa = bcrypt.compareSync("123456", passwordHash);
