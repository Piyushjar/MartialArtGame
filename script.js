let c=document.getElementById("myCanvas");
let ctx=c.getContext("2d");


var background = new Image();
background.src = "images/background.jpg";

var ko = new Image();
ko.src = "images/ko.png";

var pop = new Image();
pop.src = "images/fight.png";

// Make sure the image is loaded first otherwise nothing will draw.
background.onload = function(){
    ctx.drawImage(background,0,0,1500,700);   
    ctx.drawImage(pop,700,50,200,200); 
}

let loadImage=(src,callback)=>{
let img=document.createElement("img");
img.src=src;
img.onload=()=>callback(img);
};

let imagePath=(framenumber,animation)=>{
    return "images/" + animation + "/"+ framenumber + ".png";
};

let frames={
    idle: [1,2,3,4,5,6,7,8],
    kick: [1,2,3,4,5,6,7],
    punch: [1,2,3,4,5,6,7],
    forward: [1, 2, 3, 4, 5, 6],
    backward: [1, 2, 3, 4, 5, 6],
    block: [1, 2, 3, 4, 5, 6, 7, 8, 9],
};

let loadImages=(callback)=>{
    let images={idle: [], kick: [], punch: [], forward: [], backward: [], block: []};
    let imagesToLoad=0;

    ["idle","kick","punch","forward", "backward", "block"].forEach((animation)=>{
  let animationframes=frames[animation];
  imagesToLoad=imagesToLoad+animationframes.length;
  
  
  animationframes.forEach((framenumber)=>{
    let path=imagePath(framenumber,animation);
    loadImage(path,(image)=>{
        images[animation][framenumber-1]=image;
        imagesToLoad=imagesToLoad-1;

        if(imagesToLoad===0){
            callback(images);
        }
    });
   });
 });
};

let animate=(ctx,images,animation,callback)=>{
    images[animation].forEach((image,index)=>{
        setTimeout(()=>{
            ctx.clearRect(0,0,500,500);
            ctx.drawImage(background,0,0,1500,700);
            ctx.drawImage(image,200,150,500,500);
            ctx.drawImage(pop,700,50,200,200); 
        }, index*100);
    });
    setTimeout(callback,images[animation].length*100);
};

loadImages((images)=>{
    let queuedanimation=[];

    let aux=()=>{
        let selectedanimation;
        if(queuedanimation.length===0){
            selectedanimation="idle";
        }else{
            selectedanimation=queuedanimation.shift();
        }
        animate(ctx,images,selectedanimation,aux);
    };
aux();


document.getElementById("kick").onclick=()=>{
   queuedanimation.push("kick");
   setTimeout(()=>{ctx.drawImage(ko,800,100,500,500); 
   }, 1000);
};
document.getElementById("punch").onclick=()=>{
    queuedanimation.push("punch");
 };
 document.getElementById("forward").onclick = () => {
    queuedanimation.push("forward");
  } 
  document.getElementById("block").onclick = () => {
    queuedanimation.push("block");
  } 
  document.getElementById("backward").onclick = () => {
    queuedanimation.push("backward");
  } 


 document.addEventListener("keyup",(event)=>{
     const key =event.key;
     if (key === "0"){
        queuedanimation.push("kick");
        setTimeout(()=>{ctx.drawImage(ko,800,100,500,500); 
        }, 800);
     }  else if(key === "Shift"){
        queuedanimation.push("block");
     }  else if (key === "ArrowRight") {
        queuedanimation.push("forward");
      } else if (key === "Control") {
        queuedanimation.push("punch");
      } else if (key === "ArrowLeft") {
        queuedanimation.push("backward");
      }
 });
});