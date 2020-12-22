food([mxmxvkd, kfcds, sqjhc, nhms], [dairy, fish]).

food([trh, fvjkl, sbzzf, mxmxvkd], [dairy]).

food([sqjhc, fvjkl], [soy]).

food([sqjhc, mxmxvkd, sbzzf], [fish]).

on_list(Head, [Head|Rest]).

on_list(Item, [Head|Rest]) :-
    on_list(Item, Rest).

not_on_list(Item, []).

not_on_list(Item, [Head|Rest]) :-
    Item \= Head,
    not_on_list(Item, Rest).

is_ingredient(Object) :-
    food(Recipe, Allergens),
    on_list(Object, Recipe).

is_allergen(Object) :-
    food(Recipe, Allergens),
    on_list(Object, Allergens).

% recipe_has_allergen(Recipe, Allergen) :-
%     food(Recipe, Allergens),
%     on_list(Allergen, Allergens).

cant_have_allergen(Ingredient, Allergen) :-
    food(Recipe, Allergens),
    on_list(Allergen, Allergens),
    is_ingredient(Ingredient),
    not_on_list(Ingredient, Recipe).

has_allergen(Ingredient, Allergen) :-
    is_ingredient(Ingredient),
    is_allergen(Allergen),
    \+ cant_have_allergen(Ingredient, Allergen),
    cant_have_allergen(Ingredient, OtherAllergen),
    Allergen \= OtherAllergen.
