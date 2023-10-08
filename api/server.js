// 0x07aB08664f94b3529918A40567c7244723251964

const express = require('express')
const cors = require("cors")
// const tasks=require('./routes/routes')
const app = express();

//user-/api/ethereum/create-task -> server.js -> routes.js -> controller.js -> tasks.js
app.use(cors())
// app.use(express.json())
// app.use('/api/ethereum',tasks)

const PORT=3000;
app.listen(PORT,()=>{
    console.log(`Server Running At PORT ${PORT}`)
})


const ABI = require("./ABI.json");
const {Web3}= require("web3");
const web3 = new Web3("https://tiniest-nameless-bridge.ethereum-sepolia.discover.quiknode.pro/f0ecbf7c66c6175d53139ca79936f787cfa8bc39/")
const contractAddress = "0x07aB08664f94b3529918A40567c7244723251964";
const contract = new web3.eth.Contract(ABI,contractAddress);


app.get("/api/ethereum/view-certificate/:certhash",async(req,res)=>{
    try{
        const {certhash} = req.params;
        
        const newcert = await contract.methods.searchcert(certhash).call();
        const{name,date,organizer}=newcert;
        const certObj={
            name,date,organizer
        }
        // console.log(newcert);
        res.status(200).json({status:200,certObj,message:"Cerificate Valid"});
    }catch(error){
        console.log(error);
        res.status(500).json({status:500,message:"Certificate Not Valid"})
    }
    
})


app.post("/api/ethereum/generate-certificate",async(req,res)=>{
    res.status(200).json({status:200,message:"Certificate Generated"});
    // try{
    //     const newcert = await contract.methods.generatecert("Shebin Sam","12/09/2023","Khacks").send({from:"0x81F5C8EA3404Ae1dfC35172930dAFd0975da6a23"});
    //     console.log(newcert);
    //     // const cert = await contract.methods.hash("Shebin Sam","12/09/2023","Khacks").send({from:"0x81F5C8EA3404Ae1dfC35172930dAFd0975da6a23"});
    //     res.status(200).json({status:200,newcert,message:"Certificate Generated"});
    // }catch(error){
    //     res.status(500).json({status:500,message:"Certificate Not Generated"});
    // }
})

// console.log(contract);

// const viewcert = async()=>{
//     // const newcert = await contract.methods.generatecert("Shebin Sam","12/09/2023","Khacks").call();
//     // const cert = await contract.methods.hash("Shebin Sam","12/09/2023","Khacks").call();
//     const newcert = await contract.methods.searchcert("0x7921a789ff734cd1088118e99ec4651b0183c9eb05e994f521d441f3fd2336fd").call();
//     console.log(newcert);

// }

// viewcert();