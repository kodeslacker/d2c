require.config
  paths:
    jQuery: 'lib/jQuery/jquery-1.10.2.min'
    angular: 'lib/angular/angular.min'
    app: 'app'

  shim:
    'angular':
      exports : 'angular'
      deps:['jQuery']
    'app':
      deps:['angular']
      exports:'app'
    'jQuery':
      exports : '$'

  priority: ['jQuery','angular','app']
  urlArgs: 'v=1.01'

require ['angular','app'], (angular) ->
  angular.element(document).ready () ->
    angular.bootstrap(document,[applicationName])