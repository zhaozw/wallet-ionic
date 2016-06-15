// Ionic Starter App
angular.module('generic-client', ['ionic',
    'intlpnIonic',
    'ngMessages',
    'generic-client.controllers',
    'generic-client.controllers.accounts',
    'generic-client.controllers.transactions',
    'generic-client.controllers.send',
    'generic-client.controllers.deposit',
    'generic-client.controllers.withdraw',
    'generic-client.controllers.receive',
    'generic-client.controllers.promotions',
    'generic-client.controllers.request',
    'generic-client.controllers.fica',
    'generic-client.controllers.settings',
    'generic-client.controllers.notifications',
    'generic-client.controllers.help',
    'generic-client.services',
    'generic-client.services.accounts',
    'generic-client.services.transactions',
    'generic-client.services.contacts',
    'generic-client.services.settings',
    'generic-client.filters.contacts'])

    //.constant('API', 'https://staging.zapgo.co/api/1')
    .constant('API', 'http://localhost:2468/api/1')
    .constant('COMPANY', 'test_company_1')
    .constant('REFRESH_INTERVAL', 3000)

    .config(function ($httpProvider, $ionicConfigProvider, $compileProvider) {
        'use strict';
        //Switch off caching:
        $ionicConfigProvider.views.maxCache(0);
        $ionicConfigProvider.tabs.position('bottom');
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension|bitcoin):/);
        //Insert JWT token into all api requests:
        $httpProvider.interceptors.push('authInterceptor');
    })

    .run(function ($ionicPlatform, $rootScope, Auth, $state) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
                StatusBar.overlaysWebView(true);
                StatusBar.show();
            }
        });

        $rootScope.logout = function () {
            Auth.logout();
            $state.go('login');
        };
    })

    .config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
        $stateProvider

            // Accounts
            .state('login', {
                url: '/login',
                templateUrl: 'templates/accounts/login.html',
                controller: 'LoginCtrl'
            })

            .state('loading', {
                url: '/loading',
                templateUrl: 'templates/elements/loading.html',
                params: {
                    amount: null
                }
            })

            // App
            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'templates/elements/menu.html',
                controller: 'AppCtrl'
            })

            // Home
            .state('app.home', {
                url: '/home',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/home/index.html',
                        controller: 'TransactionsCtrl'
                    }
                }
            })

            // Transactions
            .state('app.transactions', {
                url: '/transactions',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/transactions/index.html',
                        controller: 'TransactionsCtrl'
                    }
                }
            })

            // Send
            .state('app.send', {
                url: '/send',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/send/index.html',
                        controller: 'SendCtrl'
                    }
                },
                params: {
                    amount: null,
                    note: null
                }
            })

            .state('app.send_to', {
                url: '/send_to',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/send/to.html',
                        controller: 'SendToCtrl'
                    }
                },
                params: {
                    amount: null,
                    note: null,
                    to: null
                }
            })

            .state('app.send_confirm', {
                url: '/send_confirm',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/send/confirm.html',
                        controller: 'SendConfirmCtrl'
                    }
                },
                params: {
                    amount: null,
                    note: null,
                    to: null
                }
            })

            .state('app.send_success', {
                url: '/send_success',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/send/success.html',
                        controller: 'SendSuccessCtrl'
                    }
                },
                params: {
                    amount: null,
                    note: null,
                    to: null
                }
            })

            // Withdraw
            .state('app.withdraw', {
                url: '/withdraw',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/withdraw/index.html',
                        controller: 'WithdrawCtrl'
                    }
                },
                params: {
                    amount: null
                }
            })

            .state('app.withdraw_to', {
                url: '/withdraw_to',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/withdraw/to.html',
                        controller: 'WithdrawToCtrl'
                    }
                },
                params: {
                    amount: null,
                    to: null
                }
            })

            .state('app.withdraw_confirm', {
                url: '/withdraw_confirm',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/withdraw/confirm.html',
                        controller: 'WithdrawConfirmCtrl'
                    }
                },
                params: {
                    amount: null,
                    to: null
                }
            })

            .state('app.withdraw_success', {
                url: '/withdraw_success',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/withdraw/success.html',
                        controller: 'WithdrawSuccessCtrl'
                    }
                },
                params: {
                    amount: null,
                    to: null
                }
            })

            // Deposit
            .state('app.deposit', {
                url: '/deposit',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/deposit/index.html',
                        controller: 'DepositCtrl'
                    }
                }
            })

            // Receive
            .state('app.receive', {
                url: '/receive',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/receive/index.html',
                        controller: 'ReceiveCtrl'
                    }
                }
            })

            // Promotion   
            .state('app.promotion_code', {
                url: '/promotion_code',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/promotions/code.html',
                        controller: 'PromotionCodeCtrl'
                    }
                }
            })

            .state('app.promotion_redeem', {
                url: '/promotion_redeem',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/promotions/redeem.html',
                        controller: 'PromotionRedeemCtrl'
                    }
                },
                params: {
                    promotion_code: null
                }
            })

            .state('app.promotion_success', {
                url: '/promotion_success',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/promotions/success.html',
                        controller: 'PromotionSuccessCtrl'
                    }
                },
                params: {
                    promotion_code: null
                }
            })

            // Request
            .state('app.request', {
                url: '/request',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/request/index.html',
                        controller: 'RequestCtrl'
                    }
                },
                params: {
                    amount: null,
                    note: null
                }
            })

            .state('app.request_from', {
                url: '/request_from',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/request/from.html',
                        controller: 'RequestFromCtrl'
                    }
                },
                params: {
                    amount: null,
                    note: null,
                    from: null
                }
            })

            .state('app.request_confirm', {
                url: '/request_confirm',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/request/confirm.html',
                        controller: 'RequestConfirmCtrl'
                    }
                },
                params: {
                    amount: null,
                    note: null,
                    from: null
                }
            })

            .state('app.request_success', {
                url: '/request_success',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/request/success.html',
                        controller: 'RequestSuccessCtrl'
                    }
                },
                params: {
                    amount: null,
                    note: null,
                    from: null
                }
            })

            .state('app.fica', {
                url: '/fica',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/fica/requirements.html',
                        controller: 'FicaRequirementsCtrl'
                    }
                },
                params: {
                    type: null
                }
            })

            .state('app.fica_id', {
                url: '/fica_id',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/fica/instructions_id.html',
                        controller: 'FicaIdCtrl'
                    }
                },
                params: {
                    type: null
                }
            })

            .state('app.fica_id_selfie', {
                url: '/fica_id_selfie',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/fica/instructions_id_selfie.html',
                        controller: 'FicaIdSelfieCtrl'
                    }
                },
                params: {
                    type: null
                }
            })

            .state('app.fica_proof_of_address', {
                url: '/fica_proof_of_address',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/fica/instructions_proof_of_address.html',
                        controller: 'FicaProofOfAddressCtrl'
                    }
                },
                params: {
                    type: null
                }
            })

            .state('app.fica_camera_upload', {
                url: '/fica_proof_of_address',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/fica/camera_upload.html',
                        controller: 'FicaCameraUploadCtrl'
                    }
                },
                params: {
                    type: null,
                    file: null
                }
            })

            // Help
            .state('app.help', {
                url: '/coming_soon',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/help/index.html',
                        controller: 'HelpCtrl'
                    }
                }
            })

            // Notifications
            .state('app.notifications', {
                url: '/notifications',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/notifications/index.html',
                        controller: 'NotificationsCtrl'
                    }
                }
            })

            // Settings
            .state('app.settings', {
                url: '/settings',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/settings/index.html',
                        controller: 'SettingsCtrl'
                    }
                }
            })

            .state('app.personal_details', {
                url: '/personal_details',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/settings/personal_details.html',
                        controller: 'PersonalDetailsCtrl'
                    }
                },
                params: {
                    first_name: null,
                    last_name: null,
                }
            })

            .state('app.email_address', {
                url: '/email_address',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/settings/email_address.html',
                        controller: 'EmailAddressCtrl'
                    }
                },
                params: {
                    email_address: null
                }
            })

            .state('app.mobile_number', {
                url: '/mobile_number',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/settings/mobile_number.html',
                        controller: 'MobileNumberCtrl'
                    }
                },
                params: {
                    mobile_number: null
                }
            })

            .state('app.add_address', {
                url: '/add_address',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/settings/add_address.html',
                        controller: 'AddressCtrl'
                    }
                }
            })

            .state('app.list_bank_accounts', {
                url: '/list_bank_accounts',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/settings/list_bank_accounts.html',
                        controller: 'ListBankAccountsCtrl'
                    }
                }
            })

            .state('app.add_bank_account', {
                url: '/add_bank_account',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/settings/add_bank_account.html',
                        controller: 'AddBankAccountCtrl'
                    }
                }
            })

            .state('app.security', {
                url: '/security',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/settings/security.html',
                        controller: 'SecurityCtrl'
                    }
                }
            })

            .state('app.reset_password', {
                url: '/reset_password',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/settings/reset_password.html',
                        controller: 'ResetPasswordCtrl'
                    }
                }
            })

            .state('app.two_factor', {
                url: '/two_factor',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/settings/two_factor_instructions.html',
                        controller: 'TwoFactorCtrl'
                    }
                }
            })

            .state('app.pin', {
                url: '/pin',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/settings/pin.html',
                        controller: 'PinCtrl'
                    }
                }
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/home');
    });