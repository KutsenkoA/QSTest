'use strict';

angular.module('QSTest', ['ngRoute', 'QSTest.services'])

  .config(['$routeProvider', function($routeProvider) {
          $routeProvider
            .when('/list', {templateUrl: 'views/list.html', controller: ListUsersController})
            .when('/user/:id', {templateUrl: 'views/user.html', controller: EditUserController})
	    .when('/new', {templateUrl: 'views/new.html', controller: NewUserController})
            .otherwise({redirectTo: '/list'});
    }
]);

