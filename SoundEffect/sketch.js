let twinkleSynth1, twinkleSynth2, twinkleSynth3, twinkleSynth4, twinkleReverb, twinkleFilter, twinkleLFO, eventImage;

function preload() {

  eventImage = loadImage('level_done.jpg'); }

function setup() {
  createCanvas(400, 400);

  twinkleSynth1 = new Tone.Synth({
    oscillator: {
      type: "triangle"
    },
    envelope: {
      attack: 0.01,
      decay: 0.2,
      sustain: 0.1,
      release: 0.5
    }
  });

  twinkleSynth2 = new Tone.Synth({
    oscillator: {
      type: "sine"
    },
    envelope: {
      attack: 0.01,
      decay: 0.2,
      sustain: 0.1,
      release: 0.5
    }
  });

  twinkleSynth3 = new Tone.Synth({
    oscillator: {
      type: "square"
    },
    envelope: {
      attack: 0.01,
      decay: 0.3,
      sustain: 0.1,
      release: 0.6
    }
  });

  twinkleSynth4 = new Tone.Synth({
    oscillator: {
      type: "sawtooth"
    },
    envelope: {
      attack: 0.01,
      decay: 0.4,
      sustain: 0.1,
      release: 0.7
    }
  });

  twinkleReverb = new Tone.Reverb({
    decay: 2,
    preDelay: 0.1
  }).toDestination();

  twinkleFilter = new Tone.Filter({
    type: "highpass",
    frequency: 800,
    rolloff: -12
  }).connect(twinkleReverb);

  twinkleLFO = new Tone.LFO({
    frequency: "4n",
    min: 400,
    max: 1200
  }).start().connect(twinkleFilter.frequency);

  twinkleSynth1.connect(twinkleFilter);
  twinkleSynth2.connect(twinkleFilter);
  twinkleSynth3.connect(twinkleFilter);
  twinkleSynth4.connect(twinkleFilter);
}

function draw() {
  
}

function mouseClicked() {

  image(eventImage, 0, 0, width, height);

  twinkleSynth1.triggerAttackRelease("E6", 0.5);

  setTimeout(() => {
    twinkleSynth2.triggerAttackRelease("G6", 0.5);
  }, 200);

  setTimeout(() => {
    twinkleSynth3.triggerAttackRelease("C6", 0.6);
  }, 400);

  setTimeout(() => {
    twinkleSynth4.triggerAttackRelease("B6", 0.7);
  }, 600);
}