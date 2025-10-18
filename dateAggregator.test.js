const { solution } = require('./dateAggregator');

describe('Date Aggregation Solution', () => {
    
    describe('Example Test Cases', () => {
        test('Example 1: Complete week with aggregation', () => {
            const input = {
                '2020-01-01': 4,   // Wed
                '2020-01-02': 4,   // Thu 
                '2020-01-03': 6,   // Fri
                '2020-01-04': 8,   // Sat
                '2020-01-05': 2,   // Sun
                '2020-01-06': -6,  // Mon
                '2020-01-07': 2,   // Tue
                '2020-01-08': -2   // Wed (additional)
            };
            const expected = {
                'Mon': -6, 'Tue': 2, 'Wed': 2, 'Thu': 4, 
                'Fri': 6, 'Sat': 8, 'Sun': 2
            };
            const result = solution(input);
            expect(result).toEqual(expected);
        });

        test('Example 2: Missing days with interpolation', () => {
            const input = {
                '2020-01-01': 6,   // Wed
                '2020-01-04': 12,  // Sat
                '2020-01-05': 14,  // Sun
                '2020-01-06': 2,   // Mon
                '2020-01-07': 4    // Tue
            };
            const expected = {
                'Mon': 2, 'Tue': 4, 'Wed': 6, 'Thu': 8, 
                'Fri': 10, 'Sat': 12, 'Sun': 14
            };
            const result = solution(input);
            expect(result).toEqual(expected);
        });
    });

    describe('Basic Functionality', () => {
        test('Empty input returns empty object', () => {
            expect(solution({})).toEqual({});
            expect(solution(null)).toEqual({});
            expect(solution(undefined)).toEqual({});
        });

        test('Single missing day interpolation', () => {
            const input = {
                '2020-01-06': 10,  // Mon
                '2020-01-07': 20,  // Tue
                // Wed missing
                '2020-01-09': 40,  // Thu
                '2020-01-10': 50,  // Fri
                '2020-01-11': 60,  // Sat
                '2020-01-12': 70   // Sun
            };
            const expected = {
                'Mon': 10, 'Tue': 20, 'Wed': 30, 'Thu': 40,
                'Fri': 50, 'Sat': 60, 'Sun': 70
            };
            const result = solution(input);
            expect(result).toEqual(expected);
        });

        test('Multiple dates on same day aggregation', () => {
            const input = {
                '2020-01-06': 5,   // Mon
                '2020-01-13': 10,  // Mon (another Monday)
                '2020-01-07': 15,  // Tue
                '2020-01-08': 20,  // Wed
                '2020-01-09': 25,  // Thu
                '2020-01-10': 30,  // Fri
                '2020-01-11': 35,  // Sat
                '2020-01-12': 40   // Sun
            };
            const expected = {
                'Mon': 15,  // 5 + 10
                'Tue': 15, 'Wed': 20, 'Thu': 25,
                'Fri': 30, 'Sat': 35, 'Sun': 40
            };
            const result = solution(input);
            expect(result).toEqual(expected);
        });
    });

    describe('Edge Cases', () => {
        test('Negative values handling', () => {
            const input = {
                '2020-01-06': -10,  // Mon
                '2020-01-07': -5,   // Tue
                '2020-01-08': 0,    // Wed
                '2020-01-09': 5,    // Thu
                '2020-01-10': 10,   // Fri
                '2020-01-11': 15,   // Sat
                '2020-01-12': 20    // Sun
            };
            const expected = {
                'Mon': -10, 'Tue': -5, 'Wed': 0, 'Thu': 5,
                'Fri': 10, 'Sat': 15, 'Sun': 20
            };
            const result = solution(input);
            expect(result).toEqual(expected);
        });

        test('Large values within range', () => {
            const input = {
                '2020-01-06': 999999,   // Mon
                '2020-01-07': -999999,  // Tue
                '2020-01-08': 0,        // Wed
                '2020-01-09': 500000,   // Thu
                '2020-01-10': -500000,  // Fri
                '2020-01-11': 1000000,  // Sat
                '2020-01-12': -1000000  // Sun
            };
            const expected = {
                'Mon': 999999, 'Tue': -999999, 'Wed': 0, 'Thu': 500000,
                'Fri': -500000, 'Sat': 1000000, 'Sun': -1000000
            };
            const result = solution(input);
            expect(result).toEqual(expected);
        });

        test('Boundary dates (1970)', () => {
            const input = {
                '1970-01-05': 10,  // Mon
                '1970-01-06': 20,  // Tue
                '1970-01-07': 30,  // Wed
                '1970-01-08': 40,  // Thu
                '1970-01-09': 50,  // Fri
                '1970-01-10': 60,  // Sat
                '1970-01-11': 70   // Sun
            };
            const expected = {
                'Mon': 10, 'Tue': 20, 'Wed': 30, 'Thu': 40,
                'Fri': 50, 'Sat': 60, 'Sun': 70
            };
            const result = solution(input);
            expect(result).toEqual(expected);
        });

        test('Future dates (2099)', () => {
            const input = {
                '2099-12-27': 1,   // Sun
                '2099-12-28': 2,   // Mon
                '2099-12-29': 3,   // Tue
                '2099-12-30': 4,   // Wed
                '2099-12-31': 5,   // Thu
                '2100-01-01': 6,   // Fri
                '2100-01-02': 7    // Sat
            };
            const expected = {
                'Mon': 2, 'Tue': 3, 'Wed': 4, 'Thu': 5,
                'Fri': 6, 'Sat': 7, 'Sun': 1
            };
            const result = solution(input);
            expect(result).toEqual(expected);
        });
    });

    describe('Error Handling', () => {
        test('Missing Monday throws error', () => {
            const input = {
                '2020-01-07': 10,  // Tue
                '2020-01-08': 20,  // Wed
                '2020-01-09': 30,  // Thu
                '2020-01-10': 40,  // Fri
                '2020-01-11': 50,  // Sat
                '2020-01-12': 60   // Sun
            };
            expect(() => solution(input)).toThrow('Input must contain at least Monday and Sunday');
        });

        test('Missing Sunday throws error', () => {
            const input = {
                '2020-01-06': 10,  // Mon
                '2020-01-07': 20,  // Tue
                '2020-01-08': 30,  // Wed
                '2020-01-09': 40,  // Thu
                '2020-01-10': 50,  // Fri
                '2020-01-11': 60   // Sat
            };
            expect(() => solution(input)).toThrow('Input must contain at least Monday and Sunday');
        });

        test('Invalid date formats are ignored', () => {
            const input = {
                '2020-01-06': 10,    // Mon - valid
                '2020-13-01': 999,   // Invalid date - should be ignored
                'invalid': 999,      // Invalid format - should be ignored
                '2020/01/12': 888,   // Wrong format - should be ignored
                '2020-01-12': 70     // Sun - valid
            };
            const result = solution(input);
            
            // Should only process valid dates
            expect(result.Mon).toBe(10);
            expect(result.Sun).toBe(70);
            // Should have interpolated the missing days
            expect(Object.keys(result)).toHaveLength(7);
        });

        test('Invalid dates like February 30th are ignored', () => {
            const input = {
                '2020-01-06': 10,    // Mon - valid
                '2020-02-30': 999,   // Invalid date - should be ignored
                '2020-04-31': 888,   // Invalid date - should be ignored
                '2020-01-12': 70     // Sun - valid
            };
            const result = solution(input);
            
            // Should only process valid dates
            expect(result.Mon).toBe(10);
            expect(result.Sun).toBe(70);
        });
    });

    describe('Complex Interpolation Cases', () => {
        test('Multiple consecutive missing days', () => {
            const input = {
                '2020-01-06': 0,    // Mon
                '2020-01-07': 10,   // Tue
                // Wed, Thu, Fri missing
                '2020-01-11': 40,   // Sat
                '2020-01-12': 50    // Sun
            };
            const result = solution(input);
            
            // Check that all days are present
            expect(Object.keys(result)).toHaveLength(7);
            expect(result.Mon).toBe(0);
            expect(result.Tue).toBe(10);
            expect(result.Sat).toBe(40);
            expect(result.Sun).toBe(50);
            
            // Check interpolated values - linear interpolation from Tue(10) to Sat(40)
            // Steps: Tue=10, Wed=17.5, Thu=25, Fri=32.5, Sat=40
            expect(result.Wed).toBeCloseTo(18, 0);  // Rounded from 17.5
            expect(result.Thu).toBe(25);
            expect(result.Fri).toBeCloseTo(33, 0);  // Rounded from 32.5
        });

        test('Leap year handling', () => {
            const input = {
                '2020-02-29': 100,  // Sat (leap day)
                '2020-03-02': 10,   // Mon
                '2020-03-03': 20,   // Tue
                '2020-03-04': 30,   // Wed
                '2020-03-05': 40,   // Thu
                '2020-03-06': 50,   // Fri
                '2020-03-08': 80    // Sun
            };
            const result = solution(input);
            
            expect(result.Mon).toBe(10);
            expect(result.Sat).toBe(100);
            expect(result.Sun).toBe(80);
        });

        test('Decimal interpolation values are rounded', () => {
            const input = {
                '2020-01-06': 1,    // Mon
                '2020-01-07': 2,    // Tue
                // Wed missing (should be 3)
                '2020-01-09': 4,    // Thu
                '2020-01-10': 6,    // Fri
                '2020-01-11': 8,    // Sat
                '2020-01-12': 10    // Sun
            };
            const result = solution(input);
            
            expect(result.Wed).toBe(3); // Should be exactly 3 (no rounding needed)
            expect(Number.isInteger(result.Wed)).toBe(true);
        });
    });

    describe('Performance and Stress Tests', () => {
        test('Large dataset with many duplicate days', () => {
            const input = {};
            let expectedMon = 0;
            
            // Add specific Monday dates (Jan 6, 13, 20, 27, 2020 are Mondays)
            const mondayDates = ['2020-01-06', '2020-01-13', '2020-01-20', '2020-01-27', '2020-02-03'];
            mondayDates.forEach((date, i) => {
                const value = i + 1;
                input[date] = value;
                expectedMon += value;
            });
            
            // Add one date for each other day
            input['2020-01-07'] = 1;  // Tue
            input['2020-01-08'] = 1;  // Wed
            input['2020-01-09'] = 1;  // Thu
            input['2020-01-10'] = 1;  // Fri
            input['2020-01-11'] = 1;  // Sat
            input['2020-01-12'] = 1;  // Sun
            
            const result = solution(input);
            expect(result.Mon).toBe(expectedMon); // Sum of 1+2+3+4+5 = 15
            expect(result.Tue).toBe(1);
            expect(result.Wed).toBe(1);
            expect(result.Thu).toBe(1);
            expect(result.Fri).toBe(1);
            expect(result.Sat).toBe(1);
            expect(result.Sun).toBe(1);
        });
    });
});