"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var styled_components_1 = __importDefault(require("styled-components"));
var BookListItem_1 = __importDefault(require("./BookListItem"));
var BookListBlock = styled_components_1.default.ul(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  padding: 57px 0;\n"], ["\n  padding: 57px 0;\n"])));
var ErrorMessage = styled_components_1.default.p(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  color: #fff;\n  font-size: 3rem;\n"], ["\n  color: #fff;\n  font-size: 3rem;\n"])));
var BookList = function (_a) {
    var items = _a.items;
    console.log(items);
    if (items.length === 0) {
        return react_1.default.createElement(ErrorMessage, null, "\uAC80\uC0C9 \uACB0\uACFC\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.");
    }
    return (react_1.default.createElement(BookListBlock, null, items.map(function (_a, i) {
        var title = _a.title, image = _a.image, price = _a.price, author = _a.author, pubdate = _a.pubdate;
        return (react_1.default.createElement(BookListItem_1.default, { key: i, image: image, title: title, price: price, author: author, pubdate: pubdate }));
    })));
};
exports.default = react_1.default.memo(BookList);
var templateObject_1, templateObject_2;
