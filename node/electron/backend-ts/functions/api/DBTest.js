"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const profileDAO_1 = require("./profile/profileDAO");
const CaseTest_1 = require("./common/test/CaseTest");
const profileDAO = new profileDAO_1.ProfileDAO();
new CaseTest_1.Case("DBTest")
    .test("read").using((assert) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cmpid = "cmp" + (Math.random() * 10000).toString();
        //const ret:any  = await profileDAO.add(cmpid,"teste123");
        //assert.isTrue("Criacao",ret);
    }
    catch (e) {
        console.log("add:-600");
        assert.error(e);
    }
}))
    .start();
//# sourceMappingURL=DBTest.js.map