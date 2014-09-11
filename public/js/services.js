'use strict';

angular.module('QSTest.services', ['ngResource'])

    .factory('Users', function($http) {
	return {
	    get: function(params) {
		if (!params)
		    return $http.get('/users');
		else
		    return $http.get('/user/' + params.id);
	    },
	    put: function(params) {
		return $http.post('/user/' + params.id, params);
	    },
	    drop: function(params) {
		return $http.post('/user/' + params.id);
	    }
	}
    });
