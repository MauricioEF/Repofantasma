export default {
    mongo:{
        USER:process.env.MONGO_USER,
        PWD:process.env.MONGO_PWD,
        DATABASE:process.env.MONGO_DB,
    },
    jwt:{
        SECRET:process.env.JWT_SECRET,
        COOKIE:process.env.JWT_COOKIE
    },
    google:{
        CLIENT_ID:process.env.GOOGLE_CID,
        CLIENT_SECRET:process.env.GOOGLE_CSECRET
    }
}