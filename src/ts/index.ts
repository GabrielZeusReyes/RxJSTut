import { Observable, of, from, fromEvent, concat, throwError } from 'rxjs';
import { map, filter, catchError, take, takeUntil } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { allBooks, allReaders } from './data';

//#region Subscribing to Observables w/ Observers

/*
    let myNum:any[] = [1,3, 5];

    let sourceObservables$ = new Observable( subscriber => {
        
        if (!myNum) { subscriber.error('No Values'); }
        else { myNum.map( num => subscriber.next(num) ); }

        subscriber.complete();

    } );

    // let myObserver = {
    //     next: (value:any) => console.log(`Value produced: ${value}`),
    //     error: (err:any) => console.log(`Error: ${err}`),
    //     complete: () => console.log(`All done producing valu es.`)
    // }

    // sourceObservables$.subscribe(myObserver);

    sourceObservables$.subscribe(
        (value:any) => console.log(`Value produced: ${value}`),
        (err:any) => console.error(`Error: ${err}`),
        () => console.log(`All done producing values.`)
    );

*/

// ---------------------------------

/* 
    let books$ = from(allBooks);

    books$.subscribe(
        (book:any) => console.log(`Title: ${book.title}`),
        (err:any) => console.error(`Error: ${err}`),
        () => console.log(`All done producing values.`)
    )
*/

// ---------------------------------

// multiple observer and unsubscribe
// use interval from rxjs

let currentTime$ = new Observable(subscriber => {
    const timeString = new Date().toLocaleDateString();
    subscriber.next(timeString);
    subscriber.complete();
});

currentTime$.subscribe((currentTime: any) =>
    console.log(`Observer1: ${currentTime}`)
);

setTimeout(() => {
    currentTime$.subscribe((currentTime: any) =>
        console.log(`Observer2: ${currentTime}`)
    );
}, 1000);

setTimeout(() => {
    currentTime$.subscribe((currentTime: any) =>
        console.log(`Observer3: ${currentTime}`)
    );
}, 2000);

//#endregion
