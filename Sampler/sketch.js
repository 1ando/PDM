let startContext, samples, sampler, buton1, button2, button3, button4, pingPongSlider, feedbackSlider, distSlider, wetSlider;

let rev = new Tone.Reverb(5).toDestination();
let dist = new Tone.Distortion(0).connect(rev);
let pingpong = new Tone.PingPongDelay(0, 0).connect(dist);
pingpong.wet.value = 0.5;

function preload() {
  // sampler = new Tone.Player("media/cat.mp3").toDestination()
  samples = new Tone.Players({
    pop: "media/pop.mp3",
    violin: "media/violin.mp3",
    iphone: "media/iphone.mp3",
    livechat: "media/livechat.mp3",
    drumb: "media/drumb.mp3",
    slap_bass: "media/slap_bass.mp3",
    vibration: "media/vibration.mp3",
  }).connect(pingpong)
}

function setup() {
  createCanvas(400, 400);
  startContext = createButton("Start Audio Context");
  startContext.position(0,0);
  startContext.mousePressed(startAudioContext)
 
  button1 = createButton("Play Bass Sample");
  button1.position(10, 30);
  button2 = createButton("Play Drumb Sample");
  button2.position(200, 30);
  button3 = createButton("Play Camera Sample");
  button3.position(200, 60);
  button4 = createButton("Play Vibration Sample");
  button4.position(10, 60);
  button1.mousePressed(() => {samples.player("slap_bass").start()})
  button2.mousePressed(() => {samples.player("drumb").start()})
  button3.mousePressed(() => {samples.player("iphone").start()})
  button4.mousePressed(() => {samples.player("vibration").start()})
  

  pingPongSlider = createSlider(0, 1, 0, 0.01);
  pingPongSlider.position(10, 100);
  pingPongSlider.input(() => {pingpong.delayTime.value = pingPongSlider.value()});
  feedbackSlider = createSlider(0, 0.99, 0, 0.01);
  feedbackSlider.position(200, 100);
  feedbackSlider.input(() => {pingpong.feedback.value = feedbackSlider.value()});
  distSlider = createSlider(0, 10, 0, 0.01);
  distSlider.position(10, 200);
  distSlider.input(() => {dist.distortion = distSlider.value()});
  wetSlider = createSlider(0, 1, 0, 0.01);
  wetSlider.position(200, 200);
  wetSlider.input(() => {rev.wet.value = wetSlider.value()});
}

function draw() {
  background(220);
  text("Ping Pong Delay: " + pingPongSlider.value(), 15, 140);
  text("Feedback Amount: " + feedbackSlider.value(), 205, 140);
  text("Distortion Amount: " + distSlider.value(), 15, 240);
  text("Reverb Wet Amount: " + wetSlider.value(), 205, 240)
}

// function playSample() {
//   sampler.start()
// }

function startAudioContext() {
  if (Tone.context.state != 'running') {
    Tone.start();
    console.log("Audio Context Started")
  } else {
    console.log("Audio Context is already running")
  }
}