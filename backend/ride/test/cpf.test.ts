import CPF from '../src/CPF';

test("Deve validar um CPF válido", function () {
    // given
    const cpf = '380.126.828-42';
    // when
    const output = new CPF(cpf);
    // then    
    expect(output).toBeDefined();
});

test("Não deve validar um CPF inválido", function () {
    // given
    const cpf = '380.126.828-48';
    expect(() => new CPF(cpf)).toThrow('invalid CPF');
});