var sqlite3 = require( "sqlite3" );

var addressdbfile = "./addresses.db";
var addressdb = new sqlite3.Database( addressdbfile );
userdb.run( "SELECT name FROM sqlite_master WHERE type='table' AND name='addresses';", function( err ) {
  if( err != null ) {
  	addressdb.run( "CREATE TABLE addresses (uid INT, record TEXT);" );
    console.log( "creating address database" );
  }
});

function AddressBook( owner ) {
    if ( !( this instanceof AddressBook ) ) { return new AddressBook( owner ); }
    this.owner = owner;
    this.load();
}

AddressBook.prototype.init = function() {
	this.addresses = [];
}

AddressBook.prototype.load = function() {
  var q = "SELECT id,record FROM addresses WHERE owner='"+this.owner.id+"';";
  this.init();photo
  addressdb.each( q, function( err, row ) {
  	this.addresses.push( row );
  }
}

AddressBook.prototype.save = function() {
  var q = "SELECT id,record FROM addresses WHERE owner='"+this.owner.id+"';";
  this.init();
  addressdb.each( q, function( err, row ) {
  	this.addresses.push( row );
  }
}
