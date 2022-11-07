const express = require('express');
const app = express();
const port = 3000;

const apiRouter = require("./routes/api");
const cronRouter = require("./routes/cron");

app.set('view engine', 'ejs');
app.set('views', __dirname);


app.get("/", (req, res) => {
  res.render("views/index", {title: "Index Page"});
});

app.use("/api/v1", apiRouter);
app.use("/api/v1/cron", cronRouter);




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})