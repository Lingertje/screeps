const { task, src, dest } = require('gulp')
const screeps = require('gulp-screeps')
const ts = require('gulp-typescript')

const credentials = require('./credentials')

task('typescript', () => {
    return src('src/**/*.ts')
        .pipe(ts({
            noImplicitAny: true
        }))
        .pipe(dest('build'))
})

task('deploy', () => {
    return src('build/*.js')
        .pipe(screeps(credentials))
})