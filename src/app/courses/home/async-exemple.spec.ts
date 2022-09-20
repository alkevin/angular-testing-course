import {fakeAsync, flush, flushMicrotasks, tick} from '@angular/core/testing';
import {of} from 'rxjs';
import {delay} from 'rxjs/operators';

describe('Async Testing Examples', () => {

    it('Asynchronous test example with Jasmine done()', (done: DoneFn) => {
        let test = false;
        setTimeout( () => {
            console.warn('running assertions');
            test = true;
            expect(test).toBeTruthy();
            done();
        }, 1000);
    });

    it('Asynchronous test example - setTimeout()', fakeAsync(() => {
        let test = false;
        setTimeout(() => {});
        setTimeout(() => {
            console.warn('running assertions setTimeout()');
            test = true;
        }, 1000);
        //tick(1000);
        flush();
        expect(test).toBeTruthy();
    }));

    it('Asynchronous test example - plain Promise', fakeAsync(() => {
        let test = false;
        console.warn('Creating Promise');
        Promise.resolve().then(() => {
           console.warn('Promise first then() evaluated successfully');
           return Promise.resolve();
        }).then(() => {
            console.warn('Promise second then() evaluated successfully')
            test = true;
        });
        flushMicrotasks();
        console.warn('Running test assertions');
        expect(test).toBeTruthy();
    }));

    it('Asynchronous test example - Promises + setTimeout()', fakeAsync(() => {
        let counter = 0;
        Promise.resolve().then(() => {
            counter += 10;
            setTimeout(() => {
                counter += 1;
            }, 1000);
        });
        expect(counter).toBe(0);
        flushMicrotasks();
        expect(counter).toBe(10);
        tick(500);
        expect(counter).toBe(10);
        tick(500);
        expect(counter).toBe(11);
    }));

    it('Asynchronous test example - Observables', fakeAsync(() => {
        let test = false;
        console.warn('Creating Observable');
        const test$ = of(test).pipe(delay(1000));
        test$.subscribe(() => {
            test = true;
        });
        tick(1000);
        console.warn('Running test assertions');
        expect(test).toBe(true);
    }));
});
