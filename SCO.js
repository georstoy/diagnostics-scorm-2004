console.log("create SCO object")
const SCO = {

    // Returns the handle to API object if it was previously set
    // otherwise it returns null
    _api: null,
    api: function () {
        if (this._api !== null) return this._api;
        // This function looks for an object named API in parent and opener windows
        var findAPI = function (win) {
            try {
                var s = 0;
                // Check to see if the window (win) contains the API
                // if the window (win) does not contain the API and
                // the window (win) has a parent window and the parent window
                // is not the same as the window (win)
                while (typeof win.API_1484_11 === "undefined" && win.parent !== null && win.parent !== win) {
                    if (++s > 500) return null;
                    win = win.parent;
                }
                return win.API_1484_11;
            } catch (err) {
                console.log('Error finding API.')
            }
        };

        this._api = findAPI(window);
        if (!this._api && window.opener !== null && typeof(window.opener) !== 'undefined') {
            this._api = findAPI(window.opener);
        }
        if (!!this._api) {
            console.log('Found API.');
        }
        return this._api;
    },

    // Determines if an error was encountered by the previous API call
    _errors: [],
    isError: function (api) {
        api = api || this.api();
        if (api !== null) {
            var errcode = api.GetLastError();
            if (errcode && errcode.toString() !== "0") {
                console.log({
                    code: errcode,
                    desc: api.GetErrorString(errcode),
                    diag: api.GetDiagnostic(null)
                });
                this._errors.push({
                    code: errcode,
                    desc: api.GetErrorString(errcode),
                    diag: api.GetDiagnostic(null)
                });
                return true;
            }
        }
        return false;
    },

    // Initialize communication with LMS by calling the Initialize
    _inited: false,
    init: function () {
        if (this._inited) {
            console.error("SCO already initialised OK!");
            return false;
        }
        console.log("SCO Initialized");

        var api = this.api();
        if (!api) {
            console.log("No API found.");
            return false;
        }
        console.log("API Initialized OK!");

        var initval = api.Initialize("");
        this._inited = initval && initval.toString() === "true";
        if (!this._inited) {
            return false;
        }

        // cmi.completion_status: Indicates whether the learner has completed the SCO
        // cmi.completion_status (“completed”, “incomplete”, “not attempted”, “unknown”, RW)
        // whether the learner has completed and satisfied the requirements for the SCO
        var status = this.get("cmi.completion_status");
        switch (status) {
            case "completed":
                this._started = this._completed = true;
                break;
            case "incomplete":
                this.start();
                break;
            case "not attempted":
            default:
                this.set('cmi.core.lesson_status', 'incomplete');
                this.start();
                break;
        }
        console.log("SCO on init", SCO);
        this.commit();
    },

    // Close communication with LMS by calling the Terminate
    close: function () {
        if (this._started !== true) {
            var time = new Date().getTime() - this._started;
            time = Math.floor(time / 10) / 100;
            var hours = Math.floor(time / 3600);
            if (hours < 10) {
                hours = '000' + hours;
            } else if (hours < 100) {
                hours = '00' + hours;
            } else if (hours < 1000) {
                hours = '0' + hours;
            }
            var mins = Math.floor((time % 3600) / 60);
            if (mins < 10) mins = '0' + mins;
            var seconds = Math.round((time % 3600 % 60) * 100) / 100;
            if (seconds < 10) seconds = '0' + seconds;
            // cmi.core.session_time: Amount of time that the learner has spent in the current learner session for this SCO
            this.set('cmi.core.session_time', hours + ":" + mins + ":" + seconds);
        }

        // cmi.core.exit: Indicates how or why the learner left the SCO
        if (this.inProgress()) {
            this.set("cmi.exit", "suspend");
        } else {
            this.set("cmi.exit', 'logout");
        }
        console.log("SCO on close", SCO);
        this.commit();

        var api = this.api();
        if (api) {
            console.log("Skinny: Terminate called...")
            api.Terminate("");
            return !this.isError(api);
        }
        return false;
    },

    // Wraps the call to the LMS GetValue function
    get: function (key) {
        var api = this.api();
        if (api) {
            var ret = api.GetValue(key);
            if (!this.isError(api)) {
                return ret;
            }
        }
        return null;
    },

    // Wraps the call to the LMS SetValue function
    set: function (key, value) {
        var api = this.api();
        if (api) {
            api.SetValue(key, value);
            this.commit();
            return !this.isError(api);
        }
        return false;
    },

    // Commits the data to the LMS.
    commit: function () {
        console.log("Starting commit", SCO);
        var api = this.api();
        if (api) {
            var vTry = 0;
            var vMaxTry = 3;
            var error = -1;
            while (vTry < vMaxTry && error != '0') {
                vTry++;
                api.Commit("");
                error = api.GetLastError();
                if (vTry > 1) {
                    console.log('Cannot communicate with the host LMS. Trying count ' + vTry);
                }
            }
            if (error != '0') {
                console.log('Connection lost to server.');
                // window.top.location = window.location.host;
            } else {
                console.log("Finishing commit", SCO);
                return !this.isError(api);
            }
        }
        console.log("Cannot successfully finish commit", SCO);
        return false;
    },

    // Get learner data includes student_id, student_name.
    learner: function () {
        // cmi.core.student_id: Identifies the student on behalf of whom the SCO was launched
        // cmi.core.student_name: Name provided for the student by the LMS
        return {
            id: this.get('cmi.core.student_id'),
            name: this.get('cmi.core.student_name')
        };
    },

    // cmi.core.lesson_location: The learner’s current location in the SCO
    location: function (page) {
        if (this.inProgress() && page !== null && page !== undefined) {
            this.set('cmi.core.lesson_location', page);
        } else {
            this.set('cmi.core.lesson_location', '');
        }
        return this.get('cmi.core.lesson_location');
    },

    // cmi.core.entry: Asserts whether the learner has previously accessed the SCO
    entry: function () {
        return this.get('cmi.entry');
    },

    // cmi.core.lesson_mode: Identifies one of three possible modes in which the SCO may be presented to the learner
    mode: function () {
        return this.get('cmi.core.lesson_mode');
    },

    // cmi.core.score.raw: Number that reflects the performance of the learner relative to the range bounded by the values of min and max
    // cmi.core.score.min: Minimum value in the range for the raw score
    // cmi.core.score.max: Maximum value in the range for the raw score
    _score: -1,
    score: function (score) {
        console.log("Setting score", score);
        if (score !== null) {
            this._score = score;
            this.set('cmi.core.score.raw', score);
            this.set('cmi.core.score.min', '0');
            this.set('cmi.core.score.max', '100');
        }
        return this.get('cmi.core.score.raw');
    },

    // Returns the progress
    _progress: 0,
    progress: function (prog) {
        console.log("Updating progress", prog);
        if (prog !== null) {
            // Round to range 0-1 with seven decimal places.
            prog = Math.round(prog * 100000) / 10000000;
            this._progress = prog;
        }
        return this._progress;
    },

    _started: false,
    start: function () {
        this._started = new Date().getTime();
    },

    // Completing the course by set lesson status then commit data.
    _completed: false,
    complete: function () {
        console.log("Completing course");
        if (this.isSync()) {
            // If course has a score set the lesson status is passed otherwise failed
            // cmi.core.lesson_status (“passed”, “completed”, “failed”, “incomplete”, “browsed”, “not attempted”, RW)
            // Indicates whether the learner has completed and satisfied the requirements for the SCO
            this.set('cmi.core.lesson_status', this._score > 0 ? 'passed' : 'failed');
            this.location("");
            this._completed = true;
            this.commit();
        }
    },

    // In progress if started & not completed.
    inProgress: function () {
        return this.isStarted() && !this.isCompleted();
    },

    isStarted: function () {
        return !!this._started;
    },

    isCompleted: function () {
        return this._completed;
    },

    isFailed: function () {
        return this.get('cmi.core.lesson_status') === "failed";
    },

    isSync: function () {
        return this.inProgress() || this.isFailed();
    }

};