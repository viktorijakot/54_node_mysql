const { getSqlData } = require("../routes/helper");

const getAll = async (req, res) => {
  const sql = "SELECT * FROM `categories`";
  const [catArr, error] = await getSqlData(sql);
  if (error) {
    console.log(error);
    res.status(500).json("something wrong");
    return;
  }
  console.log(catArr);
  res.json(catArr);
};

module.exports = {
  getAll,
};
