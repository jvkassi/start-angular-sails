(function() {
    'use strict';
    /**
     * @ngdoc service
     * @name layout.service:Generic
     * @function
     *
     * @description
     *
     * @ngInject
     *
     */
    function Generic($http, $sails, Req, Api) {
        // trick
        // Req = $http;


        var self = null;
        // Model 
        this.model = null;
        var GenericBase = function(model, id) {
            self = this;
            if (typeof(id) != "undefined") {

                this.filter = "?user=" + id;
                this.extend = {
                    'user': id
                };

            } else {
                id = "";
                this.filter = "";
            }
            this.model = model; // console.lo
        };

        GenericBase.prototype.setFilter = function setFilter(id) {
            self.filter = "?user=" + id;
            self.extend = {
                'user': id
            };
        };

        GenericBase.prototype.schema = function schema() {
            return Req.get(Api + this.model + '/schema');
        };
        GenericBase.prototype.get = function get(id) {
            return Req.get(Api + this.model + id);
        };
        GenericBase.prototype.count = GenericBase.prototype.total = function total() {
            // Req.get(Api +  this.model + 's/count');
            return Req.get(Api + this.model + '/count');
        };
        GenericBase.prototype.list = function list() {
            // console.log('API : ' + this.model);
            return Req.get(Api + this.model + this.filter); // $sails.get(Api +  this.model );
        };
        GenericBase.prototype.find = function find(options) {
            // console.log(options;
            if (options !== undefined) {
                var limit = options.count !== undefined ? '?limit=' + options.count : 25,
                    skip = options.page !== undefined ? '&skip=' + options.page * options.count : '',
                    sort = options.sort !== undefined ? '&sort=' + options.sort : '',
                    where = options.filter !== undefined ? '&where=' + options.filter : '';
                return Req.get(Api + this.model + limit + sort + skip + where);
            } else {
                // console.log()
                return Req.get(Api + this.model);
            }
        };
        GenericBase.prototype.filter = function filter() {
            return Req.get(Api + this.model);
        }
        GenericBase.prototype.on = function on(event, cb) {
            Req.on(event, cb);
        };
        GenericBase.prototype.onReconnect = function onReconnect(cb) {
            Req.on('reconnect', cb);
        };
        GenericBase.prototype.add = function add(data) {
            return Req.post(Api + this.model, angular.extend(data, this.extend));
        };
        GenericBase.prototype.remove = function remove(id) {
            return Req.delete(Api + this.model + id);
        };
        GenericBase.prototype.get = function info(id) {
            return Req.get(Api + this.model + id);
        };
        GenericBase.prototype.update = function update(data, id) {
            return Req.put(Api + this.model + id, data);
        };
        // Handle server push events
        GenericBase.prototype.onEvent = function(cb) {
            Req.on(this.model, function(res) {
                // console.log(res);
                // listen to model events
                cb[res.verb](res) // switch(res.verb) {
                    //     case 'created' : cb[res.verb]()
                    // }
                    // if (res.verb === 'created') {
                    //     cb.created();
                    // } else if (res.verb === 'destroyed') {
                    //     cb.destroyed();
                    //     // userId = res.id;
                    //     // id = getById($scope.users, userId);
                    //     // $scope.users.pop(id);
                    // } else if (res.verb === 'updated') {
                    //     cb.updated();
                    //     // userId = res.id;
                    //     // id = getById($scope.users, userId);
                    //     // $scope.users[id] = res.data;
                    // }
                ;
            });
        };
        return GenericBase;
    }
    angular.module('services').factory('Generic', Generic);
}());
