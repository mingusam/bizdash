var timestamp = function getTimeStamp() {
    return new Date().toISOString().replace(/T/, '').replace(/-/, '').replace(/:/, '').replace(/\..+/, '')
    // return date.format(now, 'YYYYMMDDHHmmss');
}
module.exports = timestamp