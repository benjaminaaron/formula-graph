import { ComputeEngine } from "@cortex-js/compute-engine"
import { inspect } from "util"

const ce = new ComputeEngine()
const latex = "x = \\frac{-b \\pm \\sqrt{b^2 - 4*a*c}}{2*a}"
const ast = ce.parse(latex, { canonical: false }).json

console.log(inspect(ast, false, null, true))
