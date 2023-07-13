// @ts-nocheck
export default class CPF{

    value;
    constructor(cpf: string){
        if (!cpf) throw new Error('invalid input');
        this.value = this.removeMask(cpf);
        if(!this.validate()) throw new Error('invalid CPF');
    }

    validate () {
        if (!this.verifyLength() || this.areAllDigitsSame()) return false;
        try{
            let digit1 = 0;
            let digit2 = 0;        
            let total2 = 0;  
            let total1 = 0;
            for (let count = 1; count < this.value.length -1; count++) {
                let caracter = parseInt(this.value.substring(count -1, count));
                total1 = total1 + ( 11 - count ) * caracter;
                total2 = total2 + ( 12 - count ) * caracter;
            };
            digit1 = this.calculateDigit(total1);
            total2 += 2 * digit1;          
            digit2 = this.calculateDigit(total2);
            const resultDigit = `${digit1}${digit2}`;
            return this.extractVerifyingDigit(this.value) == resultDigit;
        }catch (e){            
            throw Error(e.message);
        } 
    }

    removeMask (cpf) {
        return cpf.replace(/\D/g,'');
    }

    verifyLength () {
        return this.value.length == 11;
    }

    calculateDigit (total) {    
        let rest = (total % 11);
        return (rest < 2) ? 0 : 11 - rest;
    }

    areAllDigitsSame () {
        return this.value.split("").every(caracter => caracter === this.value[0]);
    }

    extractVerifyingDigit () {
        return this.value.substring(this.value.length-2, this.value.length);
    }
}