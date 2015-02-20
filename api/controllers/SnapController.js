/**
 * SnapController
 *
 * @description :: Server-side logic for managing snaps
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var sc = require('snapchat'),
    _ = require('lodash'),
    username = "mycalendar",
    password = "Password1#@",
    fs = require('fs'),
    Promise = require('bluebird');


module.exports = {
    // Map and and All friends
    AddAllFriends: function(req, res) {
        // ServiceSnapChat.login(username, password)
        ServiceSnapChat.getUpdates()
            .then(ServiceSnapChat.getNewFriends)
            .map(function(data) {
                ServiceSnapChat.addFriend(data);
            }).finally(function(data) {
                res.json(data);

            });
    },
    pendingFriendsRequests: function(req, res) {
        // ServiceSnapChat.login(username, password)
        ServiceSnapChat.getUpdates()
            .then(ServiceSnapChat.getNewFriends)
            .then(function(data) {
                res.json(data);
            })
    },
    snaps: function(req, res) {
        var id = req.param("user")


        // ServiceSnapChat.login(username, password)
        Account.findOne(1).exec(function accounts(err, acc) {
            // body...

            ServiceSnapChat.setAuthToken(acc.login, acc.auth_token)
            ServiceSnapChat.getUpdates()
                .then(ServiceSnapChat.getSnaps)
                .then(function(snaps) {
                    // sails.log.silly(snaps);
                    res.json(snaps);

                })
        })

    },
    postToStory: function(req, res) {

        var id = req.param("id");

        Snap.findOne(id).exec(function(err, snap) {

            sails.log.verbose("Logged");
            if (err) {
                sails.log.erorr("Snap Not Found in db");
                res.send(404);
            };
            // sails.log.silly(snap.fPath);
            sails.log.info("Downloading " + snap.fPath);
            var location = ServiceStorage.download(snap.fPath);

            ServiceSnapChat.upload(location, snap.m)
                // // })
                .then(function(media_id) {

                    sails.log.silly("Try post " + media_id);

                    // mediaId, isVideo, zipped, caption,
                    return ServiceSnapChat.postStory(media_id, snap.m, 0, "WOW !");
                })
                .then(function(data) {

                    var post = _.assign(post, {
                        snap: snap.id
                    });

                    sails.log.verbose("Create post.... " + snap.id);
                    // sails.log.silly(data);
                    return Post.create(post, function(err, result) {
                        // Snap.
                        sails.log.verbose("Send result data");
                        res.send(res.i18n("Success.Snap.Posted"));
                    })
                });
        });
    },
    downloadSnaps: function() {

    },

    find: function(req, res) {

        var accountId = req.param("user");

        sails.log.info("Finding snaps for account " + accountId);

        // ServiceSnapChat.login(username, password)
        Account.findOne(accountId).exec(function accounts(err, acc) {
            // body...

            ServiceSnapChat.setAuthToken(acc.login, acc.auth_token)
            ServiceSnapChat.getUpdates()
                .catch(console.dir)
                .then(ServiceSnapChat.getSnaps)
                .then(function(snaps) {

                    // Map all snaps
                    return Promise.map(snaps, function(snap) {

                        // Set Account
                        snap.account = 1;

                        sails.log.verbose("Get snap stream : " + snap.id)
                        // Return array stream and snap
                        return [ServiceSnapChat.getSnap(snap.id), snap]

                    }).map(function(values) {

                        var stream = values[0];
                        var snap = values[1];
                        // sails.log.silly(stream);

                        sails.log.verbose("Download snap : " + snap.id)

                        // Set right file format
                        if (snap.m == 0) {
                            var filename = snap.id + ".jpg";
                        } else {
                            if (snap.zipped) {
                                var filename = snap.id + ".mp4.zip";
                            } else {
                                var filename = snap.id + ".mp4";

                            }
                        }
                        filename = username + "/" + filename;

                        return ServiceStorage.upload(stream, filename, "s3").then(function(location) {

                            // snap fpath
                            snap.fPath = location

                            // Set snap ID
                            snap.snid = snap.id

                            // Delete snap id 
                            delete snap.id;
                            return snap;
                        })

                    }).map(function(snap) {

                        // Create snap
                        sails.log.silly("View snap " + snap.snid);
                        // Mark snapd viewed
                        return ServiceSnapChat.viewSnap(snap.snid).then(function() {
                            // Create snap
                            sails.log.silly("Create snap " + snap.snid);
                            sails.log.silly("Snap info :" + snap);
                            return Snap.create(snap);
                        });
                        return "OK"
                    })
                }).then(function() {
                    sails.log("send all snaps")
                        // Send all snaps
                    Snap.find().exec(function(err, data) {
                        console.log(data)
                        res.json(data);
                    })
                })
        })
    }
};
