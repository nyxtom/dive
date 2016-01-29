
    $self.buhlmann = function() {
        var algorithm = {};
        algorithm.ZH16ATissues = [
            // N2HalfTime, N2AValue, N2BValue, HeHalfTime, HeAValue, HeBValue
            [4.0, 1.2599, 0.5050, 1.51, 1.7424, 0.4245],
            [5.0, 1.2599, 0.5050, 1.88, 1.6189, 0.4770],
            [8.0, 1.0000, 0.6514, 3.02, 1.3830, 0.5747],
            [12.5, 0.8618, 0.7222, 4.72, 1.1919, 0.6527],
            [18.5, 0.7562, 0.7725, 6.99, 1.0458, 0.7223],
            [27.0, 0.6667, 0.8125, 10.21, 0.9220, 0.7582],
            [38.3, 0.5933, 0.8434, 14.48, 0.8205, 0.7957],
            [54.3, 0.5282, 0.8693, 20.53, 0.7305, 0.8279],
            [77.0, 0.4701, 0.8910, 29.11, 0.6502, 0.8553],
            [109.0, 0.4187, 0.9092, 41.20, 0.5950, 0.8757],
            [146.0, 0.3798, 0.9222, 55.19, 0.5545, 0.8903],
            [187.0, 0.3497, 0.9319, 70.69, 0.5333, 0.8997],
            [239.0, 0.3223, 0.9403, 90.34, 0.5189, 0.9073],
            [305.0, 0.2971, 0.9477, 115.29, 0.5181, 0.9122],
            [390.0, 0.2737, 0.9544, 147.42, 0.5176, 0.9171],
            [498.0, 0.2523, 0.9602, 188.24, 0.5172, 0.9217],
            [635.0, 0.2327, 0.9653, 240.03, 0.5119, 0.9267]
        ];

        algorithm.ZH16BTissues = [
            [4.0, 1.2599, 0.5050, 1.51, 1.7424, 0.4245],
            [5.0, 1.2599, 0.5050, 1.88, 1.6189, 0.4770],
            [8.0, 1.0000, 0.6514, 3.02, 1.3830, 0.5747],
            [12.5, 0.8618, 0.7222, 4.72, 1.1919, 0.6527],
            [18.5, 0.7562, 0.7725, 6.99, 1.0458, 0.7223],
            [27.0, 0.6667, 0.8125, 10.21, 0.9220, 0.7582],
            [38.3, 0.5600, 0.8434, 14.48, 0.8205, 0.7957],
            [54.3, 0.4947, 0.8693, 20.53, 0.7305, 0.8279],
            [77.0, 0.4500, 0.8910, 29.11, 0.6502, 0.8553],
            [109.0, 0.4187, 0.9092, 41.20, 0.5950, 0.8757],
            [146.0, 0.3798, 0.9222, 55.19, 0.5545, 0.8903],
            [187.0, 0.3497, 0.9319, 70.69, 0.5333, 0.8997],
            [239.0, 0.3223, 0.9403, 90.34, 0.5189, 0.9073],
            [305.0, 0.2971, 0.9477, 115.29, 0.5181, 0.9122],
            [390.0, 0.2737, 0.9544, 147.42, 0.5176, 0.9171],
            [498.0, 0.2523, 0.9602, 188.24, 0.5172, 0.9217],
            [635.0, 0.2327, 0.9653, 240.03, 0.5119, 0.9267]
        ];

        algorithm.ZH16CTissues = [
            [4.0, 1.2599, 0.5050, 1.51, 1.7424, 0.4245],
            [5.0, 1.2599, 0.5050, 1.88, 1.6189, 0.4770],
            [8.0, 1.0000, 0.6514, 3.02, 1.3830, 0.5747],
            [12.5, 0.8618, 0.7222, 4.72, 1.1919, 0.6527],
            [18.5, 0.7562, 0.7725, 6.99, 1.0458, 0.7223],
            [27.0, 0.6200, 0.8125, 10.21, 0.9220, 0.7582],
            [38.3, 0.5043, 0.8434, 14.48, 0.8205, 0.7957],
            [54.3, 0.4410, 0.8693, 20.53, 0.7305, 0.8279],
            [77.0, 0.4000, 0.8910, 29.11, 0.6502, 0.8553],
            [109.0, 0.3750, 0.9092, 41.20, 0.5950, 0.8757],
            [146.0, 0.3500, 0.9222, 55.19, 0.5545, 0.8903],
            [187.0, 0.3295, 0.9319, 70.69, 0.5333, 0.8997],
            [239.0, 0.3065, 0.9403, 90.34, 0.5189, 0.9073],
            [305.0, 0.2835, 0.9477, 115.29, 0.5181, 0.9122],
            [390.0, 0.2610, 0.9544, 147.42, 0.5176, 0.9171],
            [498.0, 0.2480, 0.9602, 188.24, 0.5172, 0.9217],
            [635.0, 0.2327, 0.9653, 240.03, 0.5119, 0.9267]
        ];

        function buhlmannTissue(halfTimes, absPressure, isFreshWater) {
            this.halfTimes = halfTimes;
            this.isFreshWater = isFreshWater || false;
            this.waterVapourPressure = dive.waterVapourPressureInBars(35.2);
            this.absPressure = absPressure || 1;
            this.pNitrogen = dive.partialPressure(absPressure || 1, 0.79) - this.waterVapourPressure;
            this.pHelium = 0;
            this.pTotal = this.pNitrogen + this.pHelium;
            this.ceiling = 0;
        };

        buhlmannTissue.prototype.N2HalfTime = function () {
            return this.halfTimes[0];
        };

        buhlmannTissue.prototype.N2AValue = function () {
            return this.halfTimes[1];
        };

        buhlmannTissue.prototype.N2BValue = function () {
            return this.halfTimes[2];
        };

        buhlmannTissue.prototype.HeHalfTime = function () {
            return this.halfTimes[3];
        };

        buhlmannTissue.prototype.HeAValue = function () {
            return this.halfTimes[4];
        };

        buhlmannTissue.prototype.HeBValue = function () {
            return this.halfTimes[5];
        };

        buhlmannTissue.prototype.addFlat = function (depth, fO2, fHe, time) {
            //This is a helper into depth change - with start/end depths identical
            this.addDepthChange(depth, depth, fO2, fHe, time);
        };

        buhlmannTissue.prototype.addDepthChange = function (startDepth, endDepth, fO2, fHe, time) {
            var fN2 = (1 - fO2) - fHe
            // Calculate nitrogen loading
            var gasRate = dive.gasRateInBarsPerMinute(startDepth, endDepth, time, fN2, this.isFreshWater);
            var halfTime = this.N2HalfTime(); // half-time constant = log2/half-time in minutes
            var pGas = dive.gasPressureBreathingInBars(endDepth, fN2, this.isFreshWater); // initial ambient pressure
            var pBegin = this.pNitrogen; // initial compartment inert gas pressure in bar
            this.pNitrogen = dive.schreinerEquation(pBegin, pGas, time, halfTime, gasRate);
            //console.log("pBegin=" + pBegin + ", pGas=" + pGas + ", time=" + time +", halfTime=" + halfTime + ", gasRate=" + gasRate + ", result=" + this.pNitrogen);

            // Calculate helium loading
            gasRate = dive.gasRateInBarsPerMinute(startDepth, endDepth, time, fHe, this.isFreshWater);
            halfTime = this.HeHalfTime();
            pGas = dive.gasPressureBreathingInBars(endDepth, fHe, this.isFreshWater);
            pBegin = this.pHelium;
            this.pHelium = dive.schreinerEquation(pBegin, pGas, time, halfTime, gasRate);

            var prevTotal = this.pTotal;
            // Calculate total loading
            this.pTotal = this.pNitrogen + this.pHelium;

            //return difference - how much load was added
            return this.pTotal - prevTotal;
        };

        buhlmannTissue.prototype.calculateCeiling = function (gf) {
            gf = gf || 1.0
            var a = ((this.N2AValue() * this.pNitrogen) + (this.HeAValue() * this.pHelium)) / (this.pTotal);
            var b = ((this.N2BValue() * this.pNitrogen) + (this.HeBValue() * this.pHelium)) / (this.pTotal);
            var bars = (this.pTotal - (a * gf)) / ((gf / b) + 1.0 - gf);
            //var bars = (this.pTotal - a) * b;
            this.ceiling = dive.barToDepthInMeters(bars, this.isFreshWater);
            //console.log("a:" + a + ", b:" + b + ", bars:" + bars + " ceiling:" + this.ceiling);
            return Math.round(this.ceiling);
        };

        function plan(buhlmannTable, absPressure, isFreshWater) {
            this.table = buhlmannTable;
            this.isFreshWater = isFreshWater;
            this.tissues = [];
            for (var i = 0; i < this.table.length; i++) {
                this.tissues[i] = new buhlmannTissue(this.table[i], absPressure, isFreshWater);
            }
            this.bottomGasses = {};
            this.decoGasses = {};
            this.segments = [];
        };

        plan.prototype.addBottomGas = function(gasName, fO2, fHe) {
            this.bottomGasses[gasName] = dive.gas(fO2, fHe);
        }

        plan.prototype.addDecoGas = function(gasName, fO2, fHe) {
            this.decoGasses[gasName] = dive.gas(fO2, fHe);
        }

        plan.prototype.addFlat = function (depth, gasName, time) {
            return this.addDepthChange(depth, depth, gasName, time);
        };

        plan.prototype.addDepthChange = function (startDepth, endDepth, gasName, time) {
            var bottomGas = this.bottomGasses[gasName];
            if (bottomGas == undefined) {
                throw "Gasname must only be one of registered bottom gasses. Cannot use deco gasses as part of dive plan.";
            }
            var fO2 = bottomGas.fO2;
            var fHe = bottomGas.fHe;

            //store this as a stage
            this.segments[this.segments.length] = dive.stage(startDepth, endDepth, gasName, time);

            var loadChange = 0.0;
            for (var i = 0; i < this.tissues.length; i++) {
                var tissueChange = this.tissues[i].addDepthChange(startDepth, endDepth, fO2, fHe, time);
                loadChange = loadChange + tissueChange;
            }
            return loadChange;
        };

        plan.prototype.getCeiling = function (gf) {
            gf = gf || 1.0
            var ceiling = 0;
            for (var i = 0; i < this.tissues.length; i++) {
                var tissueCeiling = this.tissues[i].calculateCeiling(gf);
                if (!ceiling || tissueCeiling > ceiling) {
                    ceiling = tissueCeiling;
                }
            }
            while (ceiling % 3 != 0) {
                ceiling++;
            }
            return ceiling;
        };

        plan.prototype.resetTissues = function (origTissuesJSON) {
            var originalTissues = JSON.parse(origTissuesJSON);
            for (var i = 0; i < originalTissues.length; i++) {
                for (var p in originalTissues[i]) {
                    this.tissues[i][p] = originalTissues[i][p];
                }
            }
        }

        plan.prototype.calculateDecompression = function (maintainTissues, gfLow, gfHigh, maxppO2, maxEND, fromDepth) {
            maintainTissues = maintainTissues || false;
            gfLow = gfLow || 1.0;
            gfHigh = gfHigh || 1.0;
            maxppO2 = maxppO2 || 1.6;
            maxEND = maxEND || 30;
            var currentGasName;
            if (typeof fromDepth == 'undefined') {
                if (this.segments.length == 0) {
                    throw "No depth to decompress from has been specified, and neither have any dive stages been registered. Unable to decompress.";
                } else {
                    fromDepth = this.segments[this.segments.length-1].endDepth;
                    currentGasName = this.segments[this.segments.length-1].gasName;
                }
            }

            var gfDiff = gfHigh-gfLow; //find variance in gradient factor
            var distanceToSurface = fromDepth;
            var gfChangePerMeter = gfDiff/distanceToSurface
            if (!maintainTissues) {
                var origTissues = JSON.stringify(this.tissues);
            }

            var ceiling = this.getCeiling(gfLow);

            currentGasName = this.addDecoDepthChange(fromDepth, ceiling, maxppO2, maxEND, currentGasName);

            //console.log("Start Ceiling:" + ceiling + " with GF:" + gfLow)
            while (ceiling > 0) {
                var currentDepth = ceiling;
                var nextDecoDepth = (ceiling - 3);
                var time = 0;
                var gf = gfLow + (gfChangePerMeter * (distanceToSurface - ceiling));
                //console.log("GradientFactor:"+gf + " Next decoDepth:" + nextDecoDepth);
                while (ceiling > nextDecoDepth && time <= 10000) {
                    this.addFlat(currentDepth, currentGas, 1);
                    time++;
                    ceiling = this.getCeiling(gf);
                }
                console.log("Moving diver from current depth " + currentDepth + " to next ceiling of " + ceiling);
                currentGasName = this.addDecoDepthChange(currentDepth, ceiling, currentGasName);
            }
            if (!maintainTissues) {
                this.resetTissues(origTissues);
            }
            return this.segments;
        };

        plan.prototype.addDecoDepthChange = function(fromDepth, toDepth, maxppO2, maxEND, currentGasName) {
            if (typeof currentGasName == 'undefined') {
                currentGasName = this.bestDecoGasName(fromDepth, maxppO2, maxEND);
                if (typeof currentGasName == 'undefined') {
                    throw "Unable to find starting gas to decompress at depth. No segments provided with bottom mix, and no deco gas operational at this depth.";
                }
            }

            console.log("Starting depth change from " + fromDepth + " moving to " + toDepth + " with starting gas " + currentGasName);
            while (toDepth < fromDepth) { //if ceiling is higher, move our diver up.
                //ensure we're on the best gas
                var betterDecoGasName = this.bestDecoGasName(fromDepth, maxppO2, maxEND);
                if (typeof betterDecoGasName != 'undefined') {
                    console.log("At depth " + fromDepth + " found a better deco gas " + betterDecoGasName + ". Switching to better gas.");
                    currentGasName = betterDecoGasName;
                }

                console.log("Looking for the next best gas moving up between " + fromDepth + " and " + toDepth);
                var ceiling = toDepth; //ceiling is toDepth, unless there's a better gas to switch to on the way up.
                for (var nextDepth=fromDepth-1; nextDepth >= ceiling; nextDepth--) {
                    var nextDecoGasName = this.bestDecoGasName(nextDepth);
                    if (nextDecoGasName != currentGasName) {
                        console.log("Found a gas " + nextDecoGasName + " to switch to at " + nextDepth + " which is lower than target ceiling of " + ceiling);
                        ceiling = nextDepth; //Only carry us up to the point where we can use this better gas.
                        break;
                    }
                }

                //take us to the ceiling at 30fpm or 10 mpm (the fastest ascent rate possible.)
                var depthdiff = fromDepth - ceiling;
                var time = depthdiff/10;
                console.log("Moving diver from " + fromDepth + " to " + ceiling + " on gas " + currentGasName + " over " + time + " minutes (10 meters or 30 feet per minute).")
                this.addDepthChange(fromDepth, ceiling, currentGasName, time);

                fromDepth = ceiling; //move up from-depth
            }

            return currentGasName;

        }

        plan.prototype.bestDecoGasName = function(depth, maxppO2, maxEND) {
            //console.log("Finding best deco gas for depth " + depth + " with max ppO2 of " + maxppO2 + "  and max END of " + maxEND);
            //best gas is defined as: a ppO2 at depth <= maxppO2,
            // the highest ppO2 among all of these.
            // END <= 30 (equivalent narcotic depth < 30 meters)
            var winner;
            var winnerName;
            for (var gasName in this.decoGasses) {
                var candidateGas = this.decoGasses[gasName];
                var mod = Math.round(candidateGas.modInMeters(maxppO2, this.isFreshWater));
                var end = Math.round(candidateGas.endInMeters(depth, this.isFreshWater));
                //console.log("Found candidate deco gas " + gasName + ": " + (candidateGas.fO2) + "/" + (candidateGas.fHe) + " with mod " + mod + " and END " + end);
                if (depth <= mod && end <= maxEND) {
                    //console.log("Candidate " + gasName + " fits within MOD and END limits.");
                    if (typeof winner == 'undefined' || //either we have no winner yet
                        winner.fO2 < candidateGas.fO2) { //or previous winner is a lower O2
                        //console.log("Replaced winner: " + candidateGas);
                        winner = candidateGas;
                        winnerName = gasName;
                    }

                }
            }
            return winnerName;
        }

        plan.prototype.ndl = function (depth, gasName, gf) {
            gf = gf || 1.0

            var ceiling = this.getCeiling(gf);
            //console.log("Ceiling:" +ceiling);

            var origTissues = JSON.stringify(this.tissues);
            var time = 0;
            var change = 1;
            while (ceiling < 0 && change > 0) {
                //console.log("Ceiling:" +ceiling);
                change = this.addFlat(depth, gasName, gf);
                ceiling = this.getCeiling(gf);
                time++;
            }
            this.resetTissues(origTissues);
            if (change == 0) {
                console.log("NDL is practially infinity. Returning largest number we know of.");
                return Math.POSITIVE_INFINITY;
            }
            return time; //We went one minute past a ceiling of "0"
        };

        algorithm.buhlmannTissue = buhlmannTissue;
        algorithm.plan = plan;

        return algorithm;

    };
