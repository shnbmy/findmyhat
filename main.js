// import all the required modules 

const prompt = require('prompt-sync')({sigint: true});
const clear = require('clear-screen');

// Instantiate variable
// You can edit or create new variable if needed 

const hat = '^';             // ny hat
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';   // me 
const row = 10;
const col = 10;

// can use function if you prefer to 
// in this kickstarter, we are using class object

// 1) build the whole firled out (10 row x 10 col)
// create 2D Array
// contract the layout of the field using empty array

class Field
{

    field = []; 

    constructor() {
        // this.field = field;
        this.locationX = 0;
        this.locationY = 0;
        this.gameOver = false;

        for (let a = 0; a < col; a++) {
            this.field[a] = [];
        }

        this.generateField(); // put in the patches of grass in the plot 

    }

     generateField() {

        for (let y = 0; y < row; y++) {
          for (let x = 0; x < col; x++) {
            const prob = Math.random();
            this.field[y][x] = fieldCharacter;
           }
        } 
    }

    insideBounds() {
        if (
         this.locationX >= 0 && 
         this.locationY >= 0 && 
         this.locationX < this.field.length && 
         this.locationY < this.field[0].length
     ) ;
    }

        runGame() {
        //Implement your codes
        this.print();
        this.askQuestion();

        }
        
        gameStatus() {
            let myArr = this.field;
            let status = "";
        
            if (this.insideBounds()) {
              let currChar = myArr[this.locationX][this.locationY];
        
              if (currChar === hat) {
                // Win - got the hat
                status = "Congrats you found your hat!";
                this.gameOver = true;
              } else if (currChar === hole) {
                // Loss - Either hole or outside field
                status = "Sorry you lose! You fell down a hole!";
                this.gameOver = true;
              }
            } else {
              status = "Out of bounds - Game End!!";
              this.gameOver = true;
            }
        
            console.log(status);
          }
        
        print() {
         clear();
         const displayString = this.field.map(row => {
            return row.join('');
            }).join('\n');
            console.log(displayString);
        }    

            
        askQuestion() {
        const answer = prompt('Which way? (l,r, u, d)').toUpperCase();
         //Implement your codes
         switch (answer) {
            case 'U':
              this.locationY -= 1;
              break;
            case 'D':
              this.locationY += 1;
              break;
            case 'L':
              this.locationX -= 1;
              break;
            case 'R':
              this.locationX += 1;
              break;
            default:
              console.log('Enter U, D, L or R.');
         }

         this.gameStatus();

        }

        
        //console.log(this.field);
        // Set the "hat" location
        //set character position as [0] [0]
}  


// create an instance object for the Field 

const myField = new Field();
myField.runGame();