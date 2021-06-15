//Code adapted from paulsharpeY by Jordan Wylie & Dries Bostyn

//TO DO: What is the lag logic? ; change choice keys to specific key; add questionnaires

function getBrowserId () {
	var browsers = ["MSIE", "Firefox", "Safari", "Chrome", "Opera"];
	sUsrAg = window.navigator.userAgent,
	nIdx = browsers.length - 1;
	for (nIdx; nIdx > -1 && sUsrAg.indexOf(browsers [nIdx]) === -1; nIdx--);
 
  return browsers[nIdx];
}

var OS = window.navigator.platform;
var browser = getBrowserId();

// var pavloviaInfo; 

var subject_id = jsPsych.randomization.randomID(15);

//Create the main timeline
var rsvp_task = []; // main timeline

/* init connection with pavlovia.org */
// var pavlovia_init = {
//   type: "pavlovia",
//   command: "init",
		// Store info received by Pavlovia init into the global variable `pavloviaInfo`
//   setPavloviaInfo: function (info) {
// 	  console.log(info);
// 	  pavloviaInfo = info;
// 	}
// };
// rsvp_task.push(pavlovia_init);

//Set up all the necessary words
var distractors = ['violate','alike','along','apply','asset','bunch','coast','drum','even','foam','focus','form', 
	'hike','hint','icon','maze','novel','olive','pile','press','scale','shape','solid','suite','swing','tile','title', 
	'walk','wave'];  //doublecheck to make sure this array is large enough!

var practicewords = ['ocean','world']

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

var manip1 = {
	type: 'survey-text',
	questions: [
	  {prompt: "On May 25, 2020, the final moments of African-American man George Floyd were captured on film. In the video, Minneapolis Officer Derek Chauvin can be seen kneeling on George’s neck for a prolonged period of time. The footage was subsequently circulated on social media, re-igniting unresolved tension surrounding [the treatment of people of color] in the United States. The viral footage resulted in widespread public outcry throughout the United States. As a result of his actions, Derek Chauvin was dismissed from his position, and recently found guilty of murder. <p>In your own words, do you feel that the prosecution of Derek Chauvin was appropriate? Why or why not?</p>", rows: 5, columns: 40}
	],
  };

var manip2 = {
	type: 'survey-text',
	questions: [
	  {prompt: "In early 2020 the COVID-19 pandemic swept across the world, resulting in significant loss of life. To make matters worse, many Americans have lost their jobs and livelihoods as a result of the pandemic. To slow the spread of the virus, the CDC has recommended that people get the COVID-19 vaccine. Some locations have made getting the vaccine mandatory. Despite the risk of spreading the virus, many people still choose not to get the COVID-19 vaccine. <p>In your own words, do you think it would be appropriate for the United States to make receiving the COVID-19 vaccine mandatory? Why or why not?</p>", rows: 5, columns: 40}
	],
  };  

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

//////////////////////////////////////
//* Set up conditions */
//////////////////////////////////////

var cond_procedure1 = {
timeline: [manip1],
//timeline_variables: BLM, 
randomize_order: false 
};

var cond_procedure2 = {
  timeline: [manip2],
//  timeline_variables: COVID,
  randomize_order: false
};

var conditions = [cond_procedure1, cond_procedure2];
var cond = jsPsych.randomization.sampleWithoutReplacement(conditions,1)[0];
console.log('condition: ', cond);  // check console to see which condition was selected

//////////////////////////////////////
//////////////////////////////////////

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
		' <p> Then, you will be tested on your ability to remember two words that appear in <font color="green"><b>green</b></font>. We will begin with a practice trial. </p>' +
		" <p><b>Please press any key to continue. </b></p></div>"],
	/*choices: ['space'],*/ 
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
			  "<p>You will now read a short passage and then answer a question before beginning the main task. Please read the passage carefully and respond honestly.</p>" +
			  "<p>Press any key to continue.</p></div>",
	/*choices: ['space'],*/ 
	data: {test_part: 'instructions'},
	post_trial_gap: 1000
  };
rsvp_task.push(instructions_prac2);


// FIFTH SCREEN
rsvp_task.push(cond);

// SIXTH SCREEN
var instructions_begin = {
	type: "html-keyboard-response",
	stimulus: "<div class='instructions'><p>Great! " +
			  "</p>" +
			  "<p> We will now begin the next block of the task. Remember, the words will appear VERY quickly. Make sure you are paying close attention." +
			  "</p>" +
			  "<p>Press any key to continue.</p>" +
			  "<p></p></div>",
	data: {test_part: 'instructions'},
	post_trial_gap: 1000
  };
rsvp_task.push(instructions_begin);

// SEVENTH SCREEN
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

// EIGHTH SCREEN
// Instructions Intermezzo
var instructions_inter1 = {
	type: "html-keyboard-response",
	stimulus: "<div class='instructions'><p>Wow, well done. " +
			  "</p>" +
			  "<p> We will now begin the next block of the task." +
			  "</p>" +
			  "<p></p>" +
			  "<p></p></div>",
	data: {test_part: 'instructions'},
	post_trial_gap: 1000
  };
