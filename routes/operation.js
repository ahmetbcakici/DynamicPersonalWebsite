const express = require("express");
const formidable = require("formidable");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const Admin = require("../models/Admin");
var session;

const Funcs = require("../assets/js/funcsback");
const Functions = new Funcs();

router.post("/mail", (req, res) => {
    Functions.sendmail(req.body.the_mail_address,req.body.mail_address, req.body.subject, req.body.message);
    return res.redirect("/contact");
})

router.post("/login", async(req, res) => {
    let control = false;
    let temp_req_ression, temp_req_body_username;
    await Admin.find((err, docs) => {
        if (err) throw err;
        for (let data of docs) {
            if (req.body.username == data.username && req.body.password == data.password) {
                temp_req_ression = req.session;
                temp_req_body_username = req.body.username;
                control = true;
                break;
            }
        }
    })

    if (control === true) {
        session = temp_req_ression;
        session.username = temp_req_body_username;
        return res.redirect("/admin");
    } else return res.redirect("/admin");
})

router.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) throw err;
        return res.redirect("/admin");
    })
})

router.post("/changepass", (req, res) => {
    Admin.findOne({ username: req.session.username }, (err, docs) => {
        if(docs.password === req.body.current_pass) {
            docs.username = req.body.new_username;
            docs.password = req.body.new_pass;
            docs.save((error) => {
                if(error) throw error;
                return res.redirect("/admin/change");
            });
        }
    });
})


router.post("/upload/avatar", (req, res) => {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        let oldpath = files.filetoupload.path;
        let newpath = `${path.dirname(require.main.filename)}/assets/images/avatar.jpeg`;
        fs.rename(oldpath, newpath, function(err) {
            if (err) throw err;
        });
        return res.redirect("/admin");
    });
})

module.exports = router;