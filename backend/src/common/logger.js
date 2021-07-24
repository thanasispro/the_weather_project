import bunyan from 'bunyan'
import debugStream from 'bunyan-debug-stream'

export default class logger {
    constructor(name = 'default', version = '1.0.0', level = 'debug') {
        const streams = []
        streams.push({
            type: 'raw',
            level: level,
            stream: debugStream({
                basePath: __dirname,
                forceColor: true,
                colors: {
                    'info': 'cyan',
                    'error': 'red',
                    'warn': 'yellow',
                    'debug': 'green'
                },
                showPid: false
            })
        })
        return bunyan.createLogger({ name: `${name} - ${version}`, streams, level: level })
    }
}
