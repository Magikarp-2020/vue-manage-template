
module.exports = (timestamp, format) => {
    let result;

    timestamp = parseInt(timestamp);

    if (!timestamp) {
        result = '-';
    } else if (format) {
        result = new Date(timestamp).Format(format);
    } else {
        result = new Date(timestamp).Format('yyyy-MM-dd hh:mm:ss');
    }

    return result;
};
