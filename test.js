var template = {
    replace: function(tpl, data){
        var curlyReg = /\{\{(.*?)\}\}|$/g;
        var source = "var __p='';with(data){__p+='";
        var index = 0;
        tpl.replace(curlyReg, function(match, expr, offset){
            source += tpl.slice(index, offset);
            if(expr){
                source += "'+" + expr + "+'";
            }
            index= offset + match.length;
            return match;
        });
        source += "'}\n;return __p;";
        console.log(source);
        var fn = new Function('data', source);
        return fn(data);
    },
    parse: function(tpl, data){
        var index = 0;
        var arrowReg = /<%=(.*?)%>|<%(.*?)%>|$/g;
        var escapeMap = {
            "\r":"r",
            "\n":"n",
            "\t":"t",
            "'":"'"
        };
        var escapeReg = /\r|\n|\t|'/g;
        var escapeFunc = function(match){
            return "\\" + escapeMap[match];
        };
        var source = "var __p='',__t='';with(data||{}){__p+='";
        tpl.replace(arrowReg, function(match, expr, evaluate, offset){
            source += tpl.slice(index, offset).replace(escape, escapeFunc);
            if(expr){
                console.log('expr',expr);
                source += "';__t=" + expr + ";(!!__t||__t==0)&&(__p+=__t);__p+='";
            }else if(evaluate){
                source += "';\n" + evaluate + ";__p+='";
            }
            index = offset + match.length;
            return match;
        });
        source += "'}\n;return __p;";
        console.log('source', source);
        var fn = new Function('data', source);
        return fn(data);
    }
};

var data = {
    name:'marong',
    age: 27,
    loves:{
        drink:'tea'
    }
};

var tpl = 'hello {{name}}, age is {{age}}, loves drink is {{loves.drink}}';
var result = template.replace(tpl, data);
console.log('curly  result', result);

var tpl = 'hello <%=name%>, age is <%=age%>, loves drink is <%=loves.drink%>, loves fruit is <%=loves.fruit%>';
var result = template.parse(tpl, data);
console.log('arrow result', result);
