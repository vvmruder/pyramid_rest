/**
 * Copyright (c) 2012 - 2016, GIS-Fachstelle des Amtes für Geoinformation des Kantons Basel-Landschaft
 * All rights reserved.
 *
 * This program is free software and completes the GeoMapFish License for the geoview.bl.ch specific
 * parts of the code. You can redistribute it and/or modify it under the terms of the GNU General
 * Public License as published by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without
 * even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * General Public License for more details.
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial
 * portions of the Software.
 *
 * Created by Karsten Deininger on 07.07.16.
 */

angular.module('bl.ng.rest.grid', ['bl.ng.rest.model', 'bl.ng.rest.data'])

.controller('BlNgRestGridCtrl', ['$scope', '$q', 'BlRestModel', 'BlRestData', function($scope, $q, BlRestModel, BlRestData) {

    $scope.restCols = [];
    $scope.restData = [];

    $q.all({
        model: BlRestModel.query($scope.service),
        read: BlRestData.read($scope.service)
    }).then(
        function(response) {
            $scope.restCols = response.model.data.columns;
            $scope.restData = response.read.data.features;
        },
        function(response) {
            console.log(response.data || 'Query failed.');
        }
    );

}])

.directive('blNgRestGrid', function() {
    return {
        restrict: 'E',
        scope: {
            tableClass: '@',
            headerClass: '@',
            bodyClass: '@',
            service: '@'
        },
        templateUrl: '../static/html/bl/ng/grid.html',
        controller: 'BlNgRestGridCtrl'
    };
});