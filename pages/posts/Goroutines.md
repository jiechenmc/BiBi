---
title: Go Concurrency
date: 2024/04/30
description: Improve program efficiency with Goroutines.
tag: Go, System
author: Jie Chen
---

# Under Construction 🚧 ...

[Goroutines](https://go.dev/tour/concurrency/1) are lightweight software threads managed by the Go run time. 



## Synchronous Execution
```go
package main

import (
	"fmt"
	"time"
)

func copyFromFile(src, dest string) {
    ...
}

func main() {
	files, err := os.ReadDir("./folderA")
			check(err)
			for _, file := range files {
				src := "./folderA/" + file.Name()
				dest := "./folderB/" + file.Name()
				_, err = copyFromFile(src, dest)
				if err != nil {
					fmt.Printf("%s -> %s ❌\n", src, dest)
				} else {
					fmt.Printf("%s -> %s ✅\n", src, dest)
				}
			}
}
```

`Each File will be copied one at a time.`

## Concurrent Execution

...

## Notes

For smaller file transfers, the overhead of thread context switching will increase the run time.