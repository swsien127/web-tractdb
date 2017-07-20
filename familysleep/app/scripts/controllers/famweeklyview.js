'use strict';

/**
 * @ngdoc function
 * @name FamilySleep.controller:FamweeklyviewCtrl
 * @description
 * # FamweeklyviewCtrl
 * Controller of the FamilySleep
 */
angular.module('FamilySleep')
    .controller('FamweeklyviewCtrl', [
        '$scope', '$rootScope', 'tractdbFactory', 'sleepFamWeeklyDataFactory', 'dateFactory', 'personaFactory', 'selfReportState', 
        function($scope, $rootScope, tractdbFactory, famWeeklySleep, dateFactory, personaFactory, selfReportState) {
            var viewModel = this;
            viewModel.familyInfo = null;
            //viewModel.personas = null;
            
            viewModel.dateWeekStr = dateFactory.getWeekDateString();
            console.log('week dates');
            console.log(viewModel.dateWeekStr);
            viewModel.updateWeekFamilyInfo = function(){
                //selected date and the query returns a week of data from the data
                viewModel.date = dateFactory.getDateString();
                // console.log("dateWeekStr with just calling one date");
                // console.log(viewModel.date);
                var personas = personaFactory.personas;
                // console.log('personas');
                // console.log(personas);
                tractdbFactory.setQuery('familyweekly', null, viewModel.date);
                var tractdbData = tractdbFactory.tractdbData;
                // console.log("queried data");
                // console.log(tractdbData);
                if(personas && tractdbData){
                    viewModel.familyInfo = personas;
                    console.log("familyInfo object");
                    console.log(viewModel.familyInfo);
                    //join persona and tractdbdata
                    angular.forEach(tractdbData, function(value, key){
                        var famID = key;
                        //console.log("famID = " + famID);
                        var dates = Object.keys(value);
                        //console.log(dates);
                        viewModel.familyInfo[famID].days = {};
                        // console.log("familyInfo by ID days");
                        // console.log(viewModel.familyInfo[famID].days);
                        for (var i = dates.length - 1; i >= 0; i--) {
                          var d = dates[i];
                          var sleep_data = tractdbData[famID][d];
                          //console.log(sleep_data);
                          var hours = sleep_data.duration / 1000 / 60 / 60;
                          viewModel.familyInfo[famID].days[d] = {};
                          viewModel.familyInfo[famID].days[d].sleep = [0, hours, 0];
                          viewModel.familyInfo[famID].days[d].hours = hours;
                          //console.log(viewModel.familyInfo[famID][d]);
                        }
                    });
                    // console.log("printing familyInfo with sleep data");
                    // console.log(viewModel.familyInfo);
                }
               viewModel.labels = ['extra hours', 'hours slept', 'hours awake'];
                //define colors here
                viewModel.colors = ['#000066', '#0000FF', '#E0E0E0'];
                // viewModel.options = {
                //     borderColor: ['#000066', '#0000FF', '#E0E0E0'],
                //     cutoutPercentage: 70
                // };
                viewModel.options = {
                    elements: {
                        arc: {
                            //borderColor: ['#000066', '#0000FF', '#E0E0E0'],
                            borderWidth: 0
                            
                        }
                    },
                    cutoutPercentage: 65
                };
            }

            //$scope.famWeekData = famWeeklySleep.sleep_data;

            //should it be $scope or viewModel? we should use them consistently
            personaFactory.observe($scope, viewModel.updateWeekFamilyInfo);
            tractdbFactory.observe($scope, viewModel.updateWeekFamilyInfo);
            //
            // Current approach to showing the menu for choosing views
            //
            $rootScope.menu = [
                {
                    title: 'Family Daily View',
                    url: 'familydailyview',
                    tag: 'family-daily-view',
                },
                {
                    title: 'Family Weekly View',
                    url: 'famweeklyview',
                    tag: 'family-weekly-view',
                }
                ];

                $rootScope.active = 'family-weekly-view';
                $rootScope.updateActive = function (item) {
                  $rootScope.active = item;
                };

                //need to check I need to use viewModel
                $scope.$on('date:updated', function() {
                  viewModel.updateWeekFamilyInfo();
                });

}]);
