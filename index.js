var $$ = bowlder;
debugger;
// function genFunc(expr, obj){
//     console.log('expr', expr, 'obj', obj);
//     var func = new Function('obj', 'with(obj)' + 'return '+expr);
//     console.log(func);
//     return func(obj);
// }
// var template = {
//     replace: function(tpl, data){
//         var ret = [];
//         data.forEach(function(item){
//             ret.push(replaceAction(item));
//         });
//         function replaceAction(obj){
//             return tpl.replace((/\{\{(.*?)\}\}/g), function(match, name){
//                 var result = genFunc(name, obj);
//                 console.log('result',result);
//                 return result;
//             });
//         }
//         return ret.join("");
//     }
// };
// var dd = $$.template.replace('{{name}}: {{age}}:{{loves.drink}}', [ {name:'bill',age:20,loves:{drink:'tea'}} ]);
// console.log('dd', dd);

// var cc = template.replace('{{name}}: {{age}}:{{loves.drink}}', [ {name:'bill',age:20,loves:{drink:'tea'}} ]);
// console.log('cc', cc);
var template = {
    parse: function(tpl, data){
        var source = "var __t,__p='';\nwith(obj||{}){__p+='";
        var index = 0;
        var escapes = {
            "'":      "'",
            '\\':     '\\',
            '\r':     'r',
            '\n':     'n',
            '\t':     't',
            '\u2028': 'u2028',
            '\u2029': 'u2029'
        };
        var escapeMatch = /\\|'|\r|\n|\t|\u2028|\u2029/g,
            escaper = function(match) { return '\\' + escapes[match]; };
        tpl.replace(/<%=(.*?)%>|<%(.*?)%>|$/g, function(match, interpolate, evaluate, offset){
            // source += tpl.slice(index, offset).replace(escapeMatch, escaper);
            source += tpl.slice(index, offset).replace(escapeMatch, escaper);
            if(interpolate){
                source += "'+\n"+interpolate+"+'";
            }else if(evaluate){
                source += "';\n" + evaluate + "\n__p+='";
            }
            index = offset + match.length;
            return match;

        });
        source += "';\n}return __p;";
        console.log(source);
        var fn = new Function('obj', source);
        return fn(data);
    }
};
var arrowTemplate = $$.template.parse('<%=name%>: <%=age%>', {name:'bill',age:20});
console.log('arrowTemplate', arrowTemplate);

var arrowTemplate = template.parse('<%=name%>: <%=age%>', {name:'bill',age:20});
console.log('my arrowTemplate', arrowTemplate);
var tpl = document.getElementById('templateScript').innerHTML;
var data = {desc:'hello template',
            name:'marong',
            age:28,
            loves: [
                {
                    name: 'drink',
                    content:'team'

                },{
                    name: 'fruit',
                    content:'apple'

                },
                {
                    name: 'people',
                    content: 'myself'
                }
            ]
           };
debugger;
// var result = $$.template.parse(tpl, data);
// console.log('$$result', result);
var result = template.parse(tpl, data);;
console.log('result', result);
document.body.innerHTML = result;
