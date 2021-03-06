export function Enum(name, ...items) {
    Object.defineProperties(this, {
        name: {
            value: name
        }
    });

    items.forEach(item => {
        Object.defineProperty(this, item.toString(), {
            enumerable: true,
            value: Object.create(this, {
                [item.toString()]: {
                    enumerable: true,
                    value: item
                },
                valueOf: {
                    value: function () {
                        return item;
                    }
                }
            })
        });
    });
}

Enum.prototype.has = function (candidate) {
    if (! this.isPrototypeOf(candidate)) {
        return false;
    }

    let properties = Object.entries(candidate);

    if (properties.length !== 1) {
        return false;
    }

    const [property] = properties[0];

    return this[property] === candidate;
};

Enum.prototype.notSet = function () {
    return Object.create(this, {
        valueOf: {
            value: function () {
                return null;
            }
        }
    });
};

Enum.prototype.hasNoValue = function () {
    return this.valueOf() == null;
};

export function withEnum(targetObject) {
    Object.entries(targetObject).forEach(([property, value]) => {
        if (! (value instanceof Enum)) {
            return;
        }

        delete targetObject[property];

        Object.defineProperty(targetObject, property, {
            get() {
                return value;
            },
            set(newValue) {
                if (! newValue) {
                    throw new Error(`Unsupported enum value ${newValue}`);
                }
                
                const source = Object.getPrototypeOf(value);

                if (Object.getPrototypeOf(newValue) === source) {
                    value = newValue;
                    return;
                }

                if (! source.has(newValue)) {
                    throw new Error(`Unsupported enum value ${newValue}`);
                }

                value = source[newValue];
            }
        });
    });

    return targetObject;
}

export default Enum;