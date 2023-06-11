function setSessionItem(label, value) {
    sessionStorage.setItem(label, value);
}

function setJSONSessionItem(label, jsonValue) {
    setSessionItem(label, JSON.stringify(jsonValue));
}

function getSessionItem(label) {
    return sessionStorage.getItem(label);
}

function getJSONSessionItem(label) {
    var val = getSessionItem(label);

    if (isNullOrUndefined(val)) 
        return val;

    if (isJSONString(val)) 
        return tryParseJSONString(val);

    return val;
}

function tryParseJSONString(str) {
    try {
        var obj = JSON.parse(str);
        if (obj && typeof obj === "object") 
            return obj;
    } catch (e) { }
    return false;
}

function isJSONString(str) {
    return tryParseJSONString(str) != false;
}

function isNullOrUndefined(val) {
    return val === null || val === undefined;
}