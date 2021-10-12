# Parking assignment system

## Requirements

Design a parking service system. The service offers parking in addition to refueling to vehicles that require it, there are two employees who work on commission and get paid different rates. The system is responsible for assigning the workload equally between the two employees in a way that favours profit.

- Small cars pay a flat rate of $25 for parking and large vehicles pay $35.
- Every car with 10% or less fuel, will be refueled to maximum capacity and charged the fuel amount in addition to the parking fee.
- Employee A gets paid 11% commission over the final amount paid, while employee B gets paid 15%.
- Fuel has a fixed rate of $1.75/litre.

See input and output at the end of the file

## Installation

- `git clone https://github.com/3JTek/parking-system.git`
- `yarn`
- `yarn prepare` (install husky for precommit & prepush hook)

## Test

- `yarn test`, runner `mocha`, assertion library `chai`. Tests in `./test` folder

## Run

- `yarn start`

Note: there is config file where the main parameters of the parking system can be changed

## Room for improvements

- Make the application handling dynamic employees input (what happens if suddenly we have 3 or more employees)
- Write tests for validation modules
- Fixing eslint warnings

  Input for your application:

```
[{
    "licencePlate": "A",
    "size": "large",
    "fuel": {
        "capacity": 57,
        "level": 0.07
    }
}, {
    "licencePlate": "B",
    "size": "large",
    "fuel": {
        "capacity": 66,
        "level": 0.59
    }
}, {
    "licencePlate": "C",
    "size": "large",
    "fuel": {
        "capacity": 54,
        "level": 0.49
    }
}, {
    "licencePlate": "D",
    "size": "large",
    "fuel": {
        "capacity": 79,
        "level": 0.93
    }
}, {
    "licencePlate": "E",
    "size": "large",
    "fuel": {
        "capacity": 94,
        "level": 0.2
    }
}, {
    "licencePlate": "F",
    "size": "large",
    "fuel": {
        "capacity": 57,
        "level": 0.1
    }
}, {
    "licencePlate": "G",
    "size": "small",
    "fuel": {
        "capacity": 56,
        "level": 0.05
    }
}, {
    "licencePlate": "H",
    "size": "small",
    "fuel": {
        "capacity": 61,
        "level": 0.78
    }
}, {
    "licencePlate": "I",
    "size": "small",
    "fuel": {
        "capacity": 60,
        "level": 0.65
    }
}, {
    "licencePlate": "J",
    "size": "large",
    "fuel": {
        "capacity": 63,
        "level": 0.01
    }
}]
```

Output: JSON-formatted array of assignments in the following format:

```
{
    "licencePlate": string,
    "employee": string,
    "fuelAdded": float, // Amount of fuel added in litres
    "price": float
}
```
