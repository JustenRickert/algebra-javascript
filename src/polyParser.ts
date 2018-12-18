import * as P from "parsimmon";
import { isString } from "lodash";
import { operatorMap } from "./util";

const _ = P.optWhitespace;
const UNIT_COEFFICIENT = 1;
const UNIT_DEGREE = 1;

const Numeral = P.regex(/[0-9]+/).map(Number);
const Variable = P.regex(/[a-z]/);
const Power = P.string("^");

const Plus = P.string("+").trim(_);

const Mono = P.seqMap(
  Numeral.or(_).map(n => (isString(n) ? UNIT_COEFFICIENT : n)),
  P.seqMap(Variable, P.seq(Power, Numeral).or(_), (v, pn) => ({
    variable: v,
    degree: isString(pn) ? UNIT_DEGREE : pn[1]
  })).many(),
  (n, vs) => ({ coefficient: n, variables: vs })
);

const Poly: P.Parser<
  { coefficient: number; variables: { degree: number; variable: string }[] }[]
> = P.lazy(() =>
  P.seqMap(
    Mono,
    P.seqMap(Plus, Poly, (_, poly) => poly).or(P.eof),
    (mono, rest) =>
      rest ? rest.reduce((acc, mono) => [...acc, mono], [mono]) : [mono]
  )
);

export default Poly;
