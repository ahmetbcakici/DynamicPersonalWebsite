const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");

const router = express.Router();

const Experience = require("../models/Experience");
const Skill = require("../models/Skill");
const Post = require("../models/Post");
const Homepage = require("../models/Homepage");
const Portfolio = require("../models/Portfolio");
const Admin = require("../models/Admin");

const Funcs = require("../assets/js/funcsback");
const Functions = new Funcs();

var upload = multer({
    storage: multer.diskStorage({
        destination: './assets/images',
        filename: function(req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
        }
    }),
    fileFilter: function(req, file, cb) {
        Functions.checkFileType(file,cb)
    }
})

var upload_static = multer({
    storage: multer.diskStorage({
        destination: './assets/images',
        filename: function(req, file, cb) {
            let extension = file.originalname.substr(file.originalname.lastIndexOf('.') + 1);
            cb(null, file.fieldname+"."+extension);
        }
    }),
    fileFilter: function(req, file, cb) {
        Functions.checkFileType(file,cb)
    }
})

mongoose.connect("mongodb://localhost:27017/DynamicPersonalWebsite", { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) throw err;
})

router.get("/experience", (req, res) => {
    Experience.find((err, docs) => {
        if (err) throw err;
        res.send(docs);
        res.end();
    })
})

router.get("/skill", (req, res) => {
    Skill.find((err, docs) => {
        if (err) throw err;
        res.send(docs);
        res.end();
    })
})

router.get("/blog", (req, res) => {
    Post.find((err, docs) => {
        if (err) throw err;
        res.send(docs);
        res.end();
    })
})

router.get("/blog/:url", (req, res) => {
    Post.findOne({ "url": `${req.params.url}` }, (err, docs) => {
        if (err) throw err;
        res.send(docs);
        res.end();
    })
})

router.get("/homepage", (req, res) => {
    Homepage.find((err, docs) => {
        if (err) throw err;
        res.send(docs);
        res.end();
    })
})

router.get("/portfolio", (req, res) => {
    Portfolio.find((err, docs) => {
        if (err) throw err;
        res.send(docs);
        res.end();
    })
})

router.post("/experience", (req, res) => {
    if (req.body._method == "delete") {
        Experience.findByIdAndDelete(req.body.id, (err) => {
            if (err) throw err;
            res.redirect("/admin/experience");
        })
    } else {
        if (req.body.id) {
            Experience.findByIdAndUpdate(req.body.id, { header: req.body.header, date: req.body.date, place: req.body.place, description: req.body.description, category: req.body.category }, (err) => {
                if (err) throw err;
                res.redirect("/admin/experience");
            })
        } else {
            const newrecord = new Experience({
                header: req.body.header,
                date: req.body.date,
                place: req.body.place,
                description: req.body.description,
                category: req.body.category
            })
            newrecord.save((err) => {
                if (err) throw err;
                res.redirect("/admin/experience");
            })
        }
    }
})

router.post("/skill", (req, res) => {
    if (req.body._method == "delete") {
        Skill.findByIdAndDelete(req.body.id, (err) => {
            if (err) throw err;
            res.redirect("/admin/skill");
        })
    } else {
        if (req.body.id) {
            Skill.findByIdAndUpdate(req.body.id, { name: req.body.name, percent: req.body.percent, category: req.body.category }, (err) => {
                if (err) throw err;
                res.redirect("/admin/skill");
            })
        } else {
            const newrecord = new Skill({
                name: req.body.name,
                percent: req.body.percent,
                category: req.body.category
            })
            newrecord.save((err) => {
                if (err) throw err;
                res.redirect("/admin/skill");
            })
        }
    }
})

router.post("/blog", upload.single('post-image'),(req, res) => {
    if (req.body._method == "delete") {
        Post.findByIdAndDelete(req.body.id, (err) => {
            if (err) throw err;
            res.redirect("/admin/blog");
        })
    } else {
        if (req.body.id) {
            if(req.file){
                Post.findByIdAndUpdate(req.body.id, { header: req.body.header, content: req.body.editor1, date: req.body.date, category: req.body.category, post_tags: req.body.post_tags,image_path:req.file.path}, (err) => {
                    if (err) throw err;
                    res.redirect("/admin/blog");
                })
            }else{
                Post.findByIdAndUpdate(req.body.id, { header: req.body.header, content: req.body.editor1, date: req.body.date, category: req.body.category, post_tags: req.body.post_tags }, (err) => {
                    if (err) throw err;
                    res.redirect("/admin/blog");
                })
            }

        } else {
            const newrecord = new Post({
                url: req.body.seourl,
                header: req.body.header,
                content: req.body.editor1,                
                date: req.body.date,
                category: req.body.category,
                post_tags: req.body.post_tags,
                image_path: req.file.path,
            })
            newrecord.save((err) => {
                if (err) throw err;
                res.redirect("/admin/blog");
            })
        }
    }
})

