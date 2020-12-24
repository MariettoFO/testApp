(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["entrenamiento-entrenamiento-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/entrenamiento/entrenamiento.page.html":
/*!*********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/entrenamiento/entrenamiento.page.html ***!
  \*********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header>\n  <ion-toolbar>\n    <ion-title>Entrenamiento</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content fullscreen class=\"ion-padding\">\n<h1>Entrenamiento</h1>\n<!-- Red add button -->\n    <ion-fab horizontal=\"end\" vertical=\"bottom\" slot=\"fixed\">\n      <ion-fab-button color=\"danger\">\n        <ion-icon name=\"add\"></ion-icon>\n      </ion-fab-button>\n    </ion-fab>\n</ion-content>\n<!-- <ion-tab-bar slot=\"bottom\">\n  <ion-tab-button tab=\"entrenamiento\" routerLink=\"/entrenamiento\">\n    <ion-label>Entrenamiento</ion-label>\n    <ion-icon name=\"barbell-outline\"></ion-icon>\n  </ion-tab-button>\n  <ion-tab-button tab=\"equipo\" routerLink=\"/equipo\">\n    <ion-label>Equipo</ion-label>\n    <ion-icon name=\"shield-outline\"></ion-icon>\n  </ion-tab-button>\n  <ion-tab-button tab=\"partido\" routerLink=\"/partido\">\n    <ion-label>Partido</ion-label>\n    <ion-icon name=\"football-outline\"></ion-icon>\n  </ion-tab-button>\n</ion-tab-bar> -->");

/***/ }),

/***/ "./src/app/entrenamiento/entrenamiento-routing.module.ts":
/*!***************************************************************!*\
  !*** ./src/app/entrenamiento/entrenamiento-routing.module.ts ***!
  \***************************************************************/
/*! exports provided: EntrenamientoPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EntrenamientoPageRoutingModule", function() { return EntrenamientoPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _entrenamiento_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./entrenamiento.page */ "./src/app/entrenamiento/entrenamiento.page.ts");




const routes = [
    {
        path: '',
        component: _entrenamiento_page__WEBPACK_IMPORTED_MODULE_3__["EntrenamientoPage"]
    }
];
let EntrenamientoPageRoutingModule = class EntrenamientoPageRoutingModule {
};
EntrenamientoPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], EntrenamientoPageRoutingModule);



/***/ }),

/***/ "./src/app/entrenamiento/entrenamiento.module.ts":
/*!*******************************************************!*\
  !*** ./src/app/entrenamiento/entrenamiento.module.ts ***!
  \*******************************************************/
/*! exports provided: EntrenamientoPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EntrenamientoPageModule", function() { return EntrenamientoPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/__ivy_ngcc__/fesm2015/ionic-angular.js");
/* harmony import */ var _entrenamiento_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./entrenamiento-routing.module */ "./src/app/entrenamiento/entrenamiento-routing.module.ts");
/* harmony import */ var _entrenamiento_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./entrenamiento.page */ "./src/app/entrenamiento/entrenamiento.page.ts");







let EntrenamientoPageModule = class EntrenamientoPageModule {
};
EntrenamientoPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _entrenamiento_routing_module__WEBPACK_IMPORTED_MODULE_5__["EntrenamientoPageRoutingModule"]
        ],
        declarations: [_entrenamiento_page__WEBPACK_IMPORTED_MODULE_6__["EntrenamientoPage"]]
    })
], EntrenamientoPageModule);



/***/ }),

/***/ "./src/app/entrenamiento/entrenamiento.page.scss":
/*!*******************************************************!*\
  !*** ./src/app/entrenamiento/entrenamiento.page.scss ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2VudHJlbmFtaWVudG8vZW50cmVuYW1pZW50by5wYWdlLnNjc3MifQ== */");

/***/ }),

/***/ "./src/app/entrenamiento/entrenamiento.page.ts":
/*!*****************************************************!*\
  !*** ./src/app/entrenamiento/entrenamiento.page.ts ***!
  \*****************************************************/
/*! exports provided: EntrenamientoPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EntrenamientoPage", function() { return EntrenamientoPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");


let EntrenamientoPage = class EntrenamientoPage {
    constructor() { }
    ngOnInit() {
    }
};
EntrenamientoPage.ctorParameters = () => [];
EntrenamientoPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-entrenamiento',
        template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! raw-loader!./entrenamiento.page.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/entrenamiento/entrenamiento.page.html")).default,
        styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! ./entrenamiento.page.scss */ "./src/app/entrenamiento/entrenamiento.page.scss")).default]
    })
], EntrenamientoPage);



/***/ })

}]);
//# sourceMappingURL=entrenamiento-entrenamiento-module-es2015.js.map