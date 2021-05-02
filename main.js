var canvas = document.getElementById("my-canvas");
var ctx = canvas.getContext("2d");

let loadImage = (src, callback) => {
   let img = document.createElement("img");
   img.onload = () => callback(img);
   img.src = src;

}

let imagePath = (frameNumber, animation) => {
   return "images/"+animation+"/"+frameNumber+".png";
}

let frames = {
   idle: [1,2,3,4,5,6,7,8],
   backward: [1,2,3,4,5,6],
   kick: [1,2,3,4,5,6,7],
   forward: [1,2,3,4,5,6],
   punch: [1,2,3,4,5,6,7],
   block: [1,2,3,4,5,6,7,8,9],
}
let loadImages = (callback) => {
   let images={idle: [], backward: [], kick: [], forward: [], punch: [], block: []};
   let imagesToLoad = 0;
   ["idle","backward","kick","forward","punch","block"].forEach((animation) => {
      let animationFrame = frames[animation];
      imagesToLoad = imagesToLoad + animationFrame.length;

      animationFrame.forEach((frameNumber) => {
         let path = imagePath(frameNumber, animation);
   
         loadImage(path, (image) => {
            images[animation][frameNumber -1] = image;
            imagesToLoad = imagesToLoad - 1;

            if(imagesToLoad === 0){
               callback(images);
            }
         });
      })
      
   });
};

let animate = (ctx, images, animation, callback) => {
   images[animation].forEach((image,index)=>{
      setTimeout(() => {
         ctx.clearRect(0, 0, 500, 500);
         ctx.drawImage(image, 0, 0, 500, 500);
      }, index*100);
   });
   setTimeout(callback, images[animation].length * 100);
   
};

loadImages((images) => {
   let queuedanimations = [];

   let aux = () => {
      let selectedAnimation;

      if(queuedanimations.length === 0){
         selectedAnimation = "idle";
      }
      else{
         selectedAnimation = queuedanimations.shift();
      }
      animate(ctx,images,selectedAnimation,aux);
   }
   aux();

   document.getElementById('kick').onclick = () => {
      queuedanimations.push("backward");
      queuedanimations.push("kick");
      queuedanimations.push("block");
   }

   document.getElementById('punch').onclick = () => {
      queuedanimations.push("forward");
      queuedanimations.push("punch");
      queuedanimations.push("block");
   }

   document.addEventListener('keyup', (event) => {
      const key = event.key; // "ArrowRight", "ArrowLeft", "ArrowUp", or "ArrowDown"

      if(key === "ArrowLeft"){
         queuedanimations.push("backward");
         queuedanimations.push("kick");
         queuedanimations.push("block");
      }
      else if(key === "ArrowRight"){
         queuedanimations.push("forward");
         queuedanimations.push("punch");
         queuedanimations.push("block");
      }
  });
});
