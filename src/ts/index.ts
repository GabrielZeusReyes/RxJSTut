import { Observable, of, from, fromEvent, concat, throwError } from 'rxjs';
import { map, filter, catchError, take, takeUntil } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { allBooks, allReaders } from './data';

//#region Creating Observables
// BASIC OBSERVABLE CREATE AND CALL

/* 

    let title = document.title;

    // Observable.create
    let allBooksObservable$ = new Observable( (subscriber:any) => {
        
        if ( title !== 'RxJS Tutorial' ) { subscriber.error( 'Incorrect page title.' ) }; 

        allBooks.map( book => subscriber.next( book ) );

        setTimeout(() => {
            subscriber.complete();
        }, 2000);

        return () => console.log('Fire!');

    } );

    allBooksObservable$.subscribe( 
        ( book:any ) => console.log( book.title ),
        ( err ) => { console.log(err) },
        () => { console.log( 'Completed!' ); }
    );

*/

// ---------------------------------

/* 

    // of and from if you want to create an obeservable from an existing data

    // of is passing individdual objects
    let source1$ = of ('hello', 10, true, allReaders[0].name);
    // source1$.subscribe( (value:any) => console.log(value) );

    // from is passing an object that encapsulates a group of data
    let source2$ = from( allBooks );
    // source2$.subscribe( (value:any) => console.log(value.title) );


    // concat combines two observables
    concat( source1$, source2$ )
        .subscribe( value => console.log(value) );

*/

// ---------------------------------

// EVENTS

/* 
    
    let btn = document.getElementById('readersButton'),
        cont = document.getElementById('readers');

    fromEvent(btn, 'click')
        .subscribe( (e:any) => {
            allReaders.map( reader => cont.innerHTML += `<p>${reader.name}</p>` );
        } );

*/

// ---------------------------------

//#endregion

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

/* 
    let cur`rentTime$ = new Observable( subscriber => {

        const timeString = new Date().toLocaleDateString();
        subscriber.next(timeString);
        subscriber.complete();

    } );

    currentTime$.subscribe(
        (currentTime:any) => console.log(`Observer1: ${currentTime}`)
    );

    setTimeout(() => {
        currentTime$.subscribe(
            (currentTime:any) => console.log(`Observer2: ${currentTime}`)
        );
    }, 1000);

    setTimeout(() => {
        currentTime$.subscribe(
            (currentTime:any) => console.log(`Observer3: ${currentTime}`)
        );
    }, 2000);`
*/

//#endregion

//#region using operators

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

//#endregion
