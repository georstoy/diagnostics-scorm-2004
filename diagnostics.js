(function () {
    console.log("initialize LMS communication via SCO object");
    SCO.init();

    // LMS Diagnostics for SCORM 2004
    // use this console logs to collect cmi values
    // https://scorm.com/scorm-explained/technical-scorm/run-time/run-time-reference/?utm_source=google&utm_medium=natural_search#section-3

    console.log("\nREQUIRED FOR LAUNCHER BOOTSTRAP: ");
    console.log(`cmi._version = ${SCO.get("cmi._version")} (RO) Represents the version of the data model`);
    console.log(`cmi.mode = ${SCO.get("cmi.mode")} (RO) Identifies one of three possible modes in which the SCO may be presented to the learner: “browse”, “normal”, “review”`);
    console.log(`cmi.learner_id = ${SCO.get("cmi.learner_id")} (RO) Identifies the learner on behalf of whom the SCO was launched: long_identifier_type (SPM: 4000)`);
    console.log(`cmi.learner_name = ${SCO.get("cmi.learner_name")} (RO) Name provided for the learner by the LMS: localized_string_type (SPM: 250)`);
    console.log(`cmi.entry = ${SCO.get("cmi.entry")} (RO) Asserts whether the learner has previously accessed the SCO: "ab_initio", "resume", ""`);
    console.log(`cmi.location = ${SCO.get("cmi.location")} (RW) The learner’s current location in the SCO: characterstring (SPM: 1000)`);
    console.log(`cmi.completion_status = ${SCO.get("cmi.completion_status")} (RW) Indicates whether the learner has completed the SCO: “completed”, “incomplete”, “not attempted”, “unknown”`);
    console.log(`cmi.success_status = ${SCO.get("cmi.success_status")} (RW) Indicates whether the learner has mastered the SCO: “passed”, “failed”, “unknown”`);

    console.log("\nIMPORTANT TO IMPLEMENT IN LAUNCHER: ");
    console.log(`cmi.launch_data = ${SCO.get("cmi.launch_data")} (RO) Data provided to a SCO after launch, initialized from the dataFromLMS manifest element: characterstring (SPM: 4000)`);
    console.log(`cmi.exit = ${SCO.get("cmi.exit")} (WO) Indicates how or why the learner left the SCO: "timeout", "suspend", "logout", "normal", ""`);
    console.log(`cmi.max_time_allowed = ${SCO.get("cmi.max_time_allowed")} (RO) Amount of accumulated time the learner is allowed to use a SCO: timeinterval (second,10,2)`);
    console.log(`cmi.time_limit_action = ${SCO.get("cmi.time_limit_action")} (RO) Indicates what the SCO should do when cmi.max_time_allowed is exceeded: “exit,message”, “continue,message”, “exit,no message”, “continue,no message”`);
    console.log(`cmi.progress_measure = ${SCO.get("cmi.progress_measure")} (RW) Measure of the progress the learner has made toward completing the SCO: real (10,7) range (0..1)`);
    console.log(`cmi.scaled_passing_score = ${SCO.get("cmi.scaled_passing_score")} (RO) Scaled passing score required to master the SCO: real(10,7) range (-1 .. 1)`);
    console.log(`cmi.suspend_data = ${SCO.get("cmi.suspend_data")} (RW) Provides space to store and retrieve data between learner sessions: characterstring (SPM: 4000)`);

    console.log("\nGeneral: ")
    console.log(`cmi.credit = ${SCO.get("cmi.credit")} (RO) Indicates whether the learner will be credited for performance in the SCO: “credit”, “no-credit”`);
    console.log(`cmi.mode = ${SCO.get("cmi.mode")} (RO) Identifies one of three possible modes in which the SCO may be presented to the learner: “browse”, “normal”, “review”`);
    console.log(`cmi.session_time = ${SCO.get("cmi.session_time")} (WO) Amount of time that the learner has spent in the current learner session for this SCO: timeinterval (second,10,2)`);
    console.log(`cmi.total_time = ${SCO.get("cmi.total_time")} (RO) Sum of all of the learner’s session times accumulated in the current learner attempt: timeinterval (second,10,2)`);
    console.log(`cmi.suspend_data = ${SCO.get("cmi.suspend_data")} (RW) Provides space to store and retrieve data between learner sessions: characterstring (SPM: 4000)`);
    console.log(`cmi.max_time_allowed = ${SCO.get("cmi.max_time_allowed")} (RO) Amount of accumulated time the learner is allowed to use a SCO: timeinterval (second,10,2)`);
    console.log(`cmi.time_limit_action = ${SCO.get("cmi.time_limit_action")} (RO) Indicates what the SCO should do when cmi.max_time_allowed is exceeded: “exit,message”, “continue,message”, “exit,no message”, “continue,no message”`);

    console.log("\nNavigation: ")
    console.log(`adl.nav.request = ${SCO.get("adl.nav.request")} (RW) Navigation request to be processed immediately following Terminate(): request(continue, previous, choice, exit, exitAll, abandon, abandonAll, suspendAll _none_)`);
    console.log(`adl.nav.request_valid.continue = ${SCO.get("adl.nav.request_valid.continue")} (RO) Used by a SCO to determine if a Continue navigation request will succeed: state (true, false, unknown)`);
    console.log(`adl.nav.request_valid.previous = ${SCO.get("adl.nav.request_valid.previous")} (RO) Used by a SCO to determine if a Previous navigation request will succeed: state (true, false, unknown)`);
    console.log(`adl.nav.request_valid.choice.index.html = ${SCO.get("adl.nav.request_valid.choice.index.html")} (RO) Used by a SCO to determine if a Choice navigation request for the target activity will succeed: state (true, false, unknown)`);

    console.log("\nLearner Info: ")
    console.log(`cmi.learner_id = ${SCO.get("cmi.learner_id")} (RO) Identifies the learner on behalf of whom the SCO was launched: long_identifier_type (SPM: 4000)`);
    console.log(`cmi.learner_name = ${SCO.get("cmi.learner_name")} (RO) Name provided for the learner by the LMS: localized_string_type (SPM: 250)`);
    console.log(`cmi.learner_preference._children = ${SCO.get("cmi.learner_preference._children")} (RO) Listing of supported data model elements: "audio_level", "language", "delivery_speed", "audio_captioning"`);
    console.log(`cmi.learner_preference.audio_level = ${SCO.get("cmi.learner_preference.audio_level")} (RW) Specifies an intended change in perceived audio level: real(10,7), range (0..*)`);
    console.log(`cmi.learner_preference.language = ${SCO.get("cmi.learner_preference.language")} (RW) The learner’s preferred language for SCOs with multilingual capability: language_type (SPM 250)`);
    console.log(`cmi.learner_preference.delivery_speed = ${SCO.get("cmi.learner_preference.delivery_speed")} (RW) The learner’s preferred relative speed of content delivery: real(10,7), range (0..*)`);
    console.log(`cmi.learner_preference.audio_captioning = ${SCO.get("cmi.learner_preference.audio_captioning")} (RW) Specifies whether captioning text corresponding to audio is displayed: “-1”, “0”, “1”`);

    console.log("\nStatus & Progress: ");
    console.log(`cmi.entry = ${SCO.get("cmi.entry")} (RO) Asserts whether the learner has previously accessed the SCO: "ab_initio", "resume", ""`);
    console.log(`cmi.exit = ${SCO.get("cmi.exit")} (WO) Indicates how or why the learner left the SCO: "timeout", "suspend", "logout", "normal", ""`);
    console.log(`cmi.location = ${SCO.get("cmi.location")} (RW) The learner’s current location in the SCO: characterstring (SPM: 1000)`);
    console.log(`cmi.completion_status = ${SCO.get("cmi.completion_status")} (RW) Indicates whether the learner has completed the SCO: “completed”, “incomplete”, “not attempted”, “unknown”`);
    console.log(`cmi.completion_threshold = ${SCO.get("cmi.completion_threshold")} (RO) Used to determine whether the SCO should be considered complete: real(10,7) range (0..1)`);
    console.log(`cmi.progress_measure = ${SCO.get("cmi.progress_measure")} (RW) Measure of the progress the learner has made toward completing the SCO: real (10,7) range (0..1)`);
    console.log(`cmi.success_status = ${SCO.get("cmi.success_status")} (RW) Indicates whether the learner has mastered the SCO: “passed”, “failed”, “unknown”`);

    console.log("\nScoring: ");
    console.log(`cmi.scaled_passing_score = ${SCO.get("cmi.scaled_passing_score")} (RO) Scaled passing score required to master the SCO: real(10,7) range (-1 .. 1)`);
    console.log(`cmi.score._children = ${SCO.get("cmi.score._children")} (RO) Listing of supported data model elements: scaled,raw,min,max`);
    console.log(`cmi.score.scaled = ${SCO.get("cmi.score.scaled")} (RW) Number that reflects the performance of the learner: real (10,7) range (-1..1)`);
    console.log(`cmi.score.raw = ${SCO.get("cmi.score.raw")} (RW) Number that reflects the performance of the learner relative to the range bounded by the values of min and max: real (10,7)`);
    console.log(`cmi.score.min = ${SCO.get("cmi.score.min")} (RW) Minimum value in the range for the raw score: real (10,7)`);
    console.log(`cmi.score.max = ${SCO.get("cmi.score.max")} (RW) Maximum value in the range for the raw score: real (10,7)`);

    console.log("\nObjectives: ");
    console.log(`cmi.objectives._children = ${SCO.get(`cmi.objectives._children`)} (RO) Listing of supported data model elements: id,score,success_status,completion_status,description`);
    console.log(`cmi.objectives._count = ${SCO.get(`cmi.objectives._count`)} (RO) Current number of objectives being stored by the LMS: non-negative integer`);
    for (let n = 0; n < SCO.get("cmi.objectives._count"); n++) {
        console.log(`cmi.objectives.${n}.id = ${SCO.get(`cmi.objectives.${n}.id`)} (RW) Unique label for the objective: long_identifier_type (SPM: 4000)`);
        console.log(`cmi.objectives.${n}.score._children = ${SCO.get(`cmi.objectives.${n}.score._children`)} (RO) Listing of supported data model elements: scaled,raw,min,max`);
        console.log(`cmi.objectives.${n}.score.scaled = ${SCO.get(`cmi.objectives.${n}.score.scaled`)} (RW) Number that reflects the performance of the learner for the objective: real (10,7) range (-1..1)`);
        console.log(`cmi.objectives.${n}.score.raw = ${SCO.get(`cmi.objectives.${n}.score.raw`)} (RW) Number that reflects the performance of the learner, for the objective, relative to the range bounded by the values of min and max: real (10,7)`);
        console.log(`cmi.objectives.${n}.score.min = ${SCO.get(`cmi.objectives.${n}.score.min`)} (RW) Minimum value, for the objective, in the range for the raw score: real (10,7)`);
        console.log(`cmi.objectives.${n}.score.max = ${SCO.get(`cmi.objectives.${n}.score.max`)} (RW) Maximum value, for the objective, in the range for the raw score: real (10,7)`);
        console.log(`cmi.objectives.${n}.success_status = ${SCO.get(`cmi.objectives.${n}.success_status`)} (RW) Indicates whether the learner has mastered the objective: “passed”, “failed”, “unknown”`);
        console.log(`cmi.objectives.${n}.completion_status = ${SCO.get(`cmi.objectives.${n}.completion_status`)} (RW) Indicates whether the learner has completed the associated objective: “completed”, “incomplete”, “not attempted”, “unknown”`);
        console.log(`cmi.objectives.${n}.progress_measure = ${SCO.get(`cmi.objectives.${n}.progress_measure`)} (RW) Measure of the progress the learner has made toward completing the objective: real (10,7) range (0..1)`);
        console.log(`cmi.objectives.${n}.description = ${SCO.get(`cmi.objectives.${n}.description`)} (RW) Provides a brief informative description of the objective: localized_string_type (SPM: 250)`);
    }

    console.log("\nInteractions: ");
    console.log(`cmi.interactions._children = ${SCO.get("cmi.interactions._children")} (RO) Listing of supported data model elements: id,type,objectives,timestamp,correct_responses,weighting,learner_response,result,latency,description`);
    console.log(`cmi.interactions._count = ${SCO.get("cmi.interactions._count")} (RO) Current number of interactions being stored by the LMS: non-negative integer`);
    for (let n = 0; n < SCO.get("cmi.interactions._count"); n++) {
        console.log(`cmi.interactions.${n}.id = ${SCO.get(`cmi.interactions.${n}.id`)} (RW) Unique label for the interaction: long_identifier_type (SPM: 4000)`);
        console.log(`cmi.interactions.${n}.type = ${SCO.get(`cmi.interactions.${n}.type`)} (RW) Which type of interaction is recorded: “true-false”, “choice”, “fill-in”, “long-fill-in”, “matching”, “performance”, “sequencing”, “likert”, “numeric” or “other” `);
        console.log(`cmi.interactions.${n}.timestamp = ${SCO.get(`cmi.interactions.${n}.timestamp`)} (RW) Point in time at which the interaction was first made available to the learner for learner interaction and response: time(second,10,0)`);
        console.log(`cmi.interactions.${n}.weighting = ${SCO.get(`cmi.interactions.${n}.weighting`)} (RW) Weight given to the interaction relative to other interactions: real (10,7)`);
        console.log(`cmi.interactions.${n}.learner_response = ${SCO.get(`cmi.interactions.${n}.learner_response`)} (RW) Data generated when a learner responds to an interaction: format depends on interaction type`);
        console.log(`cmi.interactions.${n}.result = ${SCO.get(`cmi.interactions.${n}.result`)} (RW) Judgment of the correctness of the learner response: “correct”, “incorrect”, “unanticipated”, “neutral”) or a real number with values that is accurate to seven significant decimal figures real.`);
        console.log(`cmi.interactions.${n}.latency = ${SCO.get(`cmi.interactions.${n}.latency`)} (RW) Time elapsed between the time the interaction was made available to the learner for response and the time of the first response: timeinterval (second,10,2)`);
        console.log(`cmi.interactions.${n}.description = ${SCO.get(`cmi.interactions.${n}.description`)} (RW) Brief informative description of the interaction: localized_string_type (SPM: 250)`);

        console.log("\tInteraction objectives: ");
        console.log(`cmi.interactions.${n}.objectives._count = ${SCO.get(`cmi.interactions.${n}.objectives._count`)} (RO) Current number of objectives (i.e., objective identifiers) being stored by the LMS for this interaction: non-negative integer`);
        for (let m = 0; m < SCO.get(`cmi.interactions.${n}.objectives._count`); m++) console.log(`cmi.interactions.${n}.objectives.${m}.id = ${SCO.get(`cmi.interactions.${n}.objectives.${m}.id`)} (RW) Label for objectives associated with the interaction: long_identifier_type (SPM: 4000)`);

        console.log("\tInteraction correct responses: ");
        console.log(`cmi.interactions.${n}.correct_responses._count = ${SCO.get(`cmi.interactions.${n}.correct_responses._count`)} (RO) Current number of correct responses being stored by the LMS for this interaction: non-negative integer`);
        for (let m = 0; m < SCO.get(`cmi.interactions.${n}.objectives._count`); m++) console.log(` = ${SCO.get(`cmi.interactions.${n}.correct_responses.${m}.pattern`)} (RW) One correct response pattern for the interaction: format depends on interaction type`);
    }

    console.log("\nLearner Comments: ");
    console.log(`cmi.comments_from_learner._children = ${SCO.get("cmi.comments_from_learner._children")} (RO) Listing of supported data model elements`);
    console.log(`cmi.comments_from_learner._count = ${SCO.get("cmi.comments_from_learner._count")} (RO) Current number of learner comments: non-negative integer`);
    for (let n = 0; n < SCO.get("cmi.comments_from_learner._count"); n++) {
        console.log(`cmi.comments_from_learner.${n}.comment = ${SCO.get(`cmi.comments_from_learner.${n}.comment`)} (RW) Textual input: localized_string_type (SPM: 4000)`);
        console.log(`cmi.comments_from_learner.${n}.location = ${SCO.get(`cmi.comments_from_learner.${n}.location`)} (RW) Point in the SCO to which the comment applies: string`);
        console.log(`cmi.comments_from_learner.${n}.timestamp = ${SCO.get(`cmi.comments_from_learner.${n}.timestamp`)} (RW) Point in time at which the comment was created or most recently changed`);
    }

    console.log("\nLMS comments: ");
    console.log(`cmi.comments_from_lms._children = ${SCO.get("cmi.comments_from_lms._children")} (RO) Listing of supported data model elements`);
    console.log(`cmi.comments_from_lms._count = ${SCO.get("cmi.comments_from_lms._count")} (RO) Current number of comments from the LMS`);
    for (let n = 0; n < SCO.get("cmi.comments_from_lms._count"); n++) {
        console.log(`cmi.comments_from_lms.${n}.comment = ${SCO.get(`cmi.comments_from_lms.${n}.comment`)} (RO) Comments or annotations associated with a SCO: localized_string_type (SPM: 4000)`);
        console.log(`cmi.comments_from_lms.${n}.location = ${SCO.get(`cmi.comments_from_lms.${n}.location`)} (RO) Point in the SCO to which the comment applies: string, SPM: 250`);
        console.log(`cmi.comments_from_lms.${n}.timestamp = ${SCO.get(`cmi.comments_from_lms.${n}.timestamp`)} (RO) Point in time at which the comment was created or most recently changed: time(second,10,0)`);
    }
})();