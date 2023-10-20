# Feedback

## I exemplen på README.md undrar jag lite över datastrukturerna och returvärden... fundera på om du kan visualisera quizresult och categorySummary
README.md uppdaterad med tydligare info!

## länken från README.md går till editor istället för renderad HTML för dina jsdoc. Fundera på att använda github.io eller driftsätta dokumentationen
Länken uppdaterad till github pages där dokumentationen nu är driftsatt

## Många filer i roten... Fundera på underkataloger för att städa upp lite
Mappstrukturen är uppdaterad. Källfilerna ligger i /src, samt egna error klasser finns i src/errors

## Om jag förstår det rätt så kommer on('correct', ..) alltid behöva en av uppräknat antal strängar? fundera på om du inte ska ersätta första parametern med antingen enum eller ha olika metoder onCorrectAnswer, onDisplayQuestion etc...
Första argumentet till metoden använder nu värden från ENUM.

## Min erfarenhet är tvärtom... men det finns vissa fall där extrem prestanda behövs, ex fysiksimuleringar där en optimering av datastrukturen kan behövas... men det kan fortfarande ske objektorienterat :)
Spännande! Här är referens till killen som utför prestanda testerna som jag referar till :
![cleancodehorribleperformance](https://www.youtube.com/watch?v=tD5NrevFtbU&pp=ygUaY2xlYW4gY29kZSBiYWQgcGVyZm9ybWFuY2U%3D).

## Bra med automatiska enhetstester, jag tänker att den här fina rapporten kan ersättas med en utskrift från npm test för att få lite mer dry?
Håller med, men tänker på uppgiftsbeskrivningen :
"Ni skapar automatiska enhetstester för er modul med hjälp utav ett testramverk. Ni kör dessa och redovisar resultat med en testrapport i markdown. ni kan länka in eventuella testrapporter ifrån testramverk eller ta screenshots och inkludera i er testrapport."