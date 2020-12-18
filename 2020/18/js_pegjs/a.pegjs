Expressions
  = head:Expression tail:(Nl Expression)* {
      return tail.reduce(function(result, element) {
        return result + element[1];
      }, head);
    }

Expression
  = head:Factor tail:(_ ("+" / "*") _ Factor)* {
      return tail.reduce(function(result, element) {
        if (element[1] === "+") { return result + element[3]; }
        if (element[1] === "*") { return result * element[3]; }
      }, head);
    }

Factor
  = "(" _ expr:Expression _ ")" { return expr; }
  / Integer

Integer "integer"
  = _ [0-9]+ { return parseInt(text(), 10); }

_ "whitespace"
  = [ \t]*
 
Nl "endline"
  = [\n\r]*