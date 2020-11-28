import Form from "components/form/Form";

let input: Form;

beforeEach(() => {
    const props = {
        buttonsClassName: 'modal-window_buttons',
        formClassName: 'js-form',
    }
    input = new Form(props, '', '');
})

test('render Form', () => {
    expect(input.renderToString()).toBe(
        `<div _key="uniq0"><form class="js-form">
                        
                    <div class="modal-window_buttons">
                        
                    </div>
                </form></div>`)
})