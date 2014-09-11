'use strict';

angular.module('QSTest', ['ngRoute', 'QSTest.services'])

  .config(['$routeProvider', function($routeProvider) {
          $routeProvider
            .when('/list', {templateUrl: 'views/list.html', controller: ListCtrl})
            .when('/user/:id', {templateUrl: 'views/user.html', controller: UserCtrl})
	    .when('/new', {templateUrl: 'views/new.html'})
            .otherwise({redirectTo: '/list'});
    }
]);

