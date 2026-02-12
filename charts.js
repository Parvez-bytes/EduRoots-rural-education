async function loadChart() {
  try {
    // 1) Fetch JSON data
    const response = await fetch('scores.json');
    const data = await response.json();

    // 2) Extract names & scores
    const names = data.students.map(s => s.name);
    const scores = data.students.map(s => s.score);

    // 3) Draw Chart.js bar chart
    const ctx = document.getElementById('classPerformance').getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: names,
        datasets: [{
          label: 'Scores',
          data: scores,
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: { beginAtZero: true }
        }
      }
    });

  } catch (err) {
    console.error('Error loading chart:', err);
  }
}

loadChart();
