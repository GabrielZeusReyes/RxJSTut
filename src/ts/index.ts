import { Observable, of, from, fromEvent, concat, throwError } from 'rxjs';
import { map, filter, catchError, take, takeUntil } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { allBooks, allReaders } from './data';

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

// EVENTS

let btn = document.getElementById('readersButton'),
    cont = document.getElementById('readers');

fromEvent(btn, 'click').subscribe((e: any) => {
    allReaders.map(reader => (cont.innerHTML += `<p>${reader.name}</p>`));
});
