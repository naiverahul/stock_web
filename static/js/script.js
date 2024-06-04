document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('dateForm');
    const chartDiv = document.getElementById('chart');

    const trace = {
        x: [],
        y: [],
        mode: 'lines',
        line: { color: 'black' }
    };

    const layout = {
        title: 'The Historical Stock Plot',
        xaxis: { title: 'Date' },
        yaxis: { title: 'Close Price' },
        showlegend: false
    };

    Plotly.newPlot(chartDiv, [trace], layout);
    document.body.style.backgroundImage = "url('C:\Users\thera\OneDrive\Desktop\New folder (9)\templates\image.jpg')";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const stockSymbol = formData.get('stock_symbol');
        const start = formData.get('start');
        const end = formData.get('end');

        fetch('/get_data', {
            method: 'POST',
            body: new URLSearchParams(formData)
        })
        .then(response => response.json())
        .then(data => {
            // Convert date strings to JavaScript Date objects
            const dates = data.Date.map(date => new Date(date));
            // Update Plotly trace with fetched data
            Plotly.update(chartDiv, {
                x: [dates],
                y: [data.Close]
            });
            // Update chart title with selected stock symbol
            layout.title = `${stockSymbol} Stock Price`;
            Plotly.relayout(chartDiv, layout);
        })
        .catch(error => console.error('Error:', error));
    });
});
