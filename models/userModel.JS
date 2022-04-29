const mogoose=require('mongoose')
mogoose.connect('mongodb://127.0.0.1:27017/firstdb').then((success)=>{console.log('successfully connected to mongodb');}).catch(err=>{console.log(err);})
const User=mogoose.model('firstdbs',mogoose.Schema(
    {
        name:{
            type:String,
            required:[true,'name field is required.'],
            unique:[true,'user name should be unique.']
        },
        roles:{
            type:String,
            enum:['user','adminUser','rootUser'],
            default:['user']
        },
        email:{
            type:String,
            required:[true,'email field is required.'],
            unique:[true,'email should be unique.']
        },
        password:{
            type:String,
            required:[true,'enter your password.'],
            unique:[true,'password should be unique.'],
            minlength:[5,'minimum length should be 5'],
        },
        phoneno:{
            type:String,
            unique:[true,'phoneno should be unique.'],
            required:[true,'email field is required.'],
        },
        designation:{
            type:String,
            enum:['CSE','BED','SE','FED'],
            default:'SE',
        },
        salary:Number,
        city:String,
        country:{
            type:String,
            default:'IND',
        },
        address:String,
        pincode:Number,
        active:{
            type:Boolean,
            default:true,
        }
    }
))
console.log(User);
module.exports=User