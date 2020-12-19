%{
 
#include <stdio.h>
#include "y.tab.h"
extern int yylval;
%}
%%
.           {
                return yytext[0];
            }
