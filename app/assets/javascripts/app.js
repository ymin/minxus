// The controller is a regular JavaScript function. It is called
// once when AngularJS runs into the ng-controller declaration.

function ConfigController($scope, $http){

  // $scope is a special object that makes
  // its properties available to the view as
  // variables. Here we set some default values:

  $scope.showtooltip = false;
  $scope.value = 'Settings';
  $scope.errors = [];
  $scope.msgs = [];
  $scope.sids = [];
  $scope.imageSource = '/tmp/current_screen.png';
  var x2js = new X2JS();
  var datajson = null;
  var jsonPretty = null;

  $scope.hideTooltip = function(){

    // When a model is changed, the view will be automatically
    // updated by by AngularJS. In this case it will hide the tooltip.

    $scope.showtooltip = false;
  }

  $scope.toggleTooltip = function(e){
    e.stopPropagation();
    $scope.showtooltip = !$scope.showtooltip;
  }

  $scope.setPlatform = function(active){
                  if (active=='android') {
                                  $scope.platformName = 'android';
                                  $scope.appPath = '/home/yi/libon-android-client-3.0.1-qap-20140430.095235-20.apk';
                                  $scope.newCommandTimeout = '999999';
                     }
                  else if (active == 'ios') {
                                  $scope.platformName = 'iOS';
                                  $scope.appPath = '/Users/yi/Downloads/libon.app';
                                  $scope.newCommandTimeout = '999999';
                     }
  }

  function hpost(url, params) {
                    $scope.errors.splice(0, $scope.errors.length); // remove all error messages
                    $scope.msgs.splice(0, $scope.msgs.length);
                    $scope.sids.splice(0, $scope.sids.length);
                    $http.post(url, params).success(function(data, status, headers, config) {
                        if (data.msg != '')
                        {
                            $scope.msgs.push(data);
                        }
                        else
                        {
                            $scope.errors.push(data.error);
                        }
                    }).error(function(data, status) { // called asynchronously if an error occurs
// or server returns response with an error status.
                        $scope.errors.push(status);
                    });

  }

  function hget(url, params) {

                    $scope.errors.splice(0, $scope.errors.length); // remove all error messages
                    $scope.msgs.splice(0, $scope.msgs.length);
                    $scope.sids.splice(0, $scope.sids.length);
                    $http.get(url, params).success(function(data, status, headers, config) {
                        if (data.msg != '')
                        {
                          datajson = angular.fromJson(data);
                          jsonPretty = JSON.stringify(datajson,null,6);
                          $scope.ResponseValue=jsonPretty;
                        }
                        else
                        {
                            $scope.errors.push(data.error);
                        }
                    }).error(function(data, status) { // called asynchronously if an error occurs
// or server returns response with an error status.
                        $scope.errors.push(status);
                    });

  }

  $scope.createSession = function() {

                       hpost('http://localhost:4736/wd/hub/session', {'desiredCapabilities': { 'platformName': $scope.platformName, 'app': $scope.appPath, 'newCommandTimeout': $scope.newCommandTimeout}})

//                     $scope.errors.splice(0, $scope.errors.length); // remove all error messages
//                     $scope.msgs.splice(0, $scope.msgs.length);
//                     $scope.sids.splice(0, $scope.sids.length);

//                     $http.post('http://localhost:4736/wd/hub/session', {'desiredCapabilities': { 'platformName': $scope.platformName, 'app': $scope.appPath, 'newCommandTimeout': $scope.newCommandTimeout}}
//                     ).success(function(data, status, headers, config) {
//                         if (data.msg != '')
//                         {
//                             $scope.msgs.push(data);
//                         }
//                         else
//                         {
//                             $scope.errors.push(data.error);
//                         }
//                     }).error(function(data, status) { // called asynchronously if an error occurs
// // or server returns response with an error status.
//                         $scope.errors.push(status);
//                     });
                }

  $scope.getSession = function() {
                       hget('http://localhost:4736/wd/hub/session','')
//                     $scope.errors.splice(0, $scope.errors.length); // remove all error messages
//                     $scope.msgs.splice(0, $scope.msgs.length);
//                     $scope.sids.splice(0, $scope.sids.length);
//                     $http.get('http://localhost:4736/wd/hub/session').success(function(data, status, headers, config) {


//                         if (data.msg != '')
//                         {
//                             $scope.msgs.push("Response:", data);
//                             $scope.sids.push("Session_id:", data.sessionId);
//                         }
//                         else
//                         {
//                             $scope.errors.push(data.error);
//                         }
//                     }).error(function(data, status) { // called asynchronously if an error occurs
// // or server returns response with an error status.
//                         $scope.errors.push(status);
//                     });
                }

  $scope.page = function() {

                    $scope.errors.splice(0, $scope.errors.length); // remove all error messages
                    $scope.msgs.splice(0, $scope.msgs.length);
                    $scope.sids.splice(0, $scope.sids.length);

                      $http.get('http://localhost:4736/wd/hub/session').success(function(data){

                        if ($scope.active=='android') {
                            $http.get('http://localhost:4736/wd/hub/session/'+data.sessionId+'/source').success(function(data, status, headers, config) {
                                if (data.msg != '')
                                 {
                                   datajson = x2js.xml_str2json(data.value);
                                   jsonPretty = JSON.stringify(datajson,null,6);
                                   $scope.ResponseValue=jsonPretty;
                                    // $scope.msgs.push(jsonPretty);
                                }
                                else
                                {
                                    $scope.errors.push(data.error);
                                }
                            }).error(function(data, status) { // called asynchronously if an error occurs
// // or server returns response with an error status.
                        $scope.errors.push(status);
                    });
                          }


                        else if ($scope.platformName = 'iOS') {
                            $http.post('http://localhost:4736/wd/hub/session/'+data.sessionId+'/execute',{"script":"UIATarget.localTarget().frontMostApp().windows()[0].getTree()","args":""}).success(function(data, status, headers, config) {
                                if (data.msg != '')
                                {
                                    datajson = data.value;
                                    jsonPretty = JSON.stringify(datajson,null,6);
                                    $scope.ResponseValue=jsonPretty;
                                    // $scope.msgs.push(angular.fromJson(data.value));
                                }
                                else
                                {
                                    $scope.errors.push(data.error);
                                }
                            }).error(function(data, status) { // called asynchronously if an error occurs
        // or server returns response with an error status.
                                $scope.errors.push(status);
                            });
                          }

                });
            }

  $scope.source = function() {

                    $scope.errors.splice(0, $scope.errors.length); // remove all error messages
                    $scope.msgs.splice(0, $scope.msgs.length);
                    $scope.sids.splice(0, $scope.sids.length);

                      $http.get('http://localhost:4736/wd/hub/session').success(function(data){


                           $http.get('http://localhost:4736/wd/hub/session/'+data.sessionId+'/source').success(function(data, status, headers, config) {

                                if (data.msg != '')
                                {
                                    $scope.msgs.push(data);
                                }
                                else
                                {
                                    $scope.errors.push(data.error);
                                }
                            }).error(function(data, status) { // called asynchronously if an error occurs
        // or server returns response with an error status.
                                $scope.errors.push(status);
                            });

                });
            }
  $scope.screenshot = function() {

                    $scope.errors.splice(0, $scope.errors.length); // remove all error messages
                    $scope.msgs.splice(0, $scope.msgs.length);
                    $scope.sids.splice(0, $scope.sids.length);

                      $http.get('http://localhost:4736/wd/hub/session').success(function(data){
                           $http.get('http://localhost:4736/wd/hub/session/'+data.sessionId+'/screenshot').success(function(data, status, headers, config) {

                                 $scope.imgSrc = "data:image/png;base64,"+data.value;


                                // if (data.msg != '')
                                // {
                                //     $scope.msgs.push(data);
                                // }
                                // else
                                // {
                                //     $scope.errors.push(data.error);
                                // }
                            }).error(function(data, status) { // called asynchronously if an error occurs
        // or server returns response with an error status.
                                $scope.errors.push(status);
                            });
                      });

            }

  $scope.singleClick = function(event) {
                    alert(event.offsetX);
                    alert(event.offsetY);

            }
}