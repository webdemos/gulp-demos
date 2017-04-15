# Gulp Demos

For the one who is not familiar with gulp and want to study it.

## TODO: more instruction here

## Gulp tasks
Dev
Build

## Getting started

`$ npm i -g gulp-cli`

`$ npm i --save-dev gulp`

Create a gulpfile.js file at the root of your project
```
var gulp = require('gulp');

gulp.task('default', function() {
  // place code for your default task here
});
```

Run
`$ gulp`


### Globbing in Node

Most workflows with Gulp tend to only require 4 different globbing patterns:

1. *.scss: The * pattern is a wildcard that matches any pattern in the current directory. In this case, we’re matching any files ending with .scss in the root folder (project).

1. **/*.scss: This is a more extreme version of the * pattern that matches any file ending with .scss in the root folder and any child directories.

1. !not-me.scss: The ! indicates that Gulp should exclude the pattern from its matches, which is useful if you had to exclude a file from a matched pattern. In this case, not-me.scss would be excluded from the match.

1. *.+(scss|sass): The plus + and parentheses () allows Gulp to match multiple patterns, with different patterns separated by the pipe | character. In this case, Gulp will match any file ending with .scss or .sass in the root folder.


### TODOS

1. refactor conf
```
exports.paths = {
  src: 'src',
  dist: 'dist',
  tmp: '.tmp',
  e2e: 'e2e'
};
```

1.
`gulp.start('styles-reload');`

1. 
```

 gulp.watch(path.join(conf.paths.src, '/app/**/*.html'), function(event) {
    browserSync.reload(event.path);
  });
```


### Resources
- https://github.com/topheman/vanilla-es6-jspm/blob/master/gulp/tasks/build.js