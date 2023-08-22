import Passenger from "../../src/domain/passenger/Passenger";

test("Deve criar um passegeiro", function () {
    const passenger = Passenger.create('John Doe', 'john.doe@gmail.com', '83432616074');
    expect(passenger.passengerId).toBeDefined();
    expect(passenger.name).toBe('John Doe');
    expect(passenger.email.value).toBe('john.doe@gmail.com');
    expect(passenger.document.value).toBe('83432616074');
});

test("Não pode criar um passegeiro com cpf inválido", function () {
    expect(() => Passenger.create('John Doe', 'john.doe@gmail.com', '83432616076')).toThrow(new Error("Invalid cpf"));    
});

test("Não pode criar um passegeiro com email inválido", function () {
    expect(() => Passenger.create('John Doe', 'john.doe@gmail', '83432616074')).toThrow(new Error("Invalid email"));    
});