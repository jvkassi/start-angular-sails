var _ = require('lodash'),
    fs = require('fs'),
    Promise = require('bluebird'),
    type = 'local',
    rq = require('request');

var ServiceStorage = {

    upload: function(stream, filename, type) {

        var self = this;

        if (typeof(type) == "undefined") {
            type = 'local';
        }

        switch (type) {
            case "local":
                return self.uploadLocal(stream, filename);
                break;
            case "s3":
                return self.uploadS3(stream, filename);
                break;
            default:
                return self.uploadS3(stream, filename);
                break;
        }
        // return c.login(username, password)
    },
    downloadAllSnaps: function(snaps) {

    },
    uploadLocal: function(stream, filename) {

        var deferred = Promise.defer();

        // Download snap
        var writeStream = fs.createWriteStream(filename);

        // When receive data
        stream.on('data', function(data) {
            // sails.log.silly("downloading " + snap.id + " ....");
            writeStream.write(data);
        });

        stream.on('end', function() {
            sails.log.silly("end download");
            writeStream.end();

            // Resolve snap
            deferred.resolve("ok");
        });

        // If error
        stream.on('error', function(err) {
            sails.log.error('something is wrong :( ');
            defered.reject(err);
            writeStream.close();
        });


        return deferred.promise;

    },
    uploadS3: function(stream, filename) {

        var deferred = Promise.defer();
        sails.log.verbose("Uploading to s3");

        var upload = require('s3-write-stream')({
            accessKeyId: process.env.AWS_API_KEY,
            secretAccessKey: process.env.AWS_SECRET,
            Bucket: process.env.AWS_S3_TRAFFIC_BACKUP_BUCKET,
        });


        stream
            .pipe(upload(filename))
            .on('end', function(res) {
                sails.log.verbose("Uplading completed : " + filename);
                sails.log.silly(res.Location);
                deferred.resolve(res.Location);
            })
            .on('error', function(err) {
                console.log('upload failed with error ' + filename, err);
                deffered.reject(err);
            });

        return deferred.promise;
    },
    download: function(path) {
        return rq.get(path);
    }

};

module.exports = ServiceStorage;
