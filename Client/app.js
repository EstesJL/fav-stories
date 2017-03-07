var app = angular.module('newsFeed', ['ui.router']);
// var http = require('http');

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    $stateProvider
    .state('home', {
        url: '/',
        templateUrl: 'index.html',
        controller: 'MainCtrl'
    })
    // .state('edit', {
    //     url: '/editor/{id}',
    //     templateUrl: 'editor.html',
    //     controller: 'EditorCtrl'
    // });

    $urlRouterProvider.otherwise('home');
}]);

app.factory('posts', [function() {
    var storage = {
        posts: []
    }
    return storage;
}]);

app.factory('http', function ($http) {

    var add = function(newPost) {
        console.log('ADDING', newPost);
         return $http({
              method: 'POST',
              url: '/posts',
              data: {post: newPost}
            });
    }

    return {
        add: add
    }
})

app.controller('MainCtrl', [
    '$scope',
    'posts',
    'http',
    function($scope, posts, http) {
        $scope.posts = posts.posts;

        $scope.addPost = function() {
            if ($scope.title === '') {return;}

            var newPost = {
                title: $scope.title,
                link: $scope.link,
                upvotes: 0,
                description: $scope.description
            };

          $scope.posts.push(newPost);

          http.add(newPost)
               .then(function(res){
                  console.log('HTTP ADD', res);
                  // $scope.getStories();
              });


            $scope.title = '';
            $scope.link = '';
            $scope.description = '';
    }

    $scope.flag = false;

    $scope.descHandler = function() {
        console.log('BEING HANDLED');
        $scope.flag = true;

    };
    }]);