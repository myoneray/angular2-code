"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var forms_1 = require("@angular/forms");
var util_1 = require("../util");
var platform_browser_1 = require("@angular/platform-browser");
var demo_form_with_custom_validations_1 = require("../../app/ts/forms/demo_form_with_custom_validations");
describe('DemoFormWithCustomValidations', function () {
    var el, input, form;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [forms_1.FormsModule, forms_1.ReactiveFormsModule],
            declarations: [demo_form_with_custom_validations_1.DemoFormWithCustomValidations]
        });
    });
    function createComponent() {
        var fixture = testing_1.TestBed.createComponent(demo_form_with_custom_validations_1.DemoFormWithCustomValidations);
        el = fixture.debugElement.nativeElement;
        input = fixture.debugElement.query(platform_browser_1.By.css("input")).nativeElement;
        form = fixture.debugElement.query(platform_browser_1.By.css("form")).nativeElement;
        fixture.detectChanges();
        return fixture;
    }
    it('displays errors with no sku', testing_1.fakeAsync(function () {
        var fixture = createComponent();
        input.value = '';
        util_1.dispatchEvent(input, 'input');
        fixture.detectChanges();
        var msgs = el.querySelectorAll('.ui.error.message');
        expect(msgs[0].innerHTML).toContain('SKU is invalid');
        expect(msgs[1].innerHTML).toContain('SKU is required');
        expect(msgs[2].innerHTML).toContain('SKU must begin with <span>123</span>');
        expect(msgs[3].innerHTML).toContain('Form is invalid');
    }));
    it('removes the required error when sku has a value', testing_1.fakeAsync(function () {
        var fixture = createComponent();
        input.value = 'ABC';
        util_1.dispatchEvent(input, 'input');
        fixture.detectChanges();
        var msgs = el.querySelectorAll('.ui.error.message');
        expect(msgs[0].innerHTML).toContain('SKU is invalid');
        expect(msgs[1].innerHTML).toContain('SKU must begin with <span>123</span>');
        expect(msgs[2].innerHTML).toContain('Form is invalid');
    }));
    it('removes all errors when sku starts with 123', testing_1.fakeAsync(function () {
        var fixture = createComponent();
        input.value = '123ABC';
        util_1.dispatchEvent(input, 'input');
        fixture.detectChanges();
        var msgs = el.querySelectorAll('.ui.error.message');
        expect(msgs.length).toEqual(0);
    }));
});
