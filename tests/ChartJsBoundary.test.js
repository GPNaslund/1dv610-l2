import Chart from 'chart.js/auto';

describe('Chart.js Boundary Test', () => {

  let canvas;
  let ctx;

  beforeEach(() => {
      canvas = document.createElement('canvas');
      ctx = canvas.getContext('2d');
  });

  it('has expected methods and properties', () => {
      expect(typeof Chart).toBe('function');
      expect(typeof ctx.createLinearGradient).toBe('function');
  });

  it('can instantiate without throwing', () => {
      const instantiate = () => {
          new Chart(ctx, {
              type: 'bar',
              data: { labels: [], datasets: [] },
          });
      };
      expect(instantiate).not.toThrow();
  });
});
