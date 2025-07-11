const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const dotenv = require("dotenv");
const { schema } = require("./GrapQl/Schema.js");
const connectDB = require("./db.js");
const express = require("express");
const userRouter = require("./Routes/User.js");
const http = require("http");
const cors =require("cors")

dotenv.config();
connectDB();

const app = express();
const apiserver = http.createServer(app);
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/user", userRouter);

// app.get("/",async()=>{
//     "helllo"
// })
app.get("/", async (req, res) => {
  res.send("Hello from Express server!");
});

// app.use("/api/userMessage", UserMessageRoute)

const server = new ApolloServer({
  typeDefs: schema,
  resolvers: {
    Query: {
      hello: () => "hellohiinn",
    },
  },
});

// Wrap the async logic in a function since top-level await isn't supported in CommonJS
async function startServer() {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  apiserver.listen(8003, () => {
    console.log(`🚀 Server started on port: 8003`);
    console.log(`🚀 Apollo Server ready at ${url}`);
  });
}

startServer();
