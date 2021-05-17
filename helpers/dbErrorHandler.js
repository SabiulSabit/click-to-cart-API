"use strict";


exports.errorHandler = error =>{
    let message = "";

    if(error.code){
        switch (error.code){
            case 11000: 
            case 11001:
                message = uniqueMessage(error)
                break;
        }
    }
}