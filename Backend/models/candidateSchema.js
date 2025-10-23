import mongoose from 'mongoose';

const selectedCandidate= new mongoose.Schema({
    "name":{
        type:String,
        required:true
    },
    "phone":{
        type:Number,
        required:true
    }
});

export default mongoose.model("SelectedCandidates",selectedCandidate,"SelectedCandidates");