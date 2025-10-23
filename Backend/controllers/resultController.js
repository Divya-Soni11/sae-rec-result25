import SelectedCandidate from'../models/candidateSchema.js';
import mongoose from 'mongoose';

const checkResult=async(req,res)=>{
    try{
        const{name,phone}=req.body;

        console.log('=== DEBUG START ===');
        console.log('Frontend sent - Name:', name, 'Phone:', phone, 'Type:', typeof phone);
        console.log('Mongoose DB Name:', mongoose.connection.name);

        if(!name||!phone){
            return res.status(400).json({
                message:'please fill in complete details.',
                success:false
            });
        }
        // console.log('Mongoose DB Name:', mongoose.connection.name);

        const selected=await SelectedCandidate.findOne({phone});
        console.log('Searching phone:', phone, typeof phone);
        console.log('Query result:', selected);
        console.log('=== DEBUG END ===');




        if(!selected){
            return res.json({
                message:'rejected'
            });
        }

        const storedName=selected.name;
        const enteredName=req.body.name;

        if(storedName.trim().toLowerCase()===enteredName.trim().toLowerCase()){
            return res.json({
                name,
                message:'selected'
            });
        }else{
            return res.status(400).json({
                message:'entered Name does not match!',
                success:false
            });
        }
    }catch(error){
        console.error(error);
        return res.status(500).json({
            message:"Internal Server error.",
            success:false
        });
    }
}

export default checkResult;