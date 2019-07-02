webpackJsonp(["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.component.css":
/***/ (function(module, exports) {

module.exports = ":root {\n  --light-gray-color: #f5f5f5;\n  --footer-height: 180px;\n}\n\n#wrap {\n  min-height: 100%;\n}\n\n#main {\n  overflow: auto;\n  min-height: 100%;\n  padding-bottom: var(--footer-height);\n}\n"

/***/ }),

/***/ "./src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<app-header></app-header>\n<div id=\"main\" class=\"padding-sm\">\n  <div class=\"text-center padding-v-lg\"\n    [ngClass]=\"{'hidden': !isRinkeby, 'warning': isRinkeby}\">You are connected to the Rinkeby Test network. Do not spend real ETH on Rinkeby.</div>\n\n  <div [hidden]=\"authorized\">\n    <app-welcome></app-welcome>\n  </div>\n\n  <div [hidden]=\"!authorized\">\n    <div>\n      <app-tabs>\n          <app-tab tabTitle=\"My Tokens\">\n            <app-token></app-token>\n          </app-tab>\n          <app-tab tabTitle=\"My Keys\">\n            <app-drs></app-drs>\n          </app-tab>\n      </app-tabs>\n    </div>\n  </div>\n</div>\n<app-footer></app-footer>\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_web3_drs_service__ = __webpack_require__("./src/app/shared/web3/drs.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_web3_healthcash_service__ = __webpack_require__("./src/app/shared/web3/healthcash.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AppComponent = (function () {
    function AppComponent(drsService, healthcashService) {
        this.drsService = drsService;
        this.healthcashService = healthcashService;
        this.title = 'Health Nexus Wallet';
        this.authorized = false;
        if (!window.hasOwnProperty('web3')) {
            return;
        }
        this.drsService.initializeWeb3();
        this.healthcashService.initializeWeb3();
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.drsService.loginChanged$.subscribe(function (authed) {
            _this.authorized = authed;
        });
        switch (this.drsService.web3.version.network) {
            case '1':
                this.isRinkeby = false;
                break;
            case '4':
                this.isRinkeby = true;
                break;
            default:
                this.isRinkeby = false;
        }
        ;
    };
    AppComponent.prototype.balance = function () {
        this.healthcashService.balanceOf();
    };
    AppComponent.prototype.transferOwnership = function () {
        this.healthcashService.transferOwnership('');
    };
    AppComponent.prototype.getNumberService = function () {
        this.drsService.getServiceCount();
    };
    AppComponent.prototype.getServiceURL = function (id) {
        this.drsService.getServiceURL(id);
    };
    AppComponent.prototype.setTransferAgent = function () {
        this.healthcashService.setTransferAgent();
    };
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__("./src/app/app.component.html"),
            styles: [__webpack_require__("./src/app/app.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__shared_web3_drs_service__["a" /* DrsService */], __WEBPACK_IMPORTED_MODULE_2__shared_web3_healthcash_service__["a" /* HealthcashService */]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("./node_modules/@angular/platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_web3_drs_service__ = __webpack_require__("./src/app/shared/web3/drs.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_web3_healthcash_service__ = __webpack_require__("./src/app/shared/web3/healthcash.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_window_ref_service__ = __webpack_require__("./src/app/shared/window-ref.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__("./src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__login_login_component__ = __webpack_require__("./src/app/login/login.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_http__ = __webpack_require__("./node_modules/@angular/http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__drs_drs_component__ = __webpack_require__("./src/app/drs/drs.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__token_token_component__ = __webpack_require__("./src/app/token/token.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__header_header_component__ = __webpack_require__("./src/app/header/header.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__footer_footer_component__ = __webpack_require__("./src/app/footer/footer.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__welcome_welcome_component__ = __webpack_require__("./src/app/welcome/welcome.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__tabs_tabs_component__ = __webpack_require__("./src/app/tabs/tabs.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__tab_tab_component__ = __webpack_require__("./src/app/tab/tab.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
















var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["E" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_9__drs_drs_component__["a" /* DrsComponent */],
                __WEBPACK_IMPORTED_MODULE_10__token_token_component__["a" /* TokenComponent */],
                __WEBPACK_IMPORTED_MODULE_11__header_header_component__["a" /* HeaderComponent */],
                __WEBPACK_IMPORTED_MODULE_12__footer_footer_component__["a" /* FooterComponent */],
                __WEBPACK_IMPORTED_MODULE_13__welcome_welcome_component__["a" /* WelcomeComponent */],
                __WEBPACK_IMPORTED_MODULE_14__tabs_tabs_component__["a" /* TabsComponent */],
                __WEBPACK_IMPORTED_MODULE_15__tab_tab_component__["a" /* TabComponent */],
                __WEBPACK_IMPORTED_MODULE_6__login_login_component__["a" /* LoginComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */], __WEBPACK_IMPORTED_MODULE_7__angular_common_http__["a" /* HttpClientModule */], __WEBPACK_IMPORTED_MODULE_8__angular_http__["c" /* HttpModule */]
            ],
            providers: [__WEBPACK_IMPORTED_MODULE_2__shared_web3_drs_service__["a" /* DrsService */], __WEBPACK_IMPORTED_MODULE_3__shared_web3_healthcash_service__["a" /* HealthcashService */], __WEBPACK_IMPORTED_MODULE_7__angular_common_http__["a" /* HttpClientModule */], __WEBPACK_IMPORTED_MODULE_4__shared_window_ref_service__["a" /* WindowRefService */]],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/drs/drs.component.css":
/***/ (function(module, exports) {

module.exports = ".permissions .padding-sm.clearfix {\n  max-width: 1000px;\n  height: 37px;\n}\n\n.button {\n  background-color: #6BAACC; /* Green */\n  border: none;\n  color: white;\n  padding: 12px 20px;\n  margin-bottom: 12px;\n  text-align: center;\n  text-decoration: none;\n  display: inline-block;\n  font-size: 16px; \n}\n\n.md-raised:not([disabled]) {\n    -webkit-box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);\n            box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);\n}\n\n.listTitle {\n  text-decoration: underline;\n  font-size:20px;\n  padding: 10px 10px 10px 0px;\n\n}\n\n.listElement {\n  font-size:16px;\n  padding: 5px 10px 2px 10px;\n}\n\n#walkthrough{\n  font-size:16px;\n  padding: 12px 10px 2px 0px;\n}\n\n.title {\n  font-size:24px;\n  text-decoration: underline;\n}\n\n.element{\n  font-size:16px;\n  padding: 8px 10px 0px 0px;\n}"

/***/ }),

/***/ "./src/app/drs/drs.component.html":
/***/ (function(module, exports) {

module.exports = "<head>\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n</head>\n\n<div class=\"container\">\n  <div class=\"row drs\" [hidden]=\"selectedParentKey || selectedChildKey\"> \n    <button class=\"form-control2 md-raised\" (click)=\"show = !show\">Original View {{!show ? '' : ''}}</button>\n    <button class=\"form-control2 md-raised\" (click)=\"show = !show\">PhUSE {{show ? 'selected' : ''}}</button>\n    <br>\n    <br>\n    <ng-container *ngIf=\"show\">\n      <span class=\"listTitle\">Instructions on how to operate Health Nexus Data Sharing for Phuse</span>\n      <span class=\"listElement\">1. Create or choose a parent key to attach to your database</span>\n      <span class=\"listElement\">2. Next, create a child key off of the given parent key</span>\n      <span class=\"listElement\">3. Then, create a child key off of the given parent key and set parameters</span>\n      <span class=\"listElement\">4. Next, set PhUSE id and retrieve the key data</span>\n      <span class=\"listElement\">5. If needed, upload data that you will need to transfer either here or through your gatekeeper itself</span>\n      <span class=\"listElement\">6. Finally, transact the key</span>\n      <span id=\"walkthrough\">For a more thorough walk through please check out our <a href=\"https://medium.com/simplyvital/lets-hit-the-ground-running-with-health-nexus-5c25df21c56d\">walkthrough</a></span>\n      <br>\n    </ng-container>\n    <br>\n    <span class=\"title\">Create New Parent Key</span><span class=\"element\">Create a parent key using the URL to your gatekeeper- or blockchain-enabled service</span>\n    <input type=\"text\" class=\"form-control\" placeholder=\"Enter parent key value here\" name=\"url\" #url>\n    <button class=\"form-control\" (click)=\"createService(url.value)\">Generate</button>\n    <br>\n    <div class=\"row padding-top-lg\">\n      <span class=\"title\" [ngClass]=\"{'hidden': !loaded, 'inline': loaded}\">My Parent Keys</span>\n      <div *ngFor=\"let service of services\">\n        <span class=\"clickable margin-v-sm\" (click)=\"pickParentKey(service._service)\">{{ service._service }}: {{ service.url | async }}</span>\n      </div>\n      <div class=\"col-9 padding-top-lg\">\n        <span class=\"title\">Purchase Keys</span>\n        <small>Insert the id for the key you would like to purchase below:</small>\n        <br>\n        <input type=\"text\" class=\"half form-control\" placeholder=\"Key to purchase\" name=\"keyPurchase\" #keyPurchase>\n        <button class=\"form-control\" (click)=\"purchaseKey(keyPurchase.value)\">Purchase</button>\n        <br>\n      </div>\n      <div class=\"col-9 padding-top-lg\">\n        <span class=\"title\">Owned/Shared keys</span>\n        <!-- <div *ngFor=\"let key of keys\">\n          <span class=\"clickable margin-v-sm\" (click)=\"pickChildKey(key.key)\">{{ key.key }}</span>\n        </div> -->\n        <div *ngFor=\"let keyShared of keyAccessArray\">\n          <span class=\"clickable margin-v-sm\" (click)=\"pickChildKey(keyShared.key)\">{{ keyShared.key }}: {{ keyShared.url }}</span>\n        </div>\n      </div>\n      <!-- <div class=\"col-9 padding-top-lg\">\n        <span>Make trade offer</span>\n        <input type=\"text\" class=\"half form-control\" placeholder=\"Key to trade\" name=\"keyTrade\" #keyTrade>\n        <input type=\"text\" class=\"half form-control\" placeholder=\"Key to trade for\" name=\"keyToTrade\" #keyToTrade>\n      </div>\n      <div class=\"col-9 padding-top-lg\">\n        <div class=\"border-bottom padding-v-lg\">\n          <div class=\"col-6\">\n            <span>Outstanding trade offers</span>\n            <div class=\"padding-sm\">\n              <span class=\"bold margin-v-sm inline\">absaklsa2js923cde</span>\n              <span class=\"inline float-right clickable padding-h-sm\">Cancel</span><span class=\"float-right inline\">|</span><span class=\"inline clickable float-right padding-h-sm\">View</span>\n            </div>\n            <div class=\"padding-sm\">\n              <span class=\"bold margin-v-sm inline\">absaklsa2js923cde</span>\n              <span class=\"inline float-right clickable padding-h-sm\">Cancel</span><span class=\"float-right inline\">|</span><span class=\"inline clickable float-right padding-h-sm\">View</span>\n            </div>\n          </div>\n        </div>\n        <div class=\"border-bottom padding-v-lg\">\n          <div class=\"col-6\">\n            <span>Incoming trade offers</span>\n            <div class=\"padding-sm\">\n              <span class=\"bold margin-v-sm inline\">absaklsa2js923cde</span>\n              <span class=\"inline float-right clickable padding-h-sm\">Decline</span><span class=\"float-right inline\">|</span><span class=\"inline clickable float-right padding-h-sm\">Accept</span>\n            </div>\n\n            <div class=\"padding-sm\">\n              <span class=\"bold margin-v-sm inline\">absaklsa2js923cde</span>\n              <span class=\"inline float-right clickable padding-h-sm\">Decline</span><span class=\"float-right inline\">|</span><span class=\"inline clickable float-right padding-h-sm\">Accept</span>\n            </div>\n          </div>\n        </div>\n      </div> -->\n    </div>\n  </div>\n\n  <div [hidden]=\"!selectedParentKey && !selectedChildKey\">\n    <!-- PARENT KEY VIEW -->\n    <div class=\"row\" [hidden]=\"selectedChildKey\">\n      <!-- <div *ngIf=\"show\" class=\"text-sm\">(PhUSE is selexcted)</div> -->\n      <br>\n      <span class=\"padding-bottom-md title\">Managing parent key</span>\n      <span class=\"bold\"> {{ selectedParentKey && selectedParentKey._service }}: {{ selectedParentKey && selectedParentKey.url | async }} </span>\n      <br>\n      <span class=\"padding-top-lg title\">Child keys</span>\n      <small>Generate the permissioned childkeys here to be traded</small>\n      <br>\n      <button class=\"form-control\" (click)=\"createParentKey(selectedParentKey && selectedParentKey._service)\">Generate new</button>\n      <div *ngIf=\"selectedParentKey && selectedParentKey.keys\">\n        <div *ngFor=\"let key of selectedParentKey.keys\">\n          <span class=\"clickable padding-v-sm\" (click)=\"pickChildKey(key.id)\"> {{ key.id }}</span>\n        </div>\n      </div>\n    </div>\n\n    <!-- CHILD KEY VIEW -->\n    <div class=\"row\" [hidden]=\"!selectedChildKey\">\n      <span class=\"padding-bottom-md title\">Managing child key</span>\n      <span class=\"bold\">{{ selectedChildKey && selectedChildKey.id || selectedChildKey && selectedChildKey.key }}</span>\n      <br>\n      <div *ngIf=\"show\">\n        <p class=\"title\">Update or Register your PhUSE ID</p>\n        <small>Register you PhUSE Id with Health Nexus to connect with the PhUSE App</small>\n        <br>\n        <input type=\"text\" class=\"half form-control\" placeholder=\"PhUSE ID\" name=\"phuseNumber\" #phuseNumber>\n        <button class=\"form-control\" (click)=\"updatePhuse(phuseNumber.value)\">Update</button>\n        <br>\n      </div>\n      <br>\n      <!-- <div class=\"title\">Upload file to gatekeeper</div> -->\n      <div class=\"title\">Upload a file to the gatekeeper server:</div>\n      <br>\n      <div class=\"form-group\">\n        <label for=\"file\">Choose File:</label>\n        <input type=\"file\"\n           id=\"file\"\n           (change)=\"handleFileInput($event.target.files)\" style=\"width:90px\">\n         </div>\n      <br>\n      <small class=\"padding-top-lg title\" style=\"padding-top: 10px;\">Retrieve child key data:</small>\n      <div *ngIf=\"image\">\n        <img [src]=\"image\" />\n      </div>\n      <div *ngIf=\"json\"> {{ json }}</div>\n      <span class=\"warning margin-v-sm\">Warning: not verified for sensitive data; any data may be unsanitized.  Additionally, make sure to only download data from trusted sources.  We are not verifing the safety of the data</span>\n      <br>\n      <small>Insert the parameter you would like to use to retrieve the data</small>\n      <br>\n      <div>\n        <input type=\"text\" class=\"form-control\" placeholder=\"Insert parameter to send\" name=\"Parameter\" #Parameter>\n        <button class=\"form-control\" (click)=\"retrieveData(Parameter.value)\">Retrieve</button>\n      </div>\n\n\n      <div class=\"permissions clearfix\" [hidden]=\"!selectedParentKey\">\n        <br>\n        <span class=\"padding-top-lg inline title\">Managing child key permissions</span>\n        <br>\n        <small>Edit your permissions for your child key here:</small>\n        <br>\n        <span class=\"text-brand-blue clickable float-right\"\n          [hidden]=\"!editingPermissions\"\n          (click)=\"changePermissions()\">Save Permissions</span>\n        <div class=\"border-bottom\">\n          <div class=\"padding-sm clearfix\">\n            <div class=\"col-6 float-left\">\n              <span class=\"bold margin-v-sm inline\">Share</span>\n            </div>\n            <span class=\"inline clickable float-left padding-h-sm\"\n            (click)=\"setActive('share', true)\"\n            [ngClass]=\"{'active': selectedChildKey && selectedChildKey.share }\">On</span>\n            <span class=\"float-left inline\">|</span>\n            <span class=\"inline float-left clickable padding-h-sm\"\n            (click)=\"setActive('share', false)\"\n            [ngClass]=\"{'active': selectedChildKey && !selectedChildKey.share }\">Off</span>\n          </div>\n        </div>\n\n        <div class=\"border-bottom\">\n          <div class=\"padding-sm clearfix\">\n            <div class=\"col-6 float-left\">\n              <span class=\"bold margin-v-sm inline\">Sell</span>\n            </div>\n            <span class=\"inline clickable float-left padding-h-sm\"\n            (click)=\"setActive('sell', true)\"\n            [ngClass]=\"{'active': selectedChildKey && selectedChildKey.sell }\">On</span>\n            <span class=\"float-left inline\">|</span>\n            <span class=\"inline float-left clickable padding-h-sm\"\n            (click)=\"setActive('sell', false)\"\n            [ngClass]=\"{'active': selectedChildKey && !selectedChildKey.sell }\">Off</span>\n          </div>\n        </div>\n\n        <div class=\"border-bottom\">\n          <div class=\"padding-sm clearfix\">\n            <div class=\"col-6 float-left\">\n              <span class=\"bold margin-v-sm inline\">Trade</span>\n            </div>\n            <span class=\"inline clickable float-left padding-h-sm\"\n            (click)=\"setActive('trade', true)\"\n            [ngClass]=\"{'active': selectedChildKey && selectedChildKey.trade }\">On</span>\n            <span class=\"float-left inline\">|</span>\n            <span class=\"inline float-left clickable padding-h-sm\"\n            (click)=\"setActive('trade', false)\"\n            [ngClass]=\"{'active': selectedChildKey && !selectedChildKey.trade }\">Off</span>\n          </div>\n        </div>\n        <br>\n        <small>Set custom permissions, including parameters for your database, here:</small>\n        <br>\n        <div *ngIf=\"childParamsArray\">\n          <div *ngFor=\"let keyParamName of childParamsArray\" class=\"border-bottom\">\n            <div class=\"padding-sm clearfix\">\n              <div class=\"col-6 float-left\">\n                <span class=\"bold margin-v-sm inline\">{{ keyParamName }}</span>\n              </div>\n              <span class=\"inline clickable float-left padding-h-sm\"\n              title=\"click to update value\"\n              [ngClass]=\"{'hidden': editingParam[keyParamName], 'inline': !editingParam[keyParamName]}\"\n              (click)=\"editParam(keyParamName)\">{{ childParams[keyParamName] }}</span>\n              <div class=\"float-left padding-h-sm\"\n              [ngClass]=\"{'hidden': !editingParam[keyParamName], 'flexContainer': editingParam[keyParamName]}\">\n                <input name=\"new-{{keyParamName}}\" type=\"text\" placeholder=\"New value\" #newParamValue>\n                <button (click)=\"setData(keyParamName, newParamValue.value)\">&#10003;</button>\n              </div>\n              <span class=\"float-left inline\">|</span>\n              <span class=\"inline float-left clickable padding-h-sm\" (click)=\"setData(keyParamName, null)\">Remove</span>\n            </div>\n          </div>\n        </div>\n        <div class=\"editing\">\n          <input type=\"text\" class=\"half form-control\" placeholder=\"Enter parameter name to get\" name=\"getParamName\" #getParamName>\n          <button class=\"form-control\" (click)=\"getData(getParamName.value)\">Get</button>\n          {{ dataOnKey | async }}\n        </div>\n        <div class=\"editing\">\n          <input type=\"text\" class=\"half form-control\" placeholder=\"Enter parameter name\" name=\"paramName\" #paramName>\n          <input type=\"text\" class=\"half form-control\" placeholder=\"Enter parameter value\" name=\"paramValue\" #paramValue>\n          <button class=\"form-control\" (click)=\"setData(paramName.value, paramValue.value)\">Add</button>\n        </div>\n      </div>\n\n      <!-- Child key management section -->\n      <div [hidden]=\"!selectedParentKey\">\n        <div class=\"col-9 padding-top-lg\" *ngIf=\"selectedChildKey && selectedChildKey.share\" [ngClass]=\"{'disabled': editingPermissions}\">\n          <span class=\"title\">Share keys</span>\n          <small>Insert the address for the person you would like to share with:</small>\n          <input type=\"text\" class=\"form-control\" placeholder=\"Share with\" name=\"share\" #share>\n          <button class=\"form-control\"\n          [disabled]=\"editingPermissions\"\n          (click)=\"shareKey(selectedChildKey && selectedChildKey.id, share.value)\">Share</button>\n        </div>\n\n        <div class=\"col-9 padding-top-lg\" *ngIf=\"selectedChildKey && selectedChildKey.share\" [ngClass]=\"{'disabled': editingPermissions}\">\n          <span class=\"title\">Unshare keys</span>\n          <input type=\"text\" class=\"form-control\" placeholder=\"Unshare with\" name=\"unshare\" #unshare>\n          <button class=\"form-control\"\n          [disabled]=\"editingPermissions\"\n          (click)=\"unshareKey(selectedChildKey && selectedChildKey.id, unshare.value)\">Unshare</button>\n        </div>\n\n        <div class=\"col-9 padding-top-lg\" *ngIf=\"canMakeSaleOffer()\" [ngClass]=\"{'disabled': editingPermissions}\">\n          <span class=\"title\">Make sale offer</span>\n          <small>Insert the address for the person you would like to make an offer to:</small>\n          <br>\n          <input type=\"text\" class=\"half form-control\" placeholder=\"Sell to\"  name=\"buyer\" #buyer>\n          <input type=\"number\" class=\"half form-control\" placeholder=\"Amount\" name=\"price\" #price>\n          <span class=\"inline text-md\">Can sell: <input type=\"checkbox\" name=\"sellPermission\" #sellPermission></span>\n          <button class=\"form-control\"\n          [disabled]=\"editingPermissions\"\n          (click)=\"sellKeyOffer(buyer.value, price.value, sellPermission.checked)\">Send</button>\n        </div>\n        <span class=\"text-brand-blue can-click padding-top-lg\" (click)=\"cancelTradeKeyOffer(selectedChildKey && selectedChildKey.id)\">Cancel all outstanding trade offers</span>\n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/drs/drs.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DrsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_web3_healthcash_service__ = __webpack_require__("./src/app/shared/web3/healthcash.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_web3_drs_service__ = __webpack_require__("./src/app/shared/web3/drs.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_window_ref_service__ = __webpack_require__("./src/app/shared/window-ref.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser__ = __webpack_require__("./node_modules/@angular/platform-browser/esm5/platform-browser.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var DrsComponent = (function () {
    function DrsComponent(drsService, healthcashService, _sanitizer, windowRef, zone) {
        this.drsService = drsService;
        this.healthcashService = healthcashService;
        this._sanitizer = _sanitizer;
        this.zone = zone;
        this.services = [];
        this.serviceIndex = {};
        this.keys = [];
        this.keysIndex = {};
        this.keysData = [];
        this.keyOwners = {};
        this.keyAccess = {};
        this.urls = {};
        this.keyAccessArray = [];
        this.childParams = {};
        this.childParamsArray = [];
        this.loaded = false;
        this.editingPermissions = false;
        this.editingParam = {};
        this.fileToUpload = null;
        this._window = windowRef.nativeWindow;
        if (!window.hasOwnProperty('web3')) {
            return;
        }
    }
    DrsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.drsService.parentKeyChanged$.subscribe(function (selectedParent) {
            var parentService = _this.serviceIndex[selectedParent];
            _this.selectedParentKey = parentService;
        });
        this.drsService.childKeyChanged$.subscribe(function (selectedChild) {
            var childKeyOfParent = _this.selectedParentKey && _this.selectedParentKey.keyIndex[selectedChild];
            var sharedKey = _this.keyAccess && _this.keyAccess[selectedChild];
            var ownedKey = _this.keysIndex && _this.keysIndex[selectedChild];
            _this.selectedChildKey = childKeyOfParent || sharedKey || ownedKey;
        });
        this.drsService.onLoad$.subscribe(function (hasLoaded) {
            _this.loaded = hasLoaded;
            if (_this.loaded) {
                _this.displayData();
            }
        });
    };
    DrsComponent.prototype.handleFileInput = function (files) {
        var self = this;
        var urlKey = this.selectedParentKey && this.selectedParentKey.url.__zone_symbol__value;
        var keyId = this.selectedChildKey && this.selectedChildKey.id;
        if (typeof urlKey === "undefined") {
            urlKey = this.selectedChildKey.url;
            keyId = this.selectedChildKey.key;
        }
        this.fileToUpload = files.item(0);
        this.drsService.uploadFile(this.fileToUpload, urlKey);
    };
    DrsComponent.prototype.displayData = function () {
        var _this = this;
        var updatedServices = this.drsService.getServices();
        console.log('Updated Services: ', updatedServices);
        var temp = [];
        for (var i = 0; i < updatedServices.length; i++) {
            if (updatedServices[i]._service != '0x3ce9ef5b6cf94f9b8ce9d3216f16790ca264476322ef2f4e22ea5f42d98688b0' &&
                updatedServices[i]._service != '0xa6de77bb66c6805ea6100178cde7800778ce36b5a2415f2de38a77193b8dcd98' &&
                updatedServices[i]._service != '0xd1ee719b312fe66f2048155ad5c04afb2bfe2e8855537683e5bcf2e4aa95eee4' &&
                updatedServices[i]._service != '0x387e5ab2b7764786e8696b98f675c55410813474aa163958fd66cc33f8691304' &&
                updatedServices[i]._service != '0x5b41bca00fceabf17f418c96db3638e31a0f7c9e23370b5bf62b71d6d6c191ec' &&
                updatedServices[i]._service != '0x72f876de7aa61b524048033415c950348ff2fe46597098bc60c6a0c718b4e44d' &&
                updatedServices[i]._service != '0x9426e04fe757749698e850c413f730c3970dc88e0d73661c4acc01f7f2d0de74' &&
                updatedServices[i]._service != '0x54818303b4622a678fbdc9397ee39face49bd67db5af023664dd84e7192ea7ae' &&
                updatedServices[i]._service != '0x17acc4f9bba840c491c1c9cadb7974ff09d990ece5b38776ba1c0ccd926a4bf9' &&
                updatedServices[i]._service != '0x748497a9052948b47e42a1c2c74e678746ef4714f2c5a36b972cb69f1d0e1c3d') {
                temp.push(updatedServices[i]);
            }
        }
        updatedServices = temp;
        this.keys = this.drsService.getKeys();
        this.keyOwners = this.drsService.returnKeyOwners();
        this.keyAccess = this.drsService.getkeyAccess();
        this.keyAccessArray = [];
        for (var json in this.keyAccess) {
            var currentKeyAccess = this.keyAccess[json];
            this.keyAccessArray.push({
                'key': json,
                'url': currentKeyAccess.url,
                'share': currentKeyAccess.share,
                'trade': currentKeyAccess.trade,
                'sell': currentKeyAccess.sell,
                'service': currentKeyAccess.service
            });
        }
        for (var i = 0; i < updatedServices.length; i++) {
            var currentService = updatedServices[i];
            var url = this.drsService.getServiceURL(currentService._service);
            currentService.keys = [];
            currentService.keysExist = false;
            currentService.url = url;
            this.urls[currentService._service] = url;
            var length = this.keys.length;
            for (var j = 0; j < length; j++) {
                var currentKey = this.keys[j];
                this.keysIndex[currentKey.key] = currentKey;
                if (currentService._service == currentKey.service) {
                    var serviceKey = {
                        'owner': currentKey.owner,
                        'share': currentKey.share,
                        'trade': currentKey.trade,
                        'sell': currentKey.sell,
                        'id': currentKey.key
                    };
                    currentService.keys.push(serviceKey);
                    if (!currentService.keyIndex) {
                        currentService.keyIndex = {};
                    }
                    ;
                    currentService.keyIndex[serviceKey.id] = serviceKey;
                    currentService.keysExist = true;
                }
            }
            this.serviceIndex[currentService._service] = currentService;
        }
        ;
        this.zone.run(function () {
            _this.services = updatedServices;
        });
    };
    DrsComponent.prototype.log = function (val) { console.log(val); };
    /* KEYS TAB */
    DrsComponent.prototype.createService = function (url) {
        this.drsService.createservice(url);
    };
    DrsComponent.prototype.pickParentKey = function (parentKey) {
        this.drsService.changeParentKey(parentKey);
    };
    DrsComponent.prototype.purchaseKey = function (key) {
        this.drsService.purchaseKey(key);
    };
    /* PARENT KEY VIEW */
    DrsComponent.prototype.createParentKey = function (url) {
        this.drsService.createKey(url);
    };
    DrsComponent.prototype.pickChildKey = function (childKey) {
        this.drsService.changeChildKey(childKey);
    };
    /* CHILD KEY VIEW */
    DrsComponent.prototype.retrieveData = function (parameter) {
        var self = this;
        var urlKey = this.selectedParentKey && this.selectedParentKey.url.__zone_symbol__value;
        var keyId = this.selectedChildKey && this.selectedChildKey.id;
        if (typeof urlKey === "undefined") {
            urlKey = this.selectedChildKey.url;
            keyId = this.selectedChildKey.key;
        }
        this.dataToDisplay = this.drsService.dataRequestTest(urlKey, parameter, keyId).then(function (value) {
            // Do things after onload
            var contentType = value.headers.get("Content-Type");
            var blob = new Blob([value._body], { type: contentType });
            if (this._window.navigator && this._window.navigator.msSaveOrOpenBlob) {
                this._window.navigator.msSaveOrOpenBlob(blob, parameter);
            }
            else {
                var a = document.createElement('a');
                a.href = URL.createObjectURL(blob);
                a.download = parameter;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            }
        }.bind(this));
    };
    DrsComponent.prototype.changePermissions = function () {
        this.editingPermissions = false;
        var selected = this.selectedChildKey && this.selectedChildKey || {};
        var id = selected.id;
        var share = selected.share;
        var trade = selected.trade;
        var sell = selected.sell;
        this.drsService.permissionKey(id, share, trade, sell);
    };
    DrsComponent.prototype.setActive = function (key, value) {
        this.editingPermissions = true;
        this.selectedChildKey[key] = value;
    };
    DrsComponent.prototype.editParam = function (key) {
        this.editingParam = {};
        this.editingParam[key] = true;
    };
    DrsComponent.prototype.getData = function (type) {
        var keyId = this.selectedChildKey && this.selectedChildKey.id;
        this.dataOnKey = this.drsService.getKeyData(keyId, type);
    };
    DrsComponent.prototype.setData = function (type, parameter) {
        var _this = this;
        var selected = this.selectedChildKey && this.selectedChildKey;
        this.drsService.setKeyData(selected.id, type, parameter);
        if (selected) {
            if (!parameter) {
                delete this.childParams[type];
            }
            else {
                this.childParams[type] = parameter;
            }
            this.zone.run(function () {
                _this.childParamsArray = Object.keys(_this.childParams);
            });
            this.editingParam = {};
        }
    };
    DrsComponent.prototype.shareKey = function (id, account) {
        this.drsService.shareKey(id, account);
    };
    DrsComponent.prototype.unshareKey = function (id, account) {
        this.drsService.unshareKey(id, account);
    };
    DrsComponent.prototype.canMakeSaleOffer = function () {
        return this.selectedChildKey && this.selectedChildKey.sell && !this.keyHasOwner(this.selectedChildKey);
    };
    DrsComponent.prototype.keyHasOwner = function (key) {
        return this.keyOwners[key] && this.keyOwners[key].length > 0;
    };
    DrsComponent.prototype.sellKeyOffer = function (buyer, price, sellPermission) {
        var selected = this.selectedChildKey && this.selectedChildKey || {};
        var keyId = selected.id;
        this.drsService.createSalesOffer(keyId, buyer, price, sellPermission);
    };
    DrsComponent.prototype.cancelTradeKeyOffer = function (key) {
        this.drsService.cancelTradeKey(key);
    };
    DrsComponent.prototype.togglePane = function (event) {
        var el = event.target.nextElementSibling;
        if (el.classList.contains('hidden')) {
            el.classList.remove('hidden');
        }
        else {
            el.classList.add('hidden');
        }
    };
    DrsComponent.prototype.tradeKeyOffer = function (key, keyToTrade) {
        this.drsService.tradeKey(key, keyToTrade);
    };
    DrsComponent.prototype.tradeKey = function (key, keyTrade) {
        this.drsService.CreateTradeKeyOffer(key, keyTrade);
    };
    DrsComponent.prototype.cancelSellKeyOffer = function (key) {
        this.drsService.cancelSalesOffer(key);
    };
    DrsComponent.prototype.updatePhuse = function (phuseNumber) {
        var self = this;
        var urlKey = this.selectedParentKey && this.selectedParentKey.url.__zone_symbol__value;
        var keyId = this.selectedChildKey && this.selectedChildKey.id;
        if (typeof urlKey === "undefined") {
            urlKey = this.selectedChildKey.url;
            keyId = this.selectedChildKey.key;
        }
        this.drsService.updatePhuse(urlKey, phuseNumber);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Input */])(),
        __metadata("design:type", Object)
    ], DrsComponent.prototype, "tokenServices", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Input */])(),
        __metadata("design:type", Object)
    ], DrsComponent.prototype, "drsServices", void 0);
    DrsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'app-drs',
            template: __webpack_require__("./src/app/drs/drs.component.html"),
            styles: [__webpack_require__("./src/app/drs/drs.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__shared_web3_drs_service__["a" /* DrsService */], __WEBPACK_IMPORTED_MODULE_1__shared_web3_healthcash_service__["a" /* HealthcashService */], __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser__["b" /* DomSanitizer */], __WEBPACK_IMPORTED_MODULE_3__shared_window_ref_service__["a" /* WindowRefService */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgZone */]])
    ], DrsComponent);
    return DrsComponent;
}());



/***/ }),

/***/ "./src/app/footer/footer.component.css":
/***/ (function(module, exports) {

module.exports = ":root {\n  --light-gray-color: #f5f5f5;\n  --footer-height: 180px;\n}\n\n#footer {\n  height: var(--footer-height);\n  width: 100%;\n  position:fixed;\n  bottom:0;\n  left:0;\n  background: url('bkg_blue_footer.2693f6eecce3b6f4e905.jpg') repeat center center;\n}\n"

/***/ }),

/***/ "./src/app/footer/footer.component.html":
/***/ (function(module, exports) {

module.exports = "<div id=\"footer\" class=\"container\">\n  <div class=\"row padding-lg text-white clearfix\">\n    <div class=\"float-left\">\n      <img class=\"sm-logo\" src=\"./assets/icon_logo_small.svg\" alt=\"health nexus\">\n    </div>\n    <div class=\"float-right text-right\">\n      <span class=\"inline\">Terms of Use</span> | <span class=\"inline\">Privacy Policy</span>\n      <span class=\"padding-top-sm text-sm\">Copyright 2016 SimplyVital Health. All Rights Reserved</span>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/footer/footer.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FooterComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var FooterComponent = (function () {
    function FooterComponent() {
    }
    FooterComponent.prototype.ngOnInit = function () {
    };
    FooterComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'app-footer',
            template: __webpack_require__("./src/app/footer/footer.component.html"),
            styles: [__webpack_require__("./src/app/footer/footer.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], FooterComponent);
    return FooterComponent;
}());



/***/ }),

/***/ "./src/app/header/header.component.css":
/***/ (function(module, exports) {

module.exports = ".app-header {\n  padding: 0;\n  margin: 0;\n  min-height: 245px;\n  background-color: #85b2c9;\n  background: url('bkg_blue_header.3f32f7ae05dac3ea9623.jpg') repeat center center;\n  border-bottom: 45px solid #3f819e;\n}\n\n.sm-logo {\n  height: 45px;\n}\n"

/***/ }),

/***/ "./src/app/header/header.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container app-header\">\n  <div class=\"row padding-md\">\n    <img class=\"sm-logo\" src=\"./assets/icon_logo_small.svg\" alt=\"health nexus\">\n  </div>\n  <div class=\"row padding-bottom-lg\">\n    <img class=\"center\" src=\"./assets/icon_logo_1x.png\" alt=\"health nexus\">\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/header/header.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HeaderComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var HeaderComponent = (function () {
    function HeaderComponent() {
    }
    HeaderComponent.prototype.ngOnInit = function () {
    };
    HeaderComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'app-header',
            template: __webpack_require__("./src/app/header/header.component.html"),
            styles: [__webpack_require__("./src/app/header/header.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], HeaderComponent);
    return HeaderComponent;
}());



/***/ }),

/***/ "./src/app/login/login.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/login/login.component.html":
/***/ (function(module, exports) {

module.exports = "\n<div>\n  <p>\n    Choose Login Method\n  </p>\n  <form>\n    <input type=\"radio\" name=\"wallet\" (click)=\"chooseWallet('keystore')\" [value]=\"keystore\" checked>Keystore / JSON File<br>\n    <input type=\"radio\" name=\"wallet\" (click)=\"chooseWallet('private')\" [value]=\"private\">Private Key<br>\n  </form>\n  <div *ngIf=\"wallet == 'keystore'\">\n    <p>Upload file</p>\n    <input name=\"myFile\" type=\"file\">\n    <input name=\"password\" type=\"password\">\n\n  </div>\n  <div *ngIf=\"wallet == 'private'\">\n    <p>Paste/Type Your Private Key</p>\n    <input name=\"key\" type=\"text\">\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/login/login.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var LoginComponent = (function () {
    function LoginComponent() {
        this.wallet = '';
        this.private = false;
        this.keystore = false;
    }
    LoginComponent.prototype.chooseWallet = function (type) {
        this.wallet = type;
    };
    LoginComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'login-component',
            template: __webpack_require__("./src/app/login/login.component.html"),
            styles: [__webpack_require__("./src/app/login/login.component.css")]
        })
    ], LoginComponent);
    return LoginComponent;
}());



