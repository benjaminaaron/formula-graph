import { ComputeEngine } from "@cortex-js/compute-engine"
import { inspect } from "util"

const ce = new ComputeEngine()
const latex = "x = \\frac{-b \\pm \\sqrt{b^2 - 4*a*c}}{2*a}"
const ast = ce.parse(latex, {canonical: false}).json

console.log(inspect(ast, false, null, true))

function makeTree(node) {
    if (!Array.isArray(node)) return { label: String(node) }
    const children = node.slice(1).map(makeTree)
    const out= { label: node[0] }
    if (children.length) out.children = children
    return out
}

const tree = makeTree(ast)
console.log(inspect(tree, false, null, true))

export function toMermaid(root) {
    let id = 0
    const lines = [`graph TD`]
    const esc = s => s.replace(/"/g, '\\"')
    function walk(node) {
        const thisId = `n${id++}`
        lines.push(`${thisId}["${esc(node.label)}"]`)
        if (node.children) {
            for (const child of node.children) {
                const childId = walk(child)
                lines.push(`${thisId} --> ${childId}`)
            }
        }
        return thisId
    }
    walk(root)
    return lines.join("\n")
}

console.log(toMermaid(tree))
