const assert = require('chai').assert
const {hello, getTokens, getTokenizations} = require('../../services/tokenService')
const sinon = require('sinon')
const tokenDb = require('../../database/database')
const randomstring = require('randomstring')


describe('getToken Service', () => {

    afterEach(() => {
        tokenDb.find.restore()
    })
    it('getToken return N/A  when no token found in database', () => {

        sinon.stub(tokenDb, 'find').returns([])

        const result = getTokens(['abc'])
        assert.equal(result[0], 'N/A')
    })
    it('getToken return tokenizations when tokens found in database', () => {

        sinon.stub(tokenDb, 'find')
            .onFirstCall()
            .returns([{token: '111-222-333', tokenization: 'abc'}])
            .onSecondCall()
            .returns([{token: '777-888-999', tokenization: 'xyz'}])

        const result = getTokens(['abc', 'xyz'])
        assert.equal(result[0], '111-222-333')
        assert.equal(result[1], '777-888-999')
    })
    it('getToken return tokenizations and NA when some of token found in database', () => {

        sinon.stub(tokenDb, 'find')
            .onFirstCall()
            .returns([{token: '111-222-333', tokenization: 'abc'}])
            .onSecondCall()
            .returns([])
            .onThirdCall()
            .returns([{token: '777-888-999', tokenization: 'xyz'}])

        const result = getTokens(['abc', 'mno', 'xyz'])
        assert.equal(result[0], '111-222-333')
        assert.equal(result[1], 'N/A')
        assert.equal(result[2], '777-888-999')
    })

})

describe('getTokenization service', () => {

    beforeEach(() => {
        sinon.stub(randomstring, 'generate')
            .onFirstCall()
            .returns('abc')
            .onSecondCall()
            .returns('def')
            .onThirdCall()
            .returns('ghi')

        sinon.stub(tokenDb, 'insert')
    })

    afterEach(() => {
        tokenDb.find.restore()
        tokenDb.insert.restore()
        randomstring.generate.restore()
    })

    it('getTokenisation return token when tokenization found in database', () => {
        sinon.stub(tokenDb, 'find')
            .onFirstCall()
            .returns([{token: '111-222-333', tokenization: 'abc'}])

        const result = getTokenizations(['111-222-333'])
        assert.equal(result[0], 'abc')
    })
    it('getTokenisation return new generate string', () => {
        sinon.stub(tokenDb, 'find')
            .returns([])

        const result = getTokenizations(['111-222-333', '111-222-666', '111-222-555'])
        assert.equal(result[0], 'abc')
        assert.equal(result[1], 'def')
        assert.equal(result[2], 'ghi')
    })

    it('getTokenisation return tokenization and new generate sring when some tokenizations found in database', () => {
        sinon.stub(tokenDb, 'find')
            .onFirstCall()
            .returns([{token: '111-222-333', tokenization: 'lmn'}])
            .onSecondCall()
            .returns([])
            .onThirdCall()
            .returns([{token: '111-222-555', tokenization: 'rst'}])

        const result = getTokenizations(['111-222-333', '111-222-444', '111-222-555'])
        assert.equal(result[0], 'lmn')
        assert.equal(result[1], 'abc')
        assert.equal(result[2], 'rst')
    })
})