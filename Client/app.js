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

  // var addCom = function(id, newComment) {
  //   return $http({
  //     method: 'POST',
  //     url: '/posts/comments',
  //     data: {comment: newComment}
  //   });
  // }

  // var getCom = function() {
  //   console.log('GETTING COMMENTS');
  //   return $http({
  //       method: 'GET',
  //       url: '/posts/comments'
  //     })
  //     .then(function(res) {
  //       return res;
  //     });
  // }

  return {
    add: add,
    get: get,
    // addCom: addCom,
    // getCom: getCom
  }
})

app.controller('MainCtrl', [
  '$scope',
  'http',
  '$stateParams',
  function($scope, http, $stateParams) {

    $scope.allPosts = {};
  //   $scope.comment = '';

  // $scope.shout = function(e) {
  //   $scope.comment = e.comment;
  //   console.log(e.comment);
  // }

  $scope.getPosts = function() {
    http.get()
    .then(function(posts) {
      $scope.allPosts.posts = posts;
    });
  };

  $scope.getPosts();

//   $scope.addComment = function(id) {
//     if ($scope.comment === '') { return; }


//     var newComment = $scope.comment;
//     console.log('NEW COMMENT', $scope.comment);
//     console.log('POST ID', id);

//     http.addCom(id, newComment)
//     .then(function(res) {
//       console.log('COMMENT ADDED', res);
//     })
//     $scope.comment = '';
//   };
}]);

app.controller('EditorCtrl', [
  '$scope',
  'http',
  function($scope, http) {

    $scope.addPost = function() {
      if ($scope.title === '') {return;}

      var newPost = {
        title: $scope.title,
        link: $scope.link,
        upvotes: 0,
        description: $scope.description,
        image: '',
        // comments: []
      };

      http.add(newPost)
         .then(function(res){
          http.get();
            console.log('HTTP ADD POST', res);
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