/***/ }),

/***/ "./src/app/shared/web3/drs.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DrsService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("./node_modules/@angular/http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_async__ = __webpack_require__("./node_modules/async/dist/async.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_async___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_async__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__ = __webpack_require__("./node_modules/rxjs/_esm5/Subject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_BehaviorSubject__ = __webpack_require__("./node_modules/rxjs/_esm5/BehaviorSubject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/map.js");
/**
 * @fileoverview File to interact with Web3
 * @package
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






// import * as Web3 from 'web3';
// import Web3 from 'web3';
// const Web3 = require('web3');
// const web3 = new Web3(Web3.givenProvider || "ws://localhost:8546");
/**
 * Class to handle DRS Contract interactions
 */
var DrsService = (function () {
    /**
     * Constructor function.  Initializes array and calls on init
     * @param Http http
     */
    function DrsService(http) {
        this.http = http;
        this.update = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* EventEmitter */]();
        this.mainContractAddr = ''; //Main net
        this.contractAddr = '0xF54a6dE3F1FE973c73BfBb9a5B35D3695Ea277D2'; // Rinkeby Default
        this.defaultNodeIP = 'MetaMask'; // Default node
        this.nodeConnected = true; // If we've established a connection yet
        this.selectedParentKey = new __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__["a" /* Subject */]();
        this.selectedChildKey = new __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__["a" /* Subject */]();
        this.authorized = new __WEBPACK_IMPORTED_MODULE_4_rxjs_BehaviorSubject__["a" /* BehaviorSubject */](false);
        this.loaded = new __WEBPACK_IMPORTED_MODULE_4_rxjs_BehaviorSubject__["a" /* BehaviorSubject */](false);
        this.parentKeyChanged$ = this.selectedParentKey.asObservable();
        this.childKeyChanged$ = this.selectedChildKey.asObservable();
        this.loginChanged$ = this.authorized.asObservable();
        this.onLoad$ = this.loaded.asObservable();
        this.services = [];
        this.keys = [];
        this.keysData = [];
        this.keyOwners = {};
        this.keyAccess = {};
        this.ngOnInit();
    }
    /**
     * ngOnInit function.  Loads all initial data needed
     *
     */
    DrsService.prototype.ngOnInit = function () {
        var _this = this;
        var self = this;
        this.contract = this.http.get("./data/HealthDRS.json")
            .map(function (response) { return response.json(); })
            .subscribe(function (result) {
            _this.contract = result;
            _this._contract = _this.web3.eth.contract(_this.contract.abi);
            if (_this.web3.version.network == 1) {
                //User Main net contract Address
                _this.contractAddr = _this.mainContractAddr;
            }
            if (_this.unlockedAccount) {
                _this.loadKeysAndServices();
            }
            new Promise(function (resolve, reject) {
                _this._contract.at(_this.contractAddr).getKeyCount(function (error, result) {
                    if (!error) {
                        _this.keyNumber = result.c[0];
                        // resolve(result);
                    }
                    else {
                        console.log('error from key count:', error);
                        // reject(error)
                    }
                });
            });
        });
    };
    DrsService.prototype.loadKeysAndServices = function () {
        var self = this;
        __WEBPACK_IMPORTED_MODULE_2_async__["parallel"]([
            function loadServices(next) {
                //gets a list of services
                var serviceEvent = self.web3.eth.contract(self.contract.abi).at(self.contractAddr).ServiceCreated({}, { fromBlock: 1649845, toBlock: 'latest' }, function (err, event) {
                    // console.log(err, event)
                });
                serviceEvent.get(function (error, results) {
                    // we have the results, now print them
                    __WEBPACK_IMPORTED_MODULE_2_async__["each"](results, function (result, nextResult) {
                        var resultArgs = result["args"] || {};
                        if (resultArgs._owner == self.unlockedAccount) {
                            self.services.push(resultArgs);
                        }
                        nextResult();
                    }, next);
                });
            },
            function loadKeys(next) {
                var keyEvent = self.web3.eth.contract(self.contract.abi).at(self.contractAddr).KeyCreated({}, { fromBlock: 0, toBlock: 'latest' }, function (err, event) {
                    //console.log(err, event)
                });
                keyEvent.get(function (error, results) {
                    // we have the results, now print them
                    __WEBPACK_IMPORTED_MODULE_2_async__["each"](results, function (result, nextResult) {
                        var args = result && result["args"] || {};
                        __WEBPACK_IMPORTED_MODULE_2_async__["series"]([
                            function getOwners(done) {
                                self.getKeyOwners(args._key, 0, []).then(function (result) {
                                    self.keyOwners[args._key] = result;
                                    done();
                                });
                            },
                            function getInfo(done) {
                                if (args._owner == self.unlockedAccount) {
                                    self.getKeyInfo(args._key).then(function (info) {
                                        self.keys.push({
                                            key: args._key,
                                            owner: args._owner,
                                            share: info[1],
                                            trade: info[2],
                                            sell: info[3],
                                            service: info[4]
                                        });
                                        self.keysData.push(info);
                                        done();
                                    });
                                }
                                else {
                                    //getUrlFromKey
                                    self.isKeyOwner(args._key, self.unlockedAccount).then(function (resultOwner) {
                                        if (resultOwner) {
                                            self.keyAccess[args._key] = { 'key': args._key };
                                            self.getUrlFromKey(args._key).then(function (resultUrl) {
                                                self.keyAccess[args._key]['url'] = resultUrl;
                                            }.bind(self));
                                            self.getKeyInfo(args._key).then(function (keyResult) {
                                                self.keyAccess[args._key]['share'] = keyResult[1];
                                                self.keyAccess[args._key]['trade'] = keyResult[2];
                                                self.keyAccess[args._key]['sell'] = keyResult[3];
                                                self.keyAccess[args._key]['service'] = keyResult[4];
                                            });
                                        }
                                        done();
                                    });
                                }
                            }
                        ], nextResult);
                    }, next);
                });
            },
            function loadServiceList(next) {
                self._contract = self.web3.eth.contract(self.contract.abi);
                self._contract.at(self.contractAddr).serviceList(3, function (error, eventResult) {
                    next();
                    if (error) {
                        console.log('3Error in myEvent event handler: ' + error);
                    }
                    else {
                    }
                });
            }
        ], function (err) {
            self.loaded.next(true);
        });
    };
    DrsService.prototype.changeParentKey = function (parentKey) {
        this.selectedParentKey.next(parentKey);
    };
    DrsService.prototype.changeChildKey = function (childKey) {
        this.selectedChildKey.next(childKey);
    };
    /**
     * dataRequestTest function.  Sends signed message to a gatekeeper, based on key, parameter and key url, to retrive data.
     * @param urlKey:  The data form the key to be treated as a url to call
     * @param parameter:  Pareamter to use in the request
     * @param key:  The id of the key to use to unlock the data
     * @return {json | file} returns Json or a file
     */
    //TODO:  Break into a function for json and a function for sharing
    DrsService.prototype.dataRequestTest = function (urlKey, parameter, key) {
        var _this = this;
        //determines signer and message
        var signature;
        var signer = this.unlockedAccount || this.web3.eth.defaultAccount || this.web3.eth.accounts[0];
        var original_message = "DRS Message";
        var message_hash = this.web3.sha3('\u0019Ethereum Signed Message:\n' +
            original_message.length.toString() +
            original_message);
        var p = new Promise(function (resolve, reject) {
            _this.web3.eth.sign(signer, message_hash, function (err, res) {
                if (err)
                    console.error(err);
                signature = res;
                var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/octet-stream',
                });
                //      responseType: ResponseContentType.Blob,
                var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({
                    responseType: __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* ResponseContentType */].ArrayBuffer
                });
                var url = 'http://' + urlKey + this.unlockedAccount + '/' + signature + '/' + message_hash + '/' + parameter + '/' + key;
                return this.http.get(url, options)
                    .subscribe(function (result) {
                    console.log('result: ', result);
                    resolve(result);
                });
            }.bind(_this));
        });
        return p;
    };
    /**
     * updatePhuse function.  Sends signed message to a gatekeeper, based on key, parameter and key url, to retrive data.
     * @param urlKey:  The data form the key to be treated as a url to call
     * @param parameter:  Parameter to use in the request
     * @param key:  The id of the key to use to unlock the data
     * @return {json | file} returns Json or a file
     */
    DrsService.prototype.updatePhuse = function (urlKey, phuseNumber) {
        var _this = this;
        //determines signer and message
        var signature;
        var signer = this.unlockedAccount || this.web3.eth.defaultAccount || this.web3.eth.accounts[0];
        var original_message = "DRS Message";
        var message_hash = this.web3.sha3('\u0019Ethereum Signed Message:\n' +
            original_message.length.toString() +
            original_message);
        console.log("UPDATE PHUSE: ", urlKey, phuseNumber);
        var p = new Promise(function (resolve, reject) {
            _this.web3.eth.sign(signer, message_hash, function (err, res) {
                if (err)
                    console.error(err);
                signature = res;
                var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/octet-stream',
                });
                var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({
                    responseType: __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* ResponseContentType */].ArrayBuffer
                });
                var url = 'http://' + urlKey + 'register/' + this.unlockedAccount + '/' + signature + '/' + message_hash + '/' + phuseNumber;
                return this.http.get(url, options)
                    .subscribe(function (result) {
                    resolve(result);
                });
            }.bind(_this));
        });
        return p;
    };
    /**
     * updatePhuse function.  Sends signed message to a gatekeeper, based on key, parameter and key url, to retrive data.
     * @param urlKey:  The data form the key to be treated as a url to call
     * @param parameter:  Pareamter to use in the request
     * @param key:  The id of the key to use to unlock the data
     * @return {json | file} returns Json or a file
     */
    DrsService.prototype.uploadFile = function (file, urlKey) {
        var _this = this;
        //determines signer and message
        var signature;
        var signer = this.unlockedAccount || this.web3.eth.defaultAccount || this.web3.eth.accounts[0];
        var original_message = "DRS Message";
        var message_hash = this.web3.sha3('\u0019Ethereum Signed Message:\n' +
            original_message.length.toString() +
            original_message);
        console.log("UPDATE PHUSE: ", urlKey);
        var p = new Promise(function (resolve, reject) {
            _this.web3.eth.sign(signer, message_hash, function (err, res) {
                if (err)
                    console.error(err);
                signature = res;
                var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/octet-stream',
                });
                var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({
                    responseType: __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* ResponseContentType */].ArrayBuffer
                });
                var url = 'http://' + urlKey + 'upload/' + this.unlockedAccount + '/' + signature + '/' + message_hash;
                var formData = new FormData();
                formData.append('fileKey', file, file.name);
                console.log("HERE", file);
                return this.http.post(url, formData, options)
                    .subscribe(function (result) {
                    console.log("RESULT: ", result);
                });
                // return this.http.get(url, options)
                //           .subscribe(result => {
                //             resolve(result);
                //           })
            }.bind(_this));
        });
        return p;
    };
    /**
     * initializeWeb3 function.  initalizes web3
     */
    DrsService.prototype.initializeWeb3 = function () {
        this.nodeIP = 'MetaMask';
        this.connectToNode(); // Connect to whatever's available
    };
    /**
     * getServices function.  Returns all services on the drs contract
     * @return {Array<json>} returns an array of json obejcts of all the services
     */
    DrsService.prototype.getServices = function () {
        return this.services;
    };
    /**
     * getKeys function.  Returns all keys on the drs contract
     * @return {Array<json>} returns an array of json obejcts of all the keys
     */
    DrsService.prototype.getKeys = function () {
        return this.keys;
    };
    /**
     * getKeys function.  Returns all key owners on the drs contract
     * @return {Array<json>} returns an array of json obejcts of all the keys
     */
    DrsService.prototype.returnKeyOwners = function () {
        return this.keyOwners;
    };
    /**
     * getKeysData function.  Returns all key data on the drs contract
     * @return {Array<json>} returns an array of json obejcts of all the keys
     */
    DrsService.prototype.getKeysData = function () {
        return this.keysData;
    };
    /**
     * getKeysData function.  Returns all keyAccess(owners/sharers) data
     * @return {Array<json>} returns an array of json obejcts of all the keyAccess
     */
    DrsService.prototype.getkeyAccess = function () {
        return this.keyAccess;
    };
    /**
     * authorizedToSpend function.  retrieves how much HLTH a user is allowed to spend
     * @return {jso>} returns an error or success
     */
    DrsService.prototype.authorizedToSpend = function () {
        var _this = this;
        this._contract = this.web3.eth.contract(this.contract.abi);
        var p = new Promise(function (resolve, reject) {
            _this._contract.at(_this.contractAddr).authorizedToSpend(function (error, result) {
                if (!error) {
                    resolve(result);
                }
                else {
                    reject(error);
                }
            });
        });
        return p;
    };
    /**
     * createservice function.  creates a service with the given string
     * @param url:  String to be stored with the service, suggested url
     * @return {json} success or error
     */
    DrsService.prototype.createservice = function (url) {
        var _this = this;
        this._contract = this.web3.eth.contract(this.contract.abi);
        var p = new Promise(function (resolve, reject) {
            _this._contract.at(_this.contractAddr).createService(url, function (error, result) {
                if (!error) {
                    var result2 = _this.web3.toAscii(result);
                    resolve(result2);
                }
                else {
                    reject(error);
                }
            });
        });
        return p;
    };
    /**
     * getServiceCount function.  Gets a count on the number of services
     * @return {json} error or success.  Success contains number of services
     */
    DrsService.prototype.getServiceCount = function () {
        var _this = this;
        this._contract = this.web3.eth.contract(this.contract.abi);
        var p = new Promise(function (resolve, reject) {
            _this._contract.at(_this.contractAddr).getServiceCount(function (error, result) {
                if (!error) {
                    resolve(result);
                }
                else {
                    console.log('error from:', error);
                    reject(error);
                }
            });
        });
        return p;
    };
    /**
     * getKeyOwners function.  Retreive array of owners of keys
     * @return {json} error or success.  Success contains an array of key owners
     */
    DrsService.prototype.getKeyOwners = function (key, index, finalResult) {
        var _this = this;
        this._contract = this.web3.eth.contract(this.contract.abi);
        var p = new Promise(function (resolve, reject) {
            _this._contract.at(_this.contractAddr).owners(key, index, function (error, result) {
                if (!error) {
                    if (result != '0x') {
                        finalResult.push(result);
                        resolve(_this.getKeyOwners(key, index + 1, finalResult));
                    }
                    else {
                        resolve(finalResult);
                    }
                }
                else {
                    console.log('error from:', error);
                    reject(error);
                }
            });
        });
        return p;
    };
    /**
     * getServiceIds function.  Retreive array of owners of keys
     * @param index:  int index of service to get
     * @return {json} error or success.  Success contains a service object
     */
    DrsService.prototype.getServiceIds = function (index) {
        var _this = this;
        var p = new Promise(function (resolve, reject) {
            _this._contract.at(_this.contractAddr).serviceList(index, function (error, result) {
                if (!error) {
                    resolve(result);
                }
                else {
                    console.log(error);
                    reject(error);
                }
            });
        });
        return p;
    };
    /**
     * isKeyOwner function.  Determines if user is a key owner of given key
     * @param key:  id of key to check for ownership
     * @param account:  address of user to check for ownership
     * @return {json} error or success.  Success contains a boolean of if its a owner or not
     */
    DrsService.prototype.isKeyOwner = function (key, account) {
        var _this = this;
        var p = new Promise(function (resolve, reject) {
            _this._contract.at(_this.contractAddr).isKeyOwner(key, account, function (error, result) {
                if (!error) {
                    resolve(result);
                }
                else {
                    console.log(error);
                    reject(error);
                }
            });
        });
        return p;
    };
    /**
     * getServiceURL function.  Retrieves URL for service
     * @param id:  id of service to retrieve url
     * @return {json} error or success.  Success contains a json object with the url
     */
    DrsService.prototype.getServiceURL = function (id) {
        var _this = this;
        var p = new Promise(function (resolve, reject) {
            _this._contract.at(_this.contractAddr).getUrl(id, function (error, result) {
                if (!error) {
                    resolve(result);
                }
                else {
                    console.log('error:', error);
                    reject(error);
                }
            });
        });
        return p;
    };
    /**
     * isServiceOwner function.  Determines if user is a service owner of given service
     * @param id:  id of service to check for ownership
     * @return {json} error or success.  Success contains a boolean of if its a owner or not
     */
    DrsService.prototype.isServiceOwner = function (id) {
        var _this = this;
        var p = new Promise(function (resolve, reject) {
            _this._contract.at(_this.contractAddr).isServiceOwner(id, _this.unlockedAccount, function (error, result) {
                if (!error) {
                    resolve(result);
                }
                else {
                    console.log(error);
                }
            });
        });
        return p;
    };
    /**
     * shareService function.  Shares a key with another usere
     * @param id:  id of key to share
     * @param account:  id of acount to share with
     * @return {json} error or success.
     */
    DrsService.prototype.shareService = function (id, account) {
        var _this = this;
        var p = new Promise(function (resolve, reject) {
            _this._contract.at(_this.contractAddr).shareService(id, account, function (error, result) {
                if (!error) {
                    resolve(result);
                }
                else {
                    console.log(error);
                }
            });
        });
        return p;
    };
    /**
     * unshareService function. Unshares a given service
     * @param id:  id of service to share
     * @param account:  address of user to share with
     * @return {json} error or success.  Success contains a boolean for successful unsharing
     */
    DrsService.prototype.unshareService = function (id, account) {
        var _this = this;
        var p = new Promise(function (resolve, reject) {
            _this._contract.at(_this.contractAddr).unshareService(id, account, function (error, result) {
                if (!error) {
                    resolve(result);
                }
                else {
                    console.log(error);
                }
            });
        });
        return p;
    };
    /**
     * updateURL function. Updates the URL of a given service
     * @param id:  id of service to update
     * @param url:  Url to update to
     * @return {json} error or success.  Success contains a boolean for successful update
     */
    DrsService.prototype.updateURL = function (id, url) {
        var _this = this;
        var p = new Promise(function (resolve, reject) {
            _this._contract.at(_this.contractAddr).updateUrl(id, url, function (error, result) {
                if (!error) {
                    resolve(result);
                }
                else {
                    console.log(error);
                }
            });
        });
        return p;
    };
    /**
     * createKey function. Creates a key for the given service for the current user
     * @param id:  id of the service to create a key for
     * @return {json} error or success.  Success contains a boolean for successful create
     */
    DrsService.prototype.createKey = function (id) {
        var _this = this;
        var p = new Promise(function (resolve, reject) {
            _this._contract.at(_this.contractAddr).createKey(id, function (error, result) {
                if (!error) {
                    resolve(result);
                }
                else {
                    console.log(error);
                }
            });
        });
        return p;
    };
    /**
     * issueKey function.  Creates a key for the given service for the current user
     * @param id:  id of the service to create a key for
     * @param address:  address of the user
     * @return {json} error or success.  Success contains a boolean for successful create
     */
    DrsService.prototype.issueKey = function (id, address) {
        var _this = this;
        var p = new Promise(function (resolve, reject) {
            _this._contract.at(_this.contractAddr).issueKey(id, address, function (error, result) {
                if (!error) {
                    resolve(result);
                }
                else {
                    console.log(error);
                }
            });
        });
        return p;
    };
    /**
     * permissionKey function.  Set permission on key for exchanging
     * @param id:  id of the key to set permissions for
     * @param canShare:  boolean for if the user can share
     * @param canTrade:  boolean for if the user can trade
     * @param canSell:  boolean for if the user can sell
     * @return {json} error or success.
     */
    DrsService.prototype.permissionKey = function (id, canShare, canTrade, canSell) {
        var _this = this;
        var p = new Promise(function (resolve, reject) {
            _this._contract.at(_this.contractAddr).setKeyPermissions(id, canShare, canTrade, canSell, function (error, result) {
                if (!error) {
                    resolve(result);
                }
                else {
                    console.log(error);
                }
            });
        });
        return p;
    };
    /**
     * shareKey function.  shares a key with the given account
     * @param key:  id of the key to share
     * @param account:  address of the account to share with
     * @return {json} error or success.
     */
    DrsService.prototype.shareKey = function (key, account) {
        var _this = this;
        var p = new Promise(function (resolve, reject) {
            _this._contract.at(_this.contractAddr).shareKey(key, account, function (error, result) {
                if (!error) {
                    resolve(result);
                }
                else {
                    reject(error);
                    console.log(error);
                }
            });
        });
        return p;
    };
    /**
     * unshareKey function. Unshares a given key
     * @param id:  id of key to share
     * @param account:  address of user to share with
     * @return {json} error or success.  Success contains a boolean for successful unsharing
     */
    DrsService.prototype.unshareKey = function (key, account) {
        var _this = this;
        var p = new Promise(function (resolve, reject) {
            _this._contract.at(_this.contractAddr).unshareKey(key, account, function (error, result) {
                if (!error) {
                    resolve(result);
                }
                else {
                    console.log(error);
                }
            });
        });
        return p;
    };
    /**
     * createSalesOffer function. creates a sales offer for a given key and buyer
     * @param key:  id of key to offer
     * @param buyer:  address of buyer to share with
     * @param price:  amount to sell for
     * @param canSell:  ability to sell
     * @return {json} error or success.  Success contains a boolean for successful create sales offer
     */
    DrsService.prototype.createSalesOffer = function (key, buyer, price, canSell) {
        var _this = this;
        var p = new Promise(function (resolve, reject) {
            _this._contract.at(_this.contractAddr).createSalesOffer(key, buyer, price, canSell, function (error, result) {
                if (!error) {
                    resolve(result);
                }
                else {
                    reject(error);
                    console.log(error);
                }
            });
        });
        return p;
    };
    /**
     * cancelSalesOffer function. cancels all sales offers for a given key
     * @param key:  id of key to cancel all offers for
     * @return {json} error or success.  Success contains a boolean for successful cancel
     */
    DrsService.prototype.cancelSalesOffer = function (key) {
        var _this = this;
        var p = new Promise(function (resolve, reject) {
            _this._contract.at(_this.contractAddr).cancelSalesOffer(key, function (error, result) {
                if (!error) {
                    resolve(result);
                }
                else {
                    reject(error);
                    console.log(error);
                }
            });
        });
        return p;
    };
    /**
     * purchaseKey function. Purchase a key with an outstanding offer
     * @param key:  id of key to purchase
     * @return {json} error or success.  Success contains a boolean for successful unsharing
     */
    DrsService.prototype.purchaseKey = function (key) {
        var _this = this;
        var p = new Promise(function (resolve, reject) {
            _this._contract.at(_this.contractAddr).purchaseKey(key, function (error, result) {
                if (!error) {
                    resolve(result);
                }
                else {
                    reject(error);
                    console.log(error);
                }
            });
        });
        return p;
    };
    /**
     * tradeKey function. trades a key with a second key if there is a pending offer
     * @param key1:  id of key1 to trade
     * @param key2:  id of key2 to trade
     * @return {json} error or success.  Success contains a boolean for successful trade
     */
    DrsService.prototype.tradeKey = function (key1, key2) {
        var _this = this;
        var p = new Promise(function (resolve, reject) {
            _this._contract.at(_this.contractAddr).tradeKey(key1, key2, function (error, result) {
                if (!error) {
                    resolve(result);
                }
                else {
                    reject(error);
                    console.log(error);
                }
            });
        });
        return p;
    };
    /**
     * CreateTradeKeyOffer function. creates a trade offer for a key and a second key
     * @param key1:  id of key1 to trade
     * @param key2:  id of key2 to trade
     * @return {json} error or success.  Success contains a boolean for successful trade offer
     */
    DrsService.prototype.CreateTradeKeyOffer = function (key1, key2) {
        var _this = this;
        var p = new Promise(function (resolve, reject) {
            _this._contract.at(_this.contractAddr).createTradeOffer(key1, key2, function (error, result) {
                if (!error) {
                    resolve(result);
                }
                else {
                    reject(error);
                    console.log(error);
                }
            });
        });
        return p;
    };
    /**
     * cancelTradeKey function. cancels all trade offers for a given key
     * @param key:  id of key to cancel trade offers
     * @return {json} error or success.  Success contains a boolean for successful cancel
     */
    DrsService.prototype.cancelTradeKey = function (key) {
        var _this = this;
        var p = new Promise(function (resolve, reject) {
            _this._contract.at(_this.contractAddr).cancelTradeOffer(key, function (error, result) {
                if (!error) {
                    resolve(result);
                }
                else {
                    reject(error);
                    console.log(error);
                }
            });
        });
        return p;
    };
    /**
     * setKeyData function. creates or updates a datavalue on a key
     * @param key:  id of key to create data for
     * @param dataKey:  parameter name of the data
     * @param dataValue:  the data
     * @return {json} error or success.  Success contains a boolean for creation
     */
    DrsService.prototype.setKeyData = function (key, dataKey, dataValue) {
        var _this = this;
        var p = new Promise(function (resolve, reject) {
            _this._contract.at(_this.contractAddr).setKeyData(key.toString(), dataKey, dataValue, function (error, result) {
                if (!error) {
                    resolve(result);
                }
                else {
                    reject(error);
                    console.log(error);
                }
            });
        });
        return p;
    };
    /**
     * getKeyInfo function. gets basic infomraiton on key
     * @param key:  id of key to get data on
     * @return {json} error or success.  Json contains owner, canShare, canSell, canTrade, and parent service values
     */
    DrsService.prototype.getKeyInfo = function (key) {
        var _this = this;
        var p = new Promise(function (resolve, reject) {
            _this._contract.at(_this.contractAddr).getKey(key, function (error, result) {
                if (!error) {
                    result.push(key);
                    resolve(result);
                }
                else {
                    console.log(error);
                    reject(error);
                }
            });
        });
        return p;
    };
    /**
     * hexToAscii function. Turns hex to ascii
     * @param str1:  string to convert
     * @return {str} ascii string
     */
    DrsService.prototype.hexToAscii = function (str1) {
        var hex = str1.toString();
        var str = '';
        for (var n = 0; n < hex.length; n += 2) {
            str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
        }
        return str;
    };
    /**
     * getKeyData function. retrieves data on given parameter from given key
     * @param key:  id of key to retrieve data on
     * @param dataKey:  parameter to retrieve data on
     * @return {json} contains the data of the parameter
     */
    DrsService.prototype.getKeyData = function (key, dataKey) {
        var _this = this;
        var p = new Promise(function (resolve, reject) {
            _this._contract.at(_this.contractAddr).getKeyData(key, dataKey, function (error, result) {
                if (!error) {
                    result = _this.hexToAscii(result);
                    resolve(result);
                }
                else {
                    reject(error);
                    console.log(error);
                }
            });
        });
        return p;
    };
    /**
     * getUrlFromKey function. retrieves url tied to a given key
     * @param key:  id of key to retrieve data on
     * @return {json} contains the url for the key
     */
    DrsService.prototype.getUrlFromKey = function (key) {
        var _this = this;
        var p = new Promise(function (resolve, reject) {
            _this._contract.at(_this.contractAddr).getUrlFromKey(key, function (error, result) {
                if (!error) {
                    resolve(result);
                }
                else {
                    console.log(error);
                }
            });
        });
        return p;
    };
    /**
     * logAccess function. A service can log access from any of its keys.
     * @param key:  id of key to log for
     * @param data:  data to log
     * @return {json}
     */
    DrsService.prototype.logAccess = function (key, data) {
        var _this = this;
        var p = new Promise(function (resolve, reject) {
            _this._contract.at(_this.contractAddr).logAccess(key, data, function (error, result) {
                if (!error) {
                    resolve(result);
                }
                else {
                    console.log(error);
                }
            });
        });
        return p;
    };
    /**
     * message function. services and keys can log messages to each other
     * @param from:  Sender of message
     * @param to:  retriever of message
     * @param category:  category of message
     * @param data:  data to be sent
     * @return {json} contains the url for the key
     */
    DrsService.prototype.message = function (from, to, category, data) {
        var _this = this;
        var p = new Promise(function (resolve, reject) {
            _this._contract.at(_this.contractAddr).message(from, to, category, data, function (error, result) {
                if (!error) {
                    resolve(result);
                }
                else {
                    console.log(error);
                }
            });
        });
        return p;
    };
    /**
     * log function. any key or service can log
     * @param from:  who logged hte message
     * @param data:  data to log
     * @return {json} contains the url for the key
     */
    DrsService.prototype.log = function (from, data) {
        var _this = this;
        var p = new Promise(function (resolve, reject) {
            _this._contract.at(_this.contractAddr).log(from, data, function (error, result) {
                if (!error) {
                    resolve(result);
                }
                else {
                    console.log(error);
                }
            });
        });
        return p;
    };
    /**
     * weiToEth function. any key or service can log
     * @param wei:  amount to convert
     * @return {number} converted wei to Eth
     */
    DrsService.prototype.weiToEth = function (wei) {
        return parseFloat(this.web3.fromWei(wei, 'ether'));
    };
    /**
     * connected function. tests connection
     *
     *
     */
    DrsService.prototype.connected = function () {
        var _this = this;
        var p = new Promise(function (resolve, reject) {
            if (_this.nodeIP !== 'MetaMask') {
                _this.web3.eth.sendTransaction({ from: _this.web3.eth.defaultAccount, to: _this.web3.eth.defaultAccount, value: 0, gas: 0, gasPrice: 0 }, function (err, res) {
                    if (err.toString() !== 'Error: account is locked') {
                        _this.unlockedAccount = _this.web3.eth.accounts[0];
                        if (_this.unlockedAccount) {
                            if (!_this.loaded.value) {
                                _this.loadKeysAndServices();
                            }
                            _this.authorized.next(true);
                        }
                        _this.update.emit(null);
                        console.log('Connected to account: ' + _this.unlockedAccount);
                        resolve(true);
                    }
                    else {
                        console.log('Error: Could not find an unlocked account: ', err);
                        resolve(false);
                    }
                });
            }
            else {
                _this.unlockedAccount = _this.web3.eth.accounts[0];
                if (_this.unlockedAccount) {
                    _this.authorized.next(true);
                }
                resolve(false);
            }
        });
        return p;
    };
    /**
     * handleConnection function.
     * @param connect:
     *
     */
    DrsService.prototype.handleConnection = function (connect) {
        if (connect) {
            this.connected();
        }
        else {
            this.nodeIP = this.defaultNodeIP;
            this.connectToNode();
        }
        this.nodeConnected = connect;
    };
    /**
     * connectToNode function:  Connects to a node
     *
     */
    DrsService.prototype.connectToNode = function () {
        if (typeof window['web3'] !== 'undefined' && (!localStorage['nodeIP'] || this.nodeIP === 'MetaMask')) {
            localStorage['nodeIP'] = this.nodeIP;
            this.web3 = new this.Web3(window['web3'].currentProvider);
            this.nodeIP = 'MetaMask';
            this.nodeConnected = true;
            this.unlockedAccount = 'MetaMask';
            this.update.emit(null);
            this.handleConnection(this.web3.isConnected());
        }
        else {
            localStorage['nodeIP'] = this.nodeIP;
            this.unlockedAccount = undefined;
            this.web3 = new this.Web3(new this.Web3.providers.HttpProvider(this.nodeIP));
            this.handleConnection(this.web3.isConnected());
        }
    };
    Object.defineProperty(DrsService.prototype, "isConnected", {
        /**
         * isConnected function:  checks connection status
         *
         */
        get: function () {
            return this.nodeConnected;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrsService.prototype, "web3", {
        /**
         * web3 function:  starts and gets web3
         *
         */
        get: function () {
            if (!this.web3Instance) {
                this.initializeWeb3();
            }
            return this.web3Instance;
        },
        /**
         * web3 function:  sets web3
         *
         */
        set: function (web3) {
            this.web3Instance = web3;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrsService.prototype, "currentAcc", {
        /**
         * currentAcc function: gets current account
         *
         */
        get: function () {
            return this.unlockedAccount;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrsService.prototype, "currentAddr", {
        /**
         * currentAddr function: gets current address
         *
         */
        get: function () {
            return this.contractAddr;
        },
        /**
         * currentAddr function: sets current address
         *
         */
        set: function (contractAddr) {
            if (contractAddr.length === 42 || contractAddr.length === 40) {
                this.contractAddr = contractAddr;
            }
            else {
                console.log('Invalid address used');
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrsService.prototype, "currentNode", {
        /**
         * currentNode function: gets current node
         *
         */
        get: function () {
            return this.nodeIP;
        },
        /**
         * currentAddr function: sets current node
         *
         */
        set: function (nodeIP) {
            this.nodeIP = nodeIP;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrsService.prototype, "Web3", {
        /**
         * Web3 function: retunrs web3 in the window
         *
         */
        get: function () {
            return window['Web3'];
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* Output */])(),
        __metadata("design:type", Object)
    ], DrsService.prototype, "update", void 0);
    DrsService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]])
    ], DrsService);
    return DrsService;
}());



/***/ }),

/***/ "./src/app/shared/web3/healthcash.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HealthcashService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("./node_modules/@angular/http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__ = __webpack_require__("./node_modules/rxjs/_esm5/BehaviorSubject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/map.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



// const Web3 = require('web3');

// import * as Web3 from 'web3';
// import Web3 from 'web3';
// const Web3 = require('web3');
// const web3 = new Web3(Web3.givenProvider || "ws://localhost:8546");
/**
 * Class to handle HLTH Cash Contract interactions
 */
var HealthcashService = (function () {
    /**
     * Constructor function.  Initializes array and calls on init
     * @param Http http
     */
    function HealthcashService(http) {
        this.http = http;
        this.update = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* EventEmitter */]();
        this.rinkebyContractAddr = '0x8a1eD83DfB3ea079ee7F057e1E7eCE964A1c6259';
        this.mainContractAddr = '';
        this.rinkebyDrsAddr = '0xF54a6dE3F1FE973c73BfBb9a5B35D3695Ea277D2';
        this.mainDrsAddr = '';
        this.defaultNodeIP = 'MetaMask'; // Default node
        this.nodeConnected = true; // If we've established a connection yet
        this.balance = new __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__["a" /* BehaviorSubject */](0);
        this.canspend = new __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__["a" /* BehaviorSubject */](0);
        this.currentBalance = this.balance.asObservable();
        this.allowedToSpend = this.canspend.asObservable();
        if (!window.hasOwnProperty('web3')) {
            return;
        }
        this.ngOnInit();
        //set our addresses based on the network
        switch (this.web3.version.network) {
            case '1':
                this.contractAddr = this.mainContractAddr;
                this.drsAddr = this.mainDrsAddr;
                break;
            default:
                this.contractAddr = this.rinkebyContractAddr;
                this.drsAddr = this.rinkebyDrsAddr;
        }
    }
    /**
     * ngOnInit function.  Loads all initial data needed
     *
     */
    HealthcashService.prototype.ngOnInit = function () {
        var _this = this;
        var p = new Promise(function (resolve, reject) {
            _this.http.get("./data/HealthCash.json")
                .map(function (response) { return response.json(); })
                .subscribe(function (result) {
                _this.contract = result;
                _this._contract = _this.web3.eth.contract(_this.contract.abi);
                _this.balanceOf();
                _this.drsApprovedFor();
                resolve(result);
            });
        });
    };
    /**
     * initializeWeb3 function.  Initializes web3
     *
     */
    HealthcashService.prototype.initializeWeb3 = function () {
        this.ngOnInit();
        this.nodeIP = 'MetaMask';
        this.connectToNode(); // Connect to whatever's available
    };
    /**
     * setTransferAgent function.  sets future transfer agent
     *
     */
    HealthcashService.prototype.setTransferAgent = function () {
        var _this = this;
        this._contract = this.web3.eth.contract(this.contract.abi);
        var p = new Promise(function (resolve, reject) {
            _this._contract.at(_this.contractAddr).setTransferAgent('0x2c104bb9E7098Ccc5a537caF2daE52caC4E4e5B5', true, function (error, result) {
                if (!error) {
                    resolve(result);
                }
                else {
                    console.log('error from transfer agent:', error);
                    reject(error);
                }
            });
        });
        return p;
    };
    /**
     * approve function. approves users hlth to be used by DRS to set amount
     * @param amount:  amount to approve for
     */
    HealthcashService.prototype.approve = function (amount) {
        var _this = this;
        var p = new Promise(function (resolve, reject) {
            _this._contract.at(_this.contractAddr).approve(_this.drsAddr, amount, function (error, result) {
                if (!error) {
                    resolve(result);
                }
                else {
                    console.log('error from transfer agent:', error);
                    reject(error);
                }
            });
        });
        return p;
    };
    /**
     * transfer function.  Transfers value to address in hlth
     * @param _to:  address to transfer to
     * @param _value:  amount to transfer for
     */
    HealthcashService.prototype.transfer = function (_to, _value) {
        var _this = this;
        this._contract = this.web3.eth.contract(this.contract.abi);
        var p = new Promise(function (resolve, reject) {
            _this._contract.at(_this.contractAddr).transfer(_to, _value, function (error, result) {
                if (!error) {
                    resolve(result);
                }
                else {
                    console.log('error from transfer:', error);
                    reject(error);
                }
            });
        });
        return p;
    };
    /**
     * drsApprovedFor function. Retrieves how much user is approved for
     * @param amount:  amount to approve for
     * @return {int} amount user is approved for
     */
    HealthcashService.prototype.drsApprovedFor = function () {
        var _this = this;
        if (!this.unlockedAccount) {
            return;
        }
        var p = new Promise(function (resolve, reject) {
            _this._contract.at(_this.contractAddr)
                .allowance(_this.unlockedAccount, _this.drsAddr, function (error, result) {
                if (!error) {
                    _this.canspend.next(result.c[0]);
                    _this.allowedToSpend = result.c[0];
                    resolve(result.c[0]);
                }
                else {
                    console.log('error from allowance:', error);
                    reject(error);
                }
            });
        });
        return p;
    };
    /**
     * balanceOf function. Retrieves Hlth balance
     * @param amount:  amount to approve for
     * @return {int} Hlth Balance
     */
    HealthcashService.prototype.balanceOf = function () {
        var _this = this;
        if (!this.unlockedAccount) {
            return;
        }
        this._contract = this.web3.eth.contract(this.contract.abi);
        var p = new Promise(function (resolve, reject) {
            _this._contract.at(_this.contractAddr).balanceOf(_this.unlockedAccount, function (error, result) {
                if (!error) {
                    _this.balance.next(result.c[0]);
                    _this.currentBalance = result.c[0];
                    resolve(result.c[0]);
                }
                else {
                    console.log('error from balance:', error);
                    reject(error);
                }
            });
        });
        return p;
    };
    /**
     * transferOwnership function. transfers ownership of contract if owner to addr
     * @param addr: address to transfer ownership to
     */
    HealthcashService.prototype.transferOwnership = function (addr) {
        var _this = this;
        this._contract = this.web3.eth.contract(this.contract.abi);
        var p = new Promise(function (resolve, reject) {
            _this._contract.at(_this.contractAddr).transferOwnership(addr, function (error, result) {
                if (!error) {
                    resolve(result);
                }
                else {
                    console.log('error transfer ownership:', error);
                    reject(error);
                }
            });
        });
        return p;
    };
    /**
     * transferFrom function. transfers HLTH from one address to another
     * @param _from: address to transfer from
     * @param _to: address to transferto
     * @param _value: amount to transfer
     */
    HealthcashService.prototype.transferFrom = function (_from, _to, _value) {
        var _this = this;
        this._contract = this.web3.eth.contract(this.contract.abi);
        var p = new Promise(function (resolve, reject) {
            _this._contract.at(_this.contractAddr).transferFrom(_from, _to, _value, function (error, result) {
                if (!error) {
                    console.log('result contract test2:', result);
                    resolve(result);
                }
                else {
                    console.log('error from test2:', error);
                    reject(error);
                }
            });
        });
        return p;
    };
    /**
     * weiToEth function. any key or service can log
     * @param wei:  amount to convert
     * @return {number} converted wei to Eth
     */
    HealthcashService.prototype.weiToEth = function (wei) {
        return parseFloat(this.web3.fromWei(wei, 'ether'));
    };
    /**
     * connected function. tests connection
     *
     *
     */
    HealthcashService.prototype.connected = function () {
        var _this = this;
        var p = new Promise(function (resolve, reject) {
            if (_this.nodeIP !== 'MetaMask') {
                _this.web3.eth.sendTransaction({ from: _this.web3.eth.defaultAccount, to: _this.web3.eth.defaultAccount, value: 0, gas: 0, gasPrice: 0 }, function (err, res) {
                    ;
                    if (err.toString() !== 'Error: account is locked') {
                        _this.unlockedAccount = _this.web3.eth.accounts[0];
                        _this.update.emit(null);
                        console.log('Connected to account: ' + _this.unlockedAccount);
                        resolve(true);
                    }
                    else {
                        console.log('Error: Could not find an unlocked account: ', err);
                        resolve(false);
                    }
                });
            }
            else {
                _this.unlockedAccount = _this.web3.eth.accounts[0];
                console.log('Connected to account: ' + _this.unlockedAccount);
                resolve(false);
            }
        });
        return p;
    };
    /**
     * handleConnection function.
     * @param connect:
     *
     */
    HealthcashService.prototype.handleConnection = function (connect) {
        if (connect) {
            this.connected();
        }
        else {
            this.nodeIP = this.defaultNodeIP;
            this.connectToNode();
        }
        this.nodeConnected = connect;
    };
    /**
     * connectToNode function:  Connects to a node
     *
     */
    HealthcashService.prototype.connectToNode = function () {
        if (typeof window['web3'] !== 'undefined' && (!localStorage['nodeIP'] || this.nodeIP === 'MetaMask')) {
            localStorage['nodeIP'] = this.nodeIP;
            this.web3 = new this.Web3(window['web3'].currentProvider);
            this.nodeIP = 'MetaMask';
            this.nodeConnected = true;
            this.unlockedAccount = 'MetaMask';
            this.update.emit(null);
            this.handleConnection(this.web3.isConnected());
        }
        else {
            localStorage['nodeIP'] = this.nodeIP;
            this.unlockedAccount = undefined;
            this.web3 = new this.Web3(new this.Web3.providers.HttpProvider(this.nodeIP));
            this.handleConnection(this.web3.isConnected());
        }
    };
    Object.defineProperty(HealthcashService.prototype, "isConnected", {
        /**
         * isConnected function:  checks connection status
         *
         */
        get: function () {
            return this.nodeConnected;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HealthcashService.prototype, "web3", {
        /**
         * web3 function:  starts and gets web3
         *
         */
        get: function () {
            if (!this.web3Instance) {
                this.initializeWeb3();
            }
            return this.web3Instance;
        },
        /**
         * web3 function:  sets web3
         *
         */
        set: function (web3) {
            this.web3Instance = web3;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HealthcashService.prototype, "currentAcc", {
        /**
         * currentAcc function: gets current account
         *
         */
        get: function () {
            return this.unlockedAccount;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HealthcashService.prototype, "currentAddr", {
        /**
         * currentAddr function: gets current address
         *
         */
        get: function () {
            return this.contractAddr;
        },
        /**
         * currentAddr function: sets current address
         *
         */
        set: function (contractAddr) {
            if (contractAddr.length === 42 || contractAddr.length === 40) {
                this.contractAddr = contractAddr;
            }
            else {
                console.log('Invalid address used');
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HealthcashService.prototype, "currentNode", {
        /**
        * currentNode function: gets current node
        *
        */
        get: function () {
            return this.nodeIP;
        },
        /**
         * currentAddr function: sets current node
         *
         */
        set: function (nodeIP) {
            this.nodeIP = nodeIP;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HealthcashService.prototype, "Web3", {
        /**
         * Web3 function: retunrs web3 in the window
         *
         */
        get: function () {
            return window['Web3'];
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* Output */])(),
        __metadata("design:type", Object)
    ], HealthcashService.prototype, "update", void 0);
    HealthcashService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]])
    ], HealthcashService);
    return HealthcashService;
}());



/***/ }),

/***/ "./src/app/shared/window-ref.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WindowRefService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

function getWindow() {
    return window;
}
var WindowRefService = (function () {
    function WindowRefService() {
    }
    Object.defineProperty(WindowRefService.prototype, "nativeWindow", {
        get: function () {
            if (window.hasOwnProperty('web3')) {
                return getWindow();
            }
        },
        enumerable: true,
        configurable: true
    });
    WindowRefService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* Injectable */])()
    ], WindowRefService);
    return WindowRefService;
}());



