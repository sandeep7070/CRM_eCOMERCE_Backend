import multer from "multer"


// app.use(express.json());


// const storage = multer.diskStorage({
//     destination: function(req, file, cd){
//         cd(null, "./public/temp")
//     },
//     filename: function (req, file, cd){
//         cd(null, file.originalname)
//     }

// })

// export const upload = multer({
//     storage,
// })


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/temp')
    },
    filename: function (req, file, cb) {

      cb(null, file.originalname)
    }
  })

export const upload = multer({
     storage,
    })