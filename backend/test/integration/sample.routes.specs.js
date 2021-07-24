import fetch from 'node-fetch'
import { assert } from 'chai'

describe('Backend [routes] [sample] [POST]', function () {
    it('Should create a valid sample object', async () => {
        const options = {
            method: 'POST',
            body: JSON.stringify({ foo: 'hello' }),
            headers: { 'Content-type': 'application/json' }
        }
        let response = await fetch('http://localhost:3000/sample', options)
        let json = await response.json()
        const { foo } = json.result
        assert.equal(foo, 'hello')
    })
})