/***/ }),

/***/ "./src/app/tab/tab.component.css":
/***/ (function(module, exports) {

module.exports = ".tab button {\n  outline: 0;\n  background-color: #d9d9d9;\n  color: #3f819e;\n  width: 175px;\n  height: 50px;\n  border: 0px;\n  font-weight: 550;\n  border-radius: 8px 8px 0px 0px;\n}\n\n@media screen and (max-width: 992px) {\n  .tab button {\n    width: 45%;\n  }\n}\n\n.tab button:hover {\n}\n\n.tab button.active {\n    background-color: #6baacc;\n    font-weight: 500;\n    color: white;\n}\n"

/***/ }),

/***/ "./src/app/tab/tab.component.html":
/***/ (function(module, exports) {

module.exports = "<div [hidden]=\"!active\" class=\"content\">\n  <ng-content></ng-content>\n</div>\n"

/***/ }),

/***/ "./src/app/tab/tab.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tabs_tabs_component__ = __webpack_require__("./src/app/tabs/tabs.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var TabComponent = (function () {
    function TabComponent(tabsComponent) {
        this.tabsComponent = tabsComponent;
    }
    TabComponent.prototype.ngOnInit = function () {
        this.tabsComponent.addTab(this);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Input */])(),
        __metadata("design:type", Object)
    ], TabComponent.prototype, "tabTitle", void 0);
    TabComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'app-tab',
            template: __webpack_require__("./src/app/tab/tab.component.html"),
            styles: [__webpack_require__("./src/app/tab/tab.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__tabs_tabs_component__["a" /* TabsComponent */]])
    ], TabComponent);
    return TabComponent;
}());



