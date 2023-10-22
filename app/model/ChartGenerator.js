import Chart from 'chart.js/auto';
import InvalidElementError from './errors/InvalidElementError.js';
import InvalidArrayContentError from './errors/InvalidArrayContentError.js';
import LengthMismatchError from './errors/LengthMismatchError.js';


/**
 * Represents a chart generator.
 */
class ChartGenerator {
  #chartInstance;

  constructor() {
    this.#chartInstance = null;
  }

  /**
   * Method for generating and appending a chart to the view.
   *
   * @param {Element} chartElement The Canvas element to draw the chart on.
   * @param {number[]} scores The scores to use to fill the bars y axis.
   * @param {String[]} categories The categories that represents a bar on the chart.
   */
  generateChartJS(chartElement, scores, categories) {
    this.#validateChartElement(chartElement);
    this.#validateScores(scores);
    this.#validateCategories(categories);
    this.#validateArrayLengths(scores, categories);

    const paired = categories.map((category, index) => ({ category, score: scores[index] }));
    paired.sort((a, b) => {
      const chapterANumber = parseInt(a.category.replace('Chapter ', ''), 10);
      const chapterBNumber = parseInt(b.category.replace('Chapter ', ''), 10);
      return chapterANumber - chapterBNumber;
    });

    const sortedCategories = paired.map(pair => pair.category);
    const sortedScores = paired.map(pair => pair.score);

    const ctx = chartElement.getContext('2d');

    if (this.#chartInstance) {
      this.#chartInstance.destroy();
    }

    const redGradient = ctx.createLinearGradient(0, 0, 0, 400);
    redGradient.addColorStop(0, '#f28e85');
    redGradient.addColorStop(1, '#d83367');

    const yellowGradient = ctx.createLinearGradient(0, 0, 0, 400);
    yellowGradient.addColorStop(0, '#fce788');
    yellowGradient.addColorStop(1, '#f9d548');

    const greenGradient = ctx.createLinearGradient(0, 0, 0, 400);
    greenGradient.addColorStop(0, '#8ede83');
    greenGradient.addColorStop(1, '#34d058');

    const backgroundColors = sortedScores.map((score) => {
      if (score < 50) return redGradient;
      if (score >= 50 && score <= 70) return yellowGradient;
      return greenGradient;
    });

    const config = {
      type: 'bar',
      data: {
        labels: sortedCategories,
        datasets: [{
          label: 'Correct Answers (%)',
          data: sortedScores,
          backgroundColor: backgroundColors,
          borderColor: backgroundColors,
          borderWidth: 1,
        }],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Chapter correctness',
          },
          tooltip: {
            callbacks: {
              label(context) {
                const value = context.parsed.y;
                return `Correct: ${value}%`;
              },
            },
          },
        },
        scales: {
          x: {
            type: 'category',
            labels: sortedCategories,
          },
          y: {
            type: 'linear',
            beginAtZero: true,
            max: 100,
          },
        },
      },
    };

    this.#chartInstance = new Chart(ctx, config);
  }


  // eslint-disable-next-line class-methods-use-this
  #validateChartElement(chartElement) {
    if (!(chartElement instanceof HTMLCanvasElement)) {
      throw new InvalidElementError('chartElement must be an instance of HTMLCanvasElement');
    }
  }

  // eslint-disable-next-line class-methods-use-this
  #validateScores(scores) {
    if (!Array.isArray(scores) || !scores.every((item) => typeof item === 'number' && item >= 0 && item <= 100)) {
      throw new InvalidArrayContentError('scores must be an array of numbers between 0 and 100');
    }
  }

  // eslint-disable-next-line class-methods-use-this
  #validateCategories(categories) {
    if (!Array.isArray(categories) || !categories.every((item) => typeof item === 'string')) {
      throw new InvalidArrayContentError('categories must be an array of strings');
    }
  }
  // eslint-disable-next-line class-methods-use-this
  #validateArrayLengths(scores, categories) {
    if (scores.length !== categories.length) {
      throw new LengthMismatchError();
    }
  }
}

export default ChartGenerator;
