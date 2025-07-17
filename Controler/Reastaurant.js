const Reastaurant = require("../Moduls/Reastaurant");
const cloudinary =require("../Helper/Cloudinary")
const streamifier = require('streamifier');

const ReastaurantSignUp = async (req, res) => {
  const { name, address,phone,description,openTime,closeTime } = req.body;

  const existUser = await Reastaurant.findOne({ phone });
  if (existUser) {
    return res.status(400).json({ message: "Reastaurant already exists" });
  }
  if(!req.file){
    return res.status(400).json({message:"Please upload the reastaurant image."})
  }
  const streamUpload = () => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            resource_type: 'image',
            folder: 'Reastaurant_Image',
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

  const newUser = new Reastaurant({ name, description, address,phone,  image: result.secure_url,openingHours:{open:openTime,close:closeTime} });
  await newUser.save();

  res.status(201).json({ message: " Reastaurant SignUp successful" });
};

const getallreastaurant=async(req,res)=>{
  const allreasto= await Reastaurant.find();
  return res.status(200).json({data:allreasto})
}
const getallreastaurantGrapQl=async(req,res)=>{
  const allreasto= await Reastaurant.find();
  return allreasto
}

module.exports={ReastaurantSignUp,getallreastaurant,getallreastaurantGrapQl}