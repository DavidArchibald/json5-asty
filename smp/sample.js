
const JsonAsty = require("..")

/*  the JSON input  */
const json = `{
    "foo": {
        "bar": true,
        "baz": 42.0,
        "quux": [ "test1\\"test2", "test3", 7, true ]
    }
}`
console.log(`JSON (old):\n${json}`)

/*  parse JSON into AST  */
const ast = JsonAsty.parse(json)
console.log(`AST Dump (all):\n${JsonAsty.dump(ast, { colors: true })}`)

/*  the AST query  */
const query = `
    .// member [
        ..// member [
            / string [ pos() == 1 && @value == "foo" ]
        ]
        &&
        / string [ pos() == 1 && @value == "baz" ]
    ]
        / * [ pos() == 2 ]
`
console.log(`AST Query:\n${query}`)

/*  query AST node  */
const nodes = ast.query(query)
const node = nodes[0]
console.log(`AST Dump (sub, old):\n${node.dump()}`)

/*  manipulate AST node  */
const nodeNew = node.create("string").set({ value: "TEST" })
node.parent().del(node).add(nodeNew)
console.log(`AST Dump (sub, new):\n${node.dump()}`)

/*  unparse AST into JSON  */
const jsonNew = JsonAsty.unparse(ast)
console.log(`JSON (new):\n${jsonNew}`)

