import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  loadQuizzes = (): QuizFromWeb[] => {

    const quizzesFromWeb = [
      {
        name: 'Quiz 1',
        questions: [
          {
            name: 'Question 1'
          },
          {
            name: 'Question 2'
          },
          {
            name: 'Question 3'
          }
        ]
      }, 
      {
        name: 'Quiz 2',
        questions: [
          {
            name: 'Question 1'
          },
          {
            name: 'Question 2'
          }
        ]
      },
      {
        name: 'Quiz 3',
        questions: []
      }
    ];

    return quizzesFromWeb;
  }


}
