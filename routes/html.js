(() => {

  const path = require("path");
  const db = require("../models");

  module.exports = app => {

    // homepage - login or signup
    app.get("/", (req, res) => {
      res.sendFile(path.join(__dirname, "../public/index.html"));
    });

    // login page
    app.get("/login", (req, res) => {
      res.sendFile(path.join(__dirname, "../public/login.html"));
    });

    // survey page
    app.get("/survey", (req, res) => {
      res.sendFile(path.join(__dirname, "../public/survey.html"));
    });

    // user dashboard (handlebars)
    app.get("/user_dashboard/:id/:bucket?", (req, res) => {
      Promise.all([
        db.Boxes.findAll({ where: { bucket_id: req.params.bucket } }), 
        db.Users.findOne({ where: { id: req.params.id }}), 
        db.UserBoxes.findAll({ where: { id: req.params.id }})
      ]).then(([boxResults, userProfile, pastOrders]) => {
        res.render("index", { boxResults, userProfile, pastOrders });
      })
    });

    // TEMPLATE DASHBOARD - TESTING ONLY
    app.get("/dashboard", (req, res) => {
      res.sendFile(path.join(__dirname, "../public/test-userProfiles.html"));
    });

  };

})();