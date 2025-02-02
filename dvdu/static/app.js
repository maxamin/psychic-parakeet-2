var app = angular.module("app", ["ui.router", "ngResource"]);

app.config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/");
  //
  // Now set up the states
  $stateProvider
    .state('home', {
      url: "/",
      templateUrl: "partials/home.html",
      controller: "HomeController"
    })
    .state('user', {
      url: "/u/:user",
      templateUrl: "partials/user.html",
      controller: "UserController"
    })
});

app.service("User", function($resource) {
  return $resource("/api/users/:user", {}, {
    me: { method: "get", "url": "/api/users/me"}, 
    follow: { method: "get", "url": "/api/users/:username/follow"},
    saveEntry: { method: "post", "url": "/api/entry"}
  })
});

app.controller("HomeController", function($scope, User) {
  $scope.user = User.me();

  $scope.save = function() {
    $scope.user.$saveEntry()
  }
})

app.controller("UserController", function($scope, $stateParams, User, $sce) {
  User.get({user: $stateParams.user}, function(user) {
    user.Entry = $sce.trustAsHtml(user.Entry)
    $scope.user = user

  })
  $scope.me = User.me();

  $scope.follow = function() {
    $scope.me.$follow({username: $stateParams.user})
    User.get({user: $stateParams.user}, function(user) {
    user.Entry = $sce.trustAsHtml(user.Entry)
    $scope.user = user

  })
  }
})



app.controller("HeaderController", function($scope, User) {
  $scope.me = User.me();
})


//<!-- Filters -->
app.filter('fromNow', function() {
  return function(date) {
    if (moment(date).isBefore(moment("2000-01-01T00:00:00Z")))  {
      return "";
    } 
    return moment(date).fromNow();
  };
});

app.filter('duration', function() {
  return function(date) {
    return moment.duration(moment().diff(date)).humanize()
  }
})
