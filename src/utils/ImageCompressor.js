export function ImageCompressor(file, callback){
  const reader = new FileReader()
      reader.onload = (upload) => {

        if ((file.size/1024) > 5000 ) {
          callback("Image cannot be larger than 5 Mb", null)
           return
         }
        var loadingImage = window.loadImage(
          file,
          function (img) {
            if(img.type === "error") {
                 callback("Something went wrong")
                
              } else {
                    var imageData = img.toDataURL();
                    callback(null, imageData)
                   }
          },
          {
            maxWidth: 500,
            maxHeight: 500,
           cover: true,
           orientation: true,
           crop: true
       }
      );

      loadingImage.onerror = ()=>{
        callback("Something went wrong")
      }
        
}
try {
  reader.readAsDataURL(file)
} catch (error) {
  
}

}