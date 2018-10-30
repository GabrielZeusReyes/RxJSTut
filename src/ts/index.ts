import { Observable, of, from, fromEvent, concat, throwError } from 'rxjs';
import { map, filter, catchError, take, takeUntil } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { allBooks, allReaders } from './data';

// MANUAL OPERATORS
/* 
    let source$ = of(1, 2, 3, 4, 5);

    let doubler = map(value => value* 2);

    let doubled$ = doubler(source$);

    doubled$.subscribe(
        value => console.log(value) // 2, 4, 6, 8, 10
    );
*/

// CHAINING OPERATORS

/* 
        let source$ = of(1, 2, 3, 4, 5);

        source$
            .pipe(
                map(value => value * 2),
                filter(mappedValue => mappedValue > 5),
                catchError((err: any) => console.log(err))
            )
            .subscribe(
                finalValue => console.log(finalValue) // 6, 8, 10
            );

        let books$ = from(allBooks)
            .pipe(
                filter(({ publicationYear }: any) => publicationYear > 1940),
                // catchError( err => of({title: 'Corduroy', author: 'Don Freeman'}) )
                // catchError(err => throw `Something bad happened - $`)
                catchError(err => throwError(err.message))
            )
            .subscribe(value => console.log(value));
*/

// take and takeUntil

let timer$ = new Observable(subscriber => {
    let i = 0;
    let intervalID = setInterval(() => {
        subscriber.next(i++);
    }, 1000);

    return () => {
        console.log('Executing teardown code.');
        clearInterval(intervalID);
    };
});

let button = document.getElementById('pindutan');

let cancelTimer$ = fromEvent(button, 'click');

// take(number) will just take values depending on the number specified, once it done, it will unsubscribe
// the timer observable will continue producing values UNTIL the first value appears on the cancelTimer observable
timer$
    .pipe(
        // take(3)
        takeUntil(cancelTimer$)
    )
    .subscribe(value => console.log(value), null, () =>
        console.log('All Done!')
    );