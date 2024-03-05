import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import PassengerGatewayHttp from './infra/gateway/PassengerGatewayHttp'
import DriverGatewayHttp from './infra/gateway/DriverGatewayHttp'
import AxiosAdapter from './infra/http/AxiosAdapter'
import FetchAdapter from './infra/http/FetchAdapter'

const app = createApp(App)
// const HttpClient = new AxiosAdapter();
const HttpClient = new FetchAdapter();
app.provide("passengerGateway", new PassengerGatewayHttp(HttpClient))
app.provide("driverGateway", new DriverGatewayHttp(HttpClient))
app.mount('#app')