rsvp_task.push(instructions_inter1);

// NINTH SCREEN
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

// TENTH SCREEN
//Some final instructions
var instructions_blockend = {
	type: "html-keyboard-response",
	stimulus: "<div class='instructions'><p>THAT WAS THE FINAL BLOCK, " +
			  "We will now ask you some questions about yourself.</p>" +
			  "<p>Please press ANY KEY to continue.</p></div>",
	data: {test_part: 'instructions'}, // CHANGE THIS??
	post_trial_gap: 1000
  };
rsvp_task.push(instructions_blockend);

////////////////////////////////////////////////////////////////
var Genderq = ["Man", "Woman", "Non-binary", "Other", "Prefer not to answer"];
var PolIDq = ["Extremely Liberal", " ", " ", " Neither", " ", " ", "Extremely Conservative"];
var Relq = ["Not at all Religious", " ", " ", " ", " ", " ", "Extremely Religious"];
var Incomeq = ["Less than $10,000 USD a year", "$10,000 - $20,000 USD", "$20,000-$40,000 USD", "$40,000-$60,000 USD", "$60,000-$80,000 USD", "$80,000-$100,000 USD", "$100,000 USD a year or more"];
var Raceq = ["White, not hispanic or latinx", "Black or African American", "Asian", "American Indian or Alaska Native", "Native Hawaiian or Other Pacific Islander", "Hispanic or Latinx", "Two or more", "Not listed"];
var Demand1q = ["Not at all", " ", " ", " ", "Very much so"];
var compTypeq = ["Laptop/Desktop", "Ipad/Tablet", "Other"];

var demo_Age = {
        type: 'survey-text',
        questions: [
        {prompt: 'How old are you?', columns: 3, required: true, name: 'Age'},
        {prompt: 'What is your religious affiliation?', columns: 50, name: 'Religious Affiliation'}
        ],
        randomize_question_order: true
        };

var demo_gen = {
        type: 'survey-multi-choice',
        questions: [
            {prompt: '<p style="text-align: left;font-size:20px;">What is your Gender?</p>', options: Genderq, required: true, horizontal: true,}, 
            {prompt: '<p style="text-align: left;font-size:20px;">Which of the following items BEST describes your ethnic or racial background?</p>', options: Raceq, required: true, horizontal: true},
            {prompt: '<p style="text-align: left;font-size:20px;">How religious would you consider yourself?</p>', options: Relq, required: true, horizontal: true,}, 
            {prompt: '<p style="text-align: left;font-size:20px;">What is your household income?</p>', options: Incomeq, required: true, horizontal: true}
          ],
        randomize_question_order: true,
        preamble: '<p style="text-align: left;font-size:28px;"Using the scales provided, please respond to each question about you as an individual.</p>'
        };

var demo_PolIQ = {
        type: 'survey-multi-choice',
        questions: [
            {prompt: '<p style="text-align: left;font-size:20px;">Which response best captures your political beliefs surrounding economic issues?</p>', options: PolIDq, required: true, horizontal: true,}, 
            {prompt: '<p style="text-align: left;font-size:20px;">Which response best captures your political beliefs surrounding social issues?</p>', options: PolIDq, required: true, horizontal: true},
            {prompt: '<p style="text-align: left;font-size:20px;">When it comes to overall political issues, you consider yourself to be a:</p>', options: PolIDq, required: true, horizontal: true,}
        ],
        randomize_question_order: true,
        preamble: '<p style="text-align: left;font-size:28px;"Please answer the following questions about your political ideology.</p>'
        };

var demo_FinalQs = {
        type: 'survey-multi-choice',
        questions: [
            {prompt: '<p style="text-align: left;font-size:20px;">What kind of device did you use to complete this study?</p>', options: compTypeq, required: true, horizontal: true,}, 
            {prompt: '<p style="text-align: left;font-size:20px;">Did you feel pressure to respond in a particular way to any of the questions?</p>', options: Demand1q, required: true, horizontal: true,}, 
            {prompt: '<p style="text-align: left;font-size:20px;">Did you feel as though you might be judged for your responses to the questions you answered.</p>', options: Demand1q, required: true, horizontal: true}        
          ],
        randomize_question_order: true,
        preamble: '<p style="text-align: left;font-size:28px;"For these final questions, please answer as honestly as you can! The answers to these questions will not affect whether or not you receive credit/payment for participation!</p>'
        };

//////////////////////////////////////////////////////////////
rsvp_task.push(demo_Age);
rsvp_task.push(demo_gen);
rsvp_task.push(demo_PolIQ);
rsvp_task.push(demo_FinalQs);

////////////////////////////////////////////////////////////////
///* define debrief */

var debrief = {
      type: "html-keyboard-response",
      stimulus: "<p>Thank you for your participation!</p>" + 
      "<p>Some debrief things here.",
      post_trial_gap: 2000
    };
rsvp_task.push(debrief);

////////////////////////////////////////////////////////////////
jsPsych.init({
	  timeline: rsvp_task,
	  on_finish: function (data) {
		jsPsych.data.displayData();
	}
}
)