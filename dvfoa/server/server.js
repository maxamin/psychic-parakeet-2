"use strict";

function User( name, passwordHash ) {
  if( ! ( this instanceof User ) ) { return new User( name, passwordHash ); }
  this.name = name;
  this.passwordHash = passwordHash;
}


var http = require( "http" );
var url = require( "url" );

function start( route ) {
  function onRequest( request, response ) {
    console.log( "Request: " + request.url );
    var path = url.parse( request.url ).pathname;
    //var query = querystring( );
    route( path );
    response.writeHead( 200, { "Content-Type": "text/plain" } );
    response.write( "Hello World" );
    response.end();
  }

  http.createServer(onRequest).listen( 8888 );
  console.log( "Server running." );
}

exports.start = start;

