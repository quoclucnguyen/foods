"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CreateFoodItemInput = void 0;
var graphql_1 = require("@nestjs/graphql");
var abstract_input_1 = require("src/common/abstract.input");
var CreateFoodItemInput = /** @class */ (function (_super) {
    __extends(CreateFoodItemInput, _super);
    function CreateFoodItemInput() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        graphql_1.Field(function () { return String; })
    ], CreateFoodItemInput.prototype, "name");
    __decorate([
        graphql_1.Field(function () { return String; })
    ], CreateFoodItemInput.prototype, "locationId");
    __decorate([
        graphql_1.Field(function () { return Date; }, { nullable: true })
    ], CreateFoodItemInput.prototype, "dateEnd");
    CreateFoodItemInput = __decorate([
        graphql_1.InputType()
    ], CreateFoodItemInput);
    return CreateFoodItemInput;
}(abstract_input_1.AbstractInput));
exports.CreateFoodItemInput = CreateFoodItemInput;
