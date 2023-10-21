# Test Specification

## 1. Chapter specific questions
### 1.1 Presence of chapter specific questions of chapter 2 to 11.
#### Preconditions
The application has been started with DEV_MODE=true and access to the Clean Code book.
#### Steps
1) Start the quiz<br>
2) As you answer questions, verify that the question displayed asks about information
about the contents of the chapter that is the questions category.<br>
#### Expected result
Each question should be associated with the correct chapter.
### 1.2 Question coverage for all chapters (2 - 11).
#### Preconditions
The application has been started with DEV_MODE=true.
#### Steps
1) Start the quiz<br>
2) As you answer questions, verify that at least one question per chapter appears.
#### Expected result
At least one question per chapter (2 - 11) should appear.

## 2. Presence of visual representation
### 2.1 Presence of a chart display
#### Preconditions
The application is started.
#### Steps
1) Start the quiz.<br>
2) Answer questions until the quiz is done.<br>
#### Expected result
A clear visual bar chart should display performance metrics per chapter.
### 2.1 Performance Chart Accuracy
#### Preconditions
The application has been started with DEV_MODE=true.
#### Steps
1) Start the quiz.<br>
2) Answer questions until the quiz is done.<br>
3) Verify that the data displayed in the bar chart correlates with the data printed to the console.
#### Expected result
The data displayed in the console should correlate with the displayed data.

## 3.Receive reading recommendations based on quiz performance.
### 3.1 Recommendation display
#### Preconditions
The application is started.
#### Steps
1) Start the quiz.<br>
2) Answer questions until the quiz is done.<br>
#### Expected result
Chapters where performance was below 50% should have strong reading recommendations displayed with
page numbers displayed. Chapters where performance was 50-70% should have medium strong reading recommendations
with page numbers displayed.
### 3.1 Recommendation accuracy
#### Preconditions
The application has been started with DEV_MODE=true.
#### Steps
1) Start the quiz.<br>
2) Answer questions until the quiz is done.<br>
#### Expected Result
The data displayed in the console should correlate with the reading recommendations displayed.

## 4 Color coded visual representation based on performance
### 4.1 Color coded bar chart display
#### Precondition
The application has been started with DEV_MODE=true.
#### Steps 
1) Start the quiz.<br>
2) Answer questions, scoring low (below 50% correct) on at least chapter, medium (50-70% correct) on at least one chapter and high (+70% correct answers) on at least one chapter, until quiz is done.
#### Expected result
Low scores should be presented with red bars, medium scores should be presented with yellow bars and high scores should be presented with green bars.

## 5. Percentage score for each chapter.
### 5.1 Chapter score display
#### Precondition
The application is started.
#### Steps
1) Start quiz.<br>
2) Answer questions until the quiz is done.<br>
#### Expected result
Each chapter should be represented with a bar in the chart, and hoovering the bar should
display that chapters % of correct answers.
### 5.2 Chapter score accuracy
#### Preconditions
The application is started with DEV_MODE=true.
#### Steps 
1) Start the quiz. <br>
2) Answer a each question, and keep manual count of correct answers per chapter.
3) Continue answering and keeping count until quiz is done.
#### Expected result
The displayed percentage scores should match the manual count.

## 6. Option to retake the quiz
### 6.1 Quiz retake availability
#### Precondition
The application is started.
#### Steps
1) Start the quiz.<br>
2) Answer questions until the quiz is done.<br>
#### Expected result
A button should appear with the text "Restart quiz!".
### 6.2 Quiz retake functionality
#### Preconditions
The application is started with DEV_MODE=true
#### Steps
1) Start the quiz.<br>
2) Answer correctly for all questions with category = "Chapter 1", and incorrectly for all other categories until quiz is done.<br>
3) Verify that the bar displaying % of correct answers for Chapter 1 is at the top of the y axis.<br>
4) Click the button with the text "Restart quiz!".<br>
5) Retake the quiz, answer correctly for all questions with category = "Chapter 2", and incorrectly for all other categories until quiz is done.<br>
#### Expected result
The bar for Chapter 2 should be at the top of the Y axis, and the bar for Chapter 1 should be at the bottom of the y axis.

## 7. Stand alone native application for desktop that works offline.
### 7.1 Builds natively
#### Preconditions
Have a terminal open at the root of the project.
#### Steps
1) Run npm run package
#### Expected Result
The build outputs an executable in the out folder of the project.
### 7.2 Runs natively
#### Preconditions
The application has been built successfully.
#### Steps 
1) Open the executable created by the build process inside of the out folder.
#### Expected result
The application starts, and a native application window appears, and a button with the text "Start quiz!" is visible.
### 7.3 The application runs offline
#### Precondition
The application is built successfully and the device is disconnected from the internet.
#### Steps
1) Launch the application.<br>
2) Start the quiz.<br>
3) Answer questions until the quiz is done.<br>
#### Expected result
The application runs correctly.
