
var express 	= require('express');
var cookieParser = require('cookie-parser')
var app         = express();
var bodyParser = require('body-parser')
var morgan      = require('morgan');
var mongoose    = require('mongoose');
var passport 	= require('passport');
var LocalStrategy = require('passport-local').Strategy;
var config = require('./config'); // get our config file
var user   = require('./app/models/user'); // get our mongoose model
var userroutes = require('./app/routes/userRoutes.js');
var employerRoutes = require('./app/routes/employerRoutes.js');
var employeeRoutes = require('./app/routes/employeeRoutes.js');
var adminRoutes = require('./app/routes/adminRoutes.js');
var authService = require('./app/services/authService.js');
var session = require('express-session');
var flash = require('connect-flash');
var url = require('url');
var csrf = require('csurf');

var UIRoutes = require('./app/routes/UIRoutes.js');

var port = process.env.PORT || 8081; 
mongoose.Promise = require('bluebird');
mongoose.connect(config.database); // connect to database
app.use(morgan('dev'));

// Passport
// passport config
var User = require('./app/models/user');
passport.use(new LocalStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());
app.use(session({
        secret: 'the princess and the frog',
        saveUninitialized: true,
        resave: true
    }));
app.use(passport.initialize());
app.use(passport.session());
app.set('superSecret', config.secret);


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(flash());
app.use(function(req, res, next){
    res.locals.success = req.flash('success');
    res.locals.errors = req.flash('error');
    next();
});


// Enable CSRF Protection
//app.use(csrf());

app.post('/login', passport.authenticate('local'), function(req, res) {
    if (req.body.next_url) {
    	res.redirect(req.body.next_url)
    } else {
    	res.redirect('/homepage');
    }
});


// Pull in the public directory
app.use('/public', express.static(__dirname + '/public'));

// Set Views folder
var eeViewPath=__dirname + '/views/ee';
var erViewPath=__dirname + '/views/er';
var adminViewPath=__dirname + '/views/admin';
var publicViewPath=__dirname + '/views';

app.set('views', [publicViewPath,eeViewPath,erViewPath,adminViewPath]); 

// Routes ===============
//Static Content Routing

//Route used to seed the database
app.get('/setup',userroutes.setup);

//Unauthenticated Routes
app.get('/',UIRoutes.index);
app.get('/login',UIRoutes.login);
app.post('/register', UIRoutes.register);


//app.post('/api/createEmployee',userroutes.createEmployee); TEST ONLY
//app.post('/api/createEmployer',userroutes.createEmployer); TEST ONLY
//app.post('/api/createAdmin',userroutes.createAdmin); TEST ONLY
  
  
app.get('/logout',userroutes.logout);
//app.post('/api/authenticate',userroutes.login);


//app.get('/api/getPublicUsers',userroutes.getPublicUsers); //TEST ONLY
//app.get('/api/getUserById',userroutes.getUserById); TEST ONLY
//User Routes
//app.get('/api/getPublicUsers',userroutes.getPublicUsers);
//app.get('/api/getProfile',userroutes.getProfile);


app.get('/homepage', authService.isAuthenticated, UIRoutes.homepage);
app.get('/settings', authService.isAuthenticated, UIRoutes.settings);
app.post('/update_settings', authService.isAuthenticated, UIRoutes.updateSettings);
app.get('/listings', authService.isAuthenticated, UIRoutes.listings);
app.get('/createListing',authService.isAuthenticated, UIRoutes.createListing);
app.get('/search', authService.isAuthenticated, UIRoutes.search);
app.get('/jobs', authService.isAuthenticated, UIRoutes.jobs);
app.get('/review', authService.isAuthenticated, UIRoutes.review);

//Admin UI Routes
app.get('/ee',UIRoutes.ee);
app.get('/er',UIRoutes.er);
app.get('/ping', UIRoutes.ping);
app.get('/tools', adminRoutes.adminTools)
app.get('/create',UIRoutes.create);

//Employer Routes
app.get('/edit_listing', authService.isEmployer,employerRoutes.editListing);
app.post('/update_listing', authService.isEmployer, employerRoutes.updateListing);
app.get('/create_listing', authService.isEmployer, employerRoutes.createListingView);
app.post('/create_listing', authService.isEmployer, employerRoutes.createListing);
/*
app.post('/api/employer/editListing',authService.isER,employerRoutes.updateListing);
app.post('/api/employer/createListing',authService.isER,employerRoutes.createListing); //Need to customize
app.get('/api/employer/getListings',authService.isER,employerRoutes.getListings);
app.post('/api/employer/updateEmployer',authService.isER,employerRoutes.updateEmployer); //TODO;
app.get('/api/employer/acceptForOffer',authService.isER,employerRoutes.acceptForOffer);
app.get('/api/employer/acceptForInterview',authService.isER,employerRoutes.acceptForInterview);
app.get('/api/employer/rejectApplication',authService.isER,employerRoutes.rejectApplication);
app.post('/api/employer/editListing',authService.isER,employerRoutes.editListing);
app.get('/api/employer/followEmployee',authService.isER,employerRoutes.followEmployee);
app.get('/api/employer/search',authService.isER,employerRoutes.search);
app.get('/api/employer/getRequestedEmployees',authService.isER,employerRoutes.getRequestedEmployees);
app.delete('/api/employer/deleteRequestedApplication',authService.isER,employerRoutes.deleteRequestedApplication);
*/
//Employee Routes

app.get('/apply', authService.isEmployee, employeeRoutes.apply);
app.post('/submit_application', authService.isEmployee, employeeRoutes.submitApplication)
app.get('/view_applications', authService.isEmployee, employeeRoutes.viewApplications)
app.get('/edit_application', authService.isEmployee, employeeRoutes.editApplication)
app.post('/update_application', authService.isEmployee, employeeRoutes.updateApplication)

/*
app.post('/api/employee/updateEmployee',authService.isEE,employeeRoutes.updateEmployee);
app.get('/api/employee/applyForJob',authService.isEE,employeeRoutes.applyForJob);
app.get('/api/employee/listInterviews',authService.isEE,employeeRoutes.listInterviews);
app.get('/api/employee/listOffers',authService.isEE,employeeRoutes.listOffers);
app.get('/api/employee/listSentApplications',authService.isEE,employeeRoutes.listSentApplications);
*/
//app.get('/api/employee/getListings',authService.isEE,employeeRoutes.getListings);
//app.get('/api/employee/upgradeToPremium',authService.isEE,employeeRoutes.employeeUpgradeToPremium);
//app.post('/api/employee/writeReview',authService.isEE,employeeRoutes.writeReview);
//app.post('/api/employee/followEmployer',authService.isEE,employeeRoutes.followEmployer);


//Payment Route

//app.post('/api/upgrade',userroutes.upgrade);

//Admin Routes

//app.post('/api/admin/createUser',authService.isAdmin,adminRoutes.createUser);

app.listen(port);
console.log('Magic happens at http://localhost:' + port);