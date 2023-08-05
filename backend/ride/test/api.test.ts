import axios from "axios"

axios.defaults.validateStatus = function () {
    return true;
};

test("Deve fazer o cálculo do preço de uma corrida durante o dia", async function () {    
    const input = {
        segments: [
        { distance: 10, date: "2021-03-01T10:00:00"}
        ]
    };
    const response = await axios.post("http://localhost:3000/calculate_ride", input);
    const output = await response.data;
    expect(output.price).toBe(21);
});

test("Se a distância for inválida deve lançar um erro", async function () {    
    const input = {
        segments: [
        { distance: -10, date: "2021-03-01T10:00:00"}
        ]
    };
    const response = await axios.post("http://localhost:3000/calculate_ride", input);
    expect(response.status).toBe(422);
    const output = response.data;
    expect(output).toBe("Invalid distance");
});

test("Deve cadastrar o passageiro quando informado todos os dados válidos", async function () {    
    const input = {
        name: 'Alessandro Ponte',
        email: 'alessandrosponte@gmail.com',
        document: '17547870376'
    };
    const response1 = await axios.post("http://localhost:3000/passengers", input);
    const output1 = response1.data;
    expect(output1.passengerId).toBeDefined();    
});

test("Não deve cadastrar o passageiro com o cpf inválido", async function () {    
    const input = {
        name: 'Alessandro Ponte',
        email: 'alessandrosponte@gmail.com',
        document: '17547870374'
    };
    const response = await axios.post("http://localhost:3000/passengers", input);
    expect(response.status).toBe(422);
    const output = response.data;
    expect(output).toBe('Invalid cpf');
});

test("Deve obter o passageiro", async function () {    
    const input = {
        name: 'Alessandro Ponte',
        email: 'alessandrosponte@gmail.com',
        document: '17547870376'
    };
    const response1 = await axios.post("http://localhost:3000/passengers", input);
    const output1 = response1.data;    
    const response2 = await axios.get(`http://localhost:3000/passengers/${output1.passengerId}`);
    const output2 = response2.data;    
    expect(output2.name).toBe('Alessandro Ponte');
    expect(output2.email).toBe('alessandrosponte@gmail.com');
    expect(output2.document).toBe('17547870376');
});

test("Deve cadastrar o motorista", async function () {    
    const input = {
        name: 'Alessandro Ponte',
        email: 'alessandrosponte@gmail.com',
        document: '17547870376',
        carPlate: 'AAA9999'
    };
    const response = await axios.post("http://localhost:3000/drivers", input);
    const output = response.data;    
    expect(output.driverId).toBeDefined();
});


test("Não deve cadastrar o motorista com cpf inválido", async function () {    
    const input = {
        name: 'Alessandro Ponte',
        email: 'alessandrosponte@gmail.com',
        document: '17547870371',
        carPlate: 'AAA9999'
    };
    const response = await axios.post("http://localhost:3000/drivers", input);    
    expect(response.status).toBe(422);
    const output = response.data;
    expect(output).toBe('Invalid cpf');
});

test("Deve obter o motorista", async function () {    
    const input = {
        name: 'Alessandro Ponte',
        email: 'alessandrosponte@gmail.com',
        document: '17547870376',
        carPlate: 'AAA9999'
    };
    const response1 = await axios.post("http://localhost:3000/drivers", input);
    const output1 = response1.data;    
    const response2 = await axios.get(`http://localhost:3000/drivers/${output1.driverId}`);
    const output2 = response2.data;    
    expect(output2.name).toBe('Alessandro Ponte');
    expect(output2.email).toBe('alessandrosponte@gmail.com');
    expect(output2.document).toBe('17547870376');
    expect(output2.carPlate).toBe('AAA9999');
});