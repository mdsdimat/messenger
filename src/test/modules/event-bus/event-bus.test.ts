import EventBus from "../../../modules/event-bus";

let eventBus: EventBus;
let testObj: {count: number};

beforeEach(() => {
    eventBus = new EventBus();
})

test('event-bus emit', () => {
    testObj = {count: 0};
    eventBus.on('test', (testObj: {count: number}) => {testObj.count++});
    eventBus.emit('test', testObj)
    expect(testObj.count).toEqual(1);
})