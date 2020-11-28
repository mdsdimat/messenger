import InputValidation from "modules/validation/InputValidation";

let validation: InputValidation;
beforeEach(() => {
    validation = new InputValidation({fields: [{name: '', validation: []}], validation: []});
});
test('required ok', () => {
    expect(validation.required('4')).toBe(undefined);
});
test('required not ok', () => {
    expect(validation.required('')).toEqual({valid: false, message: expect.any(String)});
});
