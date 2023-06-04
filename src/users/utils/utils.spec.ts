import { phoneValidation } from "./phoneValidation";
import { cpfValidation } from "./cpfValidation";


describe('utils phoneValidation',()=>{
    it('must return true for a valid phone ',()=>{
        const result = phoneValidation('(94)984097406')
        expect(result).toBe(true)
    })

    it('must return false for a valid phone ',()=>{
        const result = phoneValidation('(94)84097406')
        expect(result).toBe(false)
    })
})

describe('utils cpfValidation',()=>{
    it('must return true for a valid cpf ',()=>{
        const result = cpfValidation('04157000277')
        expect(result).toBe(true)
    })

    it('must return false for a valid cpf ',()=>{
        const result = cpfValidation('04157089688')
        expect(result).toBe(false)
    })
})