var Q = require("q");
var path = require('path');
var models = require(path.resolve("./models/orm"));

function createRoles(){
    return models.Role.bulkCreate([
        {name: 'SUPER_ADMIN', description: 'Super admin users'},
        {name: 'ADMIN', description: 'Admin users'},
        {name: 'GUEST', description: 'Guest users'},
        {name: 'AGENT', description: 'Agent users'},
        {name: 'CUSTOMER', description: 'Customer users'},
        {name: 'SPECIAL_ACCESS', description: 'Special access users'}
    ])
}

function addUser(userJson, roles){
    var deferred = Q.defer();
    models.User.create(userJson).then(function(user) {
        user.addRole(roles).then(function(){
            user.createProfile(userJson.Profile).then(function(profile){
                user.Profile = profile.get({plain: true})
                deferred.resolve(user);
            })
        });
    });
    
    return deferred.promise;
};

function createAdmins(){
    return models.Role.findAll({where: {name: ['SUPER_ADMIN', 'AGENT']}}).then(function(roles){
        var adminRole = roles[0];
        var agentRole = roles[1];
        Q.all(
            addUser({
                    username: 'super_admin',
                    email: 'super_admin@dummy.com',
                    password: 'abc123',
                    Profile: {
                        first_name: 'Super',
                        last_name: 'Admin'
                    }
            }, adminRole)
        );
    });
}

exports.init = function(){
    return Q.all(
        createRoles(),
        createAdmins()
    );
}

exports.rebuildDB = function(){
    return models.sequelize.sync({force: true});
}