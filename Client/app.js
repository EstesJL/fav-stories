var app = angular.module('newsFeed', ['ui.router']);
// var http = require('http');

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

  $stateProvider
  .state('home', {
      url: '/home',
      templateUrl: 'home.html',
      controller: 'MainCtrl'
  })
  .state('edit', {
      url: '/editor',
      templateUrl: 'editor.html',
      controller: 'EditorCtrl'
  });

  $urlRouterProvider.otherwise('home');
}]);


app.factory('http', function ($http) {

  var add = function(newPost) {
    return $http({
      method: 'POST',
      url: '/posts',
      data: {post: newPost}
    });
  }

  var get = function() {
    console.log('GETTING');
    return $http({
        method: 'GET',
        url: '/posts'
      })
      .then(function(res) {
        return res;
      });
  }

  return {
    add: add,
    get: get
    // updateVotes: updateVotes
  }
})

app.controller('MainCtrl', [
  '$scope',
  'http',
  function($scope, http) {

    $scope.allPosts = {};

    $scope.getPosts = function() {
      http.get()
      .then(function(posts) {
        $scope.allPosts.posts = posts;
      });
  };

  $scope.getPosts();


}]);

app.controller('EditorCtrl', [
  '$scope',
  'http',
  function($scope, http) {
    // $scope.posts = posts.posts;


    $scope.addPost = function() {
      if ($scope.title === '') {return;}

      var newPost = {
        title: $scope.title,
        link: $scope.link,
        upvotes: 0,
        description: $scope.description,
        image: ''
      };

      // $scope.posts.push(newPost);

      http.add(newPost)
         .then(function(res){
          http.get();
            console.log('HTTP ADD', res);
        });

        $scope.title = '';
        $scope.link = '';
        $scope.description = '';
        $scope.image = '';
    }

  $scope.flag = false;

  $scope.descHandler = function() {
      console.log('BEING HANDLED');
      $scope.flag = true;

  };
  }]);