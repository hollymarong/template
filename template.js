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
        // var escapeMap = {
        //     "\r":"r",
        //     "\n":"n",
        //     "\t":"t",
        //     "'":"'"
        // };
        var escapeMap = {
            "'":      "'",
            '\\':     '\\',
            '\r':     'r',      // 回车
            '\n':     'n',      // 换行符
            '\t':     't',      // Tab
            '\u2028': 'u2028',  // 行分割符
            '\u2029': 'u2029'   // 段落分割符
        };;
        // var escapeReg = /\r|\n|\t|'/g;
        var escapeReg = /\\|'|\r|\n|\t|\u2028|\u2029/g;
        var escapeFunc = function(match){
            return "\\" + escapeMap[match];
        };
        var source = "var __p='',__t='';with(data||{}){__p+='";
        tpl.replace(arrowReg, function(match, expr, evaluate, offset){
            source += tpl.slice(index, offset).replace(escapeReg, escapeFunc);
            if(expr){
                console.log('expr',expr);
                source += "';__t=" + expr + ";(!!__t||__t==0)&&(__p+=__t);__p+='";
            }else if(evaluate){
                source += "';\n" + evaluate + "__p+='";
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

