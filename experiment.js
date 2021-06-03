//Code adapted from paulsharpeY by Jordan Wylie & Dries Bostyn

//Create the main timeline
var rsvp_task = []; // main timeline


//Set up all the necessary words
var distractors = ['violate','alike','along','apply','asset','bunch','coast','drum','even','foam','focus','form', 
	'hike','hint','icon','maze','novel','olive','pile','press','scale','shape','solid','suite','swing','tile','title', 
	'walk','wave'];  //doublecheck to make sure this array is large enough!

var practicewords = ['practiceword1','practiceword2']

var targetsAuthority = ['Authority1','Authority2'];

var targetsFairness = ['behind their back','biased'/*,'bigoted','bilking','blackmailing','chauvinists','cheating','con artist',
'conniving','corrupt','crook','deception','defrauding','disadvantaged','discrimination','dishonest','disparity','disproportionate',
'distrustful','double crossing','duplicitous','exclude','false advertising','false witness','favoritism','fleecing','fraudulent',
'free rider','freeloading','hoodwinking','hypocrite','imbalance','imposters','inequality','inequity','injustice','lying',
'mislead','misogyny','mooching','oppression','partiality','pickpocketing','plagiarize','prejudiced','restrictive','ripoff', 
'robbed','scamming','segregating','sexism','shyster','steal','suckered','swindles','thieving','tricking','unequal',
'unfair', 'uninsured','unjust','unscrupulous', 'untrustworthy'*/];

// Copy the list of Moral words so that we can use a separate list for each of the two  lag locations 
var targetsFairness2 = targetsFairness
var targetsAuthority2 = targetsAuthority


// stimuli definitions
//Change this to change inter trial interval 
var rsvp_iti = {
    type: 'html-keyboard-response',
    stimulus: '<span></span>',
    choices: jsPsych.NO_KEYS,
    trial_duration: 100,
    data: {test_part: 'iti'}
};

//Change this to change inter trial interval in the demo
var rsvp_demo_iti = {
    type: 'html-keyboard-response',
    stimulus: '<span></span>',
    choices: jsPsych.NO_KEYS,
    trial_duration: 200,
    data: {test_part: 'iti'}
};

// Change this to change duration of the fixation cross
var fixation = {
  type: 'html-keyboard-response',
  stimulus: '<div class="rsvp">+</div>',
  choices: jsPsych.NO_KEYS,
  trial_duration: 1000,
  data: {test_part: 'fixation'}
}

// I think this changes the blank period after the fixation
var blank = {
  type: 'html-keyboard-response',
  stimulus: '<div class="rsvp"></div>',
  choices: jsPsych.NO_KEYS,
  trial_duration: 250,
  data: {test_part: 'blank'}
}

// Not entirely sure what this one does
var rsvp_stimulus_block = {
    type: 'html-keyboard-response',
    stimulus: jsPsych.timelineVariable('stimulus'),
    choices: jsPsych.NO_KEYS,
    trial_duration: 70,
    data: jsPsych.timelineVariable('data'),
};

// Also not entirely sure what this one does
var rsvp_demo_stimulus_block = {
    type: 'html-keyboard-response',
    stimulus: jsPsych.timelineVariable('stimulus'),
    choices: jsPsych.NO_KEYS,
    trial_duration: 210,
    data: jsPsych.timelineVariable('data'),
};

// Response trial
var response_block = {
  type: 'survey-text',
  questions: [{prompt: "which words appeared in green?"}],
  data: jsPsych.timelineVariable('data'),
}

// Setting up Functions
// This creates the stimulus material for a single trial
// Note that the code adds CSS tags to both distractors and targets so that we can easily format those through the CSS stylesheet
function rsvp_trial(o) {
	var stimuli = jsPsych.randomization.sampleWithoutReplacement(distractors, 15);
	for (stim in stimuli) {
		if(stim == o.t1_location){
			stimuli[stim] = '<div class = "target">'.concat(stimuli[stim]).concat("</div>");
		}
		else {
		stimuli[stim] = '<div class = "distr">'.concat(stimuli[stim]).concat("</div>")
		}
		
	}
	var target                    = jsPsych.randomization.sampleWithoutReplacement(o.targetwords, 1);
	//stimuli[o.t1_location]         =  '<div class = "target">'.concat(stimuli[o.t1_location]).concat("</div>");
	stimuli[o.t1_location + o.lag] = '<div class = "target">'.concat(target[0]).concat("</div>");
	for (stim in stimuli){console.log('stimuli: '+stimuli[stim])};
	return({stimuli: stimuli, targets: target[0]});
}


// This runs the actual trial
function make_rsvp_timeline(trials, phase) {
	rsvp_timeline = [];
	trial_number  = 0;
	for (trial in trials) {
		trial_number++;
		rsvp_stimuli = rsvp_trial(trials[trial]);

		// RSVP trial: 15 words, 2 targets
		var rsvp_block_stimuli = [];
		
		for (stimulus in rsvp_stimuli.stimuli) {
			rsvp_block_stimuli.push(
	  			{
	  				stimulus: "<span class='rsvp'>" + rsvp_stimuli.stimuli[stimulus] + "</span>",
	  				data: {
	  					phase: phase,
	  					test_part: 'rsvp',
	  					stim: rsvp_stimuli.stimuli[stimulus],
	  					trial_number: trial_number
	  				}
	  			}
	  		);
		}
		// attach RSVP stimuli to a timeline
		if (phase == 'instructions') {
			// slow stimuli
			stimulus_trial = rsvp_demo_stimulus_block;
			iti_trial      = rsvp_demo_iti;
		} else {
			stimulus_trial = rsvp_stimulus_block;
			iti_trial      = rsvp_iti;
		}
		var test_procedure = {
			timeline: [stimulus_trial, iti_trial],
			timeline_variables: rsvp_block_stimuli
		}

		// Getting a responses
	  	var rsvp_response_stimuli = [];
	  	rsvp_response_stimuli.push(
			{
				data: {
					phase: phase,
					test_part: 'response',
					trial_number: trial_number
				}
			}
		);

		// attach responses to timeline
		var response_procedure = {
			timeline: [response_block],
			timeline_variables: rsvp_response_stimuli
		}
		rsvp_timeline.push(fixation);
		rsvp_timeline.push(blank);
		rsvp_timeline.push(test_procedure);
		rsvp_timeline.push(response_procedure);
	}
	return { timeline: rsvp_timeline }
}


