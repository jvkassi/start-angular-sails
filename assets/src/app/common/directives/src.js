// (function() {
//     'use strict';
//     /**
//      * @ngdoc service
//      * @name layout.service:Generic
//      * @function
//      *
//      * @description
//      *
//      * @ngInject
//      *
//      */

//     function src() {
//         return {
//             restrict: 'A',
//             link: function(scope, element, attrs) {
//                 var current = element;
//                 scope.$watch(function() {
//                     return attrs.embedSrc;
//                 }, function() {
//                     var clone = element
//                         .clone()
//                         .attr('src', attrs.embedSrc);
//                     current.replaceWith(clone);
//                     current = clone;
//                 });
//             }
//         };
//     }


//     angular.module('services').directive('embedSrc', src);
// });
