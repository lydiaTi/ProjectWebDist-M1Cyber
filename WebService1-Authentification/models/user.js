// Création du schéma UtilisateursSchema dans l'application

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');


//Création du schéma utilisateur 
const UtilisateursSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  nom: String,
  prenom: String,
  password: String,
  created: { type: Date, default: Date.now },

});

//Modification du mot de passe
UtilisateursSchema.pre('save', function(next) {
  var utilisateurs = this;

  if (!utilisateurs.isModified('password')) return next();
  
  bcrypt.hash(utilisateurs.password, null, null, function(err, hash) {
    if (err) return next(err);
    
    utilisateurs.password = hash;
    next();
  });
});

//Function to check if modified and saved passwords match 
UtilisateursSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('Utilisateurs', UtilisateursSchema);
