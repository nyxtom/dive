    /*
     * The effect of pressure and temperature on the densities of liquids 
     * and solids is small. The compressibility for a typical liquid or 
     * solid is 10−6 bar−1 (1 bar = 0.1 MPa) and a typical thermal 
     * expansivity is 10−5 K−1. This roughly translates into needing 
     * around ten thousand times atmospheric pressure to reduce the 
     * volume of a substance by one percent. (Although the pressures 
     * needed may be around a thousand times smaller for sandy soil 
     * and some clays.) A one percent expansion of volume typically 
     * requires a temperature increase on the order of thousands of degrees Celsius.
     */
    // current liquid sample density in kilogram per cubic meters (kg/m3) or grams per cubic centimeters (g/cm3)
    $self.liquidSamples = {
        fresh: {
            density: function () {
                return $self.density(1000, 1); // 1000kg / m3 at 0C / 32F (standard conditions for measurements)
            }
        },
        salt: {
            density: function () {
                return $self.density(1030, 1); // 1000kg / m3 at 0C / 32F (standard conditions for measurements)
            }
        },
        mercury: {
            density: function () {
                return $self.density(13595.1, 1); // 13595.1 kg / m3 at 0C / 32F (standard conditions)
            }
        }
    };

    // current gravity sample rates in meters per second per second (m/s2)
    $self.gravitySamples = {
        earth: 9.80665,
        _current: 9.80665,
        current: function (_value) {
            if (typeof _value == 'Number') {
                $self.gravitySamples._current = _value;
            }
            return $self.gravitySamples._current;
        }
    };

    // current surface pressure measured in bar
    $self.surfacePressureSamples = {
        earth: 1,
        _current: 1,
        current: function (_value) {
            if (typeof _value == 'Number') {
                $self.surfacePressureSamples._current = _value;
            }
            return $self.surfacePressureSamples._current;
        }
    };

    $self.constants = {
        vapourPressure: {
            water: {
                tempRange_1_100: [8.07131,1730.63,233.426],
                tempRange_99_374: [8.14019,1810.94,244,485]
            },
            lungsBreathing: {
                _current: null,
                current: function() {
                    if (!$self.constants.vapourPressure.lungsBreathing._current) {
                        var value = $self.waterVapourPressureInBars(35.2);
                        $self.constants.vapourPressure.lungsBreathing._current = value;
                    }
                    return $self.constants.vapourPressure.lungsBreathing._current;
                }
            }
        },
        altitudePressure: {
            sealevel: 1,
            _current: 1,
            current: function (_value) {
                if (typeof _value == 'Number') {
                    $self.constants.altitudePressure._current = _value;
                }
                return $self.constants.altitudePressure._current;
            }
        }
    };

    $self.feetToMeters = function (feet) {
        /// <summary>Calculates standard feet to meters calculation.</summary>
        /// <param name="feet" type="Number">Number of feet to convert.</param>
        /// <returns>The number in meters.</returns>
        if (!feet)
            return 0.3048;

        return feet * 0.3048;
    };

    $self.metersToFeet = function (meters) {
        /// <summary>Calculates standard meters to feet calculation.</summary>
        /// <param name="meters" type="Number">Number of meters to convert.</param>
        /// <returns>The number in feet.</returns>
        if (!meters)
            return 3.28084;

        return meters * 3.28084;
    };

    $self.mmHgToPascal = function (mmHg) {
        /// <summary>Returns the definition of mmHg (millimeters mercury) in terms of Pascal.</summary>
        /// <param name="mmHg" type="Number">Millimeters high or depth.</param>
        /// <returns>Typically defined as weight density of mercury</returns>
        
        if (!mmHg) {
            mmHg = 1;
        }

        return ($self.liquidSamples.mercury.density() / 1000) * $self.gravitySamples.current() * mmHg;
    };

    $self.pascalToBar = function (pascals) {
        /// <summary>Calculates the pascal to bar derived unit.</summary>
        /// <param name="pascal" type="Number">The pascal SI derived unit.</param>
        /// <returns>Bar derived unit of pressure from pascal</returns>

        // 100000 pascals = 1 bar
        return pascals / ($self.surfacePressureSamples.current() * 100000);
    };

    $self.barToPascal = function (bars) {
        /// <summary>Calculates the bar to pascal derived unit.</summary>
        /// <param name="bars" type="Number">The bar derived unit.</param>
        /// <returns>Pascal derived unit of pressure from bars</returns>
        
        if (!bars) {
            bars = 1;
        }

        // 100000 pascals = 1 bar
        return bars * ($self.surfacePressureSamples.current() * 100000);
    };

    $self.atmToBar = function (atm) {
        /// <summary>Calculates the internal pressure (measure of force per unit area) - often 
        /// defined as one newton per square meter.</summary>
        /// <param name="atm" type="Number">The number of atmospheres (atm) to conver.</param>
        /// <returns>Bar dervied unit of pressure from atm.</returns>

        var pascals = $self.atmToPascal(atm);
        return $self.pascalToBar(pascals);
    };

    $self.atmToPascal = function (atm) {
        /// <summary>Calculates the internal pressure (measure of force per unit area) - often
        /// defined as one newton per square meter.</summary>
        /// <param name="atm" type="Number">The number of atmospheres (atm) to conver.</param>
        /// <returns>Pascal SI dervied unit of pressure from atm.</returns>
        
        // atm is represented as the force per unit area exerted on a surface by the weight of the 
        // air above that surface in the atmosphere. The unit of measurement on Earth is typically
        // 101325 pascals = 1 atm. 
        // 100000 pascals = 1 bar
        // 
        // On Jupiter (since there isn't technically a surface, the base is determined to be at about 10bars) or 
        // 10 times the surface pressure on earth. It's funny how easy it is to use bar since you can essentially 
        // say how much times the surface pressure on earth is X. Easy conversion.
        //
        // Interesting enough, according to http://en.wikipedia.org/wiki/Bar_(unit)#Definition_and_conversion
        // atm is a deprecated unit of measurement. Despite the fact that bars are not a standard unit of 
        // measurement, meterologists and weather reporters worldwide have long measured air pressure in millibars
        // as the values are convenient. After hPa (hectopascals) were setup, meterologists often use hPa which 
        // are numerically equivalent to millibars. (i.e. 1hPa = 1mbar = 100Pa).
        //
        // Given the case for Mars, which averages about 600 Pascals = 6hPa = 6mbar
        // That means that the surface pressure on mars is roughly 166 times weaker than 
        // the surface pressure on Earth. Given that Mars's gravity is roughly 3.724m/s2.
        // Which means if you had fresh water on Mars (380kg/m3 accounting for density)
        // the weight density of water on mars would be 1415.12 N/m3. Given 600 Pascals = 600 N/m2.
        // You could dive (if fresh water existed on mars to a reasonanly depth), to reach the level
        // of pressure that you would experience typically at 10 meters here on Earth you would have to 
        // dive up to 35.191361896 meters or about 115.457 feet.
        //
        // (Please tell me if I'm calculating this wrong, it seems about accurate to me)
        //

        // See also: https://twitter.com/nyxtom/status/296157625123500032
        // Essentially, thoughts that pondered on how Jupiter's gravitational pull would 
        // affect the atmospheric pressure underwater for the moons surrounding it (that essentially made of ice and potentially 
        // other water based liquid forms). http://www.planetaryexploration.net/jupiter/io/tidal_heating.html

        // atm is essentially a deprecated unit of measurement
        if (!atm) {
            atm = 1;
        }

        // 100000 pascal = 1 bar = 0.986923267 atm
        // 1 atm = 101325 pascal = 1.01325 bar
        return $self.surfacePressureSamples.current() * 101325 * atm;
    };

    $self.pascalToAtm = function (pascal) {
        /// <summary>Converts pascal to atm.</summary>
        /// <param type="pascal" type="Number">The pascal unit to convert.</param>
        /// <returns>The atmospheric pressure from pascal SI derived unit.<returns>

        return pascal / ($self.surfacePressureSamples.current() * 101325);
    };

    $self.density = function (weight, volume) {
        /// <summary>Calculates the liquid density of the mass for the given volume.</summary>
        /// <param name="weight" type="Number">The weight (in kilograms) of the given mass.</param>
        /// <param name="volume" type="Number">The volume of the given mass in (cubic meters m3).</param>
        /// <returns>Density of the mass</returns>

        return weight / volume;
    };

    $self.depthInMetersToBars  = function (depth, isFreshWater) {
        /// <summary>Calculates the absolute pressure (in bars) for 1 cubic meter of water for the given depth (meters).</summary>
        /// <param name="depth" type="Number">The depth in meters below the surface for 1 cubic meter volume of water.</param>
        /// <param name="isFreshWater" type="Boolean">True to calculate against the weight density of fresh water versus salt.</param>
        /// <returns>The absolute pressure (in bars) for the given depth (in meters) of 1 cubic meter volume of water below the surface.</returns>
        
        var liquidDensity;
        if (isFreshWater) {
            liquidDensity = $self.liquidSamples.fresh.density();
        } else {
            liquidDensity = $self.liquidSamples.salt.density();
        }

        var weightDensity = liquidDensity * $self.gravitySamples.current();
        return $self.pascalToBar((depth * weightDensity)) + $self.constants.altitudePressure.current();
    };

    $self.depthInMetersToAtm  = function (depth, isFreshWater) {
        /// <summary>Calculates the absolute pressure (in atm) 1 cubic meter of water for the given depth (meters).</summary>
        /// <param name="depth" type="Number">The depth in meters below the surface for 1 cubic meter volume of water.</param>
        /// <param name="isFreshWater" type="Boolean">True to calculate against the weight density of fresh water versus salt.</param>
        /// <returns>The absolute pressure (in atm) for the given depth (in meters) of 1 cubic meter volume of water below the surface.</returns>
        
        var liquidDensity;
        if (isFreshWater) {
            liquidDensity = $self.liquidSamples.fresh.density();
        } else {
            liquidDensity = $self.liquidSamples.salt.density();
        }

        var weightDensity = liquidDensity * $self.gravitySamples.current();
        return $self.pascalToAtm((depth * weightDensity)) + $self.constants.altitudePressure.current();
    };

    $self.barToDepthInMeters = function (bars, isFreshWater) {
        /// <summary>Calculates the depth (in meters) for the given atmosphere (bar).</summary>
        /// <param name="bars" type="Number">The number of atmospheric pressure (in bars) to convert.</param>
        /// <param name="isFreshWater" type="Boolean">True to calculate against the weight density of fresh water versus salt.</param>
        /// <returns>The depth (in meters) for the given number of atmospheres.</returns>

        var liquidDensity;
        if (isFreshWater) {
            liquidDensity = $self.liquidSamples.fresh.density();
        } else {
            liquidDensity = $self.liquidSamples.salt.density();
        }

        if (!bars) {
            bars = 1;
        }

        var weightDensity = liquidDensity * $self.gravitySamples.current();
        var pressure = $self.barToPascal(bars);
        return pressure / weightDensity;
    };

    $self.atmToDepthInMeters = function (atm, isFreshWater) {
        /// <summary>Calculates the depth (in meters) for the given atmosphere (atm).</summary>
        /// <param name="atm" type="Number">The number of atmospheres (atm) to convert.</param>
        /// <param name="isFreshWater" type="Boolean">True to calculate against the weight density of fresh water versus salt.</param>
        /// <returns>The depth (in meters) for the given number of atmospheres.</returns>

        /*
         * Liquid pressure is defined as: pgh (density of liquid x gravity at the surface x height).
         * or Pressure = weight density x depth
         *
         * Standard Weight Density: (kg/m3) at 32F or 0C
         *  Water (fresh): 1000 kg/m3
         *  Water (salt): 1030 kg/m3
         *
         * since there is always 1atm (above water)
         *  
         *  P = depth x weight density + 1P atm
         *  
         *  So to calculate the depth under liquid at which pressure is 2x atm,
         *
         *  depth x weight density + atm pressure (P) = 2 atm
         *  depth = 1P atm / weight density
         *
         *  weight density = density x gravity
         *  1 ATM = 101,325 Pa
         *  
         *  weight density of water (fresh) at 0C = 1000 kg/m3 x 9.8m/s2
         *
         *  depth = 101325 Pa / (1000 kg/m3 x 9.8m/s2)
         *  1 newton = kg*m/s2
         *  1 pascal = 1 newton / m2
         *
         *  
         *  101325 newton per m2 / (9800 kg*m/m3*s2)
         *  9800 kg*m/m3*s2 = 9800 newton per m3
         *
         *  101325 N/m2 / 9800 N/m3 = 10.339285714 meters
         */

        var liquidDensity;
        if (isFreshWater) {
            liquidDensity = $self.liquidSamples.fresh.density();
        } else {
            liquidDensity = $self.liquidSamples.salt.density();
        }

        if (!atm) {
            atm = 1;
        }

        var weightDensity = liquidDensity * $self.gravitySamples.current();
        var pressure = $self.atmToPascal(atm);
        return pressure / weightDensity;
    };

    $self.dac = function (psiIn, psiOut, runTime) {
        /// <summary>Calculates depth air consumption rate in psi/min.</summary>
        /// <param name="psiIn" type="Number">Pounds/square inch that one starts their dive with.</param>
        /// <param name="psiOut" type="Number">Pounds/square inch that one ends their dive with.</param>
        /// <param name="runTime" type="Number">The total time (in minutes) of a given dive.</param>
        /// <returns>The depth air consumption (DAC) rate in psi/min for the given psi in/out and dive time in minutes.</returns>

        return ((psiIn - psiOut) / runTime);
    };

    $self.sac = function (dac, avgDepth, isFreshWater) {
        /// <summary>Calculates surface air consumption rate in psi/min based on DAC (depth air consumption) rate.</summary>
        /// <param name="dac" type="Number">Depth air consumption rate in psi/min.</param>
        /// <param name="avgDepth" type="Number">Average depth (in meters) for length of dive.</param>
        /// <param name="isFreshWater" type="Boolean">True to calculate for fresh water rates, false or undefined for salt water.</param>
        /// <returns>The surface air consumption (SAC) rate in psi/min for the given DAC and average depth.</returns>

        var depthToOneATM = $self.atmToDepthInMeters(1, isFreshWater);
        return (dac / ((avgDepth / depthToOneATM) + 1));
    };

    $self.rmv = function (sac, tankVolume, workingTankPsi) {
        /// <summary>Calculates the respiratory minute volume rate in ft^3/min based on SAC (surface air consumption) rate.</summary>
        /// <param name="sac" type="Number">Surface air consumption rate in psi/min.</param>
        /// <param name="tankVolume" type="Number">Tank volume in cubic feet (typically 80ft^3 or 100ft^3).</param>
        /// <param name="workingTankPsi" type="Number">The working pressure in psi for the given tank (typically stamped on the tank neck).</param>
        /// <returns>The respiratory minute volume rate (RMV) in cubic feet / minute.</returns>

        var tankConversionFactor = tankVolume / workingTankPsi;
        return sac * tankConversionFactor;
    };

    $self.partialPressure = function (absPressure, volumeFraction) {
        /// <summary>Calculates the partial pressure of a gas component from the volume gas fraction and total pressure.</summary>
        /// <param name="absPressure" type="Number">The total pressure P in bars (typically 1 bar of atmospheric pressure + x bars of water pressure).</param>
        /// <param name="volumeFraction" type="Number">The volume fraction of gas component (typically 0.79 for 79%) measured as percentage in decimal.</param>
        /// <returns>The partial pressure of gas component in bar absolute.</returns>
        
        return absPressure * volumeFraction;
    };

    $self.partialPressureAtDepth = function (depth, volumeFraction, isFreshWater) {
        /// <summary>Calculates the partial pressure of a gas component from the volume gas fraction and total pressure from depth in meters.</summary>
        /// <param name="depth" type="Number">The depth in meters below sea level.</param>
        /// <param name="volumeFraction" type="Number">The volume fraction of gas component (typically 0.79 for 79%) measured as percentage in decimal.</param>
        /// <param name="isFreshWater" type="Boolean">True to calculate against the weight density of fresh water versus salt.</param>
        /// <returns>The partial pressure of gas component in bar absolute.</returns>

        var p = $self.depthInMetersToBars(depth, isFreshWater);
        return p * volumeFraction;
    };

    $self.waterVapourPressure = function (degreesCelcius) {
        /// <summary>The vapour pressure of water may be approximated as a function of temperature.</summary>
        /// <param name="temp" type="Number">The temperature to approximate the pressure of water vapour.</param>
        /// <returns>Water vapour pressure in terms of mmHg.</returns>

        /* Based on the Antoine_equation http://en.wikipedia.org/wiki/Antoine_equation */
        /* http://en.wikipedia.org/wiki/Vapour_pressure_of_water */
        var rangeConstants;
        if (degreesCelcius >= 1 && degreesCelcius <= 100)
            rangeConstants = $self.constants.vapourPressure.water.tempRange_1_100;
        else if (degreesCelcius >= 99 && degreesCelcius <= 374)
            rangeConstants = $self.constants.vapourPressure.water.tempRange_99_374;
        else
            return NaN;

        var logp = rangeConstants[0] - (rangeConstants[1] / (rangeConstants[2] + degreesCelcius));
        return Math.pow(10, logp);
    };

    $self.waterVapourPressureInBars = function (degreesCelcius) {
        /// <summary>The vapour pressure of water may be approximated as a function of temperature.</summary>
        /// <param name="temp" type="Number">The temperature to approximate the pressure of water vapour.</param>
        /// <returns>Water vapour pressure in terms of bars.</returns>
        
        var mmHg = $self.waterVapourPressure(degreesCelcius);
        var pascals = $self.mmHgToPascal(mmHg);
        return $self.pascalToBar(pascals);
    };

    $self.maxOperatingDepth = function (ppO2, fO2, isFreshWater) {
        /// <summary>Returns the maximum operating depth in meters from the desired partial pressure of oxygen limit and 
        /// the volume fraction percent of oxygen in the gas mixture.</summary>
        /// <param name="ppO2" type="Number">The desired partial pressure of oxygen in bars.</param>
        /// <param name="fO2" type="Number">The volume fraction percent of oxygen in a given gas mixture.</param>
        /// <param name="isFreshWater" type="Boolean">True to calculate for fresh water, default false to calculate salt water.</param>
        /// <returns>The maximum recommended operating depth for the given desired PPO2 and FO2.</returns>

        var meters = $self.barToDepthInMeters(1, isFreshWater);
        return (meters * ((ppO2 / fO2) - $self.constants.altitudePressure.current()));
    };

    $self.equivNarcoticDepth = function (fO2, fN2, fHe, depth, isFreshWater) {
        /// <summary>Calculates the equivalent narcotic depth to estimate the narcotic effect of a gas mixture.</summary>
        /// <param name="fO2" type="Number">The volume fraction percent of oxygen in a given gas mixture.</param>
        /// <param name="fN2" type="Number">The volume fraction percent of nitrogen in a given gas mixture.</param>
        /// <param name="fHe" type="Number">The volume fraction percent of helium in a given gas mixture.</param>
        /// <param name="depth" type="Number">The operating depth with the given gas mixture to calculate the END.</param>
        /// <param name="isFreshWater" type="Boolean">True to calculate for fresh water, default false to calculate salt water.</param>
        /// <returns>The END for the given gas mixture and operating depth with the assumption that all 3 gases are narcotic.</returns>

        /* Based on http://www.techdiver.ws/trimix_narcosis.shtml */
        // http://en.wikipedia.org/wiki/Equivalent_narcotic_depth
        // Original wikipedia article only uses Method 1 based on the idea 
        // that only nitrogen is narcotic whereas this equation simply 
        // calculates the equivalent depth based on partial pressures and 
        // narcotic factors in relation to the gas mixture of air
        
        var ppO2 = $self.partialPressureAtDepth(depth, fO2, isFreshWater);
        var ppN2 = $self.partialPressureAtDepth(depth, fN2, isFreshWater);
        var ppHe = $self.partialPressureAtDepth(depth, fHe, isFreshWater);

        // Helium has a narc factor of 0.23 while N2 and O2 have a narc factor of 1
        var narcIndex = (ppO2) + (ppN2) + (ppHe * 0.23);

        // Argon is present in the air at 0.0934% and has a narc factor of 2.33
        var ppO2Air = $self.partialPressure(1, 0.2095);
        var ppN2Air = $self.partialPressure(1, 0.7808);
        var ppArAir = $self.partialPressure(1, 0.00934);
        var narcIndexAir = (ppO2Air * 1) + (ppN2Air  * 1) + (ppArAir * 2.33);

        var relation = narcIndex / narcIndexAir;
        return ((relation - $self.constants.altitudePressure.current()) * $self.barToDepthInMeters(1, isFreshWater));
    };

    $self.instantaneousEquation = function (pBegin, pGas, time, halfTime) {
        /// <summary>Calculates the compartment inert gas pressure.</summary>
        /// <param name="pBegin" type="Number">Initial compartment inert gas pressure.</param>
        /// <param name="pGas" type="Number">Partial pressure of inspired inert gas.</param>
        /// <param name="time" type="Number">Time of exposure or interval.</param>
        /// <param name="halfTime" type="Number">Half time of the given gas exposure.</param>
        /// <returns>Approximate pressure of a given gas over the exposure rate and half time.</returns>

        return (pBegin + (pGas - pBegin) * (1 - Math.pow(2, (-time/halfTime))));
    };

    $self.depthChangeInBarsPerMinute = function (beginDepth, endDepth, time, isFreshWater) {
        /// <summary>Calculates the depth change speed in bars per minute.</summary>
        /// <param name="beginDepth" type="Number">The begin depth in meters.</param>
        /// <param name="endDepth" type="Number">The end depth in meters.</param>
        /// <param name="time" type="Number">The time that lapsed during the depth change in minutes.</param>
        /// <param name="isFreshWater" type="Boolean">True to calculate changes in depth while in fresh water, false for salt water.</param>
        /// <returns>The depth change in bars per minute.</returns>
        
        var speed = (endDepth - beginDepth) / time;
        return $self.depthInMetersToBars(speed, isFreshWater) - $self.constants.altitudePressure.current();
    };

    $self.gasRateInBarsPerMinute = function (beginDepth, endDepth, time, fGas, isFreshWater) {
        /// <summary>Calculates the gas loading rate for the given depth change in terms of bars inert gas.</summary>
        /// <param name="beginDepth" type="Number">The starting depth in meters.</param>
        /// <param name="endDepth" type="Number">The end depth in meters.</param>
        /// <param name="time" type="Number">The time in minutes that lapsed between the begin and end depths.</param>
        /// <param name="fGas" type="Number">The fraction of gas to calculate for.</param>
        /// <param name="isFreshWater" type="Boolean">True to calculate changes in depth while in fresh water, false for salt water.</param>
        /// <returns>The gas loading rate in bars times the fraction of inert gas.</param>
        
        return Math.abs($self.depthChangeInBarsPerMinute(beginDepth, endDepth, time, isFreshWater)) * fGas;
    };

    $self.gasPressureBreathingInBars = function (depth, fGas, isFreshWater) {
        /// <summary>Calculates the approximate pressure of the fraction of gas for each breath taken.</summary>
        /// <param name="depth" type="Number">The depth in meters.</param>
        /// <param name="fGas" type="Number">The fraction of the gas taken in.</param>
        /// <param name="isFreshWater" type="Boolean">True to calculate changes while in fresh water, false for salt water.</param>
        /// <returns>The gas pressure in bars taken in with each breath (accounting for water vapour pressure in the lungs).</returns>

        var bars = $self.depthInMetersToBars(depth, isFreshWater);
        bars = bars - $self.constants.altitudePressure.current() - $self.constants.vapourPressure.lungsBreathing.current();
        return bars * fGas;
    };
