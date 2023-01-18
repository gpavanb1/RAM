export function youtube_parser(url) {
    // https://stackoverflow.com/a/8260383/3126141
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : false;
}

export function parseState(s) {
    if (s === "STOPPED") {
        return "🛑 (STOPPED)"
    }
    else if (s === "A") {
        return "👀 (WATCH)"
    }
    else if (s === "B") {
        return "🗣️ (SPEAK)"
    }
}