/***/ }),

/***/ "./src/app/tabs/tabs.component.css":
/***/ (function(module, exports) {

module.exports = ".tab button {\n  outline: 0;\n  background-color: #d9d9d9;\n  color: #3f819e;\n  width: 175px;\n  height: 50px;\n  border: 0px;\n  font-weight: 550;\n  border-radius: 8px 8px 0px 0px;\n}\n\n@media screen and (max-width: 992px) {\n  .tab button {\n    width: 45%;\n  }\n}\n\n.tab button:hover {\n}\n\n.tab button.active {\n    background-color: #6baacc;\n    font-weight: 500;\n    color: white;\n}\n"

/***/ }),

/***/ "./src/app/tabs/tabs.component.html":
/***/ (function(module, exports) {

module.exports = "<ul [hidden]=\"selectedParentKey || selectedChildKey\" class=\"tab\">\n  <li *ngFor=\"let tab of tabs\">\n    <button [class.active]=\"tab.active\" class=\"tablinks\" (click)=\"selectTab(tab)\">{{ tab.tabTitle }}</button>\n  </li>\n</ul>\n<div [hidden]=\"!selectedParentKey && !selectedChildKey\">\n  <div class=\"padding-v-md\">\n    <span class=\"inline clickable\" (click)=\"clearSelectedKeys()\">My Keys</span>\n    <span [ngClass]=\"{'hidden': !selectedParentKey, 'inline': selectedParentKey}\">\n      <span class=\"inline bold\"> > </span>\n      <span class=\"inline\" [ngClass]=\"{'bold': !selectedChildKey, 'clickable': selectedChildKey}\" (click)=\"clearChildKey()\">Parent Key</span>\n    </span>\n    <span class=\"bold\" [ngClass]=\"{'hidden': !selectedChildKey, 'inline': selectedChildKey}\"> > </span>\n    <span class=\"bold\" [ngClass]=\"{'hidden': !selectedChildKey, 'inline': selectedChildKey}\">Child Key</span>\n  </div>\n</div>\n<ng-content></ng-content>\n"

/***/ }),

