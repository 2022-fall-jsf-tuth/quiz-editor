import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { repeat, lastValueFrom } from 'rxjs';

interface QuizFromWeb {
  name: string;
  questions: {
    name: string;
  }[];
}

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(
    private angularHttpSvc: HttpClient
  ) { }

  loadQuizzes = () => {

    const quizzesFromWeb = this.angularHttpSvc.get<QuizFromWeb[]>(
      "https://modern-js.azurewebsites.net/api/HttpTriggerJS1?code=8XD3vN3ehHLdZacBQJQhgUnNst9202gdd5VM3kWCytDkz2nXhia6kA==&name=Mystery%20Quiz"
    );

    return lastValueFrom(
      quizzesFromWeb.pipe(repeat(1))
    );
  };

  getMagicNumber = (callerWantsToSucceed: boolean): Promise<number> => {
    return new Promise<number>(
      (resolve, reject) => {

        //
        // Some fancy long running code here...
        //

        // Ultimately resolve if successful.
        if (callerWantsToSucceed) {
          resolve(42);
        }
        // Or reject if failure.
        else {
          reject("Promise was rejected ! ! !");
        }
      }
    );
  };  
}
