*generated with jsdoc-to-markdown package : https://www.npmjs.com/package/jsdoc-to-markdown*
## Classes

<dl>
<dt><a href="#App">App</a></dt>
<dd><p>The main class for wiring the components together.</p>
</dd>
<dt><a href="#CustomEventEmitter">CustomEventEmitter</a></dt>
<dd><p>Class containing event emitting and calling functionality.</p>
</dd>
<dt><a href="#DefaultAppFactory">DefaultAppFactory</a></dt>
<dd><p>Represents the default set up for creating necessary dependencies for the application.</p>
</dd>
<dt><a href="#IntroPageController">IntroPageController</a></dt>
<dd><p>Class that controlls the intro page part of the view.</p>
</dd>
<dt><a href="#QuestionPageController">QuestionPageController</a></dt>
<dd><p>Class that controlls the question part of the view.</p>
</dd>
<dt><a href="#QuestionResultPageController">QuestionResultPageController</a></dt>
<dd><p>Class that controlls the question result part of the view.</p>
</dd>
<dt><a href="#SummaryPageController">SummaryPageController</a></dt>
<dd><p>Class that controlls the summary page part of the view and generates a chart.</p>
</dd>
<dt><a href="#Chapter">Chapter</a></dt>
<dd><p>Represents a Chapter.</p>
</dd>
<dt><a href="#ChartGenerator">ChartGenerator</a></dt>
<dd><p>Represents a chart generator.</p>
</dd>
<dt><a href="#CleanCodeChapters">CleanCodeChapters</a></dt>
<dd><p>Dataholding class, for holding data of all the chapters of Clean Code.</p>
</dd>
<dt><a href="#CleanCodeQuestions">CleanCodeQuestions</a></dt>
<dd><p>Class that holds and constructs all the questions for the quiz.</p>
</dd>
<dt><a href="#FeedbackGenerator">FeedbackGenerator</a></dt>
<dd><p>Represents a feedback generator.</p>
</dd>
<dt><a href="#QuestionsGenerator">QuestionsGenerator</a></dt>
<dd><p>Represents a questions generator, built for development and testing purposes.</p>
</dd>
<dt><a href="#DevLogger">DevLogger</a></dt>
<dd><p>Logger class used for development and testing purposes.</p>
</dd>
</dl>

<a name="App"></a>

## App
The main class for wiring the components together.

**Kind**: global class  
<a name="new_App_new"></a>

### new App(factory)
Constructs a new instance.


| Param | Type | Description |
| --- | --- | --- |
| factory | <code>AppFactory</code> | The factory instance used to create the necessary dependencies. |

<a name="CustomEventEmitter"></a>

## CustomEventEmitter
Class containing event emitting and calling functionality.

**Kind**: global class  

