var sc = require('snapchat'),
    _ = require('lodash'),
    fs = require('fs'),
    Promise = require('bluebird')

var ServiceSnapChat = {
    // get AuthToken from login
    getAuthToken: function(login, password) {
        return this.login(login, password)
            .then(function(data) {
                return data.updates_response.auth_token;
            })
    },
    setAuthToken: function(login, auth_token) {
        this.c = new sc.Client(login, auth_token);
    },
    getAccount: function() {
        // return _.clone(true);
    },
    getNewFriends: function(data) {
        var old_friends = data.friends_response.friends,
            friends = data.friends_response.added_friends;

        friends = _.map(data.friends_response.friends, function(friend) {
            return friend.name;
        });
        old_friends = _.map(data.friends_response.added_friends, function(friend) {
            return friend.name;

        });

        var newFriends = _.difference(old_friends, friends);
        return newFriends;

    },
    addFriend: function(name) {
        sails.log.verbose("Adding as friend " + name);

    },
    getUpdates: function() {
        return this.c.getUpdates()
    },
    getStories: function(data) {
        var stories = [];
        return Promise.reduce(data.stories_response.my_stories, function(total, my_stories) {

            // Reduce all pending snaps received
            _.each(my_stories, function(story) {
                sails.log.silly("Got story : " + story.id);
                stories.push(story);
            });

            return stories;
        }, 0);
    },
    getSnaps: function(data) {
        var snaps = [];
        // sails.log.silly(data);
        return Promise.reduce(data.conversations_response, function(total, conversations_response) {

            // Reduce all pending snaps received
            conversations_response.pending_received_snaps.forEach(function(snap) {
                sails.log.silly("Got snap : " + snap.id);
                snaps.push(snap);
            });

            return snaps;
        }, 0);

    },
    login: function(username, password) {
        this.c = new sc.Client();
        sails.log.verbose("logging....");
        return this.c.login(username, password)
    },
    getSnap: function(snap_id) {
        // sails.log.silly(snap_id);
        return this.c.getBlob(snap_id);
    },
    viewSnap: function(snap_id) {
        return this.c.markSnapViewed(snap_id)
    },
    downloadSnap: function(snap) {

    },
    upload: function(stream, isVideo) {
        // var stream = fs.createReadStream(filename);
        return this.c.upload(stream, isVideo);

    },
    postStory: function(mediaId, isVideo, zipped, caption) {
        return this.c.postStory(mediaId, isVideo, zipped, caption)
    }

}

module.exports = ServiceSnapChat
