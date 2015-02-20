/**
 * ComptesController
 *
 * @description :: Server-side logic for managing comptes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    genAuthToken: function(req, res) {

    },
    login: function(req, res) {
        var self = this;
        var id = req.param("id");

        Account.findOne(id).exec(function accounts(err, acc) {

            // Set auth token
            var auth_token = acc.auth_token;
            // If auth_token is null
            // if (auth_token == null) {
            sails.log.info("Fetch auth token for new account " + id);
            ServiceSnapChat.getAuthToken(acc.login, acc.password)
                .catch(sails.log.error)
                .then(function(token) {

                    auth_token = token;
                    sails.log.info("Set auth token for Acount " + id);
                    Account.update(id, {
                        auth_token: token
                    }).exec(function() {
                        sails.log.info("Update auth token for Acount " + id);
                        res.send("login !");
                    })

                })
                // }

            // sails.log.info("Check auth token for Acount " + id);
            // ServiceSnapChat.setAuthToken(acc.login, auth_token)
            // ServiceSnapChat.getUpdates()
            //     .then(function(data) {
            //         sails.log.info("Update auth token for Acount " + id);
            //         res.send("login !");
            //     })
            //     .catch(function(data) {
            //         Account.update(id, {
            //             auth_token: null
            //         }).exec(sails.log.silly)
            //         sails.log.error(data);
            //         auth_token = null;
            //         self.login(req, res);
            //     })

        })
    },
    info: function(req, res) {
        ServiceSnapChat.getUpdates()
            .catch(console.dir)
            .then(function(data) {
                res.json(data);
            });
    },
    story: function(req, res) {
        // ServiceSnapChat.login(username, password)
        ServiceSnapChat.getUpdates()
            .then(ServiceSnapChat.getStories)
            .then(function(data) {
                res.json(data);
            });
    },

    // Add Friend
    addFriend: function(req, res) {
        var friend = req.param("friend")
            // ServiceSnapChat.login(username, password)
        ServiceSnapChat.addFriend(friend)
            .then(function(data) {
                res.json(data);
            });
    },
};