* [CustomEventEmitter](#CustomEventEmitter)
    * [.on(event, listener)](#CustomEventEmitter+on)
    * [.emit(event, payload)](#CustomEventEmitter+emit)

<a name="CustomEventEmitter+on"></a>

### customEventEmitter.on(event, listener)
Method for subscribing to a named event.

**Kind**: instance method of [<code>CustomEventEmitter</code>](#CustomEventEmitter)  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>string</code> | The event name. |
| listener | <code>function</code> | The functionality to be triggered on the event. |

<a name="CustomEventEmitter+emit"></a>

### customEventEmitter.emit(event, payload)
Method for emitting an event that will call all the listener functions
that are registered through the on method of that event.

**Kind**: instance method of [<code>CustomEventEmitter</code>](#CustomEventEmitter)  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>string</code> | The event name. |
| payload | <code>object</code> | The data argument called with the listener functionality. |

<a name="DefaultAppFactory"></a>

## DefaultAppFactory
Represents the default set up for creating necessary dependencies for the application.

**Kind**: global class  
<a name="IntroPageController"></a>

## IntroPageController
Class that controlls the intro page part of the view.

**Kind**: global class  

* [IntroPageController](#IntroPageController)
    * [.hideView()](#IntroPageController+hideView)
    * [.displayView()](#IntroPageController+displayView)

<a name="IntroPageController+hideView"></a>

### introPageController.hideView()
Will hide the view elements controlled by the controller.

**Kind**: instance method of [<code>IntroPageController</code>](#IntroPageController)  
<a name="IntroPageController+displayView"></a>

### introPageController.displayView()
Will display the view elements controlled by the controller.

**Kind**: instance method of [<code>IntroPageController</code>](#IntroPageController)  
<a name="QuestionPageController"></a>

## QuestionPageController
Class that controlls the question part of the view.

**Kind**: global class  

* [QuestionPageController](#QuestionPageController)
    * [.hideView()](#QuestionPageController+hideView)
    * [.displayView()](#QuestionPageController+displayView)
    * [.addQuestionText(questionText)](#QuestionPageController+addQuestionText)
    * [.addAnswerButtons(choices)](#QuestionPageController+addAnswerButtons)

<a name="QuestionPageController+hideView"></a>

### questionPageController.hideView()
Will hide the elements controlled by the controller.

**Kind**: instance method of [<code>QuestionPageController</code>](#QuestionPageController)  
<a name="QuestionPageController+displayView"></a>

### questionPageController.displayView()
Will display the elements controlled by the controller.

**Kind**: instance method of [<code>QuestionPageController</code>](#QuestionPageController)  
<a name="QuestionPageController+addQuestionText"></a>

### questionPageController.addQuestionText(questionText)
Adds the provided text to the element displaying the question text.

**Kind**: instance method of [<code>QuestionPageController</code>](#QuestionPageController)  

| Param | Type | Description |
| --- | --- | --- |
| questionText | <code>String</code> | The string to display. |

<a name="QuestionPageController+addAnswerButtons"></a>

### questionPageController.addAnswerButtons(choices)
Will generate answer buttons with functionality tied
to clicking the button.¨

**Kind**: instance method of [<code>QuestionPageController</code>](#QuestionPageController)  

| Param | Type | Description |
| --- | --- | --- |
| choices | <code>Array.&lt;String&gt;</code> | The choices to the question. |

<a name="QuestionResultPageController"></a>

## QuestionResultPageController
Class that controlls the question result part of the view.

**Kind**: global class  

* [QuestionResultPageController](#QuestionResultPageController)
    * [.hideView()](#QuestionResultPageController+hideView)
    * [.displayView()](#QuestionResultPageController+displayView)
    * [.addResultHeaderText(headerText)](#QuestionResultPageController+addResultHeaderText)

<a name="QuestionResultPageController+hideView"></a>

### questionResultPageController.hideView()
Will hide the view elements that is controlled by the controller.

**Kind**: instance method of [<code>QuestionResultPageController</code>](#QuestionResultPageController)  
<a name="QuestionResultPageController+displayView"></a>

### questionResultPageController.displayView()
Will display the view elements that is controlled by the controller.

**Kind**: instance method of [<code>QuestionResultPageController</code>](#QuestionResultPageController)  
<a name="QuestionResultPageController+addResultHeaderText"></a>

### questionResultPageController.addResultHeaderText(headerText)
Adds the provided text to the element that is displaying the result header.

**Kind**: instance method of [<code>QuestionResultPageController</code>](#QuestionResultPageController)  

| Param | Type | Description |
| --- | --- | --- |
| headerText | <code>String</code> | The text to display. |

<a name="SummaryPageController"></a>

## SummaryPageController
Class that controlls the summary page part of the view and generates a chart.

**Kind**: global class  

* [SummaryPageController](#SummaryPageController)
    * [new SummaryPageController(chartGenerator, cleanCodeChapters)](#new_SummaryPageController_new)
    * [.hideView()](#SummaryPageController+hideView)
    * [.displayView()](#SummaryPageController+displayView)
    * [.generateSummary(categorySummaries)](#SummaryPageController+generateSummary)

<a name="new_SummaryPageController_new"></a>

### new SummaryPageController(chartGenerator, cleanCodeChapters)
Creates a new instance.


| Param | Type | Description |
| --- | --- | --- |
| chartGenerator | [<code>ChartGenerator</code>](#ChartGenerator) | The chart generator for creating a bar chart. |
| cleanCodeChapters | [<code>CleanCodeChapters</code>](#CleanCodeChapters) | The class that holds all the chapter page information. |

<a name="SummaryPageController+hideView"></a>

### summaryPageController.hideView()
Hides the view elements that is controlled by the controller.

**Kind**: instance method of [<code>SummaryPageController</code>](#SummaryPageController)  
<a name="SummaryPageController+displayView"></a>

### summaryPageController.displayView()
Displays the elements that is controlled by the controller.

**Kind**: instance method of [<code>SummaryPageController</code>](#SummaryPageController)  
<a name="SummaryPageController+generateSummary"></a>

### summaryPageController.generateSummary(categorySummaries)
Generates a summary, with a chart and reading recommendations based
on the summary.

**Kind**: instance method of [<code>SummaryPageController</code>](#SummaryPageController)  

| Param | Type | Description |
| --- | --- | --- |
| categorySummaries | <code>Array.&lt;CategorySummary&gt;</code> | List of CategorySummary provided from the Quiz engine                            of gn222gq-quiz-engine. |

<a name="Chapter"></a>

## Chapter
Represents a Chapter.

**Kind**: global class  
<a name="new_Chapter_new"></a>

### new Chapter(chapterNumber, firstPage, lastPage)
Creates a new instance.


| Param | Type | Description |
| --- | --- | --- |
| chapterNumber | <code>number</code> | The chapter number. |
| firstPage | <code>number</code> | The first page. |
| lastPage | <code>number</code> | The last page. |

<a name="ChartGenerator"></a>

## ChartGenerator
Represents a chart generator.

**Kind**: global class  
<a name="ChartGenerator+generateChartJS"></a>

### chartGenerator.generateChartJS(chartElement, scores, categories)
Method for generating and appending a chart to the view.

**Kind**: instance method of [<code>ChartGenerator</code>](#ChartGenerator)  

| Param | Type | Description |
| --- | --- | --- |
| chartElement | <code>Element</code> | The Canvas element to draw the chart on. |
| scores | <code>Array.&lt;number&gt;</code> | The scores to use to fill the bars y axis. |
| categories | <code>Array.&lt;String&gt;</code> | The categories that represents a bar on the chart. |

<a name="CleanCodeChapters"></a>

## CleanCodeChapters
Dataholding class, for holding data of all the chapters of Clean Code.

**Kind**: global class  
<a name="CleanCodeChapters+findChapterByNumber"></a>

### cleanCodeChapters.findChapterByNumber(chapterNum) ⇒
Method for finding a specific chapter based on the chapter number.

**Kind**: instance method of [<code>CleanCodeChapters</code>](#CleanCodeChapters)  
**Returns**: The stored chapter with the corresponding chapter number.  

| Param | Type | Description |
| --- | --- | --- |
| chapterNum | <code>number</code> | The chapter number to find a matching chapter of. |

<a name="CleanCodeQuestions"></a>

## CleanCodeQuestions
Class that holds and constructs all the questions for the quiz.

**Kind**: global class  
<a name="new_CleanCodeQuestions_new"></a>

### new CleanCodeQuestions(questionDataJson)
Creates a new instance.


| Param | Type | Description |
| --- | --- | --- |
| questionDataJson | <code>JSON</code> | The file containing all                                the question data. Should be in this format : { "questions": [{ "text": "example",  "choices": ["test", "test2, etc.."],  "correctChoice": "test", "category": "example"}, etc..]} |

<a name="FeedbackGenerator"></a>

## FeedbackGenerator
Represents a feedback generator.

**Kind**: global class  
<a name="QuestionsGenerator"></a>

## QuestionsGenerator
Represents a questions generator, built for development and testing purposes.

**Kind**: global class  
<a name="QuestionsGenerator+generateChapterQuestions"></a>

### questionsGenerator.generateChapterQuestions(amountOfChapters, amountOfQuestions) ⇒
Utility function that creates mock questions.

**Kind**: instance method of [<code>QuestionsGenerator</code>](#QuestionsGenerator)  
**Returns**: An array of question data objects.  

| Param | Type | Description |
| --- | --- | --- |
| amountOfChapters | <code>number</code> | The amount of chapters to generate. |
| amountOfQuestions | <code>number</code> | The amount of questions to generate. |

<a name="DevLogger"></a>

## DevLogger
Logger class used for development and testing purposes.

**Kind**: global class  

* [DevLogger](#DevLogger)
    * [.addQuestion(question)](#DevLogger+addQuestion)
    * [.logQuestionDetails(questionText)](#DevLogger+logQuestionDetails)

<a name="DevLogger+addQuestion"></a>

### devLogger.addQuestion(question)
Method for adding a question to #allQuestionData.

**Kind**: instance method of [<code>DevLogger</code>](#DevLogger)  

| Param | Type | Description |
| --- | --- | --- |
| question | <code>Question</code> | The question to add. |

<a name="DevLogger+logQuestionDetails"></a>

### devLogger.logQuestionDetails(questionText)
Method for console logging the details of a question.

**Kind**: instance method of [<code>DevLogger</code>](#DevLogger)  

| Param | Type | Description |
| --- | --- | --- |
| questionText | <code>String</code> | The question text to match with stored questions. |

