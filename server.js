const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const dotenv = require("dotenv");
const { schema } = require("./GrapQl/Schema.js");
const connectDB = require("./db.js");
const express = require("express");
const userRouter = require("./Routes/User.js");
const ReastaurantRouter = require("./Routes/Reastaurant.js");
const MenuRouter = require("./Routes/Menu.js");
const http = require("http");
const cors =require("cors");
const multer = require('multer');
const User = require("./Moduls/User.js");
const { GetallUserInGraph } = require("./Controler/User.js");
const swaggerUi  = require("swagger-ui-express");
const swaggerDocs = require("./swagger-output.json");
const { getallreastaurantGrapQl } = require("./Controler/Reastaurant.js");
const { getAllMenuItemsInGraphQL } = require("./Controler/Menu.js");
const Reastaurant = require("./Moduls/Reastaurant.js");

dotenv.config();
connectDB();

const app = express();
const apiserver = http.createServer(app);
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set up multer
const storage = multer.memoryStorage();
const upload = multer({ storage });

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs)); // Serve Swagger UI
app.use("/api/user", userRouter);
app.use("/api/reasturant", ReastaurantRouter);
app.use("/api/reasturant", MenuRouter);

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
      userName:GetallUserInGraph,
      Restaurant:getallreastaurantGrapQl,
      MenuItems:getAllMenuItemsInGraphQL,
      

       
    },
    Menu: {
    restaurant: async (parent) => {
      // parent.restaurantId holds the ObjectId of the restaurant
      return await Reastaurant.findById(parent.restaurantId);
    }
  }
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
