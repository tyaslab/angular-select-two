var selectTwo = angular.module('selectTwo', []);

selectTwo.directive('selectTwo', function($timeout, $http) {
    return {
        scope: {
            options: '=selectTwo',
            onSelected: '&onSelected'
        },
        link: function(scope, element, attrs) {
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
            element.find('div').select2(scope.options).select2('val', 'helper');

            // bind event: when closed and when an item removed
            element.on('select2-close select2-removed', function(e) {
                if (attrs.onSelected) {
                    var data = element.find('div').select2('data');
                    if (!scope.$$phase) {
                        scope.$apply(function() {
                            scope.onSelected({$value:data});
                        });
                    }
                }
            });
        }
    };
});