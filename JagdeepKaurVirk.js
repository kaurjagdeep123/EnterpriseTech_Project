var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

/* Creating database */
MongoClient.connect(url, function(err, db) {
if (err) throw err;
console.log("Database created!");
db.close();
});

/* Creating collections*/

MongoClient.connect(url, function(err, db) {
if (err) throw err;
var dbo = db.db("TaxiCompany");
dbo.createCollection("ride", function(err, res) {
if (err) throw err;
console.log("Collection created!");
db.close();
});
});



MongoClient.connect(url, function(err, db) {
if (err) throw err;
var dbo = db.db("TaxiCompany");
dbo.createCollection("garage", function(err, res) {
if (err) throw err;
console.log("Collection created!");
db.close();
});
});

MongoClient.connect(url, function(err, db) {
if (err) throw err;
var dbo = db.db("TaxiCompany");
dbo.createCollection("booking", function(err, res) {
if (err) throw err;
console.log("Collection created!");
db.close();
});
});


/* Inserting documents into collections */

MongoClient.connect(url, function(err, db) {
if (err) throw err;
var dbo = db.db("TaxiCompany");
var myobj = [
{ ride_id: '2', pickup_location: 'Highway 71', destination:'Green Grass 1',ride_date:'sept 04,2019',noOfPassengers:'1',start_time:'4:30pm',end_time:'6:00pm'},
{ ride_id: '10', pickup_location: 'Lowstreet 4', destination:'Ocean blvd 2',ride_date:'sept 10,2019',noOfPassengers:'3',start_time:'11:35am',end_time:'2:00pm'},
{ ride_id: '50', pickup_location: 'Sky st 331', destination:'Main Road 989',ride_date:'nov 05,2019',noOfPassengers:'2',start_time:'11:25pm',end_time:'1:56am'},
{ ride_id: '8', pickup_location: 'Park Lane 38', destination:'Central st 954',ride_date:'nov 25,2019',noOfPassengers:'4',start_time:'07:25am',end_time:'10:56am'},
{ ride_id: '15', pickup_location: 'Sideway 1633', destination:'Mountain 21',ride_date:'dec 02,2019',noOfPassengers:'4',start_time:'12:25pm',end_time:'01:56am'}
];
dbo.collection("ride").insertMany(myobj, function(err, res) {
if (err) throw err;
console.log("Number of documents inserted: " + res.insertedCount);
db.close();
});
});
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("TaxiCompany");
  var myobj = [
   	{ garageName: 'Car_Guys',address:'266 Rutherford rd', city:'Brampton'},
	{ garageName: 'BJA Autos',address:'77 Browns Line', city:'Toronto'},
	{ garageName: 'Tonys Garage',address:'289 yonge street', city:'Toronto'},
	{ garageName: 'Mr.Lube ',address:'21 Dundas street', city:'Mississauga'},
	{ garageName: 'Prince Auto Care',address:'244 airport rd', city:'Mississauga'}
	

  ];
  dbo.collection("garage").insertMany(myobj, function(err, res) {
    if (err) throw err;
    console.log("Number of documents inserted: " + res.insertedCount);
    db.close();
  });
});

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("TaxiCompany");
  var myobj = [
   	{  customer_id:'110',booking_status:'booked', pickpoint_id: '615',dest_id: '215',time:'2:00pm',date:'sept 20, 2019'},
	{ customer_id:'471',booking_status:'requested', pickpoint_id: '512',dest_id: '210',time:'12:29pm',date:'sept 22, 2019'},
	{ customer_id:'117',booking_status:'booked', pickpoint_id: '615',dest_id: '220',time:'3:45pm',date:'nov 10, 2019'},
	{ customer_id:'380',booking_status:'canceled',  pickpoint_id: '701',dest_id: '225',time:'9:30am',date:'nov 15, 2019'},
	{ customer_id:'511',booking_status:'booked',  pickpoint_id: '657',dest_id: '230',time:'4:30pm',date:'dec 02, 2019'}
	

  ];
  dbo.collection("booking").insertMany(myobj, function(err, res) {
    if (err) throw err;
    console.log("Number of documents inserted: " + res.insertedCount);
    db.close();
  });
});


/* Reading Collections after Inserting documents */

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("TaxiCompany");
  dbo.collection("ride").find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});


MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("TaxiCompany");
  dbo.collection("garage").find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});


MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("TaxiCompany");
  dbo.collection("booking").find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});


/*Updating Collections */

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("TaxiCompany");
  var myquery = ({$and :[{pickup_location: "Sky st 331"},{ride_date:"nov 05,2019"}]});
  var newvalues = {$set: {start_time:"07:00pm",end_time:"08:06pm"} };
  dbo.collection("ride").updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
    console.log(res.result.nModified + " document(s) updated");
    db.close();
  });
});



MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("TaxiCompany");
  var myquery = {garageName: "Nipash Automotive Garage"};
  var newvalues = {$set: {garageName:"Tonys Garage"} };
  dbo.collection("garage").updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
    console.log(res.result.nModified + " document(s) updated");
    db.close();
  });
});

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("TaxiCompany");
  var myquery = {customer_id: "471"};
  var newvalues = {$set: {date:"Sept 24,2019"} };
  dbo.collection("booking").updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
    console.log(res.result.nModified + " document(s) updated");
    db.close();
  });
});

/* Deleting Collections */
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("TaxiCompany");
  var myquery = { city: /^M/ };
  dbo.collection("garage").deleteMany(myquery, function(err, obj) {
    if (err) throw err;
    console.log(obj.result.n + " document(s) deleted");
    db.close();
  });
});