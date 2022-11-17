import { Component, NgModule, OnInit } from '@angular/core';
import { async } from 'rxjs';
import { QuizService } from './quiz.service';

interface QuizDisplay {
  quizName: string;
  quizQuestions: QuestionDisplay[];
  markedForDelete: boolean
}

interface QuestionDisplay {
  questionText: string;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  constructor(private quizSvc: QuizService) {}

  errorLoadingQuizzes = false;

  ngOnInit() {
    const data = this.quizSvc.loadQuizzes();
    console.log(data);

    data.subscribe({
      next: (data) => {
        console.log("data", data);

        this.quizzes = [
          ...this.quizzes,
          ...data.map((x: any) => ({
            quizName: x.name,
            quizQuestions: x.questions.map((y: any) => ({
              questionText: y.name
            })),
            markedForDelete: false
          }))
        ];
        
        console.log(this.quizzes);
      },
      error: (err) => {
        console.error(err);
        this.errorLoadingQuizzes = true;
      }
    });

    
    
  }

  addNewQuiz = () => {
    
    const newQuiz: QuizDisplay = {
      quizName: 'Untitled Quiz',
      quizQuestions: [],
      markedForDelete: false
    };

    this.quizzes = [
      ...this.quizzes,
      newQuiz
    ];

    this.selectQuiz(newQuiz);

  };

  quizzes: QuizDisplay[] = [];

  quizQuestion: QuestionDisplay[] = [];

  selectedQuiz: QuizDisplay | undefined = undefined;

  selectQuiz = (quizToSelect: QuizDisplay) => {
    this.selectedQuiz = quizToSelect;
  };

  addNewQuestion = () => {
    if (this.selectedQuiz != undefined) {
      this.selectedQuiz.quizQuestions = [
        ...this.selectedQuiz.quizQuestions,
        {
          questionText: 'New Question'
        }
      ]
    }
  };

  removeQuestion = (questionToRemove: QuestionDisplay) => {
    if (this.selectedQuiz != undefined) {
      this.selectedQuiz.quizQuestions = this.selectedQuiz.quizQuestions.filter(x => x !== questionToRemove)
    }
  };

  jsPromisesOne = () => {
    const n1 = this.quizSvc.getMagicNumber(true);
    console.log(n1);

    n1.then(
      n => {
        console.log(n);

        const n2 = this.quizSvc.getMagicNumber(true);
        console.log(n2);

        n2.then(
          n => console.log(n)
        ).catch(
          e => console.log(e)
          )
      }

      
    ).catch(
      e => console.log(e)
    )
  };

  jsPromisesTwo = async () => {
    try {
      const n1 = await this.quizSvc.getMagicNumber(true);
      console.log(n1);

      const n2 = await this.quizSvc.getMagicNumber(true);
      console.log(n2);
    }

    catch (err) {
      console.log(err)
    }
  };

  jsPromisesThree = async () => {
    try {
      const n1 = this.quizSvc.getMagicNumber(true);
      console.log(n1);

      const n2 = this.quizSvc.getMagicNumber(false);
      console.log(n2);

      // const results = await Promise.all([n1, n2]);
      // const results = Promise.race([n1, n2]);
      const results = await Promise.any([n1, n2]);
      console.log(results);
    }

    catch (err) {
      console.log(err)
    }
  };

}
