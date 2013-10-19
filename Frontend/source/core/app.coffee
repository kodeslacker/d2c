'use strict'
@applicationName='Zenware DNA v1.0'
define ['angular'], (angular) ->
    app=angular.module(applicationName, []).config ($routeProvider, $locationProvider, $controllerProvider)->
      loadView = (view_name) ->
        "../views/#{view_name}.html"
      loadController = (ctrl_name) ->
        resolve = undefined
        resolve = ["$q", "$controller", "$rootScope", "$routeParams", ($q, $controller, $rootScope) ->
          deferred = undefined
          deferred = $q.defer()
          require(["../controllers/" + ctrl_name], (ctrl_module) ->
            $controllerProvider.register(ctrl_name, ctrl_module)
            $rootScope.$apply(->
              deferred.resolve not 0
            )
          )
          deferred.promise
        ]

# Routes are defined bellow
      $routeProvider.when '/',
        templateUrl : loadView('about')
        controller: 'about'
        resolve:
          first:loadController('about')

      $routeProvider.when '/test',
        templateUrl : loadView('about')
        controller : 'about'
        resolve:
          first:loadController('about')

    app.run ($rootScope)=>
      $rootScope.$on '$viewContentLoaded', ()=>
        $(document).foundation()