var selectTwo = angular.module('selectTwo', []);

selectTwo.directive('selectTwo', ['$timeout', '$http', function($timeout, $http) {
    return {
        require: '?ngModel',
        scope: {
            options: '=selectTwo'
            // onSelected: '&onSelected'
        },
        link: function(scope, element, attrs, ngModelController) {
            // generate fake div
            var fake_div = '<div';
            if (attrs.width) {
                fake_div += ' style="width: ' + attrs.width + ';"';
            }

            if (attrs.class) {
                fake_div += ' class="' + attrs.class + '"';
            }

            fake_div += "></div>";

            // select2-ize fake div
            element.html(fake_div);
            var select2element = element.find('div').select2(scope.options);
            select2element.select2('val', 'helper');

            // bind event: when closed and when an item removed
            element.on('select2-close select2-removed', function(e) {
                // if (attrs.onSelected) {
                    // var data = element.find('div').select2('data');
                    var value = element.find('div').select2('val');
                    if (!scope.$$phase) {
                        scope.$apply(function() {
                            if (ngModelController) {
                                // ngModelController.$setViewValue(scope.onSelected({$value:data}));
                                ngModelController.$setViewValue(value);
                            } else {
                                // scope.onSelected({$value:data});
                            }
                        });
                    }
                // }
            });

            if (ngModelController) {
                ngModelController.$formatters.push(function(modelValue) {
                    select2element.select2('val', modelValue);
                    return modelValue;
                });
            }
        }
    };
}]);