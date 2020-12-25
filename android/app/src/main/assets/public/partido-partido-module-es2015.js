(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["partido-partido-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/partido/partido.page.html":
/*!*********************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/partido/partido.page.html ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header>\n  <ion-toolbar>\n    <ion-title>Partido</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content fullscreen class=\"ion-padding\">\n<h1>Partido</h1>\n<!-- Red add button -->\n    <ion-fab horizontal=\"end\" vertical=\"bottom\" slot=\"fixed\">\n      <ion-fab-button color=\"danger\">\n        <ion-icon (click)=\"abrirModalPartido()\" name=\"add\"></ion-icon>\n      </ion-fab-button>\n    </ion-fab>\n</ion-content>");

/***/ }),

/***/ "./src/app/partido/partido-routing.module.ts":
/*!***************************************************!*\
  !*** ./src/app/partido/partido-routing.module.ts ***!
  \***************************************************/
/*! exports provided: PartidoPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PartidoPageRoutingModule", function() { return PartidoPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _partido_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./partido.page */ "./src/app/partido/partido.page.ts");




const routes = [
    {
        path: '',
        component: _partido_page__WEBPACK_IMPORTED_MODULE_3__["PartidoPage"]
    }
];
let PartidoPageRoutingModule = class PartidoPageRoutingModule {
};
PartidoPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], PartidoPageRoutingModule);



/***/ }),

/***/ "./src/app/partido/partido.module.ts":
/*!*******************************************!*\
  !*** ./src/app/partido/partido.module.ts ***!
  \*******************************************/
/*! exports provided: PartidoPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PartidoPageModule", function() { return PartidoPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/__ivy_ngcc__/fesm2015/ionic-angular.js");
/* harmony import */ var _partido_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./partido-routing.module */ "./src/app/partido/partido-routing.module.ts");
/* harmony import */ var _partido_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./partido.page */ "./src/app/partido/partido.page.ts");







let PartidoPageModule = class PartidoPageModule {
};
PartidoPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        // entryComponents:[
        //   PartidoModalPage
        // ],
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _partido_routing_module__WEBPACK_IMPORTED_MODULE_5__["PartidoPageRoutingModule"],
        ],
        declarations: [_partido_page__WEBPACK_IMPORTED_MODULE_6__["PartidoPage"]]
    })
], PartidoPageModule);



/***/ }),

/***/ "./src/app/partido/partido.page.scss":
/*!*******************************************!*\
  !*** ./src/app/partido/partido.page.scss ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhcnRpZG8vcGFydGlkby5wYWdlLnNjc3MifQ== */");

/***/ }),

/***/ "./src/app/partido/partido.page.ts":
/*!*****************************************!*\
  !*** ./src/app/partido/partido.page.ts ***!
  \*****************************************/
/*! exports provided: PartidoPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PartidoPage", function() { return PartidoPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/__ivy_ngcc__/fesm2015/ionic-angular.js");
/* harmony import */ var _partido_modal_partido_modal_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../partido-modal/partido-modal.page */ "./src/app/partido-modal/partido-modal.page.ts");




let PartidoPage = class PartidoPage {
    constructor(modalCtrl) {
        this.modalCtrl = modalCtrl;
    }
    ngOnInit() {
    }
    abrirModalPartido() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const modal = yield this.modalCtrl.create({
                component: _partido_modal_partido_modal_page__WEBPACK_IMPORTED_MODULE_3__["PartidoModalPage"],
                componentProps: {
                    equipo: 'CD San Roque EFF',
                    icono: '../../assets/icon/favicon.png'
                }
            });
            yield modal.present();
            const { data } = yield modal.onDidDismiss();
            console.log('retorno del modal', data);
        });
    }
};
PartidoPage.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"] }
];
PartidoPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-partido',
        template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! raw-loader!./partido.page.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/partido/partido.page.html")).default,
        styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! ./partido.page.scss */ "./src/app/partido/partido.page.scss")).default]
    })
], PartidoPage);



/***/ })

}]);
//# sourceMappingURL=partido-partido-module-es2015.js.map