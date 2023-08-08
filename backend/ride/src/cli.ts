// O Node ele consegue interagir com o processo que está rodando.
// Esse process tem um canal chamado standard input ou standard output que é por meio dele que você fala com o terminal
// Podemos detectar dados no standard input
// documentacao: https://nodejs.org/api/process.html
import CreatePassenger from './application/usecase/CreatePassenger';
import PassengerRepositoryDatabase from './infra/repository/PassengerRepositoryDatabase';

// driver, primary actor, inbound adapter
process.stdin.on('data', async (chunk) => {
    const command = chunk.toString().replace(/\n/g, '');
    if (command.startsWith('create-passenger')) {
        try{
            const [name, email, document] = command.replace("create-passenger ", "").split(" ");
            const usecase = new CreatePassenger(new PassengerRepositoryDatabase());
            const output = usecase.execute({ name, email, document });
            console.log(output);            
        } catch (e: any) {
            console.log(e.message);
        }
    }
});