/***/ "./src/app/tabs/tabs.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_web3_drs_service__ = __webpack_require__("./src/app/shared/web3/drs.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var TabsComponent = (function () {
    function TabsComponent(drsService) {
        this.drsService = drsService;
        this.tabs = [];
    }
    TabsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.drsService.parentKeyChanged$.subscribe(function (selectedParent) {
            _this.selectedParentKey = selectedParent;
        });
        this.drsService.childKeyChanged$.subscribe(function (selectedChild) {
            _this.selectedChildKey = selectedChild;
        });
    };
    TabsComponent.prototype.selectTab = function (tab) {
        this.tabs.forEach(function (tab) {
            tab.active = false;
        });
        tab.active = true;
    };
    TabsComponent.prototype.addTab = function (tab) {
        if (this.tabs.length > 0) {
            tab.active = true;
        }
        this.tabs.push(tab);
    };
    TabsComponent.prototype.clearSelectedKeys = function () {
        this.drsService.changeParentKey(undefined);
        this.drsService.changeChildKey(undefined);
    };
    TabsComponent.prototype.clearChildKey = function () {
        this.drsService.changeChildKey(undefined);
    };
    TabsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'app-tabs',
            template: __webpack_require__("./src/app/tabs/tabs.component.html"),
            styles: [__webpack_require__("./src/app/tabs/tabs.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__shared_web3_drs_service__["a" /* DrsService */]])
    ], TabsComponent);
    return TabsComponent;
}());



