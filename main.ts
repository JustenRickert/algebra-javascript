import PolyParser from "./src/polyParser";
import { formatPolyAst } from "./src/polyFormatter";
import { simplifyPolynomial, productOfPolynomials } from "./src/util";

const ast1 = PolyParser.tryParse("y^5 + 7z^6");
const ast2 = PolyParser.tryParse("z^2 + 7x^12");
const ast3 = PolyParser.tryParse("x");
console.log(JSON.stringify(simplifyPolynomial(ast1), null, 2));
console.log(JSON.stringify(simplifyPolynomial(ast2), null, 2));
console.log(JSON.stringify(productOfPolynomials(ast1, ast2, ast3), null, 2));
