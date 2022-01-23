const path = require('path')
const { env } = require('process')

module.exports = (env) => {
    console.log(env.entry)
    console.log(env.bundleFolder)
    console.log(env.bundleName)
    return {
        entry: env.entry,
        output: {
            path: path.resolve(__dirname, env.bundleFolder),
            filename: env.bundleName,
        },
    }
}
