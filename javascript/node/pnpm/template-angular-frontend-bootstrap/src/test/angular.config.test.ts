import { provideHttpClient } from "@angular/common/http";
import { provideRouter } from "@angular/router";
import { routes } from "../app/app.routes";
import { EnvironmentProviders } from "@angular/core";

export class TestConfig{
    public imports:Array<any>=[];
    public providers:Array<EnvironmentProviders>=[];
    constructor(args:Array<any>){
        this.imports=args;
        this.providers=[provideHttpClient(),provideRouter(routes)];
    }
     
}
 
 