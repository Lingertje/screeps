const { task, src } = require('gulp')
const screeps = require('gulp-screeps')
const credentials = require('./credentials')

task('deploy', () => {
    return src('src/*.js')
        .pipe(screeps(credentials))
})