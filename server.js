// Add the required dependencies
var restify = require('restify');
var mongojs = require('mongojs');

//add the db config, for local use var db = mongojs('productsdb', ['products']);
var db = mongojs('mongodb://admin:Edna12015edna1$@ds041841.mongolab.com:41841/restifymyapp', ['products']);

// Create a new server and start it
var server = restify.createServer();
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

// Start listening to any free port
server.listen(3000, function () {
console.log("Server started @ 3000");
});

// GET � All Products
server.get("/products", function (req, res, next) {
    db.products.find(function (err, products) {
        res.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8'
        });
        res.end(JSON.stringify(products));
    });
    return next();
});

//POST � Add New Product
server.post('/product', function (req, res, next) {
	var product = req.params;
	db.products.save(product, function (err, data) {
		res.writeHead(200, {
			'Content-Type': 'application/json; charset=utf-8'
		});
		res.end(JSON.stringify(data));
	});
	return next();
});



server.put('/product/:id', function (req, res, next) {
    // get the existing product
    db.products.findOne({
        id: req.params.id
    }, function (err, data) {
        // merge req.params/product with the server/product
 
        var updProd = {}; // updated products 
        // logic similar to jQuery.extend(); to merge 2 objects.
        for (var n in data) {
            updProd[n] = data[n];
        }
        for (var n in req.params) {
            updProd[n] = req.params[n];
        }
        db.products.update({
            id: req.params.id
        }, updProd, {
            multi: false
        }, function (err, data) {
            res.writeHead(200, {
                'Content-Type': 'application/json; charset=utf-8'
            });
            res.end(JSON.stringify(data));
        });
    });
    return next();
});



server.del('/product/:id', function (req, res, next) {
    db.products.remove({
        id: req.params.id
    }, function (err, data) {
        res.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8'
        });
        res.end(JSON.stringify(true));
    });
    return next();
});




server.get('/product/:id', function (req, res, next) {
    db.products.findOne({
        id: req.params.id
    }, function (err, data) {
        res.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8'
        });
        res.end(JSON.stringify(data));
    });
    return next();
});


module.exports = server;


