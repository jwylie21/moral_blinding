//Code adapted from paulsharpeY by Jordan Wylie & Dries Bostyn

//TO DO: What is the lag logic? ; change choice keys to specific key; add questionnaires; make sure there is randomization of authority/fairness and log it

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

//var surveyCode = jsPsych.data.getURLVariable('participant');
//if (!surveyCode) {
//    surveyCode = 'test'
//}
//console.log(surveyCode)

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
var distractors = [	'coherent','composing','attracts','unleashed','pressing','muttering','whomever','newcomers','skydiving',
'prescribe','succeeds','trousers','aerobics','thousands','backtrack','pipeline','silicone','matinees','paternity','windmill',
'pacifier','beverage','sniffles','gradually','includes','umbrella','charcoal','requires','responses','requested','membrane',
'arbitrary','gymnasium','incubator','flexible','attribute','uncertain','trombone','entwined','horseshoe','distract','channels',
'resemble','detectors','vineyard','scribbled','particles','unplugged','spectator','delivers','potpourri','documents','sensation',
'prologue','cornbread','carrying','maintains','somewhat','cupboards','appetite','clearing','uploading'	
];  //doublecheck to make sure this array is large enough!

var practicewords = ['ocean','world', 'planet', 'earth']

var targetsAuthority = ['accuse','agitate','alienate','anarchist','banning','bedlam','chaotic','contempt','counter','defector','defying',
'demonstrator','denounce','disarray','dishonorable','disobeying','disorder','disrespect','disruption','dissenting','dissident','flag',
'fossil','heretical','illegal','impolite','insubordinate','insurgent','insurrection','intimidation','lawless','misrule','mutiny','nonconforming',
'obstruct','oppose','orders','overpowering','overthrowing','pandemonium','protesting','rabble rousing','raising hell','rebelling','refusing',
'remonstrate','renegades','resist','rioting','rock the boat','scheme','sedition','subverting','supremacy','transgression','trouble maker',
'tumultuous','unauthorized','unlawfully','unruly','uprising','violate'
];

var targetsFairness = ['behind their back','biased','bigoted','bilking','blackmailing','chauvinists','cheating','con artist','conniving',
'corrupt','crook','deception','defrauding','disadvantaged','discrimination','dishonest','disparity','disproportionate','distrustful',
'double crossing','duplicitous','exclude','false advertising','false witness','favoritism','fraudulent','free rider','freeloading',
'hoodwinking','hypocrite','imbalance','imposters','inequality','inequity','injustice','lying','mislead','misogyny','mooching','oppression',
'partiality','pickpocketing','plagiarize','prejudiced','restrictive','ripoff','robbed','scamming','segregating','sexism','shyster','steal',
'suckered','swindles','thieving','tricking','unequal','unfair','uninsured','unjust','unscrupulous','untrustworthy'
];

// Copy the list of Moral words so that we can use a separate list for each of the two  lag locations 
var targetsFairness2 = targetsFairness
var targetsAuthority2 = targetsAuthority

var manip1 = {
	type: 'survey-text',
	questions: [
	  {prompt: "On May 25, 2020, the final moments of African-American man George Floyd were captured on film. In the video, Minneapolis Officer Derek Chauvin can be seen kneeling on George’s neck for a prolonged period of time. The footage was subsequently circulated on social media, re-igniting unresolved tension surrounding the treatment of people of color in the United States. The viral footage resulted in widespread public outcry throughout the United States. As a result of his actions, Derek Chauvin was dismissed from his position, and recently found guilty of murder. <p>In your own words, do you feel that the prosecution of Derek Chauvin was appropriate? Why or why not?</p>", rows: 6, columns: 40}
	],
  };

