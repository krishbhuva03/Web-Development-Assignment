function solution(D) {
    /**
     * Converts a dictionary with date keys (YYYY-MM-DD) to a dictionary with day-of-week keys.
     * 
     * @param {Object} D - Dictionary with date strings as keys and integers as values
     * @returns {Object} Dictionary with day names as keys and aggregated values
     */
    
    // Days of week mapping
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    
    // Map to store sum for each day of week
    const dayData = {};
    days.forEach(day => {
        dayData[day] = { sum: 0, count: 0 };
    });
    
    // Process input dictionary
    for (const [dateStr, value] of Object.entries(D)) {
        const date = new Date(dateStr + 'T00:00:00'); // Add time to avoid timezone issues
        const dayIndex = (date.getDay() + 6) % 7; // Convert Sunday=0 to Monday=0
        const dayName = days[dayIndex];
        
        dayData[dayName].sum += value;
        dayData[dayName].count += 1;
    }
    
    // Create result dictionary with sums for present days
    const result = {};
    days.forEach(day => {
        if (dayData[day].count > 0) {
            result[day] = dayData[day].sum;
        }
    });
    
    // Fill missing days with mean of previous and next day
    for (let i = 0; i < days.length; i++) {
        const day = days[i];
        
        if (!(day in result)) {
            // Find previous day value (circular)
            const prevIdx = (i - 1 + 7) % 7;
            const prevVal = result[days[prevIdx]];
            
            // Find next day value (circular)
            const nextIdx = (i + 1) % 7;
            const nextVal = result[days[nextIdx]];
            
            // Calculate mean (both should exist based on assumptions)
            if (prevVal !== undefined && nextVal !== undefined) {
                result[day] = Math.floor((prevVal + nextVal) / 2);
            }
        }
    }
    
    return result;
}


// Unit tests
function testBasicExample() {
    console.log('Test 1: Basic example');
    const D = {
        '2020-01-01': 4,
        '2020-01-02': 4,
        '2020-01-03': 6,
        '2020-01-04': 8,
        '2020-01-05': 2,
        '2020-01-06': -6,
        '2020-01-07': 2,
        '2020-01-08': -2
    };
    const expected = { Mon: -6, Tue: 2, Wed: 2, Thu: 4, Fri: 6, Sat: 8, Sun: 2 };
    const result = solution(D);
    
    console.assert(JSON.stringify(result) === JSON.stringify(expected), 
        `Expected ${JSON.stringify(expected)}, got ${JSON.stringify(result)}`);
    console.log('✓ Test 1 passed: Basic example');
}


function testMissingDays() {
    console.log('Test 2: Missing days interpolation');
    const D = {
        '2020-01-01': 6,
        '2020-01-04': 12,
        '2020-01-05': 14,
        '2020-01-06': 2,
        '2020-01-07': 4
    };
    const expected = { Mon: 2, Tue: 4, Wed: 6, Thu: 8, Fri: 10, Sat: 12, Sun: 14 };
    const result = solution(D);
    
    console.assert(JSON.stringify(result) === JSON.stringify(expected), 
        `Expected ${JSON.stringify(expected)}, got ${JSON.stringify(result)}`);
    console.log('✓ Test 2 passed: Missing days interpolation');
}


function testMultipleDatesSameDay() {
    console.log('Test 3: Multiple dates same day');
    const D = {
        '2020-01-06': 10,  // Mon
        '2020-01-07': 20,  // Tue
        '2020-01-13': 5,   // Mon
        '2020-01-14': 15   // Tue
    };
    const result = solution(D);
    
    console.assert(result.Mon === 15, `Expected Mon=15, got ${result.Mon}`);
    console.assert(result.Tue === 35, `Expected Tue=35, got ${result.Tue}`);
    console.log('✓ Test 3 passed: Multiple dates same day');
}


function testOnlyMonSun() {
    console.log('Test 4: Only Mon and Sun');
    const D = {
        '2020-01-06': 100,  // Mon
        '2020-01-12': 200   // Sun
    };
    const result = solution(D);
    
    console.assert(result.Mon === 100, `Expected Mon=100, got ${result.Mon}`);
    console.assert(result.Sun === 200, `Expected Sun=200, got ${result.Sun}`);
    console.assert(Object.keys(result).length === 7, 'Expected 7 days in result');
    console.log('✓ Test 4 passed: Only Mon and Sun');
}


function testNegativeValues() {
    console.log('Test 5: Negative values');
    const D = {
        '2020-01-06': -50,  // Mon
        '2020-01-07': -30,  // Tue
        '2020-01-08': 20,   // Wed
        '2020-01-09': 40,   // Thu
        '2020-01-10': 60,   // Fri
        '2020-01-11': 80,   // Sat
        '2020-01-12': 100   // Sun
    };
    const result = solution(D);
    
    console.assert(result.Mon === -50, `Expected Mon=-50, got ${result.Mon}`);
    console.assert(result.Tue === -30, `Expected Tue=-30, got ${result.Tue}`);
    console.log('✓ Test 5 passed: Negative values');
}


function testLargeValues() {
    console.log('Test 6: Large values');
    const D = {
        '2020-01-06': 1000000,  // Mon
        '2020-01-07': -1000000, // Tue
        '2020-01-08': 500000,   // Wed
        '2020-01-09': -500000,  // Thu
        '2020-01-10': 750000,   // Fri
        '2020-01-11': -750000,  // Sat
        '2020-01-12': 250000    // Sun
    };
    const result = solution(D);
    
    console.assert(result.Mon === 1000000, 'Large positive value test');
    console.assert(result.Tue === -1000000, 'Large negative value test');
    console.log('✓ Test 6 passed: Large values');
}


// Run all tests
function runAllTests() {
    console.log('Running all tests...\n');
    testBasicExample();
    testMissingDays();
    testMultipleDatesSameDay();
    testOnlyMonSun();
    testNegativeValues();
    testLargeValues();
    console.log('\n✅ All tests completed!');
}

// Execute tests
runAllTests();