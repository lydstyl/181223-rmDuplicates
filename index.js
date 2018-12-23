/*
    2 modes :
        showDuplicates: will create duplicates.json containing all files with attributes like duplicate true or false.
        rmDuplicates: will use duplicates.json and will remove all duplicate == true
*/

const fs = require('fs')

const opts = {
    mode: 'rmDuplicates',

    magicPath: '/home/gabriel/Images/**/*'
}

const modes = {
    showDuplicates: () => {
        const glob = require("glob")
        const regex = require('filename-regex')
        const files = []
        function getFilesizeInBytes(filename) {
            const stats = fs.statSync(filename)
            const fileSizeInBytes = stats.size
            return fileSizeInBytes
        }
        glob("/home/gabriel/Images/**/*", {}, (er, globs) => {
            globs.forEach(file => {
                files.push(
                    {
                        path: file,
                        fileName: file.match( regex() )[0],
                        size: getFilesizeInBytes(file),
                        duplicate: false
                    }
                )
            })
            files.forEach(file1 => {
                for (let i = 0; i < files.length; i++) {
                    const file2 = files[i]
                    if (file1.path != file2.path && file1.fileName == file2.fileName && file1.size == file2.size) {
                        files[i].duplicate = true
                        break
                    }
                }
            })
            fs.writeFileSync( 'duplicates.json', JSON.stringify( files, null, 2 ), 'utf8')
        })
    },
    rmDuplicates: () => {
        const files = require('./duplicates')
        files.forEach(file => {
            if (file.duplicate) {
                fs.unlinkSync( file.path, () => {
                    console.log( `Removing $(file.path)` ); // 0-1812-ddf-sm.jpeg
                })
            }
        })
    }
}

modes[opts.mode]()