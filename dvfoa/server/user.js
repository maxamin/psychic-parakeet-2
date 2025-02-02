var sqlite3 = require( "sqlite3" );

var userdbfile = "./user.db";
var userdb = new sqlite3.Database( userdbfile );
userdb.run( "SELECT name FROM sqlite_master WHERE type='table' AND name='users';", function( err ) {
  if( err != null ) {
  	userdb.run( "CREATE TABLE users (id INT, name TEXT, password TEXT);" );
    console.log( "creating user table" );
  }
});

function User( name ) {
  if( !( this instanceof User ) ) { return new User( name ); }
  this.name = name;
  this.id = null;
  this.authenticated = false;
}

User.prototype.authenticate = function( cleartextpw ) {
  // salting and hashing is overrated
  // prepared statements and input filtering are for pansies
  userdb.run( "SELECT id FROM users WHERE user="+this.name+" AND password="+cleartextpw );
}