var manip2 = {
	type: 'survey-text',
	questions: [
	  {prompt: "In early 2020 the COVID-19 pandemic swept across the world, resulting in significant loss of life. To make matters worse, many Americans have lost their jobs and livelihoods as a result of the pandemic. To slow the spread of the virus, the CDC has recommended that people get the COVID-19 vaccine. Some locations have made getting the vaccine mandatory. Despite the risk of spreading the virus, many people still choose not to get the COVID-19 vaccine. <p>In your own words, do you think it would be appropriate for the United States to make receiving the COVID-19 vaccine mandatory? Why or why not?</p>", rows: 6, columns: 40}
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

// Set up the consent
var consentform = {
    type: 'html-button-response',
    stimulus: '<p>Please read the following and press the button at the bottom of the screen to begin.</p><p></p>' + 
    '<p><h1><strong>CONSENT FORM</strong></h1></p><p></p>' + 
    '<div align=left>' +
	'<p><strong>Title of Study:</strong><br />Judgments of Mind and Moral Decision Making (12-11585)</p>'+ 
	'<p>Faculty Advisor: Kurt Gray; kurtgray@email.unc.edu</p>' + 
    '<p><strong>What are some general things you should know about research studies? </strong><br />You are being asked to take part in a research study. To join the study is voluntary. You may refuse to join, or you may withdraw your consent to be in the study, for any reason, without penalty. Details about this study are discussed below. It is important that you understand this information so that you can make an informed choice about being in this research study.</p>' + 
	'<p><strong>What is the purpose of this study? </strong><br />The purpose of this study is to explore moral judgments.</p>' + 
	'<p><strong>How many people will take part in this study? </strong><br />If you decide to be in this study, you will be one of approximately 300 people in this research study.</p>' + 
	'<p><strong>What will happen if you take part in the study? </strong><br />Your part in this study will last for approximately 30 minutes. The procedures involve completing a judgment task on the computer. In this task, you will be presented with a variety of stimuli and will be asked to make a judgment about these stimuli. You might be asked to remember what you saw, categorize different words, or answer questions about the stimuli.</p>' + 
	'<p><strong>What are the possible benefits from being in this study? </strong><br />This research is not designed to help you personally, but the results may help the investigators and future researchers to learn more about how people perceive the minds of others and whether those perceptions influence moral decisions.</p>' + 
	'<p><strong>What are the possible risks or discomforts involved from being in this study? </strong><br />There may be some risks from participating in this research study. For instance, on rare occurrences some participants may experience some discomfort with the subject matter of the study.</p>' + 
    '<p><strong>How will your privacy be protected?</strong><br />All of the data you provide will be stored anonymously. </p>' + 
    '<p><strong>What if you want to stop before your part in the study is complete?</strong><br />You can withdraw from this study at any time, without penalty and skip any question for any reason. The investigators also have the right to stop your participation if you have an unexpected reaction, have failed to follow instructions, etc.</p>' + 
	'<p><strong>Will you receive anything for being in this study? </strong><br />Depending on the length and difficulty of the study, you will receive anywhere from $.01 to $4.00 for participating in the study. While all legitimate participants will be paid, those identified as coming from server farms - based on GPS identification and a series of attention checks - will not be paid. There are no costs associated with being in the study.  </p>' + 
    '<p><strong>What if you have questions about this study? </strong><br />You have the right to ask, and have answered, any questions you may have about this research. Contact the principal investigator listed above with any questions, complaints, or concerns you may have.</p>' + 
    "<p><strong>What if you have questions about your rights as a research participant?</strong><br />All research on human volunteers is reviewed by a committee that works to protect your rights and welfare. If you have questions or concerns, or if you would like to obtain information or offer input, please contact the Institutional Review Board at 919-966-3113 or by email to IRB_subjects@unc.edu. </p>" + 
    '<p><strong>Thank you for considering participation in this study.</strong><br />Please contact Lindsay Hahn at lhahn2@buffalo.edu, if further information is required.</p>' + 
    '</div><p></p>',
    choices: ['I CONSENT TO PARTICIPATE IN THIS STUDY AND AM AT LEAST 18 YEARS OF AGE'],
    prompt: "<p><small>Click this button to continue, or close this page to exit.</small></p><p></p>",
    data: {stimulus: 'consentform'},
};

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

rsvp_task.push(consentform);

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

/* add the subject ID to my experiment  making it a property*/
//jsPsych.data.addProperties({
//	subject: subject_id,
//	survey: surveyCode,
//	condition: cond,
//	brwser: browser,
//	operatingS: OS,
//	order: shuffledList  //what will this be to get the order of the fairness vs. authority
//  });

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
var MFQq = ["Not at all relevant", "Not very relevant", "Slightly relevant", "Somewhat relevant", "Very relevant", "Extremely relevant"];
var RWAq = ["Strongly disagree", "Disagree", "Somewhat disagree", "Neither agree nor disagree", "Somewhat agree", "Agree", "Strongly agree"];
var SDOq = ["Strongly oppose", "Somewhat oppose", "Slightly oppose", "Neutral", "Slightly favor", "Somewhat favor", "Strongly favor"];
var JSq = ["Totally disagree", " ", " ", " ", " ", " ", "Totally agree"];
var MCq = ["Yes", "No"];


var MFQ = {
	type: 'survey-multi-choice',
	questions: [
		{prompt: 'Whether or not someone suffered emotionally', options: MFQq, required: true, horizontal: true,}, 
		{prompt: 'Whether or not some people were treated differently than others', options: MFQq, required: true, horizontal: true},
		{prompt: 'Whether or not someones action showed love for his or her country', options: MFQq, required: true, horizontal: true,}, 
		{prompt: 'Whether or not someone showed a lack of respect for authority', options: MFQq, required: true, horizontal: true},
		{prompt: 'Whether or not someone violated standards of purity and decency', options: MFQq, required: true, horizontal: true,}, 
		{prompt: 'Whether or not someone was good at math', options: MFQq, required: true, horizontal: true,}, 
		{prompt: 'Whether or not someone cared for someone weak or vulnerable', options: MFQq, required: true, horizontal: true,}, 
		{prompt: 'Whether or not someone acted unfairly', options: MFQq, required: true, horizontal: true,}, 
		{prompt: 'Whether or not someone did something to betray his or her group', options: MFQq, required: true, horizontal: true,}, 
		{prompt: 'Whether or not someone conformed to the traditions of society', options: MFQq, required: true, horizontal: true,}, 
		{prompt: 'Whether or not someone did something disgusting', options: MFQq, required: true, horizontal: true,}, 
		{prompt: 'Whether or not someone was cruel', options: MFQq, required: true, horizontal: true,}, 
		{prompt: 'Whether or not someone was denied his or her rights', options: MFQq, required: true, horizontal: true,}, 
		{prompt: 'Whether or not someone showed a lack of loyalty', options: MFQq, required: true, horizontal: true,}, 
		{prompt: 'Whether or not an action caused chaos or disorder', options: MFQq, required: true, horizontal: true,}, 
		{prompt: 'Whether or not someone acted in a way that God would approve of', options: MFQq, required: true, horizontal: true,}
	  ],
	randomize_question_order: true,
	preamble: 'When you decide whether something is right or wrong, to what extent are the following considerations relevant to your thinking? Please rate each statement using the scale provided.'
	};

var MaC = {
        type: 'survey-multi-choice',
        questions: [
            {prompt: '<p style="text-align: left;font-size:20px;">Whether or not someone deferred to those in authority</p>', options: MFQq, required: true, horizontal: true,}, 
            {prompt: '<p style="text-align: left;font-size:20px;">Whether or not someone disobeyed orders</p>', options: MFQq, required: true, horizontal: true},
            {prompt: '<p style="text-align: left;font-size:20px;">Whether or not someone showed respect for authority</p>', options: MFQq, required: true, horizontal: true,}, 
			{prompt: '<p style="text-align: left;font-size:20px;">Whether or not someone kept the best part for themselves</p>', options: MFQq, required: true, horizontal: true},
			{prompt: '<p style="text-align: left;font-size:20px;">Whether or not someone showed favouritism</p>', options: MFQq, required: true, horizontal: true},
            {prompt: '<p style="text-align: left;font-size:20px;">Whether or not someone took more than others</p>', options: MFQq, required: true, horizontal: true},
            {prompt: '<p style="text-align: left;font-size:20px;">Whether or not someone vandalised another person’s property</p>', options: MFQq, required: true, horizontal: true},
            {prompt: '<p style="text-align: left;font-size:20px;">Whether or not someone kept something that didn’t belong to them</p>', options: MFQq, required: true, horizontal: true},
            {prompt: '<p style="text-align: left;font-size:20px;">Whether or not someones property was damaged</p>', options: MFQq, required: true, horizontal: true}
          ],
        randomize_question_order: true,
        preamble: '<p style="text-align: left;font-size:28px;"When you decide whether something is right or wrong, to what extent are the following considerations relevant to your thinking?</p>'
		};

var RWA = {
			type: 'survey-multi-choice',
			questions: [
				{prompt: '<p style="text-align: left;font-size:20px;">It is great that many young people today are prepared to defy authority</p>', options: MFQq, required: true, horizontal: true,}, 
				{prompt: '<p style="text-align: left;font-size:20px;">What our country needs most is discipline, with everyone following our leaders in unity</p>', options: MFQq, required: true, horizontal: true},
				{prompt: '<p style="text-align: left;font-size:20px;">God’s laws about abortion, pornography, and marriage must be strictly followed before it is too late</p>', options: MFQq, required: true, horizontal: true,}, 
				{prompt: '<p style="text-align: left;font-size:20px;">There is nothing wrong with premarital sexual intercourse</p>', options: MFQq, required: true, horizontal: true},
				{prompt: '<p style="text-align: left;font-size:20px;">Our society does NOT need tougher government and stricter laws</p>', options: MFQq, required: true, horizontal: true},
				{prompt: '<p style="text-align: left;font-size:20px;">The facts on crime and the recent public disorders show we have to crack down harder on troublemakers, if we are going to preserve law and order</p>', options: MFQq, required: true, horizontal: true}
			  ],
			randomize_question_order: true,
			preamble: '<p style="text-align: left;font-size:28px;"To what extent do you disagree or agree with each of the following statements?</p>'
			};

var SDO = {
		type: 'survey-multi-choice',
		questions: [
			{prompt: '<p style="text-align: left;font-size:20px;">An ideal society requires some groups to be on top and others to be on the bottom</p>', options: SDOq, required: true, horizontal: true,}, 
			{prompt: '<p style="text-align: left;font-size:20px;">Some groups of people are simply inferior to other groups</p>', options: SDOq, required: true, horizontal: true},
			{prompt: '<p style="text-align: left;font-size:20px;">No one group should dominate in society</p>', options: SDOq, required: true, horizontal: true,}, 
			{prompt: '<p style="text-align: left;font-size:20px;">Groups at the bottom are just as deserving as groups at the top</p>', options: SDOq, required: true, horizontal: true},
			{prompt: '<p style="text-align: left;font-size:20px;">Group equality should not be our primary goal</p>', options: SDOq, required: true, horizontal: true},
			{prompt: '<p style="text-align: left;font-size:20px;">It is unjust to try to make groups equal</p>', options: SDOq, required: true, horizontal: true},
			{prompt: '<p style="text-align: left;font-size:20px;">We should do what we can to equalize conditions for different groups</p>', options: SDOq, required: true, horizontal: true},
			{prompt: '<p style="text-align: left;font-size:20px;">We should work to give all groups an equal chance to succeed</p>', options: SDOq, required: true, horizontal: true}		  
		],
		randomize_question_order: true,
		preamble: '<p style="text-align: left;font-size:28px;"Show how much you favor or oppose each idea below. You can work quickly; your first feeling is generally best.</p>'
		};

var JS = {
	type: 'survey-multi-choice',
		questions: [
			{prompt: '<p style="text-align: left;font-size:20px;">Whether or not someone deferred to those in authority</p>', options: JSq, required: true, horizontal: true,}, 
			{prompt: '<p style="text-align: left;font-size:20px;">Whether or not someone disobeyed orders</p>', options: JSq, required: true, horizontal: true},
			{prompt: '<p style="text-align: left;font-size:20px;">Whether or not someone showed respect for authority</p>', options: JSq, required: true, horizontal: true,}, 
			{prompt: '<p style="text-align: left;font-size:20px;">Whether or not someone kept the best part for themselves</p>', options: JSq, required: true, horizontal: true},
			{prompt: '<p style="text-align: left;font-size:20px;">Whether or not someone showed favouritism</p>', options: JSq, required: true, horizontal: true},
			{prompt: '<p style="text-align: left;font-size:20px;">Whether or not someone took more than others</p>', options: JSq, required: true, horizontal: true},
			{prompt: '<p style="text-align: left;font-size:20px;">Whether or not someone vandalised another person’s property</p>', options: JSq, required: true, horizontal: true},
			{prompt: '<p style="text-align: left;font-size:20px;">Whether or not someone kept something that didn’t belong to them</p>', options: JSq, required: true, horizontal: true}
		  ],
		randomize_question_order: true,
		preamble: '<p style="text-align: left;font-size:28px;"When you decide whether something is right or wrong, to what extent are the following considerations relevant to your thinking?</p>'
		};

var ManipCheck = {
			type: 'survey-multi-choice',
			questions: [
				{prompt: '<p style="text-align: left;font-size:20px;">In your personal opinion and from your understanding of current events, are you generally in support of the Black Lives Matter movement?</p>', options: MCq, required: true, horizontal: true,}, 
				{prompt: '<p style="text-align: left;font-size:20px;">In your personal opinion and from your understanding of current events, are you generally in support of a vaccine mandate?</p>', options: MCq, required: true, horizontal: true}
			],
			randomize_question_order: true,
			preamble: '<p style="text-align: left;font-size:28px;"Please answer the following questions about your views on current issues.</p>'
			};

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
rsvp_task.push(MFQ);
rsvp_task.push(MaC);
rsvp_task.push(RWA);
rsvp_task.push(SDO);
//rsvp_task.push(JS);
rsvp_task.push(ManipCheck);
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
//var finishURL = 'https://lab-abs.sona-systems.com/webstudy_credit.aspx?experiment_id=121&credit_token=3d92554c77d2452da04ffd124b217305&survey_code=' + surveyCode;

/* finish connection with pavlovia.org */
//var pavlovia_finish = {
//	type: "pavlovia",
//	command: "finish",
//	participantId: surveyCode,
//	  // Thomas Pronk; your filter function here
//	  dataFilter: function(data) {
//			// Printing the data received from jsPsych.data.get().csv(); a CSV data structure
//			console.log(data);
//			// You can also access the data directly, for instance getting it as JSON
//			console.log(jsPsych.data.get().csv());
//			// Return whatever data you'd like to store
//			return data;
//		},
//		// Thomas Pronk; call this function when we're done with the experiment and data reception has been confirmed by Pavlovia
//		completedCallback: function() {
//		  window.location.replace(finishURL);
//		}
//	};
//  rsvp_task.push(pavlovia_finish);

////////////////////////////////////////////////////////////////
jsPsych.init({
	  timeline: rsvp_task,
	  on_finish: function (data) {
		jsPsych.data.displayData();
	}
}
)