module.exports = function(app){
    // app.use('/api', require('./api'));

    // For testing
    app.use('/test', require('./test'));

    app.use('/', require('./default'));
};