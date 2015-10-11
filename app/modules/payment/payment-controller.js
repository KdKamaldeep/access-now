(function () {

    'use strict';

    angular.module('accessnowapp')
    .controller('payment-controller', ['$scope', 'paymentService', 'growl', 'storageService', 'domainService', 'loginService', '$location', 'ngCart', '$timeout',
        function ($scope, paymentService, growl, storageService, domainService, loginService, $location, ngCart, $timeout) {
            $scope.IssuePaymentRequestInProgress = false;
            $scope.PaymentButtonText = "Submit";
            $scope.ClientId = "";
            $scope.ProgComplete = 0;
            $scope.ProgText = "";

            $scope.GetClient = function () {
                var currentBillingAndPersonalInfo = storageService.getCurrentBillingAndPersonalInfo();
                var data = {};
                data.email = currentBillingAndPersonalInfo.emailaddress;

                paymentService.getClient(data)
                .then(function (client) {
                    if (client.result == "success") {
                        $scope.ClientId = client.client.id;
                    }
                });
            };

            $scope.GetClient();


            //Method here 
            $scope.AddOrder = function (clientid) {

                var order = {
                    pid: [],
                    domain: [],
                    billingcycle: [],
                    domaintype: []
                };


                order.noinvoiceemail = true;
                order.noemail = true;

                var currentItem = {};
                var items = ngCart.getItems();

                for (var index = 0; index <= items.length - 1; index++) {
                    var ngItem = items[index];
                    order.pid.push(ngItem._hosting.name);
                    order.domain.push(ngItem._name);
                    order.billingcycle.push("onetime");
                    order.domaintype.push("register");
                }

                order.clientid = clientid;
                order.paymentmethod = "paypal";
                $scope.ProgComplete = 70;

                paymentService.addOrder(order)
                .then(function (data) {
                    if (data.result == "success") {
                        ngCart.empty();
                        storageService.clearAll();
                        $scope.ProgComplete = 100;
                        $timeout(function () {
                            $location.path('thankyou');
                        }, 2000);
                    }
                    else {
                        $scope.PaymentButtonText = "Submit";
                        $scope.IssuePaymentRequestInProgress = false;
                        growl.error("Something went wrong, please try again later.");
                    }
                }, function () {
                    $scope.PaymentButtonText = "Submit";
                    $scope.IssuePaymentRequestInProgress = false;
                    growl.error("Something went wrong, please try again later.");
                });


            };

            $scope.MakePayment = function (status, response) {

                if (response.error) {
                    growl.error(response.error);
                } else {

                    var currentBillingAndPersonalInfo =
                        storageService.getCurrentBillingAndPersonalInfo();

                    var cartItem = {
                        token: loginService.getCurrentUserAccesToken(),
                        stripetoken: response.id,
                        order_total: parseInt(ngCart.totalCost()),
                        domaindetail: []
                    };

                    cartItem.agent_id = ngCart.Agent;

                    var domainDetail = [];

                    var items = ngCart.getItems();
                    for (var index = 0; index <= items.length - 1; index++) {
                        var cart = items[index];

                        if (cart.isService()) { //If item is a service don't add it in order.
                            continue;
                        }

                        domainDetail.push({
                            name: cart.getName(),
                            duration: cart.getTerms(),
                            amount: cart.getPrice(),
                            //"private": 0,
                            private_amount: 0,
                            contact_info: {
                                registrant: currentBillingAndPersonalInfo,
                                admin: currentBillingAndPersonalInfo,
                                technical: currentBillingAndPersonalInfo,
                                billing: currentBillingAndPersonalInfo
                            }
                        });
                    }

                    cartItem.domaindetail = JSON.stringify(domainDetail);

                    $scope.IssuePaymentRequestInProgress = true;
                    $scope.PaymentButtonText = "Submitting...";

                    $scope.ProgComplete = 10;
                    $scope.ProgText = "Processing Your Order...";

                    paymentService.RegisterDomain(cartItem)
                        .then(function (serverResponse) {

                            console.log(serverResponse);
                            if (serverResponse.status /*&& serverResponse.status_code === 1000*/) { //SUCCESS

                                $scope.ProgComplete = 30;

                                if ($scope.ClientId === "" || $scope.ClientId === undefined || $scope.ClientId == null) {
                                    //let's create a client now.
                                    $scope.CreateClient()
                                        .then(function (client) {
                                            console.log(client);
                                            if (client.result == "success") {
                                                $scope.AddOrder(client.clientid);
                                            }
                                            else {
                                                $scope.PaymentButtonText = "Submit";
                                                $scope.IssuePaymentRequestInProgress = false;
                                                growl.error(client.ERROR);
                                            }
                                        },
                                        function (error) {
                                            $scope.PaymentButtonText = "Submit";
                                            $scope.IssuePaymentRequestInProgress = false;
                                            growl.error("Something went wrong, please try again later.");
                                        });
                                }
                                else {
                                    $scope.AddOrder($scope.ClientId);
                                }
                            }
                            else {
                                $scope.PaymentButtonText = "Submit";
                                $scope.IssuePaymentRequestInProgress = false;
                                growl.error(serverResponse.error);
                            }
                        },
                        function (error) {
                            $scope.PaymentButtonText = "Submit";
                            $scope.IssuePaymentRequestInProgress = false;
                            growl.error("Something went wrong, please try again later.");
                        });
                }
            };

            $scope.CreateClient = function () {
                var currentBillingAndPersonalInfo = storageService.getCurrentBillingAndPersonalInfo();
                var clientInfo = {};

                //var phnWithoutCountryCode = currentBillingAndPersonalInfo.phone.substr(3, currentBillingAndPersonalInfo.phone.length - 1);

                clientInfo.firstname = currentBillingAndPersonalInfo.firstname;
                clientInfo.lastname = currentBillingAndPersonalInfo.lastname;
                clientInfo.companyname = currentBillingAndPersonalInfo.orgname;
                clientInfo.email = currentBillingAndPersonalInfo.emailaddress;
                clientInfo.password2 = currentBillingAndPersonalInfo.password;
                clientInfo.address1 = currentBillingAndPersonalInfo.streetaddr;
                clientInfo.address2 = "";
                clientInfo.city = currentBillingAndPersonalInfo.city;
                clientInfo.state = currentBillingAndPersonalInfo.state;
                clientInfo.postcode = currentBillingAndPersonalInfo.zip;
                clientInfo.country = currentBillingAndPersonalInfo.country;
                clientInfo.phonenumber = currentBillingAndPersonalInfo.phone;

                return paymentService.createClient(JSON.stringify(clientInfo));
            };

        }]);
})();