// Flow of the Experiment starts here

// FIRST SCREEN
// Initial full screen
rsvp_task.push({
  type: 'fullscreen',
  message: '<div class="instructions"><p>Welcome to our experiment! </p><p>Please turn off any music or television, and put your phone on silent. This experiment will take about 15-20 minutes. <p>Press any key to begin.</p></div>',
  fullscreen_mode: true
});

// SECOND SCREEN
// First instructions
var instructionsGEN = {
	type: "html-keyboard-response",
	stimulus: ['<div style="color:black;font-size:30px;line-height:1.5"> This experiment tests your memory about words. </p>' +
		" <p> First, you will read a short passage and answer some questions.</p>"+ 
		' <p> Then, you will be tested on your ability to remember two words that appear in <b>green</b>. We will begin with a practice trial. </p>' +
		" <p><b>Please press any key to continue. </b></p></div>"],
	  	data: {test_part: 'instructions'},
	post_trial_gap: 1500
  };
  rsvp_task.push(instructionsGEN);

// THIRD SCREEN
// Run a single slow instruction trial
rsvp_task.push(make_rsvp_timeline([{t1_location: 2, lag: 3, targetwords: practicewords}], 'instructions')); //CHANGE THIS TO PRACTICEWORDS

// FOURTH SCREEN
// Instructions after practice trial
var instructions_prac2 = {
	type: "html-keyboard-response",
	stimulus: "<div class='instructions'><p>In the example you just saw, " +
			  "the words appeared quite slowly.</p>" +
			  "<p>The real task is more challenging, as the words " +
			  "will appear more rapidly.</p>" +
			  "<p>You will have some time to practice before starting the test.</p>" +
			  "<p>Press any key to start the practice.</p></div>",
	data: {test_part: 'instructions'},
	post_trial_gap: 1000
  };
rsvp_task.push(instructions_prac2);

// FIFTH SCREEN
//Run a Fairness block
blocklength = targetsFairness.length * 2
lagvector = jsPsych.randomization.repeat([1,2], targetsFairness.length);
for (i = 0; i < blocklength; i++) {
		console.log('i: ', i);
		//pick a random t1 location 
		t1location = jsPsych.randomization.sampleWithReplacement([0,3], 1) //maybe adapt this randomization
		if(lagvector[i] == 1) {
			//run a trial with short lag
			rsvp_task.push(make_rsvp_timeline([ {t1_location: t1location[0], lag: 1, targetwords: targetsFairness}], 'FairnessBlock')); //probably change instructions
		}
		if (lagvector[i] == 2) {
			//run a trial with longer lag
			rsvp_task.push(make_rsvp_timeline([ {t1_location: t1location[0], lag: 7, targetwords: targetsFairness2}], 'FairnessBlock')); //probably change instructions
		}
	}

// SIXTH SCREEN
// Instructions Intermezzo
var instructions_inter1 = {
	type: "html-keyboard-response",
	stimulus: "<div class='instructions'><p>Wow, well done. " +
			  "</p>" +
			  "<p> Now an authority block." +
			  "</p>" +
			  "<p></p>" +
			  "<p></p></div>",
	data: {test_part: 'instructions'},
	post_trial_gap: 1000
  };
rsvp_task.push(instructions_inter1);

// SEVENTH SCREEN
//Run an authority block 
blocklength = targetsAuthority.length * 2
lagvector = jsPsych.randomization.repeat([1,2], targetsAuthority.length);
	for (i = 0; i < blocklength; i++) {
		//pick a random t1 location 
		t1location = jsPsych.randomization.sampleWithReplacement([0,3], 1) //maybe adapt this kind of randomization
		if(lagvector[i] == 1) {
			//run a trial with short lag
			rsvp_task.push(make_rsvp_timeline([ {t1_location: t1location[0], lag: 1, targetwords: targetsAuthority}], 'AuthorityBlock')); //probably change instructions
		}
		if (lagvector[i] == 2) {
			//run a trial with longer lag
			rsvp_task.push(make_rsvp_timeline([ {t1_location: t1location[0], lag: 7, targetwords: targetsAuthority2}], 'AuthorityBlock')); //probably change instructions
		}
	}

// EIGHT SCREEN
//Some final instructions
var instructions_blockend = {
	type: "html-keyboard-response",
	stimulus: "<div class='instructions'><p>THIS WAS THE FINAL BLOCK, " +
			  "more text here.</p>" +
			  "<p>more text here " +
			  "or here.</p>" +
			  "<p>Some more here</p>" +
			  "<p>Also here.</p></div>",
	data: {test_part: 'instructions'}, // CHANGE THIS??
	post_trial_gap: 1000
  };
  rsvp_task.push(instructions_blockend);
