(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["equipo-equipo-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/equipo/equipo.page.html":
/*!*******************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/equipo/equipo.page.html ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header>\n  <ion-toolbar>\n    <ion-title>Equipo</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content fullscreen class=\"ion-padding\">\n<h1>Equipo</h1>\n<!-- Red add button -->\n    <ion-fab horizontal=\"end\" vertical=\"bottom\" slot=\"fixed\">\n      <ion-fab-button color=\"danger\">\n        <ion-icon name=\"add\"></ion-icon>\n      </ion-fab-button>\n    </ion-fab>\n</ion-content>\n<!-- <ion-tab-bar slot=\"bottom\">\n  <ion-tab-button tab=\"entrenamiento\" routerLink=\"/entrenamiento\">\n    <ion-label>Entrenamiento</ion-label>\n    <ion-icon name=\"barbell-outline\"></ion-icon>\n  </ion-tab-button>\n  <ion-tab-button tab=\"equipo\" routerLink=\"/equipo\">\n    <ion-label>Equipo</ion-label>\n    <ion-icon name=\"shield-outline\"></ion-icon>\n  </ion-tab-button>\n  <ion-tab-button tab=\"partido\" routerLink=\"/partido\">\n    <ion-label>Partido</ion-label>\n    <ion-icon name=\"football-outline\"></ion-icon>\n  </ion-tab-button>\n</ion-tab-bar> -->");

/***/ }),

/***/ "./src/app/equipo/equipo-routing.module.ts":
/*!*************************************************!*\
  !*** ./src/app/equipo/equipo-routing.module.ts ***!
  \*************************************************/
/*! exports provided: EquipoPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EquipoPageRoutingModule", function() { return EquipoPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _equipo_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./equipo.page */ "./src/app/equipo/equipo.page.ts");




const routes = [
    {
        path: '',
        component: _equipo_page__WEBPACK_IMPORTED_MODULE_3__["EquipoPage"]
    }
];
let EquipoPageRoutingModule = class EquipoPageRoutingModule {
};
EquipoPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], EquipoPageRoutingModule);



/***/ }),

/***/ "./src/app/equipo/equipo.module.ts":
/*!*****************************************!*\
  !*** ./src/app/equipo/equipo.module.ts ***!
  \*****************************************/
/*! exports provided: EquipoPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EquipoPageModule", function() { return EquipoPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/__ivy_ngcc__/fesm2015/ionic-angular.js");
/* harmony import */ var _equipo_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./equipo-routing.module */ "./src/app/equipo/equipo-routing.module.ts");
/* harmony import */ var _equipo_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./equipo.page */ "./src/app/equipo/equipo.page.ts");







let EquipoPageModule = class EquipoPageModule {
};
EquipoPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _equipo_routing_module__WEBPACK_IMPORTED_MODULE_5__["EquipoPageRoutingModule"]
        ],
        declarations: [_equipo_page__WEBPACK_IMPORTED_MODULE_6__["EquipoPage"]]
    })
], EquipoPageModule);



/***/ }),

/***/ "./src/app/equipo/equipo.page.scss":
/*!*****************************************!*\
  !*** ./src/app/equipo/equipo.page.scss ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2VxdWlwby9lcXVpcG8ucGFnZS5zY3NzIn0= */");

/***/ }),

/***/ "./src/app/equipo/equipo.page.ts":
/*!***************************************!*\
  !*** ./src/app/equipo/equipo.page.ts ***!
  \***************************************/
/*! exports provided: EquipoPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EquipoPage", function() { return EquipoPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");


let EquipoPage = class EquipoPage {
    constructor() { }
    ngOnInit() {
    }
};
EquipoPage.ctorParameters = () => [];
EquipoPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-equipo',
        template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! raw-loader!./equipo.page.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/equipo/equipo.page.html")).default,
        styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! ./equipo.page.scss */ "./src/app/equipo/equipo.page.scss")).default]
    })
], EquipoPage);



/***/ })

}]);
//# sourceMappingURL=equipo-equipo-module-es2015.js.map