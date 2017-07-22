'use strict';

/**
 * @ngdoc function
 * @name FamilySleep.controller:SdviewCtrl
 * @description
 * # SdviewCtrl
 * Controller of the FamilySleep
 */
angular.module('FamilySleep')
    .controller('SdviewCtrl', ['$rootScope', '$scope', '$routeParams', 'tractdbFactory', 'dateFactory', 'personaFactory', 'selfReportState',
        function($rootScope, $scope, $routeParams, tractdbFactory, dateFactory, personaFactory, selfReportState) {

        var viewModel = this;
        viewModel.familyInfo = null;
        viewModel.id = $routeParams.id;

        console.log("in SdviewCtrl");

        viewModel.updateFamilyInfo = function () {
            var date = dateFactory.getDateString();
            viewModel.state = selfReportState.getMood($routeParams.id);
            console.log("selfReportState");
            console.log(selfReportState.states);
            console.log("viewModel.state");
            console.log(viewModel.state);
            var persona = personaFactory.personas[$routeParams.id];
            //console.log(persona);

            tractdbFactory.setQuery('singledaily', viewModel.id, date);
            var tractdbData = tractdbFactory.tractdbData;
            if(persona && tractdbData) {
                //console.log("after if");

                // start with the personas data
                viewModel.familyInfo = persona;
                //console.log('viewModel.familyInfo');
                console.log(viewModel.familyInfo);
                //console.log('tractdbData');
                console.log(tractdbData);
                var d = Object.keys(tractdbData)[0];
                var sleep_data = tractdbData[d];
                //console.log(sleep_data);
                var hours = sleep_data.duration / 1000 / 60 / 60;
                // join in persona with tractdb
                viewModel.familyInfo.sleep = [1, 10, 0]; //[extra hours, hours_slept, remainder]
                viewModel.familyInfo.hours = hours;
                viewModel.familyInfo.duration = sleep_data.duration;
                console.log('sleep data duration');
                console.log(viewModel.familyInfo.duration);
            }


        }
        //should it be $scope or viewModel? we should use them consistently
        personaFactory.observe($scope, viewModel.updateFamilyInfo);
        tractdbFactory.observe($scope, viewModel.updateFamilyInfo);
        $rootScope.menu = [
          {
              title: 'Back',
              url: 'familydailyview',
              tag: 'family-daily-view'
          },
          {
              title: 'Individual Daily View',
              url: 'sdview/' + $scope.id,
              tag: 'individual-daily-view'
          },
          {
              title: 'Individual Weekly View',
              url: 'singleweeklyview/' + $scope.id,
              tag: 'individual-weekly-view'
          }
        ];
        $rootScope.active = 'individual-daily-view';
        $rootScope.updateActive = function (item) {
          $rootScope.active = item;
        };

        //does this need to be viewModel?
        $scope.$on('date:updated', function() {
          viewModel.updateFamilyInfo();
        });
    var updateData = function() {
      /*var newDate = dateFactory.getDateString();
      if(dateFactory.getWeekDateString() != []) {
      var promise = dbdata.get_single_daily_sleep($scope.id, newDate);
      //have to wait for dbdate to populate 
      promise.then(function(response) {
        console.log('single daily');
        console.log($scope.id);
        console.log(sleepDataFactory);
        $scope.options = {
          scales: {
            xAxes: [{
              stacked: true,
              categoryPercentage: 1,
              barPercentage: 1,
              barThickness : 1,
              type: 'time',
              gridLines: {
                display: false, // Set to false here => xAxis labels displayed out of canvas
                offsetGridLines: true,
              },
              ticks: {
                display: true,
                fontColor: "white",
                fontSize: 10,
                fontFamily: 'HelveticaNeue, HelveticaNeue, Roboto, ArialRounded',
                autoSkip: true,
                maxTicksLimit: 20
              },
              time: {
                displayFormats: {
                  minute: 'HH:mm a'
                },
                tooltipFormat: 'HH:mm a',
                unit: "minute",
                unitStepSize: 1,
              },
              showXLabel: 60
            }],
            yAxes: [{
              // stacked: true, //scaleLabel: "<%=value%>",
              // ticks: {
              //   fontSize: 12,
              //   fontFamily: 'HelveticaNeue, HelveticaNeue, Roboto, ArialRounded'
              // },
              // gridLines: {
              //   display: false, // Set to false here => xAxis labels displayed out of canvas
              // },
              display: false
            }]
          },
          legend: {
            display: true,
            labels: {
              fontColor: "white"
            }
          }
        };

        $scope.data = [
            sleepDataFactory.sleep_data[$scope.id][newDate].minuteData.one, 
            sleepDataFactory.sleep_data[$scope.id][newDate].minuteData.two,
            sleepDataFactory.sleep_data[$scope.id][newDate].minuteData.three
        ];

        $scope.labels = sleepDataFactory.sleep_data[$scope.id][newDate].labels;

        $scope.colors = [{
            backgroundColor: "#44d2d1",
            borderColor: "#44d2d1",
            pointBackgroundColor: "#44d2d1",
            pointBorderColor: "#44d2d1"
          }, 
          {
            backgroundColor: "#551A8B",
            borderColor: "#551A8B",
            pointBackgroundColor: "#551A8B",
            pointBorderColor: "#551A8B"
          },
          {
            backgroundColor: "#FC3F73",
            borderColor: "#FC3F73",
            pointBackgroundColor: "#FC3F73",
            pointBorderColor: "#FC3F73"
          }
        ];

        $scope.series = ["Sleep", "Movement", "Restless"];

      });
    }else {
        alert('date factory get week didnt populate');
      }
    */}
    //updateData();
  }]);
