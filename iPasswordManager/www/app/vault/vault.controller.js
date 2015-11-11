(function() {
  'use strict';

  angular
    .module('ipmApp.vault.controller', [
      'ionic',
      'firebase',
      'ipmApp.cipher.service',
      'ipmApp.core.constants'
    ])
    .controller('VaultController', VaultController);

  function VaultController($scope, $state, $ionicHistory, $firebaseObject,
    $cipherFactory, $injector) {

    var CoreConstants = $injector.get('CoreConstants');
    var fb = new Firebase(CoreConstants.FIREBASE.FIREBASE_URL);
    var fbAuth = fb.getAuth();

    $ionicHistory.nextViewOptions({
      disableAnimate: true,
      disableBack: true
    });
    $ionicHistory.clearHistory();

    var vm = this;

    if (fbAuth) {
      vm.userReference = fb.child('users/' + fbAuth.uid);
      // only way to  make the binding working :
      // http://stackoverflow.com/questions/29426985/angularfire-3-way-binding-without-scope
      vm.syncObject = $firebaseObject(vm.userReference);
      vm.syncObject.$bindTo($scope, 'fireBaseData');
    } else {
      $state.go('authentication');
    }

    vm.unlock = unlock;
    vm.create = create;
    vm.reset = reset;

    function unlock(masterPassword) {
      vm.syncObject.$loaded().then(function() {
        var decipherPhrase = $cipherFactory.decrypt($scope.fireBaseData.masterPassword.cipherText,
          masterPassword, $scope.fireBaseData.masterPassword.salt, $scope.fireBaseData.masterPassword.iv,
          {output: 'hex'});
        if (decipherPhrase === 'Authenticated'.toHex()) {
          $state.go('tab.categories', {masterPassword: masterPassword});
        }
      });
    }

    function create(masterPassword) {
      vm.syncObject.$loaded().then(function() {
        vm.userReference.child('masterPassword').set($cipherFactory.encrypt('Authenticated',
                                                      masterPassword),
                                                      function() {
          // there is an error
          $state.go('locked');
        });
      });
    }

    function reset() {
      vm.userReference.remove(function(error) {
        if (error) {
          console.error('ERROR: ' + error);
        } else {
          $state.go('createvault');
        }
      });
    }
  }
})();
