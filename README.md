# LISTRANSFORM

## How to install:

    npm i listransform

## Contains 2 functions, transformList and compareLists.

### transformList contains most operations you would want to make to your list, like:

-reverseList: reverses the order of the input list.

-shuffleList: shuffles the input list randomly.

-rotateLeft: rotates the input list to the left by a specified number of positions.

-rotateRight: rotates the input list to the right by a specified number of positions.

-filter: returns a new array with all elements that pass the test implemented by the provided function.

-map: returns a new array with the results of calling a provided function on every element in the input array.

-chunk: divides the input list into smaller subarrays of a specified size.

-removeFalsyValues: removes falsy values (e.g. false, null, undefined, 0, NaN, '') from the input list.

-flatten: flattens a nested array one level deep.

-flattenDeep: recursively flattens a nested array.

-groupBy: groups the elements of the input list by a specified function that returns a group identifier.

-countBy: counts the number of elements in the input list that have the same value returned by a specified function.

-join: returns a string created by concatenating all elements in the list, separated by a specified separator. You can pass an object with a separator property to --specify the separator (default is ",").

-flat: creates a new flattened array with all sub-array elements concatenated recursively up to the specified depth. You can pass an object with a depth property to specify the depth (default is 1).

-slice: returns a new array containing the elements from the input list starting from the index start up to (but not including) the index end. You can pass an object with start and end properties to specify the slice boundaries.

-some: returns true if at least one element in the input list satisfies the provided testing function. You can pass a function to the some option.

-every: returns true if all elements in the input list satisfy the provided testing function. You can pass a function to the every option.

-... and more

### compareLists options:

-unique: returns an array of unique elements from all the lists.

-commonCount: returns an object with the count of each common element.

-sort: returns an array sorted in order.

-commonInAll: returns an array with elements that appear in every list.

-uniqueInAll: returns an array with unique elements across every list.

-descending: returns an array sorted in reverse order.

-limit: returns an array with length specified by the limit.
