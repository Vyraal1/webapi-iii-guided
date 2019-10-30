const express = require("express"); // importing a CommonJS module
const helmet = require("helmet");
const hubsRouter = require("./hubs/hubs-router.js");

const server = express();

// the three amigos
// creating a date logger whenever the request is received
function dateLogger(req, res, next) {
  console.log(new Date().toISOString());

  next();
}

const httpLogger = (req, res, next) => {
  const { path, method } = req;
  console.log(
    `YO YO YO you hit ${path} representing the ${method}. Leave it at the tone biaaacchh.`
  );
  next();
};

//global middleware
// use the helmet to make sure that you aren't telling people you are using headers
server.use(helmet());
server.use(express.json());

//custon answering machine
server.use(httpLogger);

//server.use looks for a function, it doesnt invoke it right there
server.use(dateLogger);

server.use("/api/hubs", hubsRouter);

server.get("/", (req, res) => {
  const nameInsert = req.name ? ` ${req.name}` : "";

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});

module.exports = server;
