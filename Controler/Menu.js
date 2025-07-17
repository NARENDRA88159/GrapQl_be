const Reastaurant = require("../Moduls/Reastaurant");
const cloudinary =require("../Helper/Cloudinary")
const streamifier = require('streamifier');
const Menu = require("../Moduls/Menu");

const AddMenuItem = async (req, res) => {
  const { name, restaurantId,price,description,category,available } = req.body;

  const existMenuItem = await Reastaurant.findOne({ name });
  if (existMenuItem) {
    return res.status(400).json({ message: "Item allready exist" });
  }
  if(!req.file){
    return res.status(400).json({message:"Please upload the reastaurant image."})
  }
  const streamUpload = () => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            resource_type: 'image',
            folder: 'Menu_Image',
          },
          (error, result) => {
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          }
        );

        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
    };

    const result = await streamUpload();

  const newUser = new Menu({ name, restaurantId,price,description,category,available,  image: result.secure_url });
  await newUser.save();

  res.status(201).json({ message: " Item add successful" });
};

const getAllMenuItemsInRestaurant = async (req, res) => {
  try {
    const { id } = req.params; // Get restaurant ID from URL params

    // Find menu items with matching restaurantId
    const menuItems = await Menu.find({ restaurantId: id });
    if(menuItems){
    return res.status(200).json({ data: menuItems });
    }
    return res.status(400).json({message:"id is not valide"})

    
  } catch (error) {
    console.error('Error fetching menu items:', error);
    return res.status(500).json({ message: 'Server Error' });
  }
};
// const getAllMenuItemsInGraphQL = async () => {
//   // Fetch all menu items from DB
//   return await Menu.find().populate('restaurantId');
// };
const getAllMenuItemsInGraphQL = async () => {
  return await Menu.find(); // No populate here – we handle it in nested resolver
};



module.exports={AddMenuItem,getAllMenuItemsInRestaurant,getAllMenuItemsInGraphQL}