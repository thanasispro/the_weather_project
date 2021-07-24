import { assert } from 'chai'
import SampleService from '../../src/services/sample.service'
import Logger from '../../src/common/logger'

describe('Backend [services] [sample.service] [functions]', () => {
    before ('Init logger', () => {
        global = { logger: new Logger('test', '1.0.0', 'fatal') }
    })

    describe('createAndPrintASample', () => {
        it('Should create a valid sample object', (done) => {
            try {
                let service = new SampleService(global.logger)
                let sample = service.createAndPrintASample({ 'foo': 'hello' })
                assert.equal(sample.foo, 'hello')
                done()
            } catch (e) {
                done(e)
            }
        })
    })
})
