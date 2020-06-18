import convertMillisecondsToDurationObject from '../src/utils/millisecondsConverter';

describe('millisecondsConverter', () => {
  it('converts milliseconds to duration object', () => {
    const durationObject = convertMillisecondsToDurationObject(43685000);
    expect(durationObject.hours).toEqual('12');
    expect(durationObject.minutes).toEqual('08');
    expect(durationObject.seconds).toEqual('05');
  });
});
