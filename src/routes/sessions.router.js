import { Router} from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import config from '../config/config.js';

const router = Router();

router.post('/register',passport.authenticate('register',{session:false}),async(req,res)=>{
    console.log(req.body);
    res.send({status:"ok"});
})

router.post('/login',passport.authenticate('login',{session:false}),async(req,res)=>{
    const loginUser = {
        role:req.user.role,
        email:req.user.email,
        name:req.user.name
    }
    const token =jwt.sign(loginUser,config.jwt.SECRET,{expiresIn:300});
    console.log(token);
    res.cookie(config.jwt.COOKIE,token,{maxAge:300000,httpOnly:true}).send({status:"logged in"})
})

router.get('/current',async(req,res)=>{
    try{
        const token = req.cookies[config.jwt.COOKIE];
        if(!token) return res.redirect('/');
        const user = jwt.verify(token,config.jwt.SECRET);
        res.send({status:"success",user})
    }catch(error){
        if(error.expiredAt){//Si tiene esta propiedad, es porque el token expiró
            res.send({status:"error",error:"token expirado"})
        }
    }
})

router.get('/google',passport.authenticate('google',{session:false,scope:['email','profile']}),async(req,res)=>{})
router.get('/googlecallback',passport.authenticate('google',{session:false}),(req,res)=>{
    const loginUser = {
        role:req.user.role,
        name:req.user.name,
        email:req.user.email
    }
    const token =jwt.sign(loginUser,config.jwt.SECRET,{expiresIn:300});
    console.log(token);
    res.cookie(config.jwt.COOKIE,token,{maxAge:300000,httpOnly:true}).send({status:"logged in"})
})
export default router;