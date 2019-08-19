import { Injectable } from '@angular/core';

function getWindow (): any {
    return window;
}

@Injectable()
export class WindowRefService {
    get nativeWindow (): any {
        if (window.hasOwnProperty('web3')){
            return getWindow();
        }  
    }
}