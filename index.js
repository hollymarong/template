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
var result = template.parse(tpl, data);;
console.log('result', result);
document.body.innerHTML = result;
