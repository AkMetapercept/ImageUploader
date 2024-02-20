const express = require("express");
const path = require("path");
const multer = require("multer");
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");



const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		
		cb(null, "uploads");
	},
	filename: function (req, file, cb) {
		cb(null, file.fieldname + "-" + Date.now() + ".jpg");
	},
});



const upload = multer({
	storage: storage,
	
	fileFilter: function (req, file, cb) {
		
		const filetypes = /jpeg|jpg|png/;
		
		const extname = filetypes.test(
			path.extname(file.originalname).toLowerCase()
		);

		 if (extname) {
			return cb(null, true);
		}

		cb("Error: File upload only supports the " +"following filetypes - " +filetypes);
	},


}).single("mypic");

app.get("/", function (req, res) {
	res.render("Signup");
});

app.post("/uploadProfilePicture", function (req, res, next) {
	
	upload(req, res, function (err) {
		if (err) {

			res.send(err);
		} else {
		
			res.send("Image uploaded...");
		}
	});
});


app.listen(5000, () =>{
	console.log("Server start on",5000);
});
