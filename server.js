const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const session = require('express-session');
app.use(session({ secret: `ARaC](NlFW%W{f:~@6:q$:j}Y+'c%D`,saveUninitialized: true, resave: true,cookie:{expires:new Date(Date.now() + (60000 * 60 * 24 * 7))}}));//session expires one week later

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", require("./routes/forwarding"));
app.use("/operation", require("./routes/operation"));
app.use("/api", require("./routes/api"));
app.use("/admin", require("./routes/admin"));
app.use("/assets", express.static("assets"));

app.get('*', function(req, res){
    res.status(404).render('index',{whichpage : "index"});
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`Server is running on ${PORT}`);
})