import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export function get_settings(appLoadService: AppLoadService) {
    return () => appLoadService.getSettings();
}

export class AppConfig {
    appName?: string;
}

@Injectable()
export class AppLoadService {

    constructor(private httpClient: HttpClient,
        private config: AppConfig) {
    }

    getSettings(): Promise < AppConfig > {
        console.log(`getSettings: before http.get call`);

        const promise = new Promise(resolve => {
            resolve({appName: 'My App'});
        });

        return Promise.all([promise]).then(() => this.config);

    }
}
