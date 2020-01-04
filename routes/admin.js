const express = require("express");
const router = express.Router();
var session;

router.get("/", (req, res) => {
    sessionControl(req, res, "admin");
})

router.get("/experience", (req, res) => {
    sessionControl(req, res, "experience_admin");
})

router.get("/skill", (req, res) => {
    sessionControl(req, res, "skill_admin");
})

router.get("/portfolio", (req, res) => {
    sessionControl(req, res, "portfolio_admin");
})

router.get("/blog", (req, res) => {
    sessionControl(req, res, "blog_admin");
})
router.get("/change", (req, res) => {
    sessionControl(req, res, "changepass_admin");
})

var sessionControl = (req, res, page) => {
    session = req.session;
    if (session.username)
        res.render(`${page}`);
    else
        res.render("login_admin");
}

module.exports = router;