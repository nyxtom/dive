
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
            bars = bars - this.absPressure;
            this.ceiling = dive.barToDepthInMeters(bars, this.isFreshWater);
            return Math.round(this.ceiling);
        };

        function plan(buhlmannTable, absPressure, isFreshWater) {
            this.table = buhlmannTable;
            this.tissues = [];
            for (var i = 0; i < this.table.length; i++) {
                this.tissues[i] = new buhlmannTissue(this.table[i], absPressure, isFreshWater);
            }
        };

        plan.prototype.addFlat = function (depth, fO2, fHe, time) {
            return this.addDepthChange(depth, depth, fO2, fHe, time);
        };

        plan.prototype.addDepthChange = function (startDepth, endDepth, fO2, fHe, time) {
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
                if (tissueCeiling < 0) { //No negative ceilings.
                    tissueCeiling = 0;
                }
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

        plan.prototype.calculateDecompression = function (fO2, fHe, maintainTissues, gfLow, gfHigh) {
            gfLow = gfLow || 1.0;
            gfHigh = gfHigh || 1.0;
            var decoProc = [];
            var ceiling = this.getCeiling(gfLow);
            var gfDiff = gfHigh-gfLow; //find variance in gradient factor
            var distanceToSurface = ceiling
            var gfChangePerMeter = gfDiff/distanceToSurface

            if (!maintainTissues) {
                var origTissues = JSON.stringify(this.tissues);
            }
            console.log("Start Ceiling:" + ceiling)
            while (ceiling > 0) {
                var currentDepth = ceiling;
                var nextDecoDepth = (ceiling - 3);
                var time = 0;
                var gf = gfLow + (gfChangePerMeter * (distanceToSurface - ceiling));
                console.log("GradientFactor:"+gf + " Next decoDepth:" + nextDecoDepth);
                while (ceiling > nextDecoDepth && time <= 10000) {
                    this.addFlat(currentDepth, fO2, fHe, time);
                    time++;
                    ceiling = this.getCeiling(gf);
                }
                console.log("Added deco stop at Depth " + currentDepth + " for time:" + time);
                decoProc.push({'depth': currentDepth, 'time': time});
            };
            if (!maintainTissues) {
                this.resetTissues(origTissues);
            }
            return decoProc;
        };

        plan.prototype.ndl = function (depth, fO2, fHe, gf) {
            gf = gf || 1.0
            var ceiling = this.getCeiling(gf);
            var origTissues = JSON.stringify(this.tissues);
            var time = 0;
            var change = 1;
            while (ceiling <= 0 && change != 0) {
                change = this.addFlat(depth, fO2, fHe, 1);
                ceiling = this.getCeiling(gf);
                time++;
            }
            this.resetTissues(origTissues);
            if (change == 0) {
                console.log("NDL is practially infinity. Returning largest number we know of.");
                return Math.POSITIVE_INFINITY;
            }
            return time-1; //We went one minute past a ceiling of "0"
        };

        algorithm.buhlmannTissue = buhlmannTissue;
        algorithm.plan = plan;

        return algorithm;

    };
