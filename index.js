const express = require("express");
const app = express();
const cors=require("cors");
const mongoose=require("mongoose");


app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://rajkiran15:ypm2zU3lAx81IGBz@cluster0.l00ej.mongodb.net/test',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
).then(()=>{
  console.log("db connected");
}).catch((err)=>{
  console.log("error",err);
});


const EnquirySchema = new mongoose.Schema({
    name: {
      type: String
    },
    email:{
      type:String
    },
    subject:{
      type:String
    },
    msg:{
       type:String
    }
});

const EnquiryModal= mongoose.model("enquiry", EnquirySchema);

app.get("/",(req,res)=>{
   res.send("alive");
});
app.post("/api/enquiry",async (req,res)=>{
    const enquiry = new EnquiryModal(req.body);
    try {
      await enquiry.save();
      res.send(enquiry);
    } catch (error) {
      res.status(500).send(error);
    }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));