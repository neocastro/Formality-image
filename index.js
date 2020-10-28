var Image = require("./Image_util.js");
var Formality_aux = require("./Parse_Formality.js");
var fs = require("fs");

function parse_dir(dirname){
  fs.readdir(dirname, async function(err, filenames) {
    if (err) {
      console.log(err);
      return;
    }
    // filenames.forEach( image_name => parse_single_image(dirname, image_name));
    var content =  "" 
    for(var i=0; i < filenames.length; i++){
      var filename = filenames[i]
      var img_info = await Image.read_image(dirname + filename)
      var fm_code  = Formality_aux.file_content(filename, img_info)
      content += "\n" + fm_code
    }
    var folder_name = dirname.split("/")[2]
    fs.writeFileSync("./fm_images/"+folder_name+"/"+"Mons.Assets.fm", content)    
    
  })
}

// Read and get info like pixels formatted, width and height
function parse_single_image(dirname, image_name){
  Image.read_image(dirname + image_name)
    .then( image_info => 
      // Create a .fm format file and save it in /fm_images
      Formality_aux.make_fm_file(dirname, image_info, image_name)
      .then ( res => console.log(res) )
      .catch( err => console.log(err) )
    )
    .catch( err => console.warn(err) );
    // An error about EISDIR: illegal operation on a directory, read appears but everything works
} //"index.js: got an error of MIME for Buffer from Jimp"

// Runs the script in a folder
parse_dir("./img/Mons/");

// Runs the script for a single file
// parse_single_image("./img/construction/", "tent_01_z4p.png");

// Rename images in a folder
// Image.rename_images("./temp/casa_dentro_bg/", "home_inside_bg", 11, 8);

// Obs: there is an error with jimp that idk what it is, but the code is working
