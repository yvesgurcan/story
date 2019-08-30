const { DEBUG } = process.env;

module.exports = {
    log: function() {
        console.log(...arguments);
    },
    debug: function() {
        DEBUG && arguments[0] !== '__QUIET__' && console.log(...arguments);
    }
};
