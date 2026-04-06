import { clearInterval } from "timers";


/**
 * Waits until `validateFunction()` returns a truthy value or until the timeout elapses.
 *
 * - `validateFunction`: a function that checks a condition; it should return a truthy
 *   value when the desired condition is satisfied (for example: resource ready, no error).
 * - `timeoutInSeconds`: maximum time in seconds to wait.
 *
 * Return behavior:
 * - Resolves with `false` when `validateFunction()` returns truthy within the timeout
 *   (this indicates that there is NO error — therefore the function resolves to `false`).
 * - Rejects with the string `"Timeout"` if the timeout expires before the condition is met.
 *
 * Notes:
 * - Throws an `Error` immediately if `validateFunction` is not a function.
 * - The validation check runs every 200ms.
 *
 * @param {Function} validateFunction function that checks the condition (returns truthy when OK)
 * @param {number} timeoutInSeconds maximum time in seconds
 * @returns {Promise<boolean>} Promise that resolves to `false` when there is no error; rejects with `"Timeout"` otherwise.
 */
export function awaitFor(validateFunction:any, timeoutInSeconds:number) : Promise<boolean>{
    if(!(validateFunction instanceof Function))
    {
        throw new Error("validation need be a function");
    }

    return new Promise((resolve,reject)=>{
        const start:number = new Date().getTime();
        const end:number = start+ (timeoutInSeconds*1000);

        if(validateFunction())
        {
            resolve(false);
            return;
        }

        const handler = setInterval(()=>{
            if(validateFunction())
            {
                resolve(false);
                return;
            }
            if(new Date().getTime() > end)
            {
                clearInterval(handler);
                reject("Timeout");
            }
        },200);
        
        

    });

}