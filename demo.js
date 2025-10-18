#!/usr/bin/env node

const { solution } = require('./dateAggregator');

console.log('🎯 Date Aggregation Solution Demo\n');
console.log('=' .repeat(50));

// Example 1: Complete week with aggregation
console.log('\n📊 Example 1: Complete week with aggregation');
console.log('-' .repeat(45));

const example1 = {
    '2020-01-01': 4,   // Wed
    '2020-01-02': 4,   // Thu 
    '2020-01-03': 6,   // Fri
    '2020-01-04': 8,   // Sat
    '2020-01-05': 2,   // Sun
    '2020-01-06': -6,  // Mon
    '2020-01-07': 2,   // Tue
    '2020-01-08': -2   // Wed (additional)
};

console.log('\nInput:');
console.log(JSON.stringify(example1, null, 2));

const result1 = solution(example1);

console.log('\nOutput:');
console.log(JSON.stringify(result1, null, 2));

const expected1 = {
    'Mon': -6, 'Tue': 2, 'Wed': 2, 'Thu': 4, 
    'Fri': 6, 'Sat': 8, 'Sun': 2
};

console.log('\nExpected:');
console.log(JSON.stringify(expected1, null, 2));

console.log('\n✅ Match:', JSON.stringify(result1) === JSON.stringify(expected1) ? 'YES' : 'NO');

// Example 2: Missing days with interpolation
console.log('\n\n🔮 Example 2: Missing days with interpolation');
console.log('-' .repeat(45));

const example2 = {
    '2020-01-01': 6,   // Wed
    '2020-01-04': 12,  // Sat
    '2020-01-05': 14,  // Sun
    '2020-01-06': 2,   // Mon
    '2020-01-07': 4    // Tue
};

console.log('\nInput:');
console.log(JSON.stringify(example2, null, 2));

console.log('\nMissing days: Thursday, Friday');
console.log('These will be interpolated using linear interpolation');

const result2 = solution(example2);

console.log('\nOutput:');
console.log(JSON.stringify(result2, null, 2));

const expected2 = {
    'Mon': 2, 'Tue': 4, 'Wed': 6, 'Thu': 8, 
    'Fri': 10, 'Sat': 12, 'Sun': 14
};

console.log('\nExpected:');
console.log(JSON.stringify(expected2, null, 2));

console.log('\n✅ Match:', JSON.stringify(result2) === JSON.stringify(expected2) ? 'YES' : 'NO');

// Show interpolation calculation
console.log('\n📐 Interpolation Details:');
console.log('  Wed(6) → Thu(?) → Fri(?) → Sat(12)');
console.log('  Thu = 6 + (12-6) × 1/3 = 6 + 2 = 8');
console.log('  Fri = 6 + (12-6) × 2/3 = 6 + 4 = 10');

console.log('\n' + '=' .repeat(50));
console.log('🎉 Demo completed successfully!');
console.log('\nRun "npm test" to see comprehensive unit tests.');
console.log('📚 See README.md for detailed documentation.');