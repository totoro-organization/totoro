const app = require("./routes/index")

const socketIo = require("socket.io");
const swaggerTools = require("swagger-tools");
const swaggerDoc = require("./swagger.json");

const PORT = process.env.PORT || 5000;

const options = {
	controllers: "./src/services",
};

swaggerTools.initializeMiddleware(swaggerDoc, (middleware) => {
	app.use(middleware.swaggerMetadata());
	app.use(middleware.swaggerValidator());
	app.use(middleware.swaggerRouter(options));
	app.use(middleware.swaggerUi());

	app.listen(PORT, function () {
		console.log("server start");
	});
});
