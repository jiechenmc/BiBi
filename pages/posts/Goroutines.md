---
title: Go Concurrency
date: 2024/04/30
description: Improve program efficiency with Goroutines.
tag: Go, System
author: Jie Chen
---

> Under Construction 🚧 ...

[Goroutines](https://go.dev/tour/concurrency/1) are lightweight software threads managed by the Go run time. 



## Synchronous Execution
```go
package main

import (
	"fmt"
	"io"
	"os"
)

func check(e error) {
	if e != nil {
		panic(e)
	}
}

func copyToDestination(src, dest string) (string, error) {
	// The defer keyword executes the close statement when this function returns
	source, err := os.Open(src)
	check(err)
	defer source.Close()

	destination, err := os.Create(dest)
	check(err)
	defer destination.Close()
	_, err = io.Copy(destination, source)
	check(err)

	return dest, err
}

func main() {
	files, err := os.ReadDir("./folderA")
	check(err)
	for _, file := range files {
		src := "./folderA/" + file.Name()
		dest := "./folderB/" + file.Name()
		_, err = copyToDestination(src, dest)
		if err != nil {
			fmt.Printf("%s -> %s ❌\n", src, dest)
		} else {
			fmt.Printf("%s -> %s ✅\n", src, dest)
		}
	}
}
```

> Each File will be copied one at a time.

## Concurrent Execution

```go
func main() {
	files, err := os.ReadDir("./folderA")
	check(err)
	for _, file := range files {
		go func(file os.DirEntry) {
			src := "./folderA/" + file.Name()
			dest := "./folderB/" + file.Name()
			_, err = copyToDestination(src, dest)
			if err != nil {
				fmt.Printf("%s -> %s ❌\n", src, dest)
			} else {
				fmt.Printf("%s -> %s ✅\n", src, dest)
			}
		}(file)
	}
}
```

> In Go, you can simply wrap the function with the go keyword to create a Goroutine

In my example, I have to pass in the `file` as the parameter of the Goroutine because the loop variable `file` is only created once and updated every iteration, so subsequent Goroutines see the same value (last value of the range) if I do not. However, starting in [Go 1.22](https://go.dev/blog/loopvar-preview) loop variables are created per iteration. My current version is `Go 1.20.1`.

## Wait Groups

We need to introduce wait groups so we can wait for every Goroutine to finish before exiting.


## Examples

...

## Notes

For smaller file transfers, the overhead of thread context switching will increase the run time.