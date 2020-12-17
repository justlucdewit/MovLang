# MovLang
#### An esoteric programming language based on moving numbers around in a memory array

### Usage
- Download the `movlang.js` file from this repository
- make sure to have nodejs installed
- make a `test.ml` file with movlang code in it, for example:
```
mov 101, 72
mov 101, 101
mov 101, 108
mov 101, 108
mov 101, 111
mov 101, 32
mov 101, 119
mov 101, 111
mov 101, 114
mov 101, 108
mov 101, 100
mov 101, 10
```
- run `node movlang test.ml` in the terminal

### concepts
MovLang is a language that consists of only 1 instruction which is the 'mov' instruction

the mov instruction moves either a literal or a number stored somewhere else, into a new location

the syntax of the mov instruction looks like this:

```
mov [destination], [source]
```

for example you can move the number literal '5' into memory address 2 like this:
```
mov 2, 5
```

this makes the memory array look like:
```
[0, 2, 0, 0...]
```

you can also use the & symbol to replace either the source or the desitination with a value from the memory array, take a look at the following example:
```
mov 1, 6
mov 2, 2

mov 4, &1
mov 5, &2
```

this will first move the number `6 into memory[1]` and then the number `2 into memory[2]`

the next instruction(`mov 4, &1`) will replace &1 with whatever is at memory[1] (in this example the number 6), so the actual instruction becomes:
```
mov 4, 6
```

then we do `mov 5, &2` which becomes `mov 5, 2` since memory[2] is set to the number 2

the & symbol can also be nested like this:
```
mov 1, 6
mov 6, 10

mov 10, &&1
```

if we look at the instruction `mov 10, &&1` the &&1 will be replaced with &6 since memory location 1 contains the number 6, then &6 will be replace with 10 since memory location 6 contains the number 10

the instruction then becomes `mov 10, 10`

### I/O
MovLang is also able to do input output by writing to 'reserved memory locations'
here is a list of all the reserved memory locations and how to use them:

- location 100 (numeric print)
by writing a value to memory location 100, it will be printed to the screen, for example to print the number 69420:
```
mov 100, 69420
```

- location 101 (textual print)
by writing a value to memory location 101, it will convert that value to ascii and print it to the screen as a character. for example to print the character 'A' do this:
```
mov 101, 65
```

- location 102 (jump)
by writing to location 102 you can change the instruction index that the interpreter is currently reading on, for example to jump all the way back to the beginning of the program you can do this:
```
mov 102, 0
```

- location 103 & 104 (registers)
location 103 and 104 dont do anything special, however they can be used as registers to do math on, if you want to calculate the sum of 2 numbers, you would write them to address 103 and 104 and then write any value to location 105 to trigger the add instruction, this will set the location 103 to the sum of 103 and 104

- location 105 (adding)
by writing any value (it doesnt matter what value) it will add the values at address 103 and 104 together and store that at location 103. for example to add the numbers 69000 and 420 you can do this:
```
mov 103, 69000
mov 104, 420
mov 105, 0
```

- location 106 (subtracting)
location 106 is the same as 105 but instead of adding it does subtracting

- location 107 (multiplication)
location 107 is the same as 105 but instead of adding it does multiplication

- location 108 (division)
location 108 is the same as 105 but instead of adding it does division

- location 109 (modulation)
location 109 is the same as 105 but instead of adding it does modulation

### comments
comments can be inserted into the code using the ; character, however comments on the same line as code is not supported (yet)
so each comment needs to have its own line where no code is present, for example
```
; print the character 'A'
mov 101, 65
```
