// Essa classe abstrata foi separada do NodeInputOutput para que seja possivel rodar testes. Caso contrario poderia ficar tudo na NodeInputOutput
export default abstract class InputOutput {
    commands: any = {};

    on (command: string, callback: Function) {
        this.commands[command] = callback;
    }
    // create-passenger ana ana
    async type (text: string) {
        const [command] = text.split(' ');
        if (!this.commands[command]) return;
        const params = text.replace(command, '').trim();
        await this.commands[command](params);
    }

    abstract write (text: string): void;
}