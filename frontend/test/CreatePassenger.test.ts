import { mount } from '@vue/test-utils';
import CreatePassengerVue from "../src/CreatePassenger.vue";
import PassengerGateway from '../src/infra/gateway/PassengerGateway';

function sleep(time: number) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(true), time)
    })
}

test("Deve criar um motorista", async function () {

    const passengerGateway: PassengerGateway = {
        async save (passenger: any): Promise<any> {
            return "f282c08a-4f4c-4e97-be47-2080f3d4f069"
        }
    }
    const wrapper = mount(CreatePassengerVue, {
        global: {
            provide: {
                passengerGateway: passengerGateway
            }
        }
    });
    // Cadastro de passageiro
    await wrapper.get('.passenger-name').setValue('John Doe');
    await wrapper.get('.passenger-email').setValue('john.doe@gmail.com');
    await wrapper.get('.passenger-document').setValue('83432616074');
    await wrapper.get('.create-passenger-button').trigger('click');
    await sleep(200);    
    expect(wrapper.get('.passenger-id').text()).toHaveLength(36);
});