/***/ }),

/***/ "./src/app/token/token.component.css":
/***/ (function(module, exports) {

module.exports = ".tokens {\n  font-size: 25px;\n  font-weight: 100;\n}\n\n.alert {\n  position: absolute; /*thats all*/\n  right: 0;\n  bottom: 20px;\n  background: red;\n  padding: 20px;\n  min-height: 70px;\n  min-width: 400px;\n}\n"

/***/ }),

/***/ "./src/app/token/token.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n  <div class=\"row tokens\">\n    <span>Current HNexus token balance: <span class=\"inline text-bold\">{{ balance }}</span></span>\n    <div class=\"row padding-top-lg\">\n      <!-- <div class=\"col-9 padding-top-lg\">\n        <span>Send tokens</span>\n        <input type=\"text\" class=\"form-control\" placeholder=\"Enter to: address here\" name=\"addr\" #addr>\n        <input type=\"number\" class=\"form-control\" placeholder=\"Enter amount here\" name=\"amount\" #amount>\n        <button class=\"form-control\" (click)=\"transfer(addr.value,amount.value)\">Send</button>\n      </div> -->\n      <div class=\"col-9 padding-top-lg\">\n        <span>\n          Max number of tokens that can be used for key purchases:\n          <span class=\"inline\" *ngIf=\"canspend > 0\">: {{canspend | number}}\n            <span class=\"inline clickable\" (click)=\"editCanSpend()\">change</span>\n          </span>\n        </span>\n        <div *ngIf=\"canspend === 0 || editing\" [class.editing]=\"editing\">\n          <input type=\"number\" class=\"form-control\" placeholder=\"Enter # of tokens here; not to exceed current token balance\" name=\"amount\" #amount>\n          <button class=\"form-control\" (click)=\"approveHLTH(amount.value)\">Approve</button>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/token/token.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TokenComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_web3_healthcash_service__ = __webpack_require__("./src/app/shared/web3/healthcash.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var TokenComponent = (function () {
    function TokenComponent(healthcashService) {
        this.healthcashService = healthcashService;
        this.editing = false;
    }
    TokenComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.healthcashService.currentBalance.subscribe(function (balance) { return _this.balance = balance; });
        this.healthcashService.allowedToSpend.subscribe(function (canspend) { return _this.canspend = canspend; });
    };
    TokenComponent.prototype.balances = function () {
        this.healthcashService.balanceOf();
        this.healthcashService.drsApprovedFor();
    };
    TokenComponent.prototype.editCanSpend = function () {
        this.editing = !this.editing;
    };
    TokenComponent.prototype.transfer = function (addr, amount) {
        this.healthcashService.transfer(addr, amount);
    };
    TokenComponent.prototype.approveHLTH = function (value) {
        this.healthcashService.approve(value);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Input */])(),
        __metadata("design:type", Object)
    ], TokenComponent.prototype, "tokenService", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Input */])(),
        __metadata("design:type", Object)
    ], TokenComponent.prototype, "drsService", void 0);
    TokenComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'app-token',
            template: __webpack_require__("./src/app/token/token.component.html"),
            styles: [__webpack_require__("./src/app/token/token.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__shared_web3_healthcash_service__["a" /* HealthcashService */]])
    ], TokenComponent);
    return TokenComponent;
}());



