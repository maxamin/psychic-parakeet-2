var User   = require('./app/models/user');
var Listing   = require('./app/models/listing');
var _ = require('underscore');
var data=require('./mockdata.js');
var userService=require('./app/services/userService.js');
var mongoose    = require('mongoose');
var config = require('./config');

mongoose.Promise = require('bluebird');
mongoose.connect(config.database);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
    console.log('Connected to Users');
});


module.exports = function(grunt) {
    grunt.initConfig({
        exec: {
            dropdb:'mongo nodenv --eval "db.dropDatabase()"',
            createdb:'curl http://localhost:8081/setup',
            run: 'nodemon server.js'
        },
    
        availabletasks: {
            tasks: {}
        }
    });

    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-available-tasks');
    grunt.registerTask('deployweak', ['exec:run']);
    grunt.registerTask('dropdb', ['exec:dropdb']);
    grunt.registerTask('builddb',['exec:createdb']);
    grunt.registerTask('tasks', ['availabletasks']);
    grunt.registerTask('setup', ['dropdb','builddb']);
    grunt.registerTask('default',['tasks']);


}
