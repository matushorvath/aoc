%{
#include <stdio.h>
#include <stdlib.h>
%}

%define parse.error verbose
%define parse.lac full

%start r0

%%

r0: r4 r1 r5;
r1: r2 r3 | r3 r2;
r2: r4 r4 | r5 r5;
r3: r4 r5 | r5 r4;
r4: 'a';
r5: 'b';

%%
main()
{
 return(yyparse());
}

yyerror(s)
char *s;
{
  fprintf(stderr, "%s\n",s);
}

yywrap()
{
  return(1);
}