/***/ }),

/***/ "./src/app/welcome/welcome.component.css":
/***/ (function(module, exports) {

module.exports = ".divider {\n  width: 220px;\n  height: 10px;\n  margin: auto;\n  border-radius: 50px;\n}\n"

/***/ }),

/***/ "./src/app/welcome/welcome.component.html":
/***/ (function(module, exports) {

module.exports = "\n<div class=\"content text-center\">\n\n  <img class=\"padding-md\" src=\"./assets/icon_wallet.svg\" alt=\"health nexus\">\n\n  <span class=\"padding-top-md\">Welcome to the HNexus Wallet.</span>\n  <span>Manage your HNexus tokens and keys here.</span>\n  <div class=\"padding-lg\">\n    <span class=\"brand-blue divider\"></span>\n  </div>\n  \n  <div>\n    <div class=\"text-brand-blue can-click\" (click)=\"reloadPage()\">To begin, login with Metamask.</div>\n    <br>\n    <div>\n      <a href=\"https://metamask.io/\" target=\"_blank\" class=\"text-brand-blue can-click\" style=\"text-decoration:none\"><small>(To install MetaMask, click here)</small></a>\n    </div>\n  </div>\n\n</div>\n\n\n\n"

/***/ }),

/***/ "./src/app/welcome/welcome.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WelcomeComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};

