const router = require('express').Router();
const jwt = require('jsonwebtoken');
const Utilisateurs = require('../models/user');
const config = require('../config');
const checkJWT = require('../middlewares/check-jwt');


router.post('/connexion', (req, res, next) => {

  Utilisateurs.findOne({ email: req.body.email }, (err, utilisateurs) => {
    if (err) throw err;

    if (!utilisateurs) {
      res.json({
        success: false,
        message: 'Le nom dutilisateur nexiste'
      });
    } else if (utilisateurs) {

      var validPassword = utilisateurs.comparePassword(req.body.password);
      if (!validPassword) {
        res.json({
          success: false,
          message: 'Mot de passe incorrecte !'
        });
      } else {
        var token = jwt.sign({
          utilisateurs: utilisateurs
        }, config.secret, {
          expiresIn: '7d'
        });

        res.json({
          success: true,
          mesage: "Enjoy your token",
          token: token
        });
      }
    }

  });
});


router.post('/inscription', (req, res, next) => {
 let utilisateurs = new Utilisateurs();

 utilisateurs.nom = req.body.nom;
 utilisateurs.prenom = req.body.prenom;
 utilisateurs.email = req.body.email;
 utilisateurs.password = req.body.password;

 Utilisateurs.findOne({ email: req.body.email }, (err, existingUser) => {
  if (existingUser) {
    res.json({
      success: false,
      message: 'Un compte avec cette adresse email existe déja'
    });

  } else {
    utilisateurs.save();

    var token = jwt.sign({
      utilisateurs: utilisateurs
    }, config.secret, {
      expiresIn: '7d'
    });

    res.json({
      success: true,
      message: 'Enjoy your token',
      token: token
    });
  }

 });
});



router.route('/profile')
  .get(checkJWT, (req, res, next) => {
    Utilisateurs.findOne({ _id: req.decoded.utilisateurs._id }, (err, utilisateurs) => {
      res.json({
        success: true,
        utilisateurs: utilisateurs,
        message: "Successful"
      });
    });
  })
  .post(checkJWT, (req, res, next) => {
    Utilisateurs.findOne({ _id: req.decoded.utilisateurs._id }, (err, utilisateurs) => {
      if (err) return next(err);

      if (req.body.nom) utilisateurs.nom = req.body.nom;
      if (req.body.email) utilisateurs.email = req.body.email;
      if (req.body.password) utilisateurs.password = req.body.password;


      utilisateurs.save();
      res.json({
        success: true,
        message: 'Votre profil a été mis à jour avec succès'
      });
    });
  });

  router.route('/address')
  .get(checkJWT, (req, res, next) => {
    User.findOne({ _id: req.decoded.user._id }, (err, user) => {
      res.json({
        success: true,
        address: user.address,
        message: "Successful"
      });
    });
  })
  .post(checkJWT, (req, res, next) => {
    User.findOne({ _id: req.decoded.user._id }, (err, user) => {
      if (err) return next(err);

      if (req.body.addr1) user.address.addr1 = req.body.addr1;
      if (req.body.addr2) user.address.addr2 = req.body.addr2;
      if (req.body.city) user.address.city = req.body.city;
      if (req.body.state) user.address.state = req.body.state;
      if (req.body.country) user.address.country = req.body.country;
      if (req.body.postalCode) user.address.postalCode = req.body.postalCode;
     
      user.save();
      res.json({
        success: true,
        message: 'Successfully edited your address'
      });
    });
  });





//Exporting the module 
module.exports = router;