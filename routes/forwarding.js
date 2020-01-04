const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("index", { whichpage: "index" });
})

router.get("/experience", (req, res) => {
    res.render("experience", { whichpage: "experience" });
})

// Deprecated View
// router.get("/services", (req, res) => {
//     res.render("services", { whichpage: "services" });
// })

router.get("/portfolio", (req, res) => {
    res.render("portfolio", { whichpage: "portfolio" });
})

router.get("/blog", (req, res) => {
    res.render("blog", { whichpage: "blog" });
})

router.get("/post/:url", (req, res) => {
    res.render("post", { whichpage: "blog", params_url: req.params.url });
})

router.get("/contact", (req, res) => {
    res.render("contact", { whichpage: "contact" });
})

module.exports = router;