import Chart from 'chart.js/auto';

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
    this.#validateGenerateChartJsArguments(chartElement, scores, categories);
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

    const backgroundColors = scores.map((score) => {
      if (score < 50) return redGradient;
      if (score >= 50 && score <= 70) return yellowGradient;
      return greenGradient;
    });

    const config = {
      type: 'bar',
      data: {
        labels: categories,
        datasets: [{
          label: 'Correct Answers (%)',
          data: scores,
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
            labels: categories,
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

  #validateGenerateChartJsArguments(chartElement, scores, categories) {
    if (!(chartElement instanceof HTMLCanvasElement)) {
      throw new TypeError('chartElement must be an instance of HTMLCanvasElement');
    }
    if (!Array.isArray(scores) || !scores.every((item) => typeof item === 'number')) {
      throw new TypeError('scores must be an array of numbers');
    }
    if (!Array.isArray(categories) || !categories.every((item) => typeof item === 'string')) {
      throw new TypeError('categories must be an array of strings');
    }
    if (scores.length !== categories.length) {
      throw new Error('scores and categories arrays must have the same length');
    }
  }
}

export default ChartGenerator;