var WelcomeComponent = (function () {
    function WelcomeComponent() {
        var _this = this;
        var Web3 = __webpack_require__("./node_modules/web3/dist/web3.umd.js");
        console.log(window);
        window.addEventListener('load', function () { return __awaiter(_this, void 0, void 0, function () {
            var web3, res, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!window['ethereum']) return [3 /*break*/, 5];
                        web3 = new Web3(window['ethereum']);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, window['ethereum'].enable()];
                    case 2:
                        res = _a.sent();
                        console.log(res);
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        return [3 /*break*/, 4];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        if (window['web3']) {
                            web3 = new Web3(window['web3'].currentProvider);
                            // Acccounts always exposed
                        }
                        else {
                            console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
                            // return dispatch(setMetamaskLoadingStage('Error'))
                        }
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        }); });
    }
    WelcomeComponent.prototype.ngOnInit = function () { };
    WelcomeComponent.prototype.reloadPage = function () {
        if (!window.hasOwnProperty('web3')) {
            window['ethereum'].enable();
        }
        else {
            location.reload();
        }
    };
    WelcomeComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'app-welcome',
            template: __webpack_require__("./src/app/welcome/welcome.component.html"),
            styles: [__webpack_require__("./src/app/welcome/welcome.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], WelcomeComponent);
    return WelcomeComponent;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};


/***/ }),

/***/ "./src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("./node_modules/@angular/platform-browser-dynamic/esm5/platform-browser-dynamic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("./src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("./src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* enableProdMode */])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./src/main.ts");


/***/ }),

/***/ 1:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 2:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 3:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 4:
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map