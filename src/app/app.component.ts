import { Component, OnInit } from '@angular/core';
import { QuizService } from './quiz.service';

interface QuizDisplay {
  quizName: string;
  quizQuestions: QuestionDisplay[];
  markedForDelete: boolean;
}
interface QuestionDisplay {
  questionText: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private quizSvc: QuizService) {}

  errorLoadingQuizzes = false;
  
  loadQuizzesFromWeb = async () => {
    try {
      
      const data = await this.quizSvc.loadQuizzes();
      console.log(data);


        this.quizzes = data.map((x) => ({
          quizName: x.name
          , quizQuestions: x.questions.map((y: any) => ({ 
            questionText: y.name 
          }))
          , markedForDelete: false
        }));
      }
      catch (err) {
      console.log(err);
      }
  };
  ngOnInit() {
    this.loadQuizzesFromWeb();
  }

  quizzes: QuizDisplay[] = [];
  selectedQuiz: QuizDisplay | undefined = undefined;
  selectQuiz = (quizToSelect: QuizDisplay) => {
    this.selectedQuiz = quizToSelect;
  };

  addNewQuiz = () => {
    const newQuiz: QuizDisplay = {
      quizName: 'Untitled Quiz',
      quizQuestions: [],
      markedForDelete: false
    };
    this.quizzes = [...this.quizzes, newQuiz];
    this.selectQuiz(newQuiz);
  };

  addNewQuestion = () => {
    if (this.selectedQuiz !== undefined) {
      this.selectedQuiz.quizQuestions = [
        ...this.selectedQuiz.quizQuestions,
        {
          questionText: 'New Question',
        },
      ];
    }
  };

  removeQuestion = (questionToRemove: QuestionDisplay) => {
    if (this.selectedQuiz !== undefined) {
      this.selectedQuiz.quizQuestions = this.selectedQuiz.quizQuestions.
      filter(x => x !== questionToRemove)
    }
  };

  jsPromisesOne = () => {
    const n1 = this.quizSvc.getMagicNumber(true);
    console.log(n1);
    
    n1
    .then(
      n => {
        console.log(n);
        const n2 = this.quizSvc.getMagicNumber(true);
        n2
        .then(
          n=> console.log(n)
        )
        .catch(
          e =>console.log(e)
        )
      }
    )
    .catch(
      e => {
        console.log(e);
        
      }
    );
  };
  
  jsPromisesTwo = async () => {
    try {
      const n1 = await this.quizSvc.getMagicNumber(false);
      console.log(n1);
      
      const n2 = await this.quizSvc.getMagicNumber(true);
      console.log(n2);
    }
    catch (err) {
      console.log(err);  
    }
  }

  jsPromisesThree = async () => {
    try {
      const n1 = this.quizSvc.getMagicNumber(false);
      console.log(n1);
      
      const n2 = this.quizSvc.getMagicNumber(true);
      console.log(n2);

      const results = await Promise.any([n1, n2]);1
      // const results = await Promise.all([n1, n2]);
      // const results = await Promise.race([n1, n2]); // race shows the first result that comes back and only that result
      console.log(results);
      
    }
    catch (err) {
      console.log(err);  
    }
  }
};
