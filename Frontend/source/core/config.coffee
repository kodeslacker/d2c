require.config
  paths:
    jQuery: 'lib/jQuery/jquery-1.10.2.min'
    angular: 'lib/angular/angular.min'
    foundation: '../../assets/js/foundation.min'
    modernizr: '../../assets/js/vendor/custom.modernizr'
    app: 'app'
  shim:
    'angular':
      exports : 'angular'
      deps:['jQuery']
    'modernizr':
      exports:'Modernizr'
    'app':
      deps:['angular','foundation']
      exports:'app'
    'jQuery':
      deps: ['modernizr']
      exports : '$'
    'foundation':
      deps: ['jQuery']
  priority: ['jQuery','angular','foundation','app']
  urlArgs: 'v=1.01'

require ['angular','app'], (angular) ->
  angular.element(document).ready () ->
    angular.bootstrap(document,[applicationName])