---
title: Go Concurrency
date: 2024/04/30
description: Improve program efficiency with Goroutines.
tag: Go, System
author: Jie Chen
---

> Under Construction 🚧 ...

> [Goroutines](https://go.dev/tour/concurrency/1) are lightweight software threads managed by the Go runtime. 

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

> Files will be copied one at a time.

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

In `Go 1.20.1`, the variable `file` has to be passed as an argument to the Goroutine because loop variables are created once and are updated every iteration. Otherwise, all subsequent Goroutines will see the last element of the range. However, starting in [Go 1.22](https://go.dev/blog/loopvar-preview) loop variables are created per iteration.

## Wait Groups

Wait groups are a mechanism for the Go runtime to wait for Goroutines to finish running. They are simply counters and can be incremented with `wg.Add()`, decremented with `wg.Done()`, and to wait using `wg.Wait()`.

```go
Coming Soon...
```

## Availability

The source code can be found [here](https://example.com).

## Experimental Evaluations

...

## Notes

For smaller file transfers, the overhead of thread context switching will increase the run time.