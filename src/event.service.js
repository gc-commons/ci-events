(function() {
  'use strict';

  /**active
   * {Factory} eventSrv
   * @fileOverview Event handler
   */
  angular
      .module('ci_event', ['ci_translate'
      ])
      .factory('eventSrv', [
        '$q',
        '$rootScope',
        'translateSrv',
        function($q, $rootScope, translateSrv) {

          var events = [
            {
              eventName: 'OrderStatus::ready',
              active: false,
              ready: false
            },
            {
              eventName: 'cultureSrv::ready',
              active: false,
              ready: false
            },
            {
              eventName: 'OpenPositions::ready',
              active: false,
              ready: false
            },
            {
              eventName: 'Watchlist::ready',
              active: false,
              ready: false
            }
          ];

          var eventsReady = [];

          function addListener(eventName) {
            $rootScope.$on(eventName, function() {
              var event = _.find(events, 'eventName', eventName);
              if (!event.ready) {
                event.ready = true;
                eventsReady.push(eventName);

                if (eventsReady.length == events.length) {
                  $rootScope.$broadcast('eventSrv::ready');
                }
              }
            });
          }

          function init() {

            translateSrv.init();

            $rootScope.$on('translateSrv::ready', function() {
              _.forEach(events, function(value, key) {
                events[key].active = true;
                addListener(events[key].eventName);
              });

            });

          };

          init();

        },
      ]);
})();

