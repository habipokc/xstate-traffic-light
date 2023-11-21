import { assign, createMachine, interpret } from 'https://cdn.skypack.dev/xstate';

const machine = createMachine({
    id: "trafficLights",
    initial: "green",
    states: {
        green: {
            on: { NEXT: "yellow" }
        },
        yellow: {
            on: { NEXT: "red" }
        },
        red: {
            on: { NEXT: "green" }
        }
    }
});

const service = interpret(machine).onTransition(state => {
    document.documentElement.style.setProperty('--state', state.value);

    // State değerine göre sınıfları yönet
    const lights = document.getElementById('lights');
    lights.className = ''; // Mevcut sınıfları temizle
    lights.classList.add(state.value);
});

service.start();

document.getElementById('cycle').addEventListener('click', () => {
    service.send('NEXT');
});