router.post("/blog/multipleRemove", (req, res) => {
    Post.deleteMany({ _id: { $in: req.body["itemsForRemove[]"] } }, function(err) {
        if (err) throw err;
        res.render("index", { whichpage: "" });
    })
})

router.post("/homepage", upload_static.single('icon'),(req, res) => {    
    if(req.body.site_title){
        if(req.file){
            Homepage.findByIdAndUpdate("5e063de4d0c9813bf447d63e", {site_icon:req.file.filename}, (err) => {
                if (err) throw err;
            })
        }
        Homepage.findByIdAndUpdate("5e063de4d0c9813bf447d63e", {site_title:req.body.site_title}, (err) => {
            if (err) throw err;
            res.redirect("/admin");
        })
    }
    else{
        Homepage.findByIdAndUpdate("5e063de4d0c9813bf447d63e", { name: req.body['myDatas[name]'], title: req.body['myDatas[title]'], about: req.body['myDatas[about]'], country: req.body['myDatas[country]'], mail_address: req.body['myDatas[mail_address]'], phone_number: req.body['myDatas[phone_number]'] }, (err) => {
            if (err) throw err;
            res.redirect("/admin");
        })
    }
})

router.post("/homepage/social-icons", (req, res) => {
    Homepage.findByIdAndUpdate("5e063de4d0c9813bf447d63e", { "social_icons.linkedin.link": req.body['myDatas[lnkdn_link]'], "social_icons.linkedin.state": req.body['myDatas[lnkdn_state]'], "social_icons.github.link": req.body['myDatas[git_link]'], "social_icons.github.state": req.body['myDatas[git_state]'], "social_icons.facebook.link": req.body['myDatas[fb_link]'], "social_icons.facebook.state": req.body['myDatas[fb_state]'], "social_icons.instagram.link": req.body['myDatas[ig_link]'], "social_icons.instagram.state": req.body['myDatas[ig_state]'], "social_icons.pinterest.link": req.body['myDatas[pint_link]'], "social_icons.pinterest.state": req.body['myDatas[pint_state]'], "social_icons.medium.link": req.body['myDatas[md_link]'], "social_icons.medium.state": req.body['myDatas[md_state]'], "social_icons.reddit.link": req.body['myDatas[red_link]'], "social_icons.reddit.state": req.body['myDatas[red_state]'], "social_icons.twitter.link": req.body['myDatas[tw_link]'], "social_icons.twitter.state": req.body['myDatas[tw_state]'], "social_icons.youtube.link": req.body['myDatas[ytb_link]'], "social_icons.youtube.state": req.body['myDatas[ytb_state]'], "social_icons.googlep.link": req.body['myDatas[gop_link]'], "social_icons.googlep.state": req.body['myDatas[gop_state]'] }, (err) => {
        if (err) throw err;
        res.redirect("/admin");
    })
})

router.post("/portfolio", upload.single('portfolio-image'),(req, res,next) => {
    if (req.body._method == "delete") {
        Portfolio.findByIdAndDelete(req.body.id, (err) => {
            if (err) throw err;
            res.redirect("/admin/portfolio");
        })
    } else {
        if(req.body.reflink == "") req.body.reflink = "#";
        if (req.body.id) {
            if(req.file){
                Portfolio.findByIdAndUpdate(req.body.id, { header: req.body.header, description: req.body.description,ref_link:req.body.reflink, type: req.body.type,image_path:req.file.path}, (err) => {
                    if (err) throw err;
                    res.redirect("/admin/portfolio");
                })
            }else{
                Portfolio.findByIdAndUpdate(req.body.id, { header: req.body.header, description: req.body.description,ref_link:req.body.reflink, type: req.body.type}, (err) => {
                    if (err) throw err;
                    res.redirect("/admin/portfolio");
                })
            }
        } else {
            const newrecord = new Portfolio({
                header: req.body.header,
                description: req.body.description,
                ref_link: req.body.reflink,
                type: req.body.type,
                image_path:req.file.path                
            })
            newrecord.save((err) => {
                if (err) throw err;
                res.redirect("/admin/portfolio");
            })
        }
    }
})

router.post("/admin", (req, res) => {
    const newrecord = new Admin({
            username: "test",
            password: "123"
        })
        // newrecord.save((err) => {
        //     if (err) throw err;
        //     console.log("admin post req")
        //         // res.redirect("/admin/portfolio");
        // })
})



module.exports = router;