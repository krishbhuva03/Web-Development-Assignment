/**
 * Converts a dictionary with date keys (YYYY-MM-DD) to day-of-week keys with aggregated values.
 * 
 * For missing days, interpolates values using linear interpolation.
 * 
 * @param {Object} D - Object with date strings as keys and integers as values
 * @returns {Object} Object with day names as keys and aggregated/interpolated values
 */
function solution(D) {
    if (!D || Object.keys(D).length === 0) {
        return {};
    }

    // Day mapping: Monday=1, Sunday=0 in JavaScript Date.getDay()
    // We'll use Monday=0, Sunday=6 for consistency
    const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    
    // Convert JavaScript day (Sunday=0) to our format (Monday=0)
    const convertDayIndex = (jsDay) => {
        return jsDay === 0 ? 6 : jsDay - 1; // Sunday becomes 6, Mon-Sat become 0-5
    };

    // Aggregate values by day of week
    const daySums = {};
    
    for (const [dateStr, value] of Object.entries(D)) {
        try {
            // Validate date format and create Date object
            if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
                continue; // Skip invalid format
            }
            
            const dateObj = new Date(dateStr);
            
            // Check if date is valid
            if (isNaN(dateObj.getTime())) {
                continue; // Skip invalid dates
            }
            
            // Verify the date string matches what we parsed (handles invalid dates like 2020-13-01)
            const year = dateObj.getFullYear();
            const month = String(dateObj.getMonth() + 1).padStart(2, '0');
            const day = String(dateObj.getDate()).padStart(2, '0');
            const reconstructed = `${year}-${month}-${day}`;
            
            if (reconstructed !== dateStr) {
                continue; // Skip dates that don't match (invalid dates)
            }
            
            const dayIdx = convertDayIndex(dateObj.getDay());
            const dayName = dayNames[dayIdx];
            
            if (!daySums[dayName]) {
                daySums[dayName] = 0;
            }
            daySums[dayName] += value;
        } catch (error) {
            continue; // Skip invalid dates
        }
    }

    // If all days are present, return as is
    if (Object.keys(daySums).length === 7) {
        const result = {};
        for (const day of dayNames) {
            result[day] = daySums[day];
        }
        return result;
    }

    // Handle missing days by linear interpolation
    // Convert to array format for easier processing
    const dayValues = new Array(7).fill(null);
    
    for (const [day, value] of Object.entries(daySums)) {
        const idx = dayNames.indexOf(day);
        dayValues[idx] = value;
    }

    if (dayValues[0] === null || dayValues[6] === null) { // Mon or Sun missing
        throw new Error("Input must contain at least Monday and Sunday");
    }

    for (let i = 0; i < 7; i++) {
        if (dayValues[i] === null) {
            // Find the previous non-null value
            let prevIdx = i - 1;
            while (prevIdx >= 0 && dayValues[prevIdx] === null) {
                prevIdx--;
            }
            
            // Find the next non-null value
            let nextIdx = i + 1;
            while (nextIdx < 7 && dayValues[nextIdx] === null) {
                nextIdx++;
            }
            
            // If both boundaries found, interpolate
            if (prevIdx >= 0 && nextIdx < 7) {
                const steps = nextIdx - prevIdx;
                const stepValue = (dayValues[nextIdx] - dayValues[prevIdx]) / steps;
                dayValues[i] = dayValues[prevIdx] + stepValue * (i - prevIdx);
            }
        }
    }

    // Build result object
    const result = {};
    for (let i = 0; i < dayNames.length; i++) {
        if (dayValues[i] !== null) {
            result[dayNames[i]] = Math.round(dayValues[i]); // Round to nearest integer
        }
    }

    return result;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { solution };
}

if (typeof window !== 'undefined') {
    window.solution = solution;
}