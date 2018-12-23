import Enum from '../src/enum';

describe('Enum', () => {

    const daysOfTheWeek = new Enum(
        'DAYS_OF_THE_WEEK',
        'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
    );

    it('is an Enum', () => {
        expect(daysOfTheWeek).toBeInstanceOf(Enum);
    });

    it('has a name', () => {
        expect(daysOfTheWeek.name).toEqual('DAYS_OF_THE_WEEK');
    });

    it('has immutable values', () => {
        expect.assertions(1);
        try {
            daysOfTheWeek.Friday = 'Funday';
        } catch (e) {
            expect(e.message).toMatch('Cannot assign to read only property');
        }
    });

    it('has iterable values', () => {
        let expectedProperties = [
            'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
        ];
        Object.entries(daysOfTheWeek).forEach(([property, value]) => {
            expect(expectedProperties.includes(property)).toBe(true);
            expect(Object.getPrototypeOf(value)).toBe(daysOfTheWeek);

            expectedProperties.splice(expectedProperties.findIndex(candidate => candidate == property), 1);
        });
    });

    it('knows which enumerated values is has', () => {
        expect(daysOfTheWeek.has(daysOfTheWeek.Friday)).toBe(true);
    });

    it('knows which values it doesnt have too', () => {
        expect(daysOfTheWeek.has('Friday')).toBe(false);
    });
});
