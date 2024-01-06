document.addEventListener('DOMContentLoaded', function () {
    // Project title and team members
    document.getElementById('team-members').innerHTML = '<h2>Project Team Members:</h2><ul><li>Michał Cudzich</li><li>Michał Burliga</li><li>Grzegorz Jewuła</li><li>Filip Moskała</li></ul>';
  
    // Replace 'YOUR_API_KEY' with your actual API key
    const apiKey = 'a993acd0';
  
    // Fetch data from Mockaroo API for 100 positions
    fetch('https://my.api.mockaroo.com/best_players.json?_quantity=100', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': apiKey,
      },
    })
      .then(response => response.json())
      .then(data => {
        // Display downloaded data in a single table
        document.getElementById('data-display').innerHTML = `
          <h2 class="text-center">Player Data Table</h2>
          ${createPlayerTable(data)}
        `;
  
        // Create doughnut chart
        createCountryChart(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  });
  
  function createPlayerTable(playerData) {
    const tableRows = playerData.map(playerObj => {
      const player = playerObj.player;
      return `
        <tr>
          <td>${player.position}</td>
          <td>${player.first_name}</td>
          <td>${player.last_name}</td>
          <td>${player.game_position}</td>
          <td>${player.gender}</td>
          <td>${player.country}</td>
        </tr>
      `;
    }).join('');
  
    return `
      <table class="table">
        <thead>
          <tr>
            <th>Position</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Game Position</th>
            <th>Gender</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>
          ${tableRows}
        </tbody>
      </table>
    `;
  }
  
  function createCountryChart(playerData) {
    // Count the occurrences of each country
    const countryCounts = playerData.reduce((acc, playerObj) => {
      const country = playerObj.player.country;
      acc[country] = (acc[country] || 0) + 1;
      return acc;
    }, {});
  
    // Extract data for chart
    const countries = Object.keys(countryCounts);
    const counts = Object.values(countryCounts);
  
    // Create doughnut chart
    var ctx = document.getElementById('countryChart').getContext('2d');
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: countries,
        datasets: [{
          data: counts,
          backgroundColor: getRandomColors(counts.length),
        }],
      },
    });
  }
  
  // Function to generate random colors for the chart
  function getRandomColors(numColors) {
    const colors = [];
    for (let i = 0; i < numColors; i++) {
      colors.push(`rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.8)`);
    }
    return colors;
  }