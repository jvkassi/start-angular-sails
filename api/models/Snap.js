/**
 * Snap.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {
        // Sender Name
        sn: {
            type: 'string',
        },
        // Timer 
        t: {
            type: 'integer',
        },
        // Timestamp uploaded
        ts: {
            type: 'string',
        },
        // Media Type 1 video 0 photo
        m: {
            type: 'integer',
        },
        // State of the media : http://gibsonsec.org/snapchat/fulldisclosure/#index-of-constants
        st: {
            type: 'integer'
        },
        // Relative storage Path
        rPath: {
            type: 'string'
        },
        // Full Storage Path
        fPath: {
            type: 'string',
        },
        snid: {
            type: 'string',
        },
        account: {
            model: 'Account'
        },
    }
};
