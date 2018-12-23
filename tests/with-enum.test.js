import { withEnum, Enum } from '../src/enum';

describe("withEnum", () => {
    const daysOfTheWeek = new Enum(
        'DAYS_OF_THE_WEEK',
        'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
    );

    it('replaces the property with a getter and setter', () => {
        const someObject = withEnum({
            friday: daysOfTheWeek.Friday
        });

        const descriptor = Object.getOwnPropertyDescriptor(someObject, 'friday');
        expect(descriptor).toHaveProperty('get');
        expect(descriptor).toHaveProperty('set');
    })

    it('doesnt replace other properties with a getter and setter', () => {
        const someObject = withEnum({
            friday: "funday"
        });

        const descriptor = Object.getOwnPropertyDescriptor(someObject, 'friday');
        expect(descriptor).not.toHaveProperty('get');
        expect(descriptor).not.toHaveProperty('set');
    });

    it('returns the enumerated property', () => {
        const someObject = withEnum({
            friday: daysOfTheWeek.Friday
        });

        expect(someObject.friday).toBe(daysOfTheWeek.Friday);
    });

    it('can set the enumerated property to another enumerated value', () => {
        const someObject = withEnum({
            startOfTheWeek: daysOfTheWeek.Sunday
        });

        someObject.startOfTheWeek = daysOfTheWeek.Monday;

        expect(someObject.startOfTheWeek).toBe(daysOfTheWeek.Monday);
    });

    it('doesnt allow the enumerated property to be set to a non-enumerated value', () => {
        expect.assertions(1);

        const someObject = withEnum({
            startOfTheWeek: daysOfTheWeek.Sunday
        });

        try {
            someObject.startOfTheWeek = "Sunday";
        } catch (e) {
            expect(e.message).toMatch('Unsupported enum value');
        }
    });

    it('doesnt allow the enumerated property to be set to another enumerated value from a different enumeration', () => {
        expect.assertions(1);

        const anotherEnum = new Enum('IDIOMATIC_VARIABLES', 'foo', 'bar', 'baz');
        const someObject = withEnum({
            startOfTheWeek: daysOfTheWeek.Sunday
        });

        try {
            someObject.startOfTheWeek = anotherEnum.foo;
        } catch (e) {
            expect(e.message).toMatch('Unsupported enum value');
        }
    });

    it('can have an enumerated property that doesnt have a value', () => {
        const someObject = withEnum({
            startOfTheWeek: daysOfTheWeek.notSet()
        });

        expect(someObject.startOfTheWeek.hasNoValue()).toBe(true);
    });

    it('can set the value of an valueless enumerated property to a valid value', () => {
        const someObject = withEnum({
            startOfTheWeek: daysOfTheWeek.notSet()
        });

        expect(someObject.startOfTheWeek.hasNoValue()).toBe(true);

        someObject.startOfTheWeek = daysOfTheWeek.Friday;

        expect(someObject.startOfTheWeek.hasNoValue()).toBe(false);
        expect(someObject.startOfTheWeek).toBe(daysOfTheWeek.Friday);
    })

    it('can unset the value of an enumerated property', () => {
        const someObject = withEnum({
            startOfTheWeek: daysOfTheWeek.Friday
        });

        expect(someObject.startOfTheWeek).toBe(daysOfTheWeek.Friday);
        expect(someObject.startOfTheWeek.hasNoValue()).toBe(false);

        someObject.startOfTheWeek = daysOfTheWeek.notSet();
        expect(someObject.startOfTheWeek.hasNoValue()).toBe(true);
    })
});