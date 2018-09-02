module Services.Core.Utils exposing (ifThenElse)

{-| This simple package provides infix functions for shorter if/then/else
conditionals, known as ternary, and a "null" coalescing operator for Maybes
@docs ifThenElse, (?), (?:)
-}


{-| A shorter version for Elm's if special syntax, like clojure.core `if` function
Reference: [<https://clojuredocs.org/clojure.core/if>](https://clojuredocs.org/clojure.core/if)
    >>> ifThenElse (1 + 1 == 2) "Math works!" "Math is wrong"
    "Math works!"
    >>> ifThenElse (String.isEmpty "pudim") "Pudim is empty" "Pudim is not empty"
    "Pudim is not empty"
-}
ifThenElse : Bool -> a -> a -> a
ifThenElse conditional trueCase falseCase =
    if conditional then
        trueCase
    else
        falseCase