const deleteNestedProperty = (obj, path) => {
    const keys = path.split('.');
    let current = obj;

    for (let i = 0; i < keys.length - 1; i++) {
        if (current[keys[i]] !== undefined) {
            current = current[keys[i]];
        } else {
            return; // Exit if any part of the path is not found.
        }
    }
    delete current[keys[keys.length - 1]];
};

const parseExclusions = (exclude) => {
    const result = [];
    let current = '';
    let insideBrackets = false;

    for (const char of exclude) {
        if (char === '<') {
            insideBrackets = true;
        } else if (char === '>') {
            insideBrackets = false;
        }

        if (char === ',' && !insideBrackets) {
            result.push(current.trim());
            current = '';
        } else {
            current += char;
        }
    }

    if (current) {
        result.push(current.trim());
    }

    return result;
};

module.exports = (obj, exclude) => {
    const fields = parseExclusions(exclude);

    fields.forEach(field => {
        const match = field.match(/^(\w+)<(.+)>$/);

        if (match) {
            const parent = match[1];
            const children = match[2].split(',');

            children.forEach(child => {
                deleteNestedProperty(obj, `${parent}.${child}`);
            });
        } else {
            deleteNestedProperty(obj, field);
        }
    });
};