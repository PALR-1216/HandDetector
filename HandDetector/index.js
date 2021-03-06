

const video = document.querySelector('#video');
const audio = document.querySelector("#audio");
const canvas = document.querySelector("#canvas");
const context = canvas.getContext('2d');
let model;

const modelParams = {
    flipHorizontal: true,   // flip e.g for video 
    imageScaleFactor: 0.7,  // reduce input image size for gains in speed.
    maxNumBoxes: 20,        // maximum number of boxes to detect
    iouThreshold: 0.5,      // ioU threshold for non-max suppression
    scoreThreshold: 0.79,    // confidence threshold for predictions.
  }


handTrack.startVideo(video).then(status =>{
    if(status){
        navigator.getUserMedia({video:{}}, stream =>{
            // video.srcObject = stream
            setInterval(Detection, 10);

        },err =>{
            console.log(err)
        });
    }
})

function Detection() {
    model.detect(video).then(predictions =>{
        console.log(predictions);
        if(predictions.length > 0){
            model.renderPredictions(predictions,canvas,context,video);
            audio.play();
            model.getFPS();
        }
    });
}


handTrack.load(modelParams)
.then(lmodel =>{
    model = lmodel;
})