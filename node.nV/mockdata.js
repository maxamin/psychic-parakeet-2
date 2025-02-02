var Listing   = require('./app/models/listing');
var User   = require('./app/models/user');
var Application = require('./app/models/application');
var _ = require('underscore');

exports.ee1 = new User({ 
    username: 'superhacker', 
    password: 'abc123!!', 
    email: 'superhacker@email.com',
    answer: 'lol',
    firstname: 'this',
    lastname: 'user',
    isPremium:false,
    enabled:true,
    accountNonExpired:true,
    credentialsNonExpired:true,
    accountNonLocked:true,
    applications:[],
    interviews:[],
    offers:[],
    rejected:[],
    role:1, //employee-1 | employer-2 |admin - 3
    reviews:[],//for Premium Employees
    following:[] //If employee - employers| if employer, memp
 });

exports.ee2 = new User({ 
    username: 'Joe', 
    password: 'abc123!!', 
    email: 'joe@email.com',
    answer: 'lol',
    firstname: 'Joseph',
    lastname: 'Cunningham IV',
    isPremium:false,
    enabled:true,
    accountNonExpired:true,
    credentialsNonExpired:true,
    accountNonLocked:true,
    applications:[],
    interviews:[],
    offers:[],
    rejected:[],
    role:1, //employee-1 | employer-2 |admin - 3
    reviews:[],//for Premium Employees
    following:[] //If employee - employers| if employer, memp
 });

exports.er1 = new User({ 

    username: 'nvisium', 
    password: 'abc123!!', 
    email: 'nvisium@email.com',
    answer: 'lol',
    firstname: 'nvisium',
    lastname: 'Security',
    isPremium:false,
    enabled:true,
    accountNonExpired:true,
    credentialsNonExpired:true,
    accountNonLocked:true,
    applications:[],
    interviews:[],
    offers:[],
    rejected:[],
    role:2, //employee-1 | employer-2
    reviews:[],//for Premium Employees
    following:[] //If employee - employers| if employer, memp
 });

exports.er2 = new User({ 

    username: 'otherAppSecFirm', 
    password: 'abc123!!', 
    email: 'wecanthack@email.com',
    answer: 'lol',
    firstname: 'randomAppSecFirm',
    lastname: 'Security',
    isPremium:false,
    enabled:true,
    accountNonExpired:true,
    credentialsNonExpired:true,
    accountNonLocked:true,
    applications:[],
    interviews:[],
    offers:[],
    rejected:[],
    role:2, //employee-1 | employer-2
    reviews:[],//for Premium Employees
    following:[] //If employee - employers| if employer, memp
 });

exports.admin = new User({ 

    username: 'admin', 
    password: 'abc123!!', 
    email: 'admin@email.com',
    answer: 'lol',
    firstname: 'employer',
    lastname: 'One',
    isPremium:false,
    enabled:true,
    accountNonExpired:true,
    credentialsNonExpired:true,
    accountNonLocked:true,
    applications:[],
    interviews:[],
    offers:[],
    rejected:[],
    role:3, //employee-1 | employer-2 |admin -3
    reviews:[],//for Premium Employees
    following:[] //If employee - employers| if employer, memp
 });

var l1= Listing();
var l2= Listing();
var l3= Listing();
var l4= Listing();
var l5= Listing();
var l6= Listing();
var l7= Listing();
var l8= Listing();
var l9= Listing();

l1.name="Application Security Consultant";
l2.name="Senior Application Security Consultant";
l3.name="Systems Administrator";
l4.name="Java EE Architect";
l5.name="Senior JavaScript Engineer";
l6.name="l337 Malware Analyst";
l7.name="Forensics Analyst";
l8.name="Cloud Solutions Architect";
l9.name="Project Manager";


l1.description="nVisium, the leading provider of application security tools, services, and research for software development, has an opening for an experienced, full-time Application Security Consultant. nVisium’s problem solving approach combines skilled technical analysis with a deep understanding of what matters most to our clients. From training to assessments to a fully managed platform for tracking and measuring performance, nVisium provides value to clients whether they are starting a new security initiative or already have a mature program in place.";
l2.description="The Senior Application Security Engineer is responsible for evaluating applications and application systems to ensure that business needs are met or exceeded, with a minimal degree of risk to the firm. This includes performing security assessments, risk analysis, recommending security requirements, participating in code reviews, providing security defect remediation guidance, and serving as a consultant to other business units while acting as an Application Security Subject Matter Expert (SME).";
l3.description="The System Administrator (SA) is responsible for effective provisioning, installation/configuration, operation, and maintenance of systems hardware and software and related infrastructure. This individual participates in technical research and development to enable continuing innovation within the infrastructure. This individual ensures that system hardware, operating systems, software systems, and related procedures adhere to organizational values, enabling staff, volunteers, and Partners.This individual will assist project teams with technical issues in the Initiation and Planning phases of our standard Project Management Methodology. These activities include the definition of needs, benefits, and technical strategy; research & development within the project life-cycle; technical analysis and design; and support of operations staff in executing, testing and rolling-out the solutions. Participation on projects is focused on smoothing the transition of projects from development staff to production staff by performing operations activities within the project life-cycle.This individual is accountable for the following systems: Linux and Windows systems that support GIS infrastructure; Linux, Windows and Application systems that support Asset Management; Responsibilities on these systems include SA engineering and provisioning, operations and support, maintenance and research and development to ensure continual innovation.";
l4.description="The Java Application Architect is a senior engineering leadership role and exemplifies our values of passion for quality, innovation, collaboration and the customer experience.\nEssential Functions:\nDesign modular, maintainable and scalable enterprise architecture for out new product line.Ensure the product architecture and technology supports enterprise customer and business requirements.Analyze and compare various web application frameworks and propose the appropriate solution to meet business requirements.Design and implement advanced browser-based UIs based on site objectives by analyzing user requirements, envisioning system features and functionality. Design and/or build frameworks and reusable code for use across all productsRecommend system solutions by comparing advantages and disadvantages of custom development and purchase alternatives.Identify and evolve the product architecture to further advance our support of changing security market demands.";
l5.description="We are looking for a JavaScript Developer who is motivated to combine the art of design with the art of programming. Responsibilities will include implementing visual elements and their behaviors with user interactions. You will work with both front-end and back-end web developers to build all client-side logic. You will also be bridging the gap between the visual elements and the server-side infrastructure, taking an active role on both sides, and defining how the application looks and functions.";
l6.description="A malware analyst working in a business environment responds to incident reports issued by personnel who have encountered suspicious computer behavior. Malware analysts recommend and sometimes carry out procedures designed to help systems recover from any damage inflicted, but the majority of their work is concerned with preventing the spread of malware in the first place. Malware analysts are responsible for conducting both dynamic and static analyses of suspicious code in order to establish signatures that indicate its presence. They also determine how such code spreads through systems and develop tools and procedures to detect the code in advance of any infection.";
l7.description="The responsibilities of a forensic analyst include classifying and performing tests on specific pieces of evidence lifted from a crime scene. This evidence may include hair, fibers, tissue, and firearms. Each piece of evidence must be handled and stored with care according to established procedures. Each test that is run on a particular piece of evidence must be carefully recorded. After analyzing the data, a forensic analyst will then prepare a detailed report that documents the work that was performed and the findings of the procedures. The integrity of the investigation must be maintained at all times. ";
l8.description="2+ years of experience in designing cloud native applications and architectures with IaaS and PaaS (CloudFoundry or OpenShift)2+ years of experience with DevOps, Continuous Delivery.2+ years with any of the following programming/scripting languages: Python, PERL, Java, C#, Scala, Erlang, JavaScript, PHP, Groovy, Ruby";
l9.description="Project managers are the people in charge of a specific project or projects within a company. As the project manager, your job is to plan, budget, oversee and document all aspects of the specific project you are working on. Project managers may work closely with upper management to make sure that the scope and direction of each project is on schedule, as well as other departments for support. Project managers might work by themselves, or be in charge of a team to get the job done.";
	
l1.isPremium=l2.isPremium=l5.isPremium=l6.isPremium=true;
l3.isPremium=l4.isPremium=l7.isPremium=l8.isPremium=l9.isPremium=false;

l1.date=l2.date=l3.date=l4.date=l5.date=l6.date=l7.date=l8.date=l9.date=Date();
l1.deadline=l2.deadline=l3.deadline=l4.deadline=l5.deadline=l6.deadline=l7.deadline=l8.deadline=l9.deadline=Date()+90*24;
	

exports.listings=[l1,l2,l3,l4,l5,l6,l7,l8,l9];	

exports.app1 = new Application({ 
	reasonApplied: "I think this job would be really cool!",
	background: "My background is as a whitehat hacker!",
});