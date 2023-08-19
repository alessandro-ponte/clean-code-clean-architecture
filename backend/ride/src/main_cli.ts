// O Node ele consegue interagir com o processo que está rodando.
// Esse process tem um canal chamado standard input ou standard output que é por meio dele que você fala com o terminal
// Podemos detectar dados no standard input
// documentacao: https://nodejs.org/api/process.html
import CreatePassenger from './application/usecase/CreatePassenger';
import CLIController from './infra/cli/CLIController';
import NodeInputOutput from './infra/cli/NodeInputOutput';
import PgPromiseAdapter from './infra/database/PgPromiseAdapter';
import PassengerRepositoryDatabase from './infra/repository/PassengerRepositoryDatabase';

// main composition root
const connection = new PgPromiseAdapter();
const passengerRepository = new PassengerRepositoryDatabase(connection);
const createPassenger = new CreatePassenger(passengerRepository);
const inputOutput = new NodeInputOutput();
new CLIController(inputOutput, createPassenger);