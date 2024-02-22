import { mount } from '@vue/test-utils';
import CreateDriverVue from "../src/CreateDriver.vue";
import DriverGateway from '../src/infra/gateway/DriverGateway';

function sleep(time: number) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(true), time)
    })
}

test("Deve criar um motorista", async function () {
    const driverGateway: DriverGateway = {
        async save (driver: any): Promise<any> {
            return { driverId: "f282c08a-4f4c-4e97-be47-2080f3d4f069" };
        }
    }
    const wrapper = mount(CreateDriverVue, {
        global: {
            provide: {
                driverGateway
            }
        }
    });
    // Cadastro de passageiro
    await wrapper.get('.driver-name').setValue('John Doe');
    await wrapper.get('.driver-email').setValue('john.doe@gmail.com');
    await wrapper.get('.driver-document').setValue('83432616074');
    await wrapper.get('.driver-car-plate').setValue('AAA9999');
    await wrapper.get('.create-driver-button').trigger('click');
    await sleep(200);    
    expect(wrapper.get('.driver-id').text()).toHaveLength(36);
});