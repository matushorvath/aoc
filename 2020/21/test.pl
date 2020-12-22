on(Item,[Item|Rest]).
on(Item,[DisregardHead|Tail]):-
          on(Item,Tail).
