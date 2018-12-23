// /home/gabriel/Images
var glob = require("glob")
 
// options is optional
glob("/home/gabriel/**/*.png)", {}, function (er, files) {
  console.log(files);
  
})