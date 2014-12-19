/*
 * Copyright (C) 2014 Glyptodon LLC
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */


/**
 * A directive that allows editing of a connection parameter.
 */
angular.module('manage').directive('guacConnectionParameter', [function connectionParameter() {
    
    return {
        // Element only
        restrict: 'E',
        replace: true,
        scope: {
            parameter: '=parameter',
            connection: '=connection',
        },
        templateUrl: 'app/manage/templates/connectionParameter.html',
        controller: ['$scope', function connectionParameterController($scope) {
            $scope.connectionParameters    = $scope.connection.parameters;
            $scope.parameterType           = $scope.parameter.type;
            $scope.parameterName           = $scope.parameter.name;
                
            // Coerce numeric strings to numbers
            if ($scope.parameterType === 'NUMERIC') {
                
                // If a value exists, coerce it to a number
                if ($scope.connectionParameters[$scope.parameterName])
                    $scope.parameterValue = Number($scope.connectionParameters[$scope.parameterName]);
                else 
                    $scope.parameterValue = null;
                
            }
            
            // Coerce boolean strings to boolean values
            else if ($scope.parameterType === 'BOOLEAN') {
                // TODO: Use defined checked value from protocol description
                $scope.parameterValue = $scope.connectionParameters[$scope.parameterName] === 'true';
            }
            
            // All other parameter types are represented internally as strings
            else
                $scope.parameterValue = $scope.connectionParameters[$scope.parameterName];
            
            // Update internal representation as model is changed
            $scope.$watch('parameterValue', function parameterValueChanges(value) {
                
                // Convert numeric values back into strings
                if ($scope.parameterType === 'NUMERIC') {
                    if (value === null || typeof value === 'undefined')
                        $scope.connectionParameters[$scope.parameterName] = '';
                    else
                        $scope.connectionParameters[$scope.parameterName] = value.toString();
                }
                
                // TODO: Transform BOOLEAN input fields back into strings based on protocol description
                
                // All other parameter types are already strings
                else
                    $scope.connectionParameters[$scope.parameterName] = value;
                
            });
        }]
    };
    
}]);