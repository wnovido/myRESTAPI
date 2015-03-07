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

// GET – All Products
server.get("/products", function (req, res, next) {
    db.products.find(function (err, products) {
        res.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8'
        });
        res.end(JSON.stringify(products));
    });
    return next();
});

//POST – Add New Product
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


module.exports = server;


