const express = require("express");
const knex = require("../db/client");

const router = express.Router();

router.get("/new", (req, res) => {
  res.render("new", { cohort: false });
});

router.get("/", (req, res) => {
  knex("cohort")
    .orderBy("id", "asc")
    .then((cohort) => {
      res.render("index", { cohort: cohort });
    });
});

router.post("/", (req, res) => {
  knex("cohort")
    .insert({
      name: req.body.name,
      members: req.body.members,
      logoUrl: req.body.logoUrl,
    })
    .returning("*")
    .then((cohort) => {
      const currentCohort = cohort[cohort.length - 1];
      res.redirect(`cohort/${currentCohort.id}`);
    });
});

router.get("/:id", (req, res) => {
  const method = req.query.method;
  const quantity = req.query.quantity;

  console.log(method, quantity);
  knex("cohort")
    .where("id", req.params.id)
    .first()
    .then((cohort) => {
      if (!cohort) {
        res.send("No post Found");
      } else {
        res.render("show", {
          cohort: cohort,
          method: method,
          quantity: quantity,
        });
      }
    });
});


// ------update --------
router.get("/:id/edit", (req, res) => {
  knex("cohort")
    .where("id", req.params.id)
    .first()
    .then((cohort) => {
      res.render("edit", { cohort: cohort });
    });
});

router.patch("/:id",(req,res)=>{
const updatedCohort = {
    logoUrl: req.body.logoUrl,
    name: req.body.name,
    members: req.body.members,
}
knex("cohort")
.where("id",req.params.id)
.update(updatedCohort)
.then(()=> {
res.redirect(`/cohort/${req.params.id}`)})
})
// router.post("/:id", (req, res) => {
//   const COOKIE_MAX_AGE = 1000 * 60 * 60 * 24;
//   const method = req.body.method;
//   const currentID = req.params.id;
//   const quantity = req.body.quantity;
//   console.log(currentID);
//   res.cookie("method", method, { maxAge: COOKIE_MAX_AGE });
//   res.cookie("quantity", quantity, { maxAge: COOKIE_MAX_AGE });
//   res.redirect(`/cohort/${currentID}`);
// });

router.delete("/:id", (req, res) => {
  knex("cohort")
    .where("id", req.params.id)
    .del()
    .then(() => {
      res.redirect("/cohort");
    });
});

module.exports = router;
