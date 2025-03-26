+++
title = "C++: How to measure code coverage with lcov and GTest"
date = "2025-03-25"
description = "Because you want to know which parts of your C++ code are actually being tested."
+++

# Why, You Ask?

Because you want to know which parts of your C++ code are actually being tested – not just assumed to be. Code coverage isn't about perfection, but about confidence. And with the right setup, you can easily visualize what's being tested and what's quietly collecting dust.

In this guide, we'll walk through:

- Setting up `lcov` and GTest
- Writing effective coverage-focused tests
- Running the tests and generating reports
- Interpreting results and achieving real insight
- Automating it all via GitHub Actions

---

## 📦 Try It Yourself

Check out the working example repository here:

👉 [github.com/svnscha/cpp-coverage-example](https://github.com/svnscha/cpp-coverage-example)

It contains:

- A minimal `MyQueue` class
- Unit tests using GTest
- Full `lcov` and `genhtml` integration
- A GitHub Actions workflow for automated code coverage with a threshold

---

## 1. Install Required Tools

Make sure your environment has:

- `lcov`
- A C++ compiler (GCC or Clang)
- `cmake`, `ninja`
- GTest (or install `libgtest-dev` on Ubuntu)

---

## 2. Build with Coverage Instrumentation

To generate coverage data, compile your code with:

- `--coverage`: Coverage instrumentation
- `-g`: Debug information
- `-O0`: No optimization (to avoid inlining, etc.)

### 🛠 Minimal CMake Snippet

```cmake
option(ENABLE_COVERAGE "Enable code coverage reporting" OFF)

function(enable_coverage target)
    if(ENABLE_COVERAGE AND CMAKE_CXX_COMPILER_ID MATCHES "GNU|Clang")
        target_compile_options(${target} PRIVATE --coverage -O0 -g)
        target_link_options(${target} PRIVATE --coverage)
    endif()
endfunction()

enable_testing()

add_library(MyLibrary ...)
add_executable(MyTests ...)
target_link_libraries(MyTests PRIVATE MyLibrary GTest::gtest_main)

include(GTest)
gtest_discover_tests(MyTests)

enable_coverage(MyLibrary)
enable_coverage(MyTests)
```

## 3. Write Tests That Actually Trigger All Code Paths

Here’s a small utility class as an example:

```cpp
class MyQueue
{
public:
    void Push(int val)
    { 
        _q.push(val); 
    }

    void Pop() 
    {
        if (_q.empty())
            return;
        _q.pop();
    }

    bool IsEmpty() const { return _q.empty(); }

private:
    std::queue<int> _q;
};
```

Now test both normal and edge cases:

```cpp
TEST(MyQueueTest, PopWhenEmpty) {
    MyQueue q;
    q.Pop(); // Hit the early return
    EXPECT_TRUE(q.IsEmpty());
}

TEST(MyQueueTest, PushAndPop) {
    MyQueue q;
    q.Push(42);
    EXPECT_FALSE(q.IsEmpty());
    q.Pop();
    EXPECT_TRUE(q.IsEmpty());
}
```

## 4. Run Tests and Generate Coverage Report

```cpp
cmake -B build -DENABLE_COVERAGE=ON -DCMAKE_BUILD_TYPE=Debug
cmake --build build
cd build
ctest --output-on-failure
```

Then generate the coverage report:

```cpp
lcov --directory . --capture --output-file coverage.info --rc geninfo_auto_base=1 --ignore-errors mismatch
lcov --remove coverage.info '/usr/*' '*/tests/*' --output-file coverage.filtered.info
genhtml coverage.filtered.info --output-directory coverage-report
```

Open this in your browser:

```
build/coverage-report/index.html
```
<video class="cast" src="/casts/cpp-coverage-example.webm" controls>
  Your browser does not support the video tag.
</video>

## 5. Automation

Now, having the coverage report in place is a great start. But it's not enough to just have the coverage report. You need to automate it so that every time you run your tests, you get a detailed report of what was covered and what wasn't.

To get started, you can setup a GitHub workflow with threshold tests, upload the reports or do post-processing on the report.

Either way, the key is to have a way to run tests and generate reports. Here's an example workflow:

- [.github/workflows/coverage.yml](https://github.com/svnscha/cpp-coverage-example/blob/main/.github/workflows/coverage.yml)
- [Example Pull Request failing because of missing coverage](https://github.com/svnscha/cpp-coverage-example/pull/1)
- [Example Pull Request passing coverage tests](https://github.com/svnscha/cpp-coverage-example/pull/2)

## Summary

| Step | What You Did |
|---- |------------ |
| 1. Install |	Set up `lcov`, gtest, gcc, and cmake |
| 2. Build | Compiled with --coverage and no optimizations |
| 3. Test |	Hit both happy paths and edge cases |
| 4. Report | Generated detailed HTML coverage report |

## Conclusion
Code coverage doesn't guarantee perfect tests, but it gives you visibility. When paired with thoughtful test cases (especially edge cases), it helps ensure your code behaves correctly - even when things go sideways.

Even small utility classes deserve this level of care.

And with `lcov`, you can turn "I think I tested this" into "Yes, this line has been executed 12 times during CI."