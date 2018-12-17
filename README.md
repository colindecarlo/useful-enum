# Useful Enum

Not just a silly object that holds onto silly values.

## Usage

```js
import { Enum, withEnum } from 'useful-enum';

const daysOfTheWeek = new Enum('DAYS_OF_THE_WEEK',
    'Sunday', 'Monday', 'Tuesday', 'Wednesday',
    'Thursday', 'Friday', 'Saturday'
);

const dinnersWithMom = withEnum({
    name: 'Dinner with Mom',
    day: daysOfTheWeek.Sunday,
    repeats: true
});

// this is fine
dinnersWithMom.day = daysOfTheWeek.Saturday; 

// this is not fine
// throws an error since dinnersWithMom.day is an enumerated value
dinnersWithMom.day = "Someday soon";
```