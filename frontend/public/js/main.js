(function() {
  require.config({
    paths: {
      jquery: '../components/jquery/jquery',
      backstretch: '../components/backstretch/backstretch',
      angular: '../components/ng/angular'
    },
    shim: {
      backstretch: ['jquery']
    }
  });

  require(['jquery', 'backstretch', 'angular'], function($) {
    var _this = this;
    $.backstretch('../img/blur-backgrounds/blur-background05.jpg');
    console.log('jquery loaded');
    this.consumerUpdateController = function($scope, $http) {
      return $http.get('http://172.28.101.19:9393/getAllConsumerUpdate').success(function(data) {
        return console.log(data[0].attributes);
      });
    };
    return this.domusController = function($scope, $http) {
      return $scope.getDomusCode = function() {
        return $http.get('http://172.28.101.19:9393/getDomusCode').success(function(data) {
          return $scope.count = data;
        });
      };
    };
  });

}